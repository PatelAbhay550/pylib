import React from 'react'
import { 
  FaUser,
  FaBrain,
  FaLightbulb,
  FaPlay
} from 'react-icons/fa'
import { BiWifi, BiBattery } from 'react-icons/bi'
import { MdSignal } from 'react-icons/md'
import BottomNavigation from '../components/BottomNavigation'

const page = () => {
  const newChallenges = [
    {
      id: 1,
      title: "User Input to Create a List",
      points: 30,
      icon: FaBrain,
      difficulty: "beginner",
      isPremium: true
    },
    {
      id: 2,
      title: "List Item Multiplication",
      points: 30,
      icon: FaBrain,
      difficulty: "beginner", 
      isPremium: true
    },
    {
      id: 3,
      title: "Set Up",
      points: 20,
      icon: FaBrain,
      difficulty: "beginner",
      isPremium: true
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
      <div className="bg-white rounded-2xl p-4 shadow-sm">
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
              <span className="text-orange-600 font-bold">00</span>
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <FaUser className="text-orange-600 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Challenge */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-4 translate-x-4"></div>
          
          <div className="relative z-10">
            <p className="text-purple-100 text-sm mb-2">Start first challenge:</p>
            <h2 className="text-2xl font-bold mb-6 leading-tight">
              User Input to Create a List
            </h2>
            <button className="bg-white/20 backdrop-blur text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2">
              <FaPlay className="text-sm" />
              Start
            </button>
          </div>
        </div>
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