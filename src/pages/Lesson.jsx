import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const REGIONS = {
  caribbean: { name: 'Caribbean', flag: '🌴', curr: 'CXC/CSEC', examples: 'cricket, Carnival, jerk chicken, reggae, Usain Bolt' },
  'west-africa': { name: 'West Africa', flag: '🌍', curr: 'WAEC/BECE', examples: 'Afrobeats, jollof rice, Anansi stories, football' },
  'east-africa': { name: 'East Africa', flag: '🦁', curr: 'KCSE/UNEB', examples: 'safari, Swahili, ugali, marathon runners' },
  'southeast-asia': { name: 'SE Asia', flag: '🏯', curr: 'MOE', examples: 'K-pop, badminton, street food, temples' },
  'south-asia': { name: 'South Asia', flag: '🪔', curr: 'CBSE', examples: 'cricket, Bollywood, Diwali, rangoli' },
  'uk-canada': { name: 'UK/Canada', flag: '🍁', curr: 'National Curriculum', examples: 'hockey, Premier League, Tim Hortons' },
}

const MOODS = {
  happy: { emoji: '😄', tone: 'enthusiastic, high-energy, lots of emojis, fast-paced', color: '#10B981' },
  ok: { emoji: '😊', tone: 'warm, steady, encouraging', color: '#F59E0B' },
  tired: { emoji: '😴', tone: 'very gentle, super short, no pressure, soothing', color: '#6366F1' },
  frustrated: { emoji: '😤', tone: 'very patient, extra simple, lots of praise for tiny wins', color: '#EF4444' },
}

export default function Lesson() {
  const navigate = useNavigate()
  const chatRef = useRef(null)

  // Setup state
  const [setupDone, setSetupDone] = useState(false)
  const [childName, setChildName] = useState('Amara')
  const [grade, setGrade] = useState('Grade 3')
  const [region, setRegion] = useState('caribbean')
  const [subject, setSubject] = useState('Mathematics')
  const [passion, setPassion] = useState('football / soccer')
  const [mood, setMood] = useState('happy')

  // Lesson state
  const [messages, setMessages] = useState([])
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [msgCount, setMsgCount] = useState(0)
  const [progress, setProgress] = useState(5)
  const [showBreak, setShowBreak] = useState(false)
  const [moodLog, setMoodLog] = useState([])
  const [lessonDone, setLessonDone] = useState(false)
  const [quickOptions, setQuickOptions] = useState([])
  const [showReward, setShowReward] = useState(false)
  const [rewardText, setRewardText] = useState('')

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, loading])

  const groqKey = import.meta.env.VITE_GROQ_KEY

  async function callGroq(userMsg, isFirst) {
    const r = REGIONS[region]
    const m = MOODS[mood]

    const systemPrompt = `You are Ollie the Owl — a warm, world-class AI tutor for children.
STUDENT: ${childName}, ${grade}
SUBJECT: ${subject}
REGION: ${r.name} (${r.curr} curriculum)
CULTURAL EXAMPLES TO USE: ${r.examples}
PASSION (teach EVERYTHING through this lens): ${passion}
CURRENT MOOD: ${mood}
TONE: ${m.tone}

RULES:
- Keep responses to 2-4 sentences only — short attention spans!
- Always connect the lesson to ${passion} and ${r.name} culture
- Match your tone to the mood setting above
- End every message with a question OR [QUICK:option1|option2|option3]
- Never say "as an AI"
- Make ${childName} feel like a STAR
- If child seems confused add [WEAK:topic] at the end`

    const msgs = isFirst
      ? [{ role: 'user', content: `Greet ${childName} warmly! Say you are learning ${subject} through ${passion}, mention something from ${r.name} culture, then ask the first ${grade} level question.` }]
      : [...history, { role: 'user', content: userMsg }]

    if (!isFirst) {
      setHistory(prev => [...prev, { role: 'user', content: userMsg }])
    }

    setLoading(true)

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 300,
          messages: [{ role: 'system', content: systemPrompt }, ...msgs]
        })
      })

      const data = await res.json()
      const raw = data.choices?.[0]?.message?.content || "Let's keep going! What do you think?"

      setLoading(false)

      // Extract quick options
      let reply = raw
      let opts = []
      const qm = raw.match(/\[QUICK:([^\]]+)\]/)
      if (qm) {
        opts = qm[1].split('|').map(s => s.trim())
        reply = raw.replace(/\[QUICK:[^\]]+\]/, '').trim()
      }

      // Remove weak tags from display
      reply = reply.replace(/\[WEAK:[^\]]+\]/g, '').trim()

      setHistory(prev => [...prev, { role: 'assistant', content: raw }])
      setMessages(prev => [...prev, { role: 'tutor', text: reply }])
      setQuickOptions(opts)

      // Update XP and progress
      const newCount = msgCount + 1
      setMsgCount(newCount)
      setXp(prev => prev + 15)
      setStreak(prev => prev + 1)
      setProgress(Math.min(5 + newCount * 13, 95))

      // Attention break every 3 messages
      if (newCount % 3 === 0 && !lessonDone) {
        setTimeout(() => setShowBreak(true), 1500)
      }

      // Lesson complete after 6 exchanges
      if (newCount >= 6) {
        setProgress(100)
        setLessonDone(true)
        setRewardText(`Amazing work ${childName}! 🏆 You earned ${xp + 15} XP!`)
        setTimeout(() => setShowReward(true), 1000)
      }

    } catch (err) {
      setLoading(false)
      setMessages(prev => [...prev, { role: 'tutor', text: `Oops! Something went wrong. Check your Groq API key. Error: ${err.message}` }])
    }
  }

  function detectMood(text) {
    const hasNeg = /don't|can't|hard|confused|idk|wrong|ugh|hate|no/i.test(text)
    const hasPos = /yes|yay|cool|got it|easy|fun|love|amazing|wow/i.test(text)
    let newMood = mood
    if (hasNeg || text.trim().length < 5) newMood = 'frustrated'
    else if (hasPos || text.length > 40) newMood = 'happy'
    if (newMood !== mood) setMood(newMood)
    setMoodLog(prev => [...prev, newMood])
  }

  function sendMessage(text) {
    if (!text.trim() || loading) return
    setQuickOptions([])
    setMessages(prev => [...prev, { role: 'student', text }])
    detectMood(text)
    callGroq(text, false)
    setInput('')
  }

  function startLesson() {
    setSetupDone(true)
    setMessages([])
    setHistory([])
    callGroq(null, true)
  }

  // ── SETUP SCREEN ──
  if (!setupDone) {
    return (
      <div style={styles.page}>
        <div style={styles.setupWrap}>

          <div style={styles.setupHeader}>
            <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Back</button>
            <span style={styles.setupTitle}>🦉 Set up your lesson</span>
          </div>

          <div style={styles.card}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Child's Name</label>
              <input value={childName} onChange={e => setChildName(e.target.value)} style={styles.input} />
            </div>

            <div style={styles.fieldRow}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Grade</label>
                <select value={grade} onChange={e => setGrade(e.target.value)} style={styles.input}>
                  {['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8'].map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)} style={styles.input}>
                  {['Mathematics','English & Reading','Science','Social Studies','Creative Writing'].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>🌍 Region</label>
              <div style={styles.regionGrid}>
                {Object.entries(REGIONS).map(([key, r]) => (
                  <div key={key} onClick={() => setRegion(key)} style={{ ...styles.regionCard, ...(region === key ? styles.regionCardSel : {}) }}>
                    <span style={{ fontSize: '1.4rem' }}>{r.flag}</span>
                    <span style={styles.regionName}>{r.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>🔥 Passion (lessons taught through this)</label>
              <div style={styles.pillRow}>
                {['football / soccer','basketball','cricket','music','cooking','space','animals','gaming','art','fashion','doctor','business'].map(p => (
                  <div key={p} onClick={() => setPassion(p)} style={{ ...styles.pill, ...(passion === p ? styles.pillSel : {}) }}>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>😊 How is {childName} feeling?</label>
              <div style={styles.moodRow}>
                {Object.entries(MOODS).map(([key, m]) => (
                  <div key={key} onClick={() => setMood(key)} style={{ ...styles.moodCard, ...(mood === key ? { border: `2px solid ${m.color}`, background: `${m.color}22` } : {}) }}>
                    <span style={{ fontSize: '1.75rem' }}>{m.emoji}</span>
                    <span style={styles.moodLabel}>{key}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={startLesson} style={styles.startBtn}>
              🚀 Start Lesson!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── LESSON SCREEN ──
  return (
    <div style={styles.page}>
      <div style={styles.lessonWrap}>

        {/* Top bar */}
        <div style={styles.topBar}>
          <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Dashboard</button>
          <div style={styles.topMeta}>
            <span style={{ ...styles.metaPill, color: MOODS[mood].color }}>{MOODS[mood].emoji} {mood}</span>
            <span style={styles.metaPill}>⭐ {xp} XP</span>
            <span style={styles.metaPill}>🔥 {streak}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={styles.progWrap}>
          <div style={styles.progTrack}>
            <div style={{ ...styles.progFill, width: `${progress}%` }} />
          </div>
          <span style={styles.progPct}>{progress}%</span>
        </div>

        {/* Brain break banner */}
        {showBreak && (
          <div style={styles.breakBanner}>
            🧠 Brain Break! Shake your hands + take 3 deep breaths!
            <button onClick={() => setShowBreak(false)} style={styles.breakBtn}>I'm back! →</button>
          </div>
        )}

        {/* Chat */}
        <div style={styles.chatBox} ref={chatRef}>
          {messages.map((msg, i) => (
            <div key={i} style={{ ...styles.msgRow, ...(msg.role === 'student' ? styles.msgRowUser : {}) }}>
              {msg.role === 'tutor' && <div style={styles.avTutor}>🦉</div>}
              <div style={{ ...styles.bubble, ...(msg.role === 'student' ? styles.bubbleUser : styles.bubbleTutor) }}>
                {msg.text}
              </div>
              {msg.role === 'student' && (
                <div style={styles.avStudent}>{childName.substring(0, 2).toUpperCase()}</div>
              )}
            </div>
          ))}

          {loading && (
            <div style={styles.msgRow}>
              <div style={styles.avTutor}>🦉</div>
              <div style={styles.bubbleTutor}>
                <div style={styles.typingDots}>
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick options */}
        {quickOptions.length > 0 && (
          <div style={styles.quickRow}>
            {quickOptions.map((opt, i) => (
              <button key={i} onClick={() => sendMessage(opt)} style={styles.quickBtn}>{opt}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={styles.inputRow}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Type your answer..."
            style={styles.inputBox}
            disabled={lessonDone}
          />
          <button onClick={() => sendMessage(input)} disabled={loading || lessonDone} style={styles.sendBtn}>
            Send →
          </button>
        </div>

        {/* Mood timeline */}
        {moodLog.length > 0 && (
          <div style={styles.moodTimeline}>
            <span style={styles.timelineLabel}>Mood this lesson:</span>
            {moodLog.map((m, i) => (
              <span key={i} style={{ ...styles.moodDot, background: MOODS[m]?.color }}>{MOODS[m]?.emoji}</span>
            ))}
          </div>
        )}

      </div>

      {/* Reward popup */}
      {showReward && (
        <div style={styles.overlay}>
          <div style={styles.rewardCard}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
            <h2 style={styles.rewardTitle}>Lesson Complete!</h2>
            <p style={styles.rewardMsg}>{rewardText}</p>
            <button onClick={() => { setShowReward(false); navigate('/dashboard') }} style={styles.startBtn}>
              Back to Dashboard →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0a3e 100%)', fontFamily: "'Nunito', sans-serif", color: '#fff' },
  setupWrap: { maxWidth: '680px', margin: '0 auto', padding: '1.5rem 1rem' },
  setupHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' },
  setupTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem' },
  backBtn: { padding: '6px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: '12px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" },
  card: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '1.5rem' },
  fieldGroup: { marginBottom: '1rem' },
  fieldRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' },
  label: { display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' },
  input: { width: '100%', padding: '9px 13px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: '13.5px', outline: 'none', fontFamily: "'Nunito', sans-serif" },
  regionGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' },
  regionCard: { padding: '0.6rem', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' },
  regionCardSel: { border: '1.5px solid #7C3AED', background: 'rgba(124,58,237,0.2)' },
  regionName: { fontSize: '11px', fontWeight: '700' },
  pillRow: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  pill: { padding: '5px 12px', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '999px', fontSize: '12px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' },
  pillSel: { background: '#7C3AED', border: '1.5px solid #7C3AED', color: '#fff' },
  moodRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' },
  moodCard: { padding: '0.7rem 0.4rem', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' },
  moodLabel: { fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.5)' },
  startBtn: { width: '100%', padding: '13px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" },
  lessonWrap: { maxWidth: '700px', margin: '0 auto', padding: '1rem' },
  topBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' },
  topMeta: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  metaPill: { fontSize: '12px', fontWeight: '800', padding: '3px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' },
  progWrap: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' },
  progTrack: { flex: 1, height: '7px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' },
  progFill: { height: '100%', background: 'linear-gradient(90deg, #4F46E5, #7C3AED, #DB2777)', borderRadius: '999px', transition: 'width 0.6s ease' },
  progPct: { fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.4)', minWidth: '30px', textAlign: 'right' },
  breakBanner: { background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', borderRadius: '12px', padding: '0.65rem 1rem', fontSize: '12.5px', fontWeight: '700', color: '#78350F', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' },
  breakBtn: { padding: '4px 12px', border: '1.5px solid #F59E0B', borderRadius: '8px', background: 'transparent', fontWeight: '800', cursor: 'pointer', fontFamily: "'Nunito', sans-serif", fontSize: '12px', color: '#78350F' },
  chatBox: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', minHeight: '300px', maxHeight: '400px', overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', scrollBehavior: 'smooth', marginBottom: '0.75rem' },
  msgRow: { display: 'flex', alignItems: 'flex-start', gap: '8px' },
  msgRowUser: { flexDirection: 'row-reverse' },
  avTutor: { width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 },
  avStudent: { width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800', flexShrink: 0 },
  bubble: { maxWidth: '78%', padding: '9px 13px', borderRadius: '1rem', fontSize: '13.5px', lineHeight: '1.55' },
  bubbleTutor: { background: 'rgba(124,58,237,0.2)', color: '#e9d5ff', borderRadius: '3px 1rem 1rem 1rem' },
  bubbleUser: { background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: '#fff', borderRadius: '1rem 3px 1rem 1rem' },
  typingDots: { display: 'flex', gap: '4px', padding: '4px 0' },
  quickRow: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' },
  quickBtn: { padding: '7px 14px', border: '1.5px solid rgba(167,139,250,0.4)', borderRadius: '999px', background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Nunito', sans-serif' " },
  inputRow: { display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' },
  inputBox: { flex: 1, padding: '10px 14px', borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: "'Nunito', sans-serif" },
  sendBtn: { padding: '10px 16px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', border: 'none', borderRadius: '12px', color: '#fff', fontFamily: "'Fredoka One', cursive", fontSize: '0.9rem', cursor: 'pointer' },
  moodTimeline: { display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap', padding: '0.5rem 0' },
  timelineLabel: { fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em' },
  moodDot: { width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 },
  rewardCard: { background: 'linear-gradient(135deg, #1a0a3e, #0f0a1e)', border: '2px solid #7C3AED', borderRadius: '24px', padding: '2rem', maxWidth: '320px', width: '90%', textAlign: 'center' },
  rewardTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.5rem', marginBottom: '0.5rem' },
  rewardMsg: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '1.25rem', lineHeight: '1.6' },
}