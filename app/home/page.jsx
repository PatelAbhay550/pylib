'use client'

import React from 'react'
import { 
  FaUser,
  FaChevronDown,
  FaCheckCircle,
  FaBook,
  FaSignOutAlt
} from 'react-icons/fa'
import { BiWifi, BiBattery } from 'react-icons/bi'
import { MdSignal } from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'
import BottomNavigation from '../components/BottomNavigation'

const page = () => {
  const { user, logout } = useAuth()
  
  const lessons = [
    { id: 1, title: "GETTING STARTED", completed: false },
    { id: 2, title: "VARIABLES AND LITERALS", completed: false },
    { id: 3, title: "INPUT AND OUTPUT", completed: false },
    { id: 4, title: "TYPE CONVERSION", completed: false },
    { id: 5, title: "OPERATORS", completed: false },
    { id: 6, title: "TAKE QUIZ", completed: false }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pb-16">
        
        

        {/* Header */}
        <div className="bg-white px-6 pt-6 pb-2 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-lg font-bold text-gray-800 mb-2">PYTHON BASICS COURSE</h1>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-lg font-semibold">
                  {user?.progress?.completedLessons?.length || 0}% Completed
                </span>
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-cyan-400 rounded-full" 
                    style={{ width: `${(user?.progress?.completedLessons?.length || 0) * 16.6}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              
              <div className="relative">
                <button 
                  onClick={logout}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  title={`Welcome, ${user?.firstName || user?.displayName || 'User'}!`}
                >
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <img src="lh3.googleusercontent.com/a/ACg8ocLtp-7sUrnxDXVvR490czZLWj-sChOueXSWM14IUFqa2krplAY=s96-c" alt="Profile" className="w-8 h-8 rounded-full" />
                  )}
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Chapter Header */}
      <div className="px-6  pb-4 bg-white border-b">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Chapter 1:</p>
            <h2 className="text-xl font-semibold text-gray-800">Introduction</h2>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600">
            <span>Chapters</span>
            <FaChevronDown />
          </button>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="px-6 py-6">
        <div className="bg-orange-50 rounded-2xl p-6 space-y-6">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="flex items-center gap-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                  {lesson.completed ? (
                    <FaCheckCircle className="text-green-500 text-lg" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  )}
                </div>
                {index < lessons.length - 1 && (
                  <div className="absolute top-8 left-4 w-0.5 h-12 bg-gray-300 transform -translate-x-0.5"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-2">{lesson.title}</h3>
                {lesson.id === 1 && (
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
                    Start Lesson
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Section */}
      <div className="px-6 py-6 pb-16">
        <div className="bg-pink-50 rounded-2xl p-6 text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <FaBook className="text-4xl text-orange-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Upgrade to PyLib Pro</h3>
          <p className="text-gray-600 text-sm">Unlock advanced challenges & get certified</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </div>
    </ProtectedRoute>
  )
}

export default page