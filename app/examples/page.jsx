"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { 
  FaUser,
  FaSearch
} from 'react-icons/fa'
import { BiWifi, BiBattery } from 'react-icons/bi'
import { MdSignal } from 'react-icons/md'
import BottomNavigation from '../components/BottomNavigation'

const page = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Introduction')

  const tabs = [
    'All Topics',
    'Introduction', 
    'Decision Making & Loop'
  ]

  const examples = [
    { id: 1, title: "Hello World", category: "Introduction", slug: "hello-world" },
    { id: 2, title: "Add Two Numbers", category: "Introduction", slug: "add-two-numbers" },
    { id: 3, title: "Square Root", category: "Introduction", slug: "square-root" },
    { id: 4, title: "Area of Triangle", category: "Introduction", slug: "area-of-triangle" },
    { id: 5, title: "Swap Two Variables", category: "Introduction", slug: "swap-two-variables" },
    { id: 6, title: "Find Roots of a Quadratic Equation", category: "Introduction", slug: "quadratic-equation" },
    { id: 7, title: "Convert Kilometers to Miles", category: "Introduction", slug: "kilometers-to-miles" },
    { id: 8, title: "Convert Celsius to Fahrenheit", category: "Introduction", slug: "celsius-to-fahrenheit" }
  ]

  const filteredExamples = examples.filter(example => {
    const matchesSearch = example.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'All Topics' || example.category === activeTab
    return matchesSearch && matchesTab
  })

  const ExampleItem = ({ example, index }) => {
    return (
      <Link href={`/examples/${example.slug}`}>
        <div className="flex items-center gap-4 py-4 px-6 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-lg">{example.title}</h3>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Header */}
      <div className="bg-white px-6 py-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">EXAMPLES</h1>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <FaUser className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for examples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
        </div>
      </div>

      {/* Topic Tabs */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Examples List */}
      <div className="pb-32">
        {filteredExamples.length > 0 ? (
          <div className="bg-white">
            {filteredExamples.map((example, index) => (
              <ExampleItem key={example.id} example={example} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No examples found</h3>
            <p className="text-gray-500 text-center">
              Try adjusting your search terms or select a different topic.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="examples" />
    </div>
  )
}

export default page