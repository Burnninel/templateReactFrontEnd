import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TemplateLogin } from './components/templateLogin'
import { TemplateCreateAccount } from './components/templateCreateAccount'
import { TemplateAccount } from './components/account';

import './styles/global.css'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplateLogin />}/>
        <Route path="/createAccount" element={<TemplateCreateAccount />}/>
        <Route path="/account" element={<TemplateAccount />}/>
      </Routes>
    </Router>
  )
}