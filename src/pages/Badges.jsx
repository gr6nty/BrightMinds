import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Badges() {
  const navigate = useNavigate()

  const [badges] = useState([
    { id: 'first', icon: '🚀', name: 'First Lesson', desc: 'Started the journey', earned: true },
    { id: 'streak3', icon: '🔥', name: '3-Day Streak', desc: '3 lessons in a row', earned: true },
    { id: 'streak7', icon: '⚡', name: 'Week Warrior', desc: '7-day streak', earned: false },
    { id: 'math', icon: '🔢', name: 'Math Master', desc: '80% maths score', earned: false },
    { id: 'science', icon: '🔬', name: 'Science Star', desc: 'Complete 5 science lessons', earned: false },
    { id: 'speed', icon: '💨', name: 'Speed Thinker', desc: 'Avg reply under 5s', earned: false },
    { id: 'comeback', icon: '💪', name: 'Comeback Kid', desc: 'Repaired a weakness', earned: false },
    { id: 'perfect', icon: '🌈', name: 'Perfect Session', desc: 'All correct answers', earned: false },
    { id: 'explorer', icon: '🌍', name: 'Subject Explorer', desc: 'Try 3 different subjects', earned: false },
    { id: 'xp100', icon: '🌟', name: '100 XP Club', desc: 'Earn 100 XP points', earned: true },
    { id: 'creative', icon: '🎨', name: 'Creative Writer', desc: 'Complete creative writing lesson', earned: false },
    { id: 'graduate', icon: '🎓', name: 'Grade Graduate', desc: 'Complete all grade topics', earned: false },
  ])

  const milestones = [
    { icon: '✅', title: 'First Lesson Complete', desc: 'The journey begins!', status: 'done' },
    { icon: '🎯', title: '5 Lessons Completed', desc: 'Complete 5 lessons total', status: 'active' },
    { icon: '📚', title: 'Subject Explorer', desc: 'Try 3 different subjects', status: 'locked' },
    { icon: '🏆', title: 'Subject Mastery', desc: 'Score 80%+ in any subject', status: 'locked' },
    { icon: '🌟', title: '100 XP Club', desc: 'Accumulate 100 XP points', status: 'done' },
    { icon: '🎓', title: 'Grade Complete', desc: 'Complete all topics for your grade', status: 'locked' },
  ]

  const earnedCount = badges.filter(b => b.earned).length

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>

        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Dashboard</button>
          <h1 style={styles.pageTitle}>🏅 Badges & Milestones</h1>
        </div>

        {/* Summary */}
        <div style={styles.summaryBox}>
          <div style={styles.summaryLeft}>
            <div style={styles.summaryNum}>{earnedCount}</div>
            <div style={styles.summaryLabel}>Badges Earned</div>
          </div>
          <div style={styles.summaryDivider} />
          <div style={styles.summaryLeft}>
            <div style={styles.summaryNum}>{badges.length - earnedCount}</div>
            <div style={styles.summaryLabel}>Still to Unlock</div>
          </div>
          <div style={styles.summaryDivider} />
          <div style={styles.summaryLeft}>
            <div style={styles.summaryNum}>2</div>
            <div style={styles.summaryLabel}>Milestones Done</div>
          </div>
        </div>

        {/* Badges */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>🌟 Achievement Badges</div>
          <div style={styles.badgeGrid}>
            {badges.map(b => (
              <div key={b.id} style={{ ...styles.badgeItem, ...(b.earned ? styles.badgeEarned : styles.badgeLocked) }}>
                <div style={styles.badgeIcon}>{b.icon}</div>
                <div style={styles.badgeName}>{b.name}</div>
                <div style={styles.badgeDesc}>{b.desc}</div>
                {b.earned && <div style={styles.earnedTag}>Earned! ✓</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>🗺️ Learning Milestones</div>
          <div style={styles.milestoneList}>
            {milestones.map((m, i) => (
              <div key={i} style={{ ...styles.milestone, ...(m.status === 'done' ? styles.milestoneDone : m.status === 'active' ? styles.milestoneActive : {}) }}>
                <div style={styles.msIcon}>{m.icon}</div>
                <div style={styles.msInfo}>
                  <div style={styles.msTitle}>{m.title}</div>
                  <div style={styles.msDesc}>{m.desc}</div>
                </div>
                <div style={{
                  ...styles.msTag,
                  ...(m.status === 'done' ? styles.msTagDone : m.status === 'active' ? styles.msTagActive : styles.msTagLocked)
                }}>
                  {m.status === 'done' ? 'Done ✓' : m.status === 'active' ? 'In Progress' : 'Locked'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate button */}
        <div style={styles.certBanner}>
          <div>
            <div style={styles.certTitle}>🎓 Ready for your Certificate?</div>
            <div style={styles.certDesc}>Complete subject milestones to unlock a printable certificate</div>
          </div>
          <button onClick={() => navigate('/certificate')} style={styles.certBtn}>
            View Certificate →
          </button>
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
  header: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
  backBtn: {
    padding: '6px 14px', background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
    color: '#fff', fontSize: '12px', cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  },
  pageTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.5rem', margin: 0 },
  summaryBox: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px', padding: '1.25rem',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-around', marginBottom: '1rem',
  },
  summaryLeft: { textAlign: 'center' },
  summaryNum: { fontFamily: "'Fredoka One', cursive", fontSize: '2rem', color: '#a78bfa' },
  summaryLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' },
  summaryDivider: { width: '1px', height: '40px', background: 'rgba(255,255,255,0.08)' },
  card: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px', padding: '1.25rem', marginBottom: '1rem',
  },
  cardTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', marginBottom: '1rem' },
  badgeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    gap: '0.75rem',
  },
  badgeItem: {
    borderRadius: '16px', padding: '1rem 0.75rem',
    textAlign: 'center', border: '1.5px solid rgba(255,255,255,0.08)',
    transition: 'transform 0.2s',
  },
  badgeEarned: {
    background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.3))',
    border: '1.5px solid rgba(167,139,250,0.4)',
  },
  badgeLocked: {
    background: 'rgba(255,255,255,0.02)',
    opacity: 0.45, filter: 'grayscale(0.6)',
  },
  badgeIcon: { fontSize: '2rem', marginBottom: '6px' },
  badgeName: { fontSize: '11px', fontWeight: '800', color: '#fff', marginBottom: '3px', lineHeight: '1.3' },
  badgeDesc: { fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.4' },
  earnedTag: {
    display: 'inline-block', marginTop: '6px',
    fontSize: '9px', fontWeight: '800',
    background: '#7C3AED', color: '#fff',
    padding: '2px 8px', borderRadius: '999px',
  },
  milestoneList: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  milestone: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.75rem 1rem',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px', background: 'rgba(255,255,255,0.03)',
  },
  milestoneDone: { border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)' },
  milestoneActive: { border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(124,58,237,0.08)' },
  msIcon: { fontSize: '1.4rem', flexShrink: 0 },
  msInfo: { flex: 1 },
  msTitle: { fontSize: '13px', fontWeight: '800', color: '#fff' },
  msDesc: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' },
  msTag: {
    fontSize: '10px', fontWeight: '800',
    padding: '3px 10px', borderRadius: '999px', whiteSpace: 'nowrap',
  },
  msTagDone: { background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' },
  msTagActive: { background: 'rgba(167,139,250,0.2)', color: '#c4b5fd' },
  msTagLocked: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' },
  certBanner: {
    background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.2))',
    border: '1px solid rgba(167,139,250,0.2)',
    borderRadius: '20px', padding: '1.25rem',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
  },
  certTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', marginBottom: '4px' },
  certDesc: { fontSize: '12px', color: 'rgba(255,255,255,0.5)' },
  certBtn: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    border: 'none', borderRadius: '10px',
    color: '#fff', fontSize: '13px', fontWeight: '700',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
    whiteSpace: 'nowrap',
  },
}