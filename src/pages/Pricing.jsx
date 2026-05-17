import { useNavigate } from 'react-router-dom'

const PLANS = [
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    desc: 'Perfect for 1 child',
    color: '#4F46E5',
    emoji: '🌱',
    features: [
      '1 child profile',
      'AI tutor powered by Groq',
      '6 regional curriculums',
      '12 passion-based learning tracks',
      'Mood-aware teaching',
      'XP rewards & badges',
      'Achievement certificates',
      'Weekly parent report',
      'Attention break system',
      'Grades 1–8 all subjects',
    ],
    checkoutUrl: 'https://brightminds4u.lemonsqueezy.com/checkout/buy/49985725-f908-498b-9793-204a71fbeb4b',
    popular: false,
  },
  {
    name: 'Family',
    price: '$39',
    period: '/month',
    desc: 'Up to 3 children',
    color: '#7C3AED',
    emoji: '👨‍👩‍👧',
    features: [
      'Up to 3 child profiles',
      'Everything in Starter',
      'Multi-child dashboard',
      'Individual progress per child',
      'Separate badge systems',
      'Parent peace of mind screen',
      'Mood timeline per child',
      'Struggle detection alerts',
      'Weakness repair queue',
      'Priority support',
    ],
    checkoutUrl: 'https://brightminds4u.lemonsqueezy.com/checkout/buy/7e0a88f8-67e2-4570-8d8c-4388fa6bf2d8',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$49',
    period: '/month',
    desc: 'Up to 5 children',
    color: '#DB2777',
    emoji: '🚀',
    features: [
      'Up to 5 child profiles',
      'Everything in Family',
      'Auto weakness repair system',
      'Detailed monthly reports',
      'Improvement rate tracking',
      'Printable certificates',
      'Early access to new features',
      'Team learning rooms (coming soon)',
      'Priority AI responses',
      'Cancel anytime',
    ],
    checkoutUrl: 'https://brightminds4u.lemonsqueezy.com/checkout/buy/e5ae2d95-9bde-43fa-9d57-f8049bbf23b5',
    popular: false,
  },
]

export default function Pricing() {
  const navigate = useNavigate()
  const user = localStorage.getItem('brightmind_user')

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>

        {/* Header */}
        <div style={styles.header}>
          {user && (
            <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>
              ← Dashboard
            </button>
          )}
        </div>

        {/* Hero */}
        <div style={styles.hero}>
          <div style={styles.heroLogo}>🦉</div>
          <h1 style={styles.heroTitle}>Start your child's learning journey</h1>
          <p style={styles.heroSub}>
            Personalised AI tutoring for K–8 students across the Caribbean, Africa, Asia and beyond.
            Cancel anytime. No hidden fees.
          </p>
          <div style={styles.heroBadges}>
            <span style={styles.heroBadge}>✅ No contracts</span>
            <span style={styles.heroBadge}>✅ Cancel anytime</span>
            <span style={styles.heroBadge}>✅ 6 regional curriculums</span>
            <span style={styles.heroBadge}>✅ Grades 1–8</span>
          </div>
        </div>

        {/* Plans */}
        <div style={styles.plansGrid}>
          {PLANS.map(plan => (
            <div
              key={plan.name}
              style={{
                ...styles.planCard,
                ...(plan.popular ? styles.planCardPopular : {}),
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={styles.popularBadge}>⭐ Most Popular</div>
              )}

              {/* Plan header */}
              <div style={styles.planEmoji}>{plan.emoji}</div>
              <div style={styles.planName}>{plan.name}</div>
              <div style={styles.planDesc}>{plan.desc}</div>
              <div style={styles.planPriceRow}>
                <span style={{ ...styles.planPrice, color: plan.color }}>{plan.price}</span>
                <span style={styles.planPeriod}>{plan.period}</span>
              </div>

              {/* Divider */}
              <div style={styles.planDivider} />

              {/* Features */}
              <div style={styles.featureList}>
                {plan.features.map((f, i) => (
                  <div key={i} style={styles.featureItem}>
                    <span style={{ ...styles.featureCheck, color: plan.color }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <a
                href={plan.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.ctaBtn,
                  background: plan.popular
                    ? `linear-gradient(135deg, #4F46E5, #7C3AED)`
                    : `linear-gradient(135deg, ${plan.color}99, ${plan.color})`,
                }}
              >
                Get Started — {plan.price}/mo
              </a>

              <div style={styles.cancelNote}>Cancel anytime · No contracts</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={styles.faqWrap}>
          <div style={styles.faqTitle}>Common Questions</div>
          <div style={styles.faqGrid}>
            {[
              { q: 'Which countries are supported?', a: 'Caribbean (CXC/CSEC), West Africa (WAEC/BECE), East Africa (KCSE/UNEB), Southeast Asia, South Asia (CBSE), and UK/Canada. More regions coming soon.' },
              { q: 'What grades does it cover?', a: 'Grades 1 through 8 across Mathematics, English, Science, Social Studies, and Creative Writing.' },
              { q: 'Can I cancel anytime?', a: 'Yes — no contracts, no questions asked. Cancel directly from your LemonSqueezy account.' },
              { q: 'How does the AI tutor work?', a: 'The AI adapts every lesson to your child\'s grade, region, mood, and favourite passion. Football fan? Maths is taught through football. Music lover? English through lyrics.' },
              { q: 'Is it safe for children?', a: 'Yes. All AI responses are filtered for age-appropriateness. The tutor stays strictly on educational topics.' },
              { q: 'Can I switch plans?', a: 'Yes — upgrade or downgrade anytime through your LemonSqueezy account.' },
            ].map((faq, i) => (
              <div key={i} style={styles.faqItem}>
                <div style={styles.faqQ}>{faq.q}</div>
                <div style={styles.faqA}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={styles.bottomCta}>
          <div style={styles.bottomCtaTitle}>Ready to transform how your child learns? 🚀</div>
          <div style={styles.bottomCtaSub}>Join families across the Caribbean, Africa and beyond</div>
          <a
            href={PLANS[1].checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.bottomCtaBtn}
          >
            Start with Family Plan — $39/mo
          </a>
          <div style={styles.bottomCtaNote}>
            Or{' '}
            <a
              href={PLANS[0].checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.bottomCtaLink}
            >
              start with Starter at $19/mo
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          🦉 BrightMind Tutor · Powered by Groq AI ·{' '}
          {!user && (
            <span onClick={() => navigate('/login')} style={styles.footerLink}>
              Already have an account? Log in
            </span>
          )}
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
  wrap: { maxWidth: '900px', margin: '0 auto', padding: '1.5rem 1rem 3rem' },
  header: { marginBottom: '1rem' },
  backBtn: {
    padding: '6px 14px', background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
    color: '#fff', fontSize: '12px', cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif",
  },
  hero: { textAlign: 'center', padding: '2rem 0 2.5rem' },
  heroLogo: { fontSize: '3rem', marginBottom: '0.75rem' },
  heroTitle: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '2.25rem', color: '#fff',
    margin: '0 0 0.75rem', lineHeight: '1.1',
  },
  heroSub: {
    fontSize: '1rem', color: 'rgba(255,255,255,0.6)',
    maxWidth: '520px', margin: '0 auto 1.25rem',
    lineHeight: '1.6',
  },
  heroBadges: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' },
  heroBadge: {
    fontSize: '12px', fontWeight: '700',
    padding: '5px 12px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '999px', color: 'rgba(255,255,255,0.7)',
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1rem', marginBottom: '3rem',
  },
  planCard: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px', padding: '1.75rem 1.5rem',
    display: 'flex', flexDirection: 'column',
    position: 'relative',
  },
  planCardPopular: {
    border: '2px solid #7C3AED',
    background: 'rgba(124,58,237,0.12)',
  },
  popularBadge: {
    position: 'absolute', top: '-14px', left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    color: '#fff', fontSize: '11px', fontWeight: '800',
    padding: '4px 14px', borderRadius: '999px', whiteSpace: 'nowrap',
  },
  planEmoji: { fontSize: '2rem', marginBottom: '0.5rem' },
  planName: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.4rem', marginBottom: '2px',
  },
  planDesc: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' },
  planPriceRow: { display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1rem' },
  planPrice: { fontFamily: "'Fredoka One', cursive", fontSize: '2.5rem', lineHeight: 1 },
  planPeriod: { fontSize: '13px', color: 'rgba(255,255,255,0.4)' },
  planDivider: { height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '1rem' },
  featureList: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem', flex: 1 },
  featureItem: { display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.4' },
  featureCheck: { fontWeight: '800', flexShrink: 0, marginTop: '1px' },
  ctaBtn: {
    display: 'block', textAlign: 'center',
    padding: '13px', borderRadius: '12px',
    color: '#fff', fontSize: '14px', fontWeight: '800',
    textDecoration: 'none', marginBottom: '8px',
    fontFamily: "'Nunito', sans-serif",
  },
  cancelNote: { fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' },
  faqWrap: { marginBottom: '3rem' },
  faqTitle: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.5rem', textAlign: 'center',
    marginBottom: '1.5rem',
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '0.75rem',
  },
  faqItem: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px', padding: '1rem 1.25rem',
  },
  faqQ: { fontWeight: '800', fontSize: '13px', marginBottom: '6px', color: '#fff' },
  faqA: { fontSize: '12.5px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' },
  bottomCta: {
    textAlign: 'center',
    background: 'rgba(124,58,237,0.15)',
    border: '1px solid rgba(167,139,250,0.2)',
    borderRadius: '24px', padding: '2.5rem 1.5rem',
    marginBottom: '2rem',
  },
  bottomCtaTitle: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '1.6rem', marginBottom: '0.5rem',
  },
  bottomCtaSub: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' },
  bottomCtaBtn: {
    display: 'inline-block',
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    color: '#fff', fontSize: '15px', fontWeight: '800',
    borderRadius: '14px', textDecoration: 'none',
    fontFamily: "'Nunito', sans-serif", marginBottom: '0.75rem',
  },
  bottomCtaNote: { fontSize: '13px', color: 'rgba(255,255,255,0.4)' },
  bottomCtaLink: { color: '#a78bfa', textDecoration: 'underline' },
  footer: {
    textAlign: 'center', fontSize: '12px',
    color: 'rgba(255,255,255,0.25)', paddingTop: '1rem',
  },
  footerLink: { color: '#a78bfa', cursor: 'pointer', textDecoration: 'underline' },
}