import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    
    return (
        <button
            className='inline-flex items-center px-5 py-2.5 text-m font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
            onClick={logoutHandler}
        >
            <svg 
                className='w-4 h-4 mr-2' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
            >
                <path 
                    strokeLinecap='round' 
                    strokeLinejoin='round' 
                    strokeWidth={2} 
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' 
                />
            </svg>
            Logout
        </button>
    )
}

export default LogoutBtn