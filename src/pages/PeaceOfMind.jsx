import { useNavigate } from 'react-router-dom'

export default function PeaceOfMind() {
  const navigate = useNavigate()

  const insights = [
    {
      icon: '🎯',
      title: 'Attention Level',
      desc: 'Higher than average — 87% focus score this session. Engagement peaked in the first 6 minutes.',
      type: 'great',
    },
    {
      icon: '😊',
      title: 'Mood Arc',
      desc: 'Started Happy 😄, stayed engaged throughout. No frustration signals detected.',
      type: 'good',
    },
    {
      icon: '🧠',
      title: 'Struggle Detection',
      desc: 'No major struggles detected. Minor confusion on fractions — auto-queued for repair next session.',
      type: 'good',
    },
    {
      icon: '⚡',
      title: 'Response Speed',
      desc: 'Average 8.2 seconds per answer — well within the healthy range. No signs of disengagement.',
      type: 'great',
    },
    {
      icon: '🔥',
      title: 'Streak & Motivation',
      desc: 'Current streak: 3 sessions 🔥 — XP rewards are keeping motivation high.',
      type: 'good',
    },
    {
      icon: '⏱️',
      title: 'Session Length',
      desc: 'This session: 8 min. Recommended: 8–12 min for this age group. Brain breaks were triggered automatically.',
      type: 'warn',
    },
  ]

  const moodLog = ['happy', 'happy', 'ok', 'happy', 'ok', 'happy']
  const moodColors = { happy: '#10B981', ok: '#F59E0B', tired: '#6366F1', frustrated: '#EF4444' }
  const moodEmoji = { happy: '😄', ok: '😊', tired: '😴', frustrated: '😤' }

  function getCardStyle(type) {
    if (type === 'great') return { ...styles.insightCard, border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(124,58,237,0.1)' }
    if (type === 'good') return { ...styles.insightCard, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)' }
    if (type === 'warn') return { ...styles.insightCard, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)' }
    return styles.insightCard
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>

        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Dashboard</button>
          <h1 style={styles.pageTitle}>🛡️ Parent Peace of Mind</h1>
        </div>

        <p style={styles.pageSub}>Last session summary — automatically updated after every lesson</p>

        {/* Overall score */}
        <div style={styles.scoreBox}>
          <div style={styles.scoreLeft}>
            <div style={styles.scoreNum}>87%</div>
            <div style={styles.scoreLabel}>Overall Session Score</div>
          </div>
          <div style={styles.scoreDivider} />
          <div style={styles.scoreRight}>
            <div style={styles.scoreItem}>✅ No inappropriate content detected</div>
            <div style={styles.scoreItem}>✅ Child stayed on topic throughout</div>
            <div style={styles.scoreItem}>✅ All AI responses were age-appropriate</div>
            <div style={styles.scoreItem}>⚠️ One topic flagged for revision</div>
          </div>
        </div>

        {/* Insight cards */}
        <div style={styles.insightGrid}>
          {insights.map((item, i) => (
            <div key={i} style={getCardStyle(item.type)}>
              <div style={styles.insightIcon}>{item.icon}</div>
              <div style={styles.insightTitle}>{item.title}</div>
              <div style={styles.insightDesc}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Mood timeline */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>📊 Mood Timeline This Session</div>
          <div style={styles.moodTrack}>
            {moodLog.map((m, i) => (
              <div key={i} style={{ ...styles.moodDot, background: moodColors[m] }} title={m}>
                {moodEmoji[m]}
              </div>
            ))}
          </div>
          <div style={styles.moodLegend}>
            {Object.entries(moodEmoji).map(([key, emoji]) => (
              <div key={key} style={styles.legendItem}>
                <div style={{ ...styles.legendDot, background: moodColors[key] }} />
                <span>{emoji} {key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety note */}
        <div style={styles.safetyBox}>
          <div style={styles.safetyTitle}>🔒 Safety & Privacy</div>
          <div style={styles.safetyText}>
            BrightMind's AI tutor is designed specifically for children. All conversations are
            filtered for age-appropriateness. The AI will never discuss inappropriate topics,
            share personal data, or engage in non-educational conversations. You can review
            any session from the Report page.
          </div>
        </div>

        {/* Email report */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>📬 Email This Report to Yourself</div>
          <input type="email" placeholder="parent@email.com" style={styles.emailInput} />
          <button style={styles.emailBtn}>📧 Send Peace of Mind Report</button>
        </div>

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0a3e 100%)',
    fontFamily: "'Nunito', sans-serif",
    color: '#fff',
  },
  wrap: { maxWidth: '700px', margin: '0 auto', padding: '1.5rem 1rem' },
  header: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' },
  backBtn: {
    padding: '6px 14px', background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
    color: '#fff', fontSize: '12px', cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
  },
  pageTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.5rem', margin: 0 },
  pageSub: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' },
  scoreBox: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px', padding: '1.25rem',
    display: 'flex', gap: '1.5rem', alignItems: 'center',
    marginBottom: '1rem', flexWrap: 'wrap',
  },
  scoreLeft: { textAlign: 'center', flexShrink: 0 },
  scoreNum: { fontFamily: "'Fredoka One', cursive", fontSize: '3rem', color: '#10B981', lineHeight: 1 },
  scoreLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' },
  scoreDivider: { width: '1px', height: '80px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 },
  scoreRight: { flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' },
  scoreItem: { fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' },
  insightGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '0.75rem', marginBottom: '1rem',
  },
  insightCard: {
    borderRadius: '16px', padding: '1rem',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
  },
  insightIcon: { fontSize: '1.5rem', marginBottom: '6px' },
  insightTitle: { fontWeight: '800', fontSize: '13px', marginBottom: '4px' },
  insightDesc: { fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.55' },
  card: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px', padding: '1.25rem', marginBottom: '1rem',
  },
  cardTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', marginBottom: '1rem' },
  moodTrack: { display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '0.75rem' },
  moodDot: {
    width: '32px', height: '32px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1rem',
  },
  moodLegend: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' },
  legendDot: { width: '10px', height: '10px', borderRadius: '50%' },
  safetyBox: {
    background: 'rgba(16,185,129,0.08)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem',
  },
  safetyTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1rem', marginBottom: '0.5rem', color: '#6ee7b7' },
  safetyText: { fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' },
  emailInput: {
    width: '100%', padding: '10px 14px',
    borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.07)', color: '#fff',
    fontSize: '13.5px', outline: 'none',
    fontFamily: "'Nunito', sans-serif", marginBottom: '0.75rem',
  },
  emailBtn: {
    width: '100%', padding: '12px',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    border: 'none', borderRadius: '10px',
    color: '#fff', fontSize: '14px', fontWeight: '700',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  },
}