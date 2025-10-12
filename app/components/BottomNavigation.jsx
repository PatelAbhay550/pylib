import React from 'react'
import Link from 'next/link'
import { 
  FaHome, 
  FaBook, 
  FaRocket, 
  FaTrophy, 
  FaCode
} from 'react-icons/fa'

const BottomNavigation = ({ activeTab = 'home' }) => {
  const navItems = [
    { id: 'home', icon: FaHome, label: 'Home', href: '/home' },
    { id: 'examples', icon: FaBook, label: 'Examples', href: '/examples' },
    { id: 'challenges', icon: FaRocket, label: 'Challenges', href: '/challenges' },
    { id: 'achievements', icon: FaTrophy, label: 'Achievements', href: '#' },
    
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <Link key={item.id} href={item.href} className="flex flex-col items-center">
              <Icon className={`text-xl mb-1 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-xs ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>
              )}
            </Link>
          )
        })}
      </div>
      
      {/* Home Indicator */}
      <div className="flex justify-center py-2">
        <div className="w-32 h-1 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  )
}

export default BottomNavigation

