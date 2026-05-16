import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Setup from './pages/Setup'
import Lesson from './pages/Lesson'
import Report from './pages/Report'
import { useState } from 'react'

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
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App