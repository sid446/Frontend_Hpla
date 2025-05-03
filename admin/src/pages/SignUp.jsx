import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserSignup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [otp, setOtp] = useState('')
    const [showOtpField, setShowOtpField] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [otpError, setOtpError] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const handleInitialSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }
        
        try {
            // Send initial registration data to get OTP
            const userData = { 
                name: formData.name,
                email: formData.email, 
                password: formData.password 
            }
            
            const response = await axios.post(`http://localhost:5000/user/register`, userData)
            
            if (response.status === 200) {
                setOtpSent(true)
                setShowOtpField(true)
                setError('')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleOtpSubmit = async (e) => {
        e.preventDefault()
        setOtpError('')
        setIsLoading(true)
        
        try {
            // Send OTP verification
            const verificationData = { 
                email: formData.email,
                otp: otp 
            }
            
            const response = await axios.post(`http://localhost:5000/user/verify-otp`, verificationData)
            
            if (response.status === 200) {
                const data = response.data
                localStorage.setItem('token', data.token)
                navigate('/')
            }
        } catch (err) {
            setOtpError(err.response?.data?.message || 'OTP verification failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center bg-gray-50">
                <div className="max-w-md w-full mx-auto p-6">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Create a new account
                            </h2>
                            
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                                    {error}
                                </div>
                            )}
                            
                            {otpSent && !otpError && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
                                    OTP sent to your email address. Please verify to complete registration.
                                </div>
                            )}
                            
                            {otpError && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                                    {otpError}
                                </div>
                            )}
                            
                            {!showOtpField ? (
                                <form onSubmit={handleInitialSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Create a password"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-6">
                                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Confirm your password"
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
                                                Processing...
                                            </span>
                                        ) : (
                                            'Continue'
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleOtpSubmit}>
                                    <div className="mb-6">
                                        <label htmlFor="otp" className="block text-gray-700 text-sm font-medium mb-2">
                                            Enter OTP
                                        </label>
                                        <input
                                            id="otp"
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Enter the OTP sent to your email"
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
                                                Verifying...
                                            </span>
                                        ) : (
                                            'Verify OTP'
                                        )}
                                    </button>
                                    
                                    <div className="mt-4 text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleInitialSubmit}
                                            className="text-sm text-black hover:underline"
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                        
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <p className="text-sm text-center text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-black font-medium hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <p className="text-xs text-center text-gray-500">
                            By signing up, you agree to our{' '}
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

export default UserSignup