

import React from 'react'
import Link from 'next/link'
import { 
  FaPython, 
  FaCode, 
  FaRocket, 
  FaTrophy, 
  FaBook,
  FaPlay,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa'


const Home = () => {
  const features = [
    {
      icon: FaCode,
      title: "Interactive Examples",
      description: "Learn Python with hands-on coding examples that run directly in your browser"
    },
    {
      icon: FaRocket,
      title: "Coding Challenges",
      description: "Test your skills with progressively challenging programming exercises"
    },
    {
      icon: FaTrophy,
      title: "Track Progress",
      description: "Monitor your learning journey with achievements and progress tracking"
    },
    {
      icon: FaBook,
      title: "Comprehensive Library",
      description: "Access a vast collection of Python examples from basic to advanced topics"
    }
  ]

  const stats = [
    { number: "100+", label: "Python Examples" },
    { number: "50+", label: "Coding Challenges" },
    { number: "10k+", label: "Students Learning" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
     

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FaPython className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">PyLib</h1>
            </div>
            <div className="flex items-center gap-4">
              
              <Link href="/sign-in" className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <FaPython className="text-6xl text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Master Python with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Interactive Learning</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            PyLib is your comprehensive platform for learning Python programming. 
            Practice with real code examples, tackle challenging problems, and build your coding skills step by step.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/sign-in">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:shadow-xl transition-all transform hover:scale-105">
                <FaPlay className="text-lg" />
                Start Learning Now
              </button>
            </Link>
            <Link href="/examples">
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:border-blue-600 hover:text-blue-600 transition-colors">
                <FaCode className="text-lg" />
                Browse Examples
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PyLib?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make Python learning engaging, practical, and effective for developers at all levels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Python Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are mastering Python with PyLib's interactive learning platform.
          </p>
          <Link href="/sign-in">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-3 mx-auto">
              Get Started Free
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaPython className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold">PyLib</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Master Python programming with interactive examples, challenging exercises, and comprehensive learning resources.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaGithub className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/examples" className="hover:text-white transition-colors">Python Examples</Link></li>
                <li><Link href="/challenges" className="hover:text-white transition-colors">Coding Challenges</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PyLib. All rights reserved. Deployed on Vercel.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home