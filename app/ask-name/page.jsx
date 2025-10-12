'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaUser, FaCheck } from 'react-icons/fa'
import { BiWifi, BiBattery } from 'react-icons/bi'
import { MdSignal } from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import BottomNavigation from '../components/BottomNavigation'

const page = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, updateUserProfile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
    } else if (user.firstName && user.lastName) {
      // User already has profile info, redirect to home
      router.push('/home')
    }
  }, [user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!firstName || !lastName) return

    setLoading(true)
    try {
      await updateUserProfile({
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        profileCompleted: true
      })
      router.push('/home')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaArrowLeft className="text-gray-600" />
            </button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-800">Setup Profile</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <section className="flex-1 px-6 py-8">
          <div className="max-w-md mx-auto">
            {/* Profile Icon */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <FaUser className="text-3xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to PyLib!
              </h2>
              <p className="text-gray-600 text-sm">
                Let's personalize your Python learning experience
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input 
                  type="text" 
                  id="first-name" 
                  name="first-name" 
                  placeholder="Enter your first name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input 
                  type="text" 
                  id="last-name" 
                  name="last-name" 
                  placeholder="Enter your last name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required 
                />
              </div>

              <button 
                type="submit"
                onClick={handleSubmit}
                disabled={!firstName || !lastName || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
              >
                <FaCheck className="text-sm" />
                {loading ? 'Saving...' : 'Continue to Dashboard'}
              </button>
            </form>

            {/* Info Note */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800 text-center">
                <span className="font-semibold">📋 Note:</span> Your name will be used to create certificates and for the leaderboard.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
  )
}

export default page

