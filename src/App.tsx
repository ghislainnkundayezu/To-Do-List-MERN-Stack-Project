import './styles/main.css'
import { FC, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthenticationPage } from './pages/authentication-page/AuthenticationPage'
import { DashboardPage } from './pages/dashboard-page/DashboardPage'



const App: FC = () => {
  
  return (
    <Router>
      <Routes>
        <Route path='/authentication' element={<AuthenticationPage />}/>
        <Route path='/dashboard'      element={<DashboardPage />}/>
        <Route path='/activity'       element={<AuthenticationPage />}/>
        <Route path='*'               element={<AuthenticationPage />}/>
        
        <Route path='*' element={<div>Your page isnot fount</div>} />
      </Routes>
    </Router>
    
  )
}

export default App
