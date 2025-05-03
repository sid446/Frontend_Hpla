import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { MemberProvider } from './context/MemberContext.jsx'
import { AnnualReportProvider } from './context/AnnualReportContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AnnualReportProvider>
    <MemberProvider>
    <App />
    </MemberProvider>
    </AnnualReportProvider>
    </BrowserRouter>
  </StrictMode>,
)
