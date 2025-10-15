"use client"
import React from 'react'
import Link from 'next/link'
import { 
  FaUser,
  FaBrain,
  FaLightbulb,
  FaPlay
} from 'react-icons/fa'
import BottomNavigation from '../components/BottomNavigation'
import { useAuth } from '../../contexts/AuthContext'

const page = () => {
  const { user } = useAuth()
  const newChallenges = [
    {
      id: 1,
      title: "Print a Sentence",
      points: 10,
      icon: FaLightbulb,
      difficulty: "beginner",
      isPremium: true,
      slug: "print-sentence"
    },
    {
      id: 2,
      title: "Take User Input and Print",
      points: 15,
      icon: FaUser,
      difficulty: "beginner",
      isPremium: true,
      slug: "take-user-input"
    },
    {
      id: 3,
      title: "Meter to Centimeter",
      points: 20,
      icon: FaBrain,
      difficulty: "beginner",
      isPremium: true,
      slug: "meter-to-centimeter"
    },
    {
      id: 4,
      title: "Profit Loss Calculator",
      points: 25,
      icon: FaBrain,
      difficulty: "beginner",
      isPremium: true,
      slug: "profit-loss-calculator"
    },
    {
      id: 5,
      title: "User Input to Create a List",
      points: 30,
      icon: FaBrain,
      difficulty: "beginner",
      isPremium: true,
      slug: "user-input-list"
    },
    {
      id: 6,
      title: "List Item Multiplication",
      points: 30,
      icon: FaBrain,
      difficulty: "beginner", 
      isPremium: true,
      slug: "list-multiplication"
    }
  ]

  const introductionChallenges = [
    {
      id: 4,
      title: "Print a",
      points: 15,
      icon: FaLightbulb,
      difficulty: "intro",
      isPremium: true
    },
    {
      id: 5,
      title: "Take User",
      points: 15,
      icon: FaLightbulb,
      difficulty: "intro",
      isPremium: true
    },
    {
      id: 6,
      title: "Conve",
      points: 15,
      icon: FaLightbulb,
      difficulty: "intro",
      isPremium: true
    }
  ]

  const ChallengeCard = ({ challenge, bgColor = "bg-purple-100" }) => {
    const Icon = challenge.icon
    
    return (
      <Link href={challenge.slug ? `/challenges/${challenge.slug}` : '#'}>
        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className={`${bgColor} rounded-xl p-6 mb-4 relative`}>
            {challenge.isPremium && (
              <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Free
              </div>
            )}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Icon className="text-2xl text-white" />
              </div>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-800 text-sm mb-3 leading-tight">
            {challenge.title}
          </h3>
          
          <div className="flex justify-between items-center">
            <div className="bg-orange-100 px-3 py-1 rounded-full">
              <span className="text-orange-600 font-semibold text-sm">+{challenge.points}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-2 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-800">CHALLENGES</h1>
          <div className="flex items-center gap-3">
           
            <div className="bg-orange-100 px-3 py-2 rounded-full flex items-center gap-2">
              <span className="text-orange-600 font-bold">{user?.progress?.totalPoints || 0}</span>
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <FaUser className="text-orange-600 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Challenge */}
      <div className="px-6 py-6">
        <Link href="/challenges/print-sentence">
          <div className="bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl p-6 text-white relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-4 translate-x-4"></div>
            
            <div className="relative z-10">
              <p className="text-purple-100 text-sm mb-2">Start first challenge:</p>
              <h2 className="text-2xl font-bold mb-6 leading-tight">
                Print a Sentence
              </h2>
              <div className="bg-white/20 backdrop-blur text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2 w-fit">
                <FaPlay className="text-sm" />
                Start
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* New Challenges */}
      <div className="px-6 pb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">New Challenges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {newChallenges.map((challenge, index) => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge}
              bgColor={index === 0 ? "bg-purple-400" : index === 1 ? "bg-purple-300" : "bg-yellow-200"}
            />
          ))}
        </div>
      </div>

      {/* Introduction Challenges */}
      <div className="px-6 pb-32">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Introduction Challenges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {introductionChallenges.map((challenge) => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge}
              bgColor="bg-blue-300"
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="challenges" />
    </div>
  )
}

export default page

