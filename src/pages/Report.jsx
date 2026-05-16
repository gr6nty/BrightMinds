import { useNavigate } from 'react-router-dom'

export default function Report() {
  const navigate = useNavigate()

  // Sample data - will come from Supabase later
  const stats = {
    xp: 120,
    lessons: 5,
    minutes: 42,
    improvement: 35,
  }

  const strengths = [
    'Strong grasp of number patterns through football analogies',
    'Excellent engagement when topics connect to passion',
    'Creative thinking — links concepts across subjects naturally',
  ]

  const weaknesses = [
    { topic: 'Fractions — denominators above 6', priority: 'High', sessions: 2 },
    { topic: 'Long word problems', priority: 'Medium', sessions: 1 },
  ]

  const recommendations = [
    'Focus next 3 sessions on fractions — use pizza/football field analogies',
    'Keep lessons under 10 minutes — attention peaks at minutes 3–7',
    'Introduce Science next week — strong curiosity signals detected',
  ]

  const subjects = [
    { name: 'Mathematics', pct: 42, color: '#7C3AED' },
    { name: 'English', pct: 28, color: '#3B82F6' },
    { name: 'Science', pct: 15, color: '#10B981' },
  ]

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>

        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Dashboard</button>
          <h1 style={styles.pageTitle}>📊 Progress Report</h1>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNum, color: '#a78bfa' }}>{stats.xp}</div>
            <div style={styles.statLabel}>Total XP</div>
          </div>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNum, color: '#10B981' }}>{stats.lessons}</div>
            <div style={styles.statLabel}>Lessons</div>
          </div>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNum, color: '#F59E0B' }}>{stats.minutes}m</div>
            <div style={styles.statLabel}>Studied</div>
          </div>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNum, color: '#3B82F6' }}>{stats.improvement}%</div>
            <div style={styles.statLabel}>Improvement</div>
          </div>
        </div>

        {/* Subject Progress */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>📈 Subject Progress</div>
          {subjects.map(s => (
            <div key={s.name} style={styles.pbarWrap}>
              <div style={styles.pbarLabel}>
                <span>{s.name}</span>
                <span>{s.pct}%</span>
              </div>
              <div style={styles.pbarTrack}>
                <div style={{ ...styles.pbarFill, width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>💪 Strengths Identified</div>
          {strengths.map((s, i) => (
            <div key={i} style={styles.strengthItem}>
              ✅ {s}
            </div>
          ))}
        </div>

        {/* Weaknesses */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>🔧 Weaknesses Detected</div>
          {weaknesses.map((w, i) => (
            <div key={i} style={styles.weaknessItem}>
              ⚠️ {w.topic}
            </div>
          ))}

          {/* Repair Queue */}
          <div style={styles.repairTitle}>🔄 Auto Weakness Repair Queue</div>
          {weaknesses.map((w, i) => (
            <div key={i} style={styles.repairItem}>
              <div>
                <div style={styles.repairTopic}>{w.topic}</div>
                <div style={styles.repairSub}>Last missed: {w.sessions} session{w.sessions > 1 ? 's' : ''} ago · Priority: {w.priority}</div>
              </div>
              <button
                onClick={() => navigate('/lesson')}
                style={styles.repairBtn}
              >
                Revisit →
              </button>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>💡 AI Recommendations</div>
          {recommendations.map((r, i) => (
            <div key={i} style={styles.recItem}>
              📌 {r}
            </div>
          ))}
        </div>

        {/* Email report */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>📬 Email This Report</div>
          <input
            type="email"
            placeholder="parent@email.com"
            style={styles.emailInput}
          />
          <button style={styles.emailBtn}>
            📧 Send Report to Parent
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
    padding: '6px 14px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    color: '#fff', fontSize: '12px', cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
  },
  pageTitle: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.5rem', margin: 0,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  statBox: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '1rem',
    textAlign: 'center',
  },
  statNum: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.75rem', lineHeight: 1,
  },
  statLabel: {
    fontSize: '11px', color: 'rgba(255,255,255,0.4)',
    marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em',
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '1.25rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.1rem', marginBottom: '1rem',
  },
  pbarWrap: { marginBottom: '0.85rem' },
  pbarLabel: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '12px', color: 'rgba(255,255,255,0.5)',
    marginBottom: '5px',
  },
  pbarTrack: {
    height: '8px', background: 'rgba(255,255,255,0.08)',
    borderRadius: '999px', overflow: 'hidden',
  },
  pbarFill: { height: '100%', borderRadius: '999px', transition: 'width 0.8s ease' },
  strengthItem: {
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#6ee7b7',
    marginBottom: '0.5rem',
  },
  weaknessItem: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#fca5a5',
    marginBottom: '0.5rem',
  },
  repairTitle: {
    fontSize: '12px', fontWeight: '800',
    textTransform: 'uppercase', letterSpacing: '0.07em',
    color: 'rgba(255,255,255,0.4)', margin: '1rem 0 0.5rem',
  },
  repairItem: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(245,158,11,0.1)',
    border: '1px solid rgba(245,158,11,0.2)',
    borderRadius: '10px',
    padding: '10px 14px',
    marginBottom: '0.5rem',
    gap: '1rem',
  },
  repairTopic: { fontSize: '13px', fontWeight: '700', color: '#FDE68A' },
  repairSub: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' },
  repairBtn: {
    padding: '6px 14px',
    background: '#F59E0B',
    border: 'none', borderRadius: '8px',
    color: '#fff', fontSize: '12px', fontWeight: '700',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
    whiteSpace: 'nowrap',
  },
  recItem: {
    background: 'rgba(59,130,246,0.1)',
    border: '1px solid rgba(59,130,246,0.2)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#93c5fd',
    marginBottom: '0.5rem',
  },
  emailInput: {
    width: '100%', padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.07)',
    color: '#fff', fontSize: '13.5px', outline: 'none',
    fontFamily: "'Nunito', sans-serif",
    marginBottom: '0.75rem',
  },
  emailBtn: {
    width: '100%', padding: '12px',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    border: 'none', borderRadius: '10px',
    color: '#fff', fontSize: '14px', fontWeight: '700',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  },
}