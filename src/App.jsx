import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className='relative z-10 flex-1 bg-gradient-to-b from-transparent to-slate-900/50'>
        <div className='min-h-full'>
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  ) : (
    // Loading Screen
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <div className="relative">
        {/* Loading Spinner */}
        <div className="w-16 h-16 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin"></div>
        
        {/* Loading Text */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-slate-200 mb-2">Mega Blog</h2>
          <p className="text-sm text-slate-400">Loading your content...</p>
        </div>
        
        {/* Pulsing Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default App