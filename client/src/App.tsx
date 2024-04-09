import './styles/main.css'
import { FC, createContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthenticationPage } from './pages/authentication-page/AuthenticationPage'
import { DashboardPage } from './pages/dashboard-page/DashboardPage'
import { ActivityPage } from './pages/activity-page/ActivityPage'
import { LoginFrame } from './pages/authentication-page/components/LoginFrame'
import { SignupFrame } from './pages/authentication-page/components/SignupFrame'
import { PrivateRoute } from './utils/PrivateRoute'

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
          <Route path='/' element={<Navigate to={"/authentication"} replace/>} />
          
          <Route path='/authentication' element={<AuthenticationPage />}>
            <Route index element={<Navigate to='login' replace />} />
            <Route path='login' element={<LoginFrame />} />
            <Route path='signup' element={<SignupFrame />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashboardPage/>} />
            <Route path='/activity'  element={<ActivityPage />}/>  
          </Route>

          <Route path='*' element={<div>Your page is not found</div>} />
          
        </Routes>
      </Router>    
    </ThemeContext.Provider>
        
    
  )
}

export default App
