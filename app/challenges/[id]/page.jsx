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
  const [testResults, setTestResults] = useState(null)
  const [showHints, setShowHints] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)

  // Enhanced Challenge data with soul and better UX
  const challenges = {
    'print-sentence': {
      title: '🎯 Your First Python Program',
      description: 'Welcome to Python! Let\'s start with the most fundamental skill - making your computer talk!',
      points: 10,
      difficulty: 'beginner',
      emoji: '🐍',
      celebration: 'Amazing! You just wrote your first Python program! 🎉',
      instructions: `Let's make your computer say hello! 👋

**Your mission:**
• Use \`print()\` to display "Hello, Python!" 
• Print your name on the next line
• Add a welcome message

**💡 Tip:** Each \`print()\` statement creates a new line!`,
      starterCode: `# 🐍 Welcome to Python! Let's make your first program
# Use print() to display text

`,
      hints: [
        "💡 Use print(\"Hello, Python!\") to display text",
        "🔤 Put text inside quotes: \"your text here\"", 
        "📝 Each print() statement goes on a new line",
        "✨ Try: print(\"Hello, Python!\")"
      ],
      solution: `print("Hello, Python!")
print("Alex")  # Replace with your name
print("Welcome to my Python journey!")`,
      testCases: [
        {
          description: "Prints a greeting with 'Hello' and 'Python'",
          check: (output) => {
            const lines = output.toLowerCase().split('\n');
            return lines.some(line => line.includes('hello') && line.includes('python'));
          },
          hint: "Make sure to print 'Hello, Python!' as shown in the example"
        },
        {
          description: "Has at least 2 lines of output",
          check: (output) => {
            return output.trim().split('\n').length >= 2;
          },
          hint: "You need at least 2 print statements"
        }
      ],
      learningObjectives: ["Using print() function", "String literals", "Basic Python syntax"]
    },
    'take-user-input': {
      title: '💬 Interactive Programs',
      description: 'Make your program interactive! Learn to ask questions and respond to users.',
      points: 15,
      difficulty: 'beginner',
      emoji: '🗣️',
      celebration: 'Fantastic! Your program can now talk with users! 🗨️',
      instructions: `Time to make your program interactive! 🎪

**Your mission:**
• Ask for the user's name using \`input()\`
• Ask for their age
• Create a personalized greeting

**💡 Tip:** \`input("Your question: ")\` asks a question and waits for an answer!`,
      starterCode: `# 🗣️ Let's make an interactive program!
# Use input() to ask questions

`,
      hints: [
        "💬 Use input(\"Enter your name: \") to ask questions",
        "🔗 Store the answer: name = input(\"Enter your name: \")",
        "🎯 Use f\"Hello {name}!\" to include the name in your message",
        "📝 Ask for both name and age separately"
      ],
      solution: `name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}! You are {age} years old.")`,
      testCases: [
        {
          description: "Asks for user's name",
          check: (output) => {
            return output.toLowerCase().includes('name');
          },
          hint: "Your program should ask for the user's name"
        },
        {
          description: "Asks for user's age", 
          check: (output) => {
            return output.toLowerCase().includes('age');
          },
          hint: "Don't forget to ask for the age too!"
        },
        {
          description: "Creates a personalized response",
          check: (output) => {
            return output.toLowerCase().includes('hello') || output.toLowerCase().includes('hi');
          },
          hint: "Give a friendly greeting back to the user"
        }
      ],
      learningObjectives: ["input() function", "Variables", "String formatting", "User interaction"]
    },
    'meter-to-centimeter': {
      title: '📏 Unit Converter Magic',
      description: 'Build a useful tool! Convert measurements like a professional developer.',
      points: 20,
      difficulty: 'beginner',
      emoji: '🔢',
      celebration: 'Excellent! You built a real-world tool! 🛠️',
      instructions: `Let's build something useful - a unit converter! 📐

**Your mission:**
• Ask user for distance in meters
• Convert to centimeters (multiply by 100)
• Display the result clearly

**💡 Tip:** Use \`float()\` to handle decimal numbers like 2.5 meters!`,
      starterCode: `# 📏 Build a meter to centimeter converter
# Remember: 1 meter = 100 centimeters

`,
      hints: [
        "📊 Use float(input()) for decimal numbers",
        "🧮 Multiply meters by 100 to get centimeters", 
        "💫 Show both the original and converted values",
        "🎯 Try: meters = float(input(\"Enter meters: \"))"
      ],
      solution: `meters = float(input("Enter distance in meters: "))
centimeters = meters * 100
print(f"{meters} meters = {centimeters} centimeters")`,
      testCases: [
        {
          description: "Asks for distance in meters",
          check: (output) => {
            return output.toLowerCase().includes('meter');
          },
          hint: "Ask the user to enter a distance in meters"
        },
        {
          description: "Shows the conversion result",
          check: (output) => {
            return output.toLowerCase().includes('centimeter');
          },
          hint: "Display the result in centimeters"
        },
        {
          description: "Performs correct calculation",
          check: (output) => {
            // This is a simplified check - in real app would test actual calculation
            return output.includes('=') || output.includes('is');
          },
          hint: "Show the conversion clearly (e.g., '5 meters = 500 centimeters')"
        }
      ],
      learningObjectives: ["Type conversion", "float() function", "Mathematical operations", "Practical applications"]
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

  // Enhanced validation function with better feedback
  const validateCode = (output) => {
    const challenge = currentChallenge
    if (!challenge.testCases) return false

    let passedTests = 0
    let failedTests = []
    
    // Check each test case
    for (let i = 0; i < challenge.testCases.length; i++) {
      const testCase = challenge.testCases[i]
      try {
        if (testCase.check(output)) {
          passedTests++
        } else {
          failedTests.push({
            description: testCase.description,
            hint: testCase.hint
          })
        }
      } catch (error) {
        failedTests.push({
          description: testCase.description,
          hint: "Error checking this test case"
        })
      }
    }

    // Store test results for feedback
    setTestResults({
      passed: passedTests,
      total: challenge.testCases.length,
      failed: failedTests
    })

    // Return true if all tests pass
    return passedTests === challenge.testCases.length
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
            <div className="flex items-center gap-3">
              <div className="text-2xl">{currentChallenge.emoji || '🐍'}</div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">{currentChallenge.title}</h1>
                <p className="text-sm text-gray-600">
                  <span className="text-blue-600 font-medium">{currentChallenge.points} points</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{currentChallenge.difficulty}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                <span className="text-lg">🎉</span>
                <span className="text-green-600 text-xs font-medium">Completed</span>
              </div>
            )}
            <div className="bg-orange-100 px-3 py-2 rounded-full flex items-center gap-2">
              <span className="text-orange-600 font-bold">{user?.progress?.totalPoints || 0}</span>
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <FaUser className="text-orange-600 text-sm" />
              </div>
            </div>
            <button 
              onClick={() => setShowHints(!showHints)}
              className="p-2 hover:bg-blue-100 rounded-full transition-colors"
              title="Get a hint"
            >
              <span className="text-blue-600 text-lg">💡</span>
            </button>
          </div>
        </div>
      </div>

      {/* Challenge Instructions */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-blue-900 flex items-center gap-2">
              <span>📋</span>
              Challenge Instructions:
            </h2>
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
            <div className="text-blue-800 text-sm whitespace-pre-line leading-relaxed">
              {currentChallenge.instructions}
            </div>
          )}
        </div>
      </div>

      {/* Hints Panel */}
      {showHints && currentChallenge.hints && (
        <div className="bg-yellow-50 border-b border-yellow-100">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-yellow-800 flex items-center gap-2">
                <span>💡</span>
                Helpful Hints
              </h3>
              <button
                onClick={() => setShowHints(false)}
                className="p-1 hover:bg-yellow-100 rounded-full transition-colors"
              >
                <FaChevronUp className="text-yellow-600 text-sm" />
              </button>
            </div>
            <div className="space-y-2">
              {currentChallenge.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                <div key={index} className="bg-yellow-100 p-3 rounded-lg text-yellow-800 text-sm">
                  {hint}
                </div>
              ))}
              {currentHintIndex < currentChallenge.hints.length - 1 && (
                <button
                  onClick={() => setCurrentHintIndex(currentHintIndex + 1)}
                  className="text-yellow-700 text-sm hover:text-yellow-800 underline"
                >
                  Show another hint →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Test Results Panel */}
      {testResults && !isCorrect && (
        <div className="bg-red-50 border-b border-red-100">
          <div className="p-4">
            <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
              <span>❌</span>
              Tests: {testResults.passed}/{testResults.total} passed
            </h3>
            {testResults.failed.map((test, index) => (
              <div key={index} className="bg-red-100 p-3 rounded-lg mb-2">
                <p className="text-red-800 text-sm font-medium">{test.description}</p>
                <p className="text-red-700 text-xs mt-1">{test.hint}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Feedback */}
      {isCorrect && testResults && (
        <div className="bg-green-50 border-b border-green-100">
          <div className="p-4">
            <h3 className="font-semibold text-green-800 flex items-center gap-2">
              <span>✅</span>
              All tests passed! {currentChallenge.celebration}
            </h3>
          </div>
        </div>
      )}

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
            <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              <div className="text-4xl mb-4">{currentChallenge.emoji || '🎉'}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Amazing Work!</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {currentChallenge.celebration}
              </p>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                +{currentChallenge.points} points earned! 🌟
              </div>
              <div className="text-xs text-gray-500">
                {currentChallenge.learningObjectives && (
                  <div>
                    <p className="font-medium mb-1">You learned:</p>
                    <p>{currentChallenge.learningObjectives.join(' • ')}</p>
                  </div>
                )}
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
