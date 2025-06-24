import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='sticky top-0 z-50 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 backdrop-blur-md border-b border-slate-700 shadow-lg'>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]"></div>
      
      <Container>
        <nav className='relative z-10 flex items-center justify-between py-4'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <Link 
              to='/' 
              className='flex items-center space-x-2 hover:scale-105 transition-transform duration-200'
            >
              <Logo width='70px' />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className='hidden md:flex items-center space-x-2'>
            {navItems.map((item) => 
              item.active ? (
                <Link
                  key={item.name}
                  to={item.slug}
                  className='px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-full border border-transparent hover:border-cyan-400/30 transition-all duration-300 ease-in-out transform hover:scale-105'
                >
                  {item.name}
                </Link>
              ) : null
            )}
            {authStatus && (
              <div className='ml-3 pl-3 border-l border-slate-600'>
                <LogoutBtn />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button className='p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 border border-transparent hover:border-cyan-400/30'>
              <svg className='w-6 h-6 text-slate-300 hover:text-cyan-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header