import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Setup from './pages/Setup'
import Lesson from './pages/Lesson'
import Report from './pages/Report'
import Badges from './pages/Badges'
import Certificate from './pages/Certificate'

function App() {
  const [user, setUser] = useState(localStorage.getItem('brightmind_user'))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/setup" element={user ? <Setup /> : <Navigate to="/login" />} />
        <Route path="/lesson" element={user ? <Lesson /> : <Navigate to="/login" />} />
        <Route path="/report" element={user ? <Report /> : <Navigate to="/login" />} />
        <Route path="/badges" element={user ? <Badges /> : <Navigate to="/login" />} />
        <Route path="/certificate" element={user ? <Certificate /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App