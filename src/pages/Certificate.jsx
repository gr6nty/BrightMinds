import { useNavigate } from 'react-router-dom'

export default function Certificate() {
  const navigate = useNavigate()
  const userStr = localStorage.getItem('brightmind_user')
  const user = userStr ? JSON.parse(userStr) : {}
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  function printCert() {
    window.print()
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>

        {/* Header - hidden when printing */}
        <div style={styles.header} className="no-print">
          <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Dashboard</button>
          <h1 style={styles.pageTitle}>🎓 Certificate</h1>
        </div>

        {/* Info box */}
        <div style={styles.infoBox} className="no-print">
          <div style={styles.infoText}>
            🏆 Complete subject milestones to unlock new certificates. Keep studying to level up!
          </div>
        </div>

        {/* Certificate */}
        <div style={styles.certOuter}>
          <div style={styles.cert} id="certificate">

            {/* Top decoration */}
            <div style={styles.topDeco}>✦ ✦ ✦</div>

            {/* Logo */}
            <div style={styles.certLogo}>🦉 BrightMind Tutor</div>

            {/* Title */}
            <div style={styles.certTitle}>Certificate of Achievement</div>

            {/* This certifies */}
            <div style={styles.certSub}>This certifies that</div>

            {/* Child name */}
            <div style={styles.certName}>Amara</div>

            {/* Description */}
            <div style={styles.certDesc}>
              has demonstrated outstanding effort and progress in{' '}
              <strong>Mathematics</strong> (Grade 3) through the BrightMind
              AI Tutoring Programme — Caribbean Curriculum.
            </div>

            {/* Stars */}
            <div style={styles.certStars}>⭐ ⭐ ⭐ ⭐ ⭐</div>

            {/* Stats row */}
            <div style={styles.certStats}>
              <div style={styles.certStat}>
                <div style={styles.certStatNum}>120</div>
                <div style={styles.certStatLabel}>XP Earned</div>
              </div>
              <div style={styles.certStatDivider} />
              <div style={styles.certStat}>
                <div style={styles.certStatNum}>5</div>
                <div style={styles.certStatLabel}>Lessons</div>
              </div>
              <div style={styles.certStatDivider} />
              <div style={styles.certStat}>
                <div style={styles.certStatNum}>3 🔥</div>
                <div style={styles.certStatLabel}>Streak</div>
              </div>
            </div>

            {/* Seal */}
            <div style={styles.certSeal}>🏅</div>

            {/* Date and signature line */}
            <div style={styles.certFooter}>
              <div style={styles.certDate}>Issued: {today}</div>
              <div style={styles.certSign}>BrightMind AI Tutoring</div>
            </div>

            {/* Bottom decoration */}
            <div style={styles.bottomDeco}>✦ ✦ ✦</div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={styles.btnRow} className="no-print">
          <button onClick={printCert} style={styles.printBtn}>
            🖨️ Print / Save as PDF
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'BrightMind Certificate',
                  text: 'Amara just earned a BrightMind Certificate in Mathematics! 🎓',
                })
              } else {
                alert('Copy this link to share: brightminds4u.netlify.app')
              }
            }}
            style={styles.shareBtn}
          >
            📤 Share Certificate
          </button>
        </div>

        {/* How to save as PDF tip */}
        <div style={styles.tipBox} className="no-print">
          <strong>💡 How to save as PDF:</strong> Click "Print / Save as PDF" above →
          in the print dialog change the destination to <strong>"Save as PDF"</strong> → click Save.
        </div>

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
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
  header: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' },
  backBtn: {
    padding: '6px 14px', background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
    color: '#fff', fontSize: '12px', cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
  },
  pageTitle: { fontFamily: "'Fredoka One', cursive", fontSize: '1.5rem', margin: 0 },
  infoBox: {
    background: 'rgba(124,58,237,0.15)',
    border: '1px solid rgba(167,139,250,0.2)',
    borderRadius: '12px', padding: '0.85rem 1rem',
    marginBottom: '1.25rem',
  },
  infoText: { fontSize: '13px', color: '#c4b5fd', lineHeight: '1.5' },
  certOuter: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '24px', padding: '1rem',
    marginBottom: '1rem',
  },
  cert: {
    background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    borderRadius: '16px',
    border: '3px solid #7C3AED',
    padding: '2rem 1.5rem',
    textAlign: 'center',
    color: '#1a1035',
    position: 'relative',
  },
  topDeco: {
    fontSize: '1rem', color: '#7C3AED',
    letterSpacing: '8px', marginBottom: '1rem',
  },
  certLogo: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1rem', color: '#7C3AED',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: '0.75rem',
  },
  certTitle: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.75rem', color: '#1a1035',
    marginBottom: '0.5rem',
  },
  certSub: { fontSize: '13px', color: '#6B7280', marginBottom: '0.25rem' },
  certName: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '2.5rem', color: '#7C3AED',
    margin: '0.25rem 0 0.75rem',
  },
  certDesc: {
    fontSize: '13px', color: '#4B5563',
    lineHeight: '1.6', maxWidth: '420px',
    margin: '0 auto 1rem',
  },
  certStars: { fontSize: '1.25rem', letterSpacing: '4px', marginBottom: '1rem' },
  certStats: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '1.5rem',
    marginBottom: '1rem',
  },
  certStat: { textAlign: 'center' },
  certStatNum: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.5rem', color: '#7C3AED',
  },
  certStatLabel: { fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' },
  certStatDivider: { width: '1px', height: '36px', background: '#E5E7EB' },
  certSeal: { fontSize: '2.5rem', marginBottom: '1rem' },
  certFooter: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-end', marginTop: '0.5rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid #E5E7EB',
  },
  certDate: { fontSize: '11px', color: '#9CA3AF' },
  certSign: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '0.9rem', color: '#7C3AED',
  },
  bottomDeco: {
    fontSize: '1rem', color: '#7C3AED',
    letterSpacing: '8px', marginTop: '1rem',
  },
  btnRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' },
  printBtn: {
    padding: '12px',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    border: 'none', borderRadius: '12px',
    color: '#fff', fontSize: '14px', fontWeight: '700',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  },
  shareBtn: {
    padding: '12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    color: '#fff', fontSize: '14px', fontWeight: '700',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
  },
  tipBox: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px', padding: '0.85rem 1rem',
    fontSize: '12.5px', color: 'rgba(255,255,255,0.5)',
    lineHeight: '1.6',
  },
}