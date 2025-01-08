import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './pages/App.tsx'
import Login from './pages/Login.tsx'
import Signup from "./pages/Signup.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>]
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main" element={<App />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
)