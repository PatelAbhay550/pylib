'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  FaArrowLeft, 
  FaShare, 
  FaStar,
  FaPlay,
  FaCode,
  FaFileAlt,
  FaLightbulb
} from 'react-icons/fa'
import { BiWifi, BiBattery } from 'react-icons/bi'
import { MdSignal } from 'react-icons/md'
import { usePython } from 'react-py'

const ExampleDetail = () => {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const [pythonOutput, setPythonOutput] = useState('')
  const [pythonError, setPythonError] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  
  // Try to use react-py, but provide fallback
  let runPython, stdout, stderr, isLoading, isReady
  try {
    const pythonHook = usePython()
    runPython = pythonHook.runPython
    stdout = pythonHook.stdout
    stderr = pythonHook.stderr
    isLoading = pythonHook.isLoading
    isReady = pythonHook.isReady
  } catch (error) {
    console.warn('React-py not available, using fallback')
    isReady = true
    isLoading = false
  }

  // Example data - in a real app, this would come from an API or database
  const examples = {
    'hello-world': {
      title: 'Hello World',
      code: `print("Hello, World!")`,
      explanation: `A 'Hello, World!' program is a simple program that displays Hello, World! on the screen. Since it's a very simple program, it is often used to introduce programming language to beginners.

The Hello World program is traditionally the first program that beginners write when learning a new programming language. It serves as a basic syntax check and helps you understand:

• How to write a simple program
• How to use the print() function
• How to run Python code
• Basic Python syntax rules

This program demonstrates the fundamental concept of output in programming - displaying information to the user.`,
      summary: `The Hello World program is the most basic program in any programming language. In Python, it consists of a single line of code that uses the print() function to display text.

**Key Learning Points:**
• **print() function**: The built-in function used to display output
• **String literals**: Text enclosed in quotes ("Hello, World!")
• **Function calls**: How to execute a function with parentheses
• **Basic syntax**: Python's simple and readable syntax

**Why Start with Hello World?**
1. **Simplicity**: Requires minimal syntax knowledge
2. **Immediate feedback**: You see results instantly
3. **Confidence building**: Success with first program motivates learning
4. **Environment testing**: Verifies your Python setup works correctly

**Real-world applications:**
While simple, the print() function is used extensively in:
• Debugging and testing code
• Displaying program output
• Creating user interfaces in console applications
• Logging and monitoring systems

This foundation prepares you for more complex programs that combine multiple concepts and functions.`
    },
    'add-two-numbers': {
      title: 'Add Two Numbers',
      code: `# Program to add two numbers
num1 = 10
num2 = 20
sum = num1 + num2
print(f"The sum of {num1} and {num2} is {sum}")`,
      explanation: `This program demonstrates basic arithmetic operations in Python. It shows how to declare variables, perform addition, and display the result using formatted strings.

The program covers several fundamental concepts:

• **Variable assignment**: Storing values in memory locations
• **Arithmetic operations**: Using the + operator for addition
• **f-strings**: Modern Python string formatting technique
• **Data types**: Working with integers (whole numbers)

Variables in Python are like containers that hold data. You can name them anything (following naming rules) and assign values using the = operator.`,
      summary: `This program introduces fundamental programming concepts through a simple addition operation.

**Core Concepts Covered:**
• **Variables**: Named storage locations for data
• **Assignment operator (=)**: Stores values in variables
• **Arithmetic operators (+)**: Performs mathematical calculations
• **F-string formatting**: Modern way to include variables in strings

**Variable Naming Rules:**
1. Must start with letter or underscore
2. Can contain letters, numbers, and underscores
3. Case-sensitive (num1 and Num1 are different)
4. Cannot use Python keywords (like 'print', 'if', etc.)

**Why This Example Matters:**
• **Foundation for calculations**: Essential for any mathematical programming
• **Data manipulation**: Shows how to work with and transform data
• **User interaction**: Demonstrates displaying results to users
• **Problem-solving approach**: Break complex problems into simple steps

**Extensions You Can Try:**
• Get input from user instead of hard-coded values
• Add error handling for invalid inputs
• Perform multiple operations (subtract, multiply, divide)
• Create a simple calculator function`
    }
  }

  const currentExample = examples[params.id] || examples['hello-world']
  
  const runCode = async () => {
    if (runPython && isReady) {
      try {
        setIsRunning(true)
        await runPython(currentExample.code)
      } catch (error) {
        setPythonError(error.message)
      } finally {
        setIsRunning(false)
      }
    } else {
      // Fallback simulation for when react-py is not available
      setIsRunning(true)
      setPythonOutput('')
      setPythonError('')
      
      setTimeout(() => {
        // Simulate code execution with expected output
        if (params.id === 'hello-world') {
          setPythonOutput('Hello, World!')
        } else if (params.id === 'add-two-numbers') {
          setPythonOutput('The sum of 10 and 20 is 30')
        } else {
          setPythonOutput('Code executed successfully!')
        }
        setIsRunning(false)
      }, 1000)
    }
  }

  const tabs = [
    { id: 0, label: 'Explanation', icon: FaLightbulb },
    { id: 1, label: 'Code', icon: FaCode },
    { id: 2, label: 'Summary', icon: FaFileAlt }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">{currentExample.title} Program</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaShare className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaStar className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="text-sm" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {/* Explanation Tab */}
        {activeTab === 0 && (
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About This Program</h2>
              <div className="prose prose-gray max-w-none">
                {currentExample.explanation.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                    {paragraph.split('\n').map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < paragraph.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Code Tab */}
        {activeTab === 1 && (
          <div className="p-6 space-y-6">
            {/* Code Display */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-800">Python Code</h3>
              </div>
              <div className="p-4">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{currentExample.code}</code>
                </pre>
              </div>
            </div>

            {/* Run Code Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-800">Try It Yourself</h3>
              </div>
              <div className="p-4">
                <button
                  onClick={runCode}
                  
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlay className="text-sm" />
                  {(isLoading || isRunning) ? 'Running...' : 'Run Code'}
                </button>
                
                {/* Output */}
                {((stdout || stderr) || (pythonOutput || pythonError)) && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Output:</h4>
                    <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm">
                      {/* React-py output */}
                      {stdout && <div className="text-green-400">{stdout}</div>}
                      {stderr && <div className="text-red-400">{stderr}</div>}
                      
                      {/* Fallback output */}
                      {pythonOutput && <div className="text-green-400">{pythonOutput}</div>}
                      {pythonError && <div className="text-red-400">{pythonError}</div>}
                    </div>
                  </div>
                )}
                
                
              </div>
            </div>
          </div>
        )}

        {/* Summary Tab */}
        {activeTab === 2 && (
          <div className="p-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Summary</h2>
              <div className="prose prose-gray max-w-none">
                {currentExample.summary.split('\n\n').map((paragraph, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    {paragraph.includes('**') ? (
                      <div className="space-y-2">
                        {paragraph.split('\n').map((line, lineIndex) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return (
                              <h3 key={lineIndex} className="font-bold text-gray-800 text-lg mt-4 mb-2">
                                {line.replace(/\*\*/g, '')}
                              </h3>
                            )
                          } else if (line.startsWith('• **')) {
                            const [bold, rest] = line.substring(2).split('**: ')
                            return (
                              <li key={lineIndex} className="text-gray-700 ml-4">
                                <strong>{bold.replace(/\*\*/g, '')}</strong>: {rest}
                              </li>
                            )
                          } else if (line.startsWith('• ')) {
                            return (
                              <li key={lineIndex} className="text-gray-700 ml-4">
                                {line.substring(2)}
                              </li>
                            )
                          } else if (line.match(/^\d+\./)) {
                            return (
                              <li key={lineIndex} className="text-gray-700 ml-4 list-decimal">
                                {line.replace(/^\d+\.\s*/, '')}
                              </li>
                            )
                          } else if (line.trim()) {
                            return (
                              <p key={lineIndex} className="text-gray-700 leading-relaxed">
                                {line}
                              </p>
                            )
                          }
                          return null
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line}
                            {lineIndex < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors">
          Next
        </button>
      </div>
    </div>
  )
}

export default ExampleDetail