'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePython } from 'react-py'
import { 
  FaArrowLeft, 
  FaShare, 
  FaStar, 
  FaPlay, 
  FaCheck,
  FaTrophy,
  FaChevronDown,
  FaChevronUp,
  FaUser
} from 'react-icons/fa'
import { BiWifi, BiBattery } from 'react-icons/bi'
import { MdSignal } from 'react-icons/md'
import { useAuth } from '../../../contexts/AuthContext'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import confetti from 'canvas-confetti'

const ChallengeDetail = () => {
  const params = useParams()
  const router = useRouter()
  const { user, updateProgress } = useAuth()
  const { runPython, stdout, stderr, isLoading, isReady } = usePython()
  
  // State management for challenge functionality
  const [activeTab, setActiveTab] = useState('code') // 'code' or 'output'
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [inputPrompt, setInputPrompt] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [isWaitingForInput, setIsWaitingForInput] = useState(false)
  const [executionState, setExecutionState] = useState({
    codeLines: [],
    currentLine: 0,
    variables: {},
    outputBuffer: '',
    isExecuting: false
  })

  // Challenge data - in a real app, this would come from an API
  const challenges = {
    'print-sentence': {
      title: 'Print a Sentence',
      description: 'Create a simple program that prints a sentence to the console.',
      points: 10,
      difficulty: 'beginner',
      instructions: `Create a program that:
1. Prints the sentence "Hello Python!"
2. Prints your name on a new line
3. Prints a welcome message`,
      starterCode: `# Print a sentence
# Your code here...`,
      expectedOutput: `Hello Python!
John Doe
Welcome to Python programming!`,
      solution: `print("Hello, Python!")
print("John Doe")
print("Welcome to Python programming!")`,
      testCases: [
        {
          expectedContains: ["Hello, Python!"]
        }
      ]
    },
    'take-user-input': {
      title: 'Take User Input and Print',
      description: 'Create a program that takes user input and prints it back.',
      points: 15,
      difficulty: 'beginner',
      instructions: `Create a program that:
1. Asks the user to enter their name
2. Asks the user to enter their age
3. Prints a personalized greeting message`,
      starterCode: `# Take user input and print
# Your code here...`,
      expectedOutput: `Enter your name: Alice
Enter your age: 25
Hello Alice! You are 25 years old.`,
      solution: `name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}! You are {age} years old.")`,
      testCases: [
        {
          expectedContains: ["Enter your name", "Enter your age", "Hello"]
        }
      ]
    },
    'meter-to-centimeter': {
      title: 'Meter to Centimeter',
      description: 'Convert meters to centimeters using user input.',
      points: 20,
      difficulty: 'beginner',
      instructions: `Create a program that:
1. Asks the user to enter a distance in meters
2. Converts the distance to centimeters
3. Displays the result with proper formatting`,
      starterCode: `# Convert meters to centimeters
# Your code here...`,
      expectedOutput: `Enter distance in meters: 5.5
5.5 meters = 550.0 centimeters`,
      solution: `meters = float(input("Enter distance in meters: "))
centimeters = meters * 100
print(f"{meters} meters = {centimeters} centimeters")`,
      testCases: [
        {
          expectedContains: ["Enter distance in meters", "centimeters"]
        }
      ]
    },
    'profit-loss-calculator': {
      title: 'Profit Loss Calculator',
      description: 'Calculate profit or loss based on cost price and selling price.',
      points: 25,
      difficulty: 'beginner',
      instructions: `Create a program that:
1. Takes cost price from user
2. Takes selling price from user
3. Calculates and displays profit or loss
4. Shows the percentage of profit/loss`,
      starterCode: `# Profit Loss Calculator
# Your code here...`,
      expectedOutput: `Enter cost price: 100
Enter selling price: 120
Profit: 20
Profit percentage: 20.0%`,
      solution: `cost_price = float(input("Enter cost price: "))
selling_price = float(input("Enter selling price: "))

if selling_price > cost_price:
    profit = selling_price - cost_price
    percentage = (profit / cost_price) * 100
    print(f"Profit: {profit}")
    print(f"Profit percentage: {percentage}%")
elif cost_price > selling_price:
    loss = cost_price - selling_price
    percentage = (loss / cost_price) * 100
    print(f"Loss: {loss}")
    print(f"Loss percentage: {percentage}%")
else:
    print("No profit, no loss")`,
      testCases: [
        {
          expectedContains: ["Enter cost price", "Enter selling price"]
        }
      ]
    },
    'user-input-list': {
      title: 'User Input to Create a List',
      description: 'Create a program that takes user input and creates a list from it.',
      points: 30,
      difficulty: 'beginner',
      instructions: `Create a program that:
1. Asks the user to enter items separated by commas
2. Splits the input into a list
3. Prints the resulting list
4. Shows the number of items in the list`,
      starterCode: `# Create a program to make a list from user input
# Your code here...`,
      expectedOutput: `Enter items separated by commas: apple,banana,orange
Your list: ['apple', 'banana', 'orange']
Number of items: 3`,
      solution: `# Get user input
user_input = input("Enter items separated by commas: ")

# Split into list and remove extra spaces
items = [item.strip() for item in user_input.split(',')]

# Display results
print(f"Your list: {items}")
print(f"Number of items: {len(items)}")`,
      testCases: [
        {
          input: "apple,banana,orange",
          expectedContains: ["apple", "banana", "orange", "3"]
        }
      ]
    },
    'list-multiplication': {
      title: 'List Item Multiplication',
      description: 'Create a program that multiplies each number in a list by 2.',
      points: 30,
      difficulty: 'beginner',
      instructions: `Create a program that:
1. Creates a list of numbers [1, 2, 3, 4, 5]
2. Multiplies each number by 2
3. Prints the original list
4. Prints the new list with doubled values`,
      starterCode: `# Multiply each item in a list by 2
# Your code here...`,
      expectedOutput: `Original list: [1, 2, 3, 4, 5]
Doubled list: [2, 4, 6, 8, 10]`,
      solution: `# Original list
numbers = [1, 2, 3, 4, 5]

# Multiply each number by 2
doubled_numbers = [num * 2 for num in numbers]

# Display results
print(f"Original list: {numbers}")
print(f"Doubled list: {doubled_numbers}")`,
      testCases: [
        {
          expectedContains: ["[1, 2, 3, 4, 5]", "[2, 4, 6, 8, 10]"]
        }
      ]
    }
  }

  const currentChallenge = challenges[params.id] || challenges['print-sentence']

  // Initialize with starter code
  useEffect(() => {
    setUserCode(currentChallenge.starterCode)
    
    // Check if user has already completed this challenge
    if (user?.progress?.completedChallenges?.includes(params.id)) {
      setIsCompleted(true)
    }
  }, [currentChallenge.starterCode, user, params.id])

  // Function to trigger confetti animation
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
    })
  }

  // Function to validate user's code output
  const validateCode = (output) => {
    const challenge = currentChallenge
    if (!challenge.testCases) return false

    // Check if output contains expected elements
    for (const testCase of challenge.testCases) {
      if (testCase.expectedContains) {
        const allContained = testCase.expectedContains.every(expected => 
          output.toLowerCase().includes(expected.toLowerCase())
        )
        if (allContained) return true
      }
    }
    return false
  }

  // Function to save completion to Firebase
  const saveCompletion = async () => {
    if (!user || !params.id) return

    try {
      // Update user's completed challenges
      await updateDoc(doc(db, 'users', user.uid), {
        'progress.completedChallenges': arrayUnion(params.id),
        'progress.totalPoints': (user.progress?.totalPoints || 0) + currentChallenge.points
      })

      // Update local state
      await updateProgress({
        completedChallenges: [...(user.progress?.completedChallenges || []), params.id],
        totalPoints: (user.progress?.totalPoints || 0) + currentChallenge.points
      })

      console.log('Challenge completion saved to Firebase')
    } catch (error) {
      console.error('Error saving completion:', error)
    }
  }

  // Function to handle input submission
  const handleInputSubmit = () => {
    if (!isWaitingForInput) return
    
    const currentOutput = executionState.outputBuffer + inputValue + '\n'
    setOutput(currentOutput)
    
    // Continue execution with the provided input
    setIsWaitingForInput(false)
    setInputPrompt('')
    continueExecution(inputValue)
    setInputValue('')
  }

  // Function to execute code line by line
  const executeLineByLine = async (lines, lineIndex = 0, variables = {}, outputBuffer = '') => {
    if (lineIndex >= lines.length) {
      // Execution complete
      setIsRunning(false)
      setExecutionState(prev => ({ ...prev, isExecuting: false }))
      
      // Validate the final output
      const isValid = validateCode(outputBuffer)
      setIsCorrect(isValid)

      if (isValid && !isCompleted) {
        setShowSuccess(true)
        triggerConfetti()
        saveCompletion()
        setIsCompleted(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }
      return
    }

    const currentLine = lines[lineIndex].trim()
    
    // Skip empty lines and comments
    if (!currentLine || currentLine.startsWith('#')) {
      executeLineByLine(lines, lineIndex + 1, variables, outputBuffer)
      return
    }

    // Check if line contains input()
    const inputMatch = currentLine.match(/(\w+)\s*=\s*input\s*\(\s*["']([^"']*)["']\s*\)/)
    if (inputMatch) {
      const [, varName, promptText] = inputMatch
      
      // Show the prompt and wait for user input
      const newOutput = outputBuffer + promptText + ': '
      setOutput(newOutput)
      setInputPrompt(promptText + ': ')
      setIsWaitingForInput(true)
      
      // Store the current execution state
      setExecutionState({
        codeLines: lines,
        currentLine: lineIndex + 1,
        variables: { ...variables, [varName]: '' }, // Will be updated when input is received
        outputBuffer: newOutput,
        isExecuting: true
      })
      return
    }

    // Execute non-input lines using react-py
    try {
      // Build the code to execute including previous variables
      let codeToExecute = ''
      
      // Add variable assignments
      Object.entries(variables).forEach(([key, value]) => {
        if (typeof value === 'string') {
          codeToExecute += `${key} = "${value}"\n`
        } else {
          codeToExecute += `${key} = ${value}\n`
        }
      })
      
      // Add the current line
      codeToExecute += currentLine

      // Execute the line
      await runPython(codeToExecute)
      
      setTimeout(() => {
        let newOutput = outputBuffer
        const pythonOutput = stdout || stderr
        
        if (pythonOutput && pythonOutput.trim()) {
          newOutput += pythonOutput + '\n'
        }
        
        setOutput(newOutput)
        
        // Parse variables from the line if it's an assignment
        let newVariables = { ...variables }
        const assignmentMatch = currentLine.match(/(\w+)\s*=\s*(.+)/)
        if (assignmentMatch && !currentLine.includes('input(')) {
          const [, varName, value] = assignmentMatch
          // Simple value parsing (this could be enhanced)
          if (value.includes('"') || value.includes("'")) {
            newVariables[varName] = value.replace(/['"]/g, '')
          } else if (!isNaN(value)) {
            newVariables[varName] = parseFloat(value)
          }
        }
        
        // Continue to next line
        executeLineByLine(lines, lineIndex + 1, newVariables, newOutput)
      }, 300)
      
    } catch (error) {
      const errorOutput = outputBuffer + `Error on line ${lineIndex + 1}: ${error.message}\n`
      setOutput(errorOutput)
      setIsRunning(false)
      setExecutionState(prev => ({ ...prev, isExecuting: false }))
    }
  }

  // Function to continue execution after input
  const continueExecution = (inputVal) => {
    const { codeLines, currentLine, variables, outputBuffer } = executionState
    
    // Find the variable name from the previous line
    const prevLine = codeLines[currentLine - 1]
    const inputMatch = prevLine.match(/(\w+)\s*=\s*input/)
    
    if (inputMatch) {
      const varName = inputMatch[1]
      const updatedVariables = { ...variables, [varName]: inputVal }
      
      // Continue execution from the next line
      executeLineByLine(codeLines, currentLine, updatedVariables, executionState.outputBuffer)
    }
  }

  // Function to run user's code
  const runCode = async () => {
    if (!isReady) {
      setOutput('Python environment is not ready yet. Please wait...')
      return
    }

    setIsRunning(true)
    setOutput('')
    setActiveTab('output')
    setIsWaitingForInput(false)
    setInputPrompt('')
    setInputValue('')

    try {
      // Split code into lines
      const lines = userCode.split('\n')
      
      // Start line-by-line execution
      executeLineByLine(lines, 0, {}, '')

    } catch (error) {
      const errorMessage = error.message || 'An error occurred while running the code'
      setOutput(`Error: ${errorMessage}`)
      setIsRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      

      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{currentChallenge.title}</h1>
              <p className="text-sm text-gray-600">{currentChallenge.points} points</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                <FaCheck className="text-green-600 text-xs" />
                <span className="text-green-600 text-xs font-medium">Completed</span>
              </div>
            )}
            <div className="bg-orange-100 px-3 py-2 rounded-full flex items-center gap-2">
              <span className="text-orange-600 font-bold">{user?.progress?.totalPoints || 0}</span>
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <FaUser className="text-orange-600 text-sm" />
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaShare className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaStar className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Challenge Instructions */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-blue-900">Challenge Instructions:</h2>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="p-1 hover:bg-blue-100 rounded-full transition-colors"
            >
              {showInstructions ? (
                <FaChevronUp className="text-blue-600 text-sm" />
              ) : (
                <FaChevronDown className="text-blue-600 text-sm" />
              )}
            </button>
          </div>
          {showInstructions && (
            <div className="text-blue-800 text-sm whitespace-pre-line">
              {currentChallenge.instructions}
            </div>
          )}
        </div>
      </div>

      {/* Code/Output Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            CODE
          </button>
          <button
            onClick={() => setActiveTab('output')}
            className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
              activeTab === 'output'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            OUTPUT
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative">
        {/* Code Tab */}
        {activeTab === 'code' && (
          <div className="p-4 h-96 bg-white">
            {/* Line numbers and code editor */}
            <div className="flex bg-gray-50 rounded-lg overflow-hidden h-full">
              {/* Line numbers */}
              <div className="bg-gray-100 px-3 py-4 text-gray-500 text-sm font-mono min-w-[40px]">
                {userCode.split('\n').map((_, index) => (
                  <div key={index} className="leading-6">
                    {index + 1}
                  </div>
                ))}
              </div>
              
              {/* Code editor */}
              <div className="flex-1 relative">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-full p-4 bg-transparent font-mono text-sm resize-none focus:outline-none leading-6"
                  placeholder="Write your Python code here..."
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Output Tab */}
        {activeTab === 'output' && (
          <div className="p-4 h-96 bg-white">
            <div className="bg-black text-green-400 p-4 rounded-lg h-full overflow-auto font-mono text-sm flex flex-col">
              {isRunning && !isWaitingForInput ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Running code...</span>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-auto">
                    {output ? (
                      <pre className="whitespace-pre-wrap">{output}</pre>
                    ) : (
                      <span className="text-gray-500">Click "Run" to see output...</span>
                    )}
                  </div>
                  
                  {/* Interactive Input Interface */}
                  {isWaitingForInput && (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleInputSubmit()
                          }
                        }}
                        className="bg-transparent text-green-400 border-none outline-none flex-1 font-mono text-sm"
                        placeholder=""
                        autoFocus
                        style={{
                          caretColor: 'white',
                          background: 'none'
                        }}
                      />
                      <span className="text-white animate-pulse text-sm">|</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-3xl text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Congratulations!</h3>
              <p className="text-gray-600 mb-4">
                You've successfully completed this challenge and earned {currentChallenge.points} points!
              </p>
              <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                <FaCheck className="text-sm" />
                <span>Challenge Complete</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Run Button */}
      <div className="bg-white border-t border-gray-200 p-4">
        <button
          onClick={runCode}
          disabled={isRunning || !isReady}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlay className="text-sm" />
          {isRunning ? (isWaitingForInput ? 'Waiting for input...' : 'Running...') : 
           !isReady ? 'Loading Python...' : 'Run'}
        </button>
        {!isReady && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Python environment is loading, please wait...
          </p>
        )}
        {isWaitingForInput && (
          <p className="text-xs text-blue-600 text-center mt-2">
            Your program is asking for input. Please type in the output terminal above.
          </p>
        )}
      </div>

      {/* Next Button */}
      <div className="fixed bottom-4 right-4">
        <button 
          onClick={() => router.push('/challenges')}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ChallengeDetail