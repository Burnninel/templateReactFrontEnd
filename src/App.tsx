import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TemplateCreateAccount } from './components/templateCreateAccount'
import { TemplateLogin } from './components/templateLogin'

import './styles/global.css'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplateLogin />}/>
        <Route path="/createAccount" element={<TemplateCreateAccount />}/>
      </Routes>
    </Router>
  )
}