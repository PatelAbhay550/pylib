'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { FaGoogle, FaEnvelope, FaCode, FaPython } from 'react-icons/fa'
import { BiWifi, BiBattery } from 'react-icons/bi'
import { MdSignal } from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import BottomNavigation from '../components/BottomNavigation'

const page = () => {
  const { signInWithGoogle, user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user, router])

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/operation-not-allowed':
        return 'Google sign-in is not enabled. Please contact support.'
      case 'auth/popup-closed-by-user':
        return 'Sign-in was cancelled. Please try again.'
      case 'auth/popup-blocked':
        return 'Pop-up was blocked. Please allow pop-ups and try again.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.'
      default:
        return 'Sign in failed. Please try again.'
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      await signInWithGoogle()
      // User will be redirected in useEffect
    } catch (error) {
      console.error('Sign in failed:', error)
      setError(getErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        {/* Illustration Section */}
        <section className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <FaPython className="text-6xl text-white" />
              </div>
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
              Welcome to PyLib<br />Master Python Programming
            </h1>
            
            <p className="text-gray-600 text-sm mb-8">
              Join thousands of developers learning Python<br />
              with interactive examples and challenges.
            </p>
          </div>
        </section>

        {/* Sign In Section */}
        <section className="px-6 pb-32">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white border border-gray-200 rounded-xl py-4 px-6 flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
            >
              <FaGoogle className="text-xl text-red-500" />
              <span className="font-semibold text-gray-800">
                {loading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>
            
            <button 
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="w-full bg-gray-100 rounded-xl py-4 px-6 flex items-center justify-center gap-3"
            >
              <FaEnvelope className="text-xl text-gray-600" />
              <span className="font-semibold text-gray-600">Use Email Instead</span>
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              By using PyLib, you agree with our{' '}
              <a href="#" className="text-blue-600 underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>
            </p>
          </div>
        </section>
      </div>

     
    </div>
  )
}

export default page