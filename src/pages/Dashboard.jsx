import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({ setUser }) {
  const navigate = useNavigate()
  const userStr = localStorage.getItem('brightmind_user')
  const user = userStr ? JSON.parse(userStr) : {}

  // Sample children data - will come from Supabase later
  const [children] = useState([
    { id: 1, name: 'Amara', grade: 'Grade 3', region: 'Caribbean', passion: 'Football', xp: 120, streak: 3, subject: 'Mathematics' },
  ])

  function logout() {
    localStorage.removeItem('brightmind_user')
    setUser(null)
    navigate('/login')
  }

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>🦉</span>
          <span style={styles.appName}>BrightMind</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.emailText}>{user.email}</span>
          <button onClick={logout} style={styles.logoutBtn}>Log out</button>
        </div>
      </div>

      {/* Main content */}
      <div style={styles.content}>

        {/* Welcome */}
        <div style={styles.welcome}>
          <h1 style={styles.welcomeTitle}>Welcome back! 👋</h1>
          <p style={styles.welcomeSub}>Manage your children's learning journey</p>
        </div>

        {/* Stats row */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <div style={styles.statNum}>{children.length}</div>
            <div style={styles.statLabel}>Children</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNum}>
              {children.reduce((a, c) => a + c.xp, 0)}
            </div>
            <div style={styles.statLabel}>Total XP</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNum}>
              {Math.max(...children.map(c => c.streak))}🔥
            </div>
            <div style={styles.statLabel}>Best Streak</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNum}>5</div>
            <div style={styles.statLabel}>Lessons Done</div>
          </div>
        </div>

        {/* Children cards */}
        <div style={styles.sectionTitle}>Your Children</div>

        <div style={styles.childrenGrid}>
          {children.map(child => (
            <div key={child.id} style={styles.childCard}>
              <div style={styles.childTop}>
                <div style={styles.childAvatar}>
                  {child.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={styles.childName}>{child.name}</div>
                  <div style={styles.childInfo}>{child.grade} · {child.region}</div>
                </div>
              </div>

              <div style={styles.childStats}>
                <div style={styles.childStat}>
                  <span style={styles.childStatNum}>⭐ {child.xp}</span>
                  <span style={styles.childStatLabel}>XP</span>
                </div>
                <div style={styles.childStat}>
                  <span style={styles.childStatNum}>🔥 {child.streak}</span>
                  <span style={styles.childStatLabel}>Streak</span>
                </div>
                <div style={styles.childStat}>
                  <span style={styles.childStatNum}>❤️ {child.passion}</span>
                  <span style={styles.childStatLabel}>Passion</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={styles.progressLabel}>
                <span>{child.subject}</span>
                <span>42%</span>
              </div>
              <div style={styles.progressTrack}>
                <div style={{ ...styles.progressFill, width: '42%' }} />
              </div>

              <button
                onClick={() => navigate('/lesson')}
                style={styles.startBtn}
              >
                🚀 Start Lesson
              </button>
            </div>
          ))}

          {/* Add child card */}
          <div
            onClick={() => navigate('/setup')}
            style={styles.addCard}
          >
            <div style={styles.addIcon}>+</div>
            <div style={styles.addText}>Add a child</div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={styles.sectionTitle}>Quick Actions</div>
        <div style={styles.actionsRow}>
          <div onClick={() => navigate('/lesson')} style={styles.actionBtn}>
            <span style={styles.actionIcon}>📚</span>
            <span>Start Lesson</span>
          </div>
          <div onClick={() => navigate('/report')} style={styles.actionBtn}>
            <span style={styles.actionIcon}>📊</span>
            <span>View Report</span>
          </div>
          <div onClick={() => navigate('/badges')} style={styles.actionBtn}>
            <span style={styles.actionIcon}>🏅</span>
            <span>Badges</span>
          </div>
          <div onClick={() => navigate('/certificate')} style={styles.actionBtn}>
            <span style={styles.actionIcon}>🎓</span>
            <span>Certificate</span>
          </div>
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
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.2)',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '8px' },
  logo: { fontSize: '1.5rem' },
  appName: { fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem', color: '#fff' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  emailText: { fontSize: '12px', color: 'rgba(255,255,255,0.4)' },
  logoutBtn: {
    padding: '6px 14px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
  },
  content: { maxWidth: '800px', margin: '0 auto', padding: '1.5rem 1rem' },
  welcome: { marginBottom: '1.5rem' },
  welcomeTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.75rem', margin: '0 0 4px' },
  welcomeSub: { fontSize: '13px', color: 'rgba(255,255,255,0.5)' },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  statBox: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '1rem',
    textAlign: 'center',
  },
  statNum: { fontFamily: "'Fredoka One', cursive", fontSize: '1.75rem', color: '#a78bfa' },
  statLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '0.75rem',
  },
  childrenGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  childCard: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '1.25rem',
  },
  childTop: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
  childAvatar: {
    width: '44px', height: '44px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Fredoka One', cursive", fontSize: '1rem', color: '#fff',
    flexShrink: 0,
  },
  childName: { fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem' },
  childInfo: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' },
  childStats: { display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' },
  childStat: {
    background: 'rgba(255,255,255,0.06)',
    borderRadius: '8px',
    padding: '4px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  childStatNum: { fontSize: '12px', fontWeight: '800' },
  childStatLabel: { fontSize: '10px', color: 'rgba(255,255,255,0.4)' },
  progressLabel: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '5px',
  },
  progressTrack: {
    height: '6px', background: 'rgba(255,255,255,0.1)',
    borderRadius: '999px', overflow: 'hidden', marginBottom: '1rem',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
    borderRadius: '999px',
  },
  startBtn: {
    width: '100%', padding: '10px',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    border: 'none', borderRadius: '10px',
    color: '#fff', fontSize: '13px', fontWeight: '700',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  },
  addCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1.5px dashed rgba(255,255,255,0.15)',
    borderRadius: '20px',
    padding: '1.25rem',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', minHeight: '200px',
    transition: 'border-color 0.2s',
  },
  addIcon: { fontSize: '2rem', color: 'rgba(255,255,255,0.2)', marginBottom: '8px' },
  addText: { fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: '700' },
  actionsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
  },
  actionBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '6px',
  },
  actionIcon: { fontSize: '1.5rem' },
}