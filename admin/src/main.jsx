import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { MemberProvider } from './context/MemberContext.jsx'
import { AnnualReportProvider } from './context/AnnualReportContext.jsx'
import { NoticeBoardProvider } from './context/NoticeContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NoticeBoardProvider>
    <AnnualReportProvider>
    <MemberProvider>
    <App />
    </MemberProvider>
    </AnnualReportProvider>
    </NoticeBoardProvider>
    </BrowserRouter>
  </StrictMode>,
)
