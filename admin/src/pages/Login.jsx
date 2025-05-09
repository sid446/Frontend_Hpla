import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        
        try {
            const userData = { email: email, password: password }
            const response = await axios.post(`https://hpla.in/api/user/login`, userData)
            
            
            if (response.status === 200) {
                const data = response.data
                localStorage.setItem('token', data.token)
                navigate('/')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setIsLoading(false)
            setEmail('')
            setPassword('')
        }
    }
    
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center bg-gray-50">
                <div className="max-w-md w-full mx-auto p-6">
                    
                    
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Sign in to your account
                            </h2>
                            
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                                            Password
                                        </label>
                                        <a href="#" className="text-sm text-black hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </span>
                                    ) : (
                                        'Sign in'
                                    )}
                                </button>
                            </form>
                        </div>
                        
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <p className="text-sm text-center text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-black font-medium hover:underline">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <p className="text-xs text-center text-gray-500">
                            By signing in, you agree to our{' '}
                            <a href="#" className="text-black hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-black hover:underline">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin