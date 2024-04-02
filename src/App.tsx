import './styles/main.css'
import { FC, createContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthenticationPage } from './pages/authentication-page/AuthenticationPage'
import { DashboardPage } from './pages/dashboard-page/DashboardPage'
import { ActivityPage } from './pages/activity-page/ActivityPage'

interface ThemeContextType {
  themeValue: string;
  toggleTheme: () => void;
}


export const ThemeContext = createContext<ThemeContextType | null>(null);

const App: FC = () => {
  const [themeValue, setTheme] = useState<string>("light-theme");
  
  function toggleTheme() {
    setTheme(prevTheme => (prevTheme === 'dark-theme' ? 'light-theme' : 'dark-theme'))
  }

  return (
    <ThemeContext.Provider value={{themeValue, toggleTheme}}>
      <Router>
        <Routes>
          <Route path='/authentication' element={<AuthenticationPage />}/>
          <Route path='/dashboard'      element={<DashboardPage />}/>
          <Route path='/activity'       element={<ActivityPage />}/>
          <Route path='*'               element={<AuthenticationPage />}/>
          <Route path='*' element={<div>Your page isnot fount</div>} />
        </Routes>
      </Router>    
    </ThemeContext.Provider>
        
    
  )
}

export default App
