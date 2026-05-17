import { useNavigate } from 'react-router-dom'

export default function Setup() {
  const navigate = useNavigate()
  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg, #0f0a1e 0%, #1a0a3e 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Nunito', sans-serif",color:'#fff',textAlign:'center',padding:'2rem'}}>
      <div>
        <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🦉</div>
        <h2 style={{fontFamily:"'Fredoka One', cursive",fontSize:'1.75rem',marginBottom:'0.5rem'}}>Adding children is coming very soon!</h2>
        <p style={{fontSize:'14px',color:'rgba(255,255,255,0.5)',marginBottom:'1.5rem'}}>For now, start a lesson directly from the dashboard.</p>
        <button onClick={() => navigate('/dashboard')} style={{padding:'12px 24px',background:'linear-gradient(135deg, #4F46E5, #7C3AED)',border:'none',borderRadius:'12px',color:'#fff',fontSize:'14px',fontWeight:'700',cursor:'pointer',fontFamily:"'Nunito', sans-serif"}}>← Back to Dashboard</button>
      </div>
    </div>
  )
}