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

import { usePyodideWithPackages } from '../../../hooks/usePyodideWithPackages'

const ExampleDetail = () => {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  
  // Use our custom hook with proper package loading
  const { 
    runPython, 
    stdout, 
    stderr, 
    isLoading, 
    isReady, 
    packagesLoaded, 
    initError 
  } = usePyodideWithPackages()
  
  // Debug react-py state
  React.useEffect(() => {
    console.log('React-py state:', { 
      isReady, 
      isLoading, 
      packagesLoaded, 
      initError,
      hasRunPython: !!runPython 
    })
    if (initError) {
      console.error('Pyodide initialization error:', initError)
    }
  }, [isReady, isLoading, packagesLoaded, initError, runPython])

  

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
    },
    'square-root': {
      title: 'Square Root',
      code: `import math

# Calculate square root of a number
number = 16
sqrt_result = math.sqrt(number)
print(f"The square root of {number} is {sqrt_result}")

# Alternative method without math module
sqrt_alternative = number ** 0.5
print(f"Alternative method: {sqrt_alternative}")`,
      explanation: `This program demonstrates how to calculate the square root of a number in Python using both the math module and exponentiation.

The program covers several important concepts:

• **Math module**: Python's built-in mathematical functions library
• **Import statements**: How to use external modules in your code
• **Mathematical operations**: Using both library functions and operators
• **Alternative approaches**: Different ways to solve the same problem

The square root operation is fundamental in mathematics and programming, used in distance calculations, statistical analysis, and many algorithms.`,
      summary: `This program shows two different methods to calculate square roots in Python.

**Key Learning Points:**
• **Math module usage**: Importing and using built-in mathematical functions
• **math.sqrt() function**: Dedicated function for square root calculations
• **Exponentiation operator (**)**: Using power operations (x**0.5 = √x)
• **Module importing**: Understanding how to access external functionality

**Mathematical Concepts:**
• **Square root definition**: Finding a number that when multiplied by itself gives the original number
• **Floating-point precision**: Understanding decimal accuracy in calculations
• **Mathematical equivalence**: x**0.5 = √x

**Real-world Applications:**
• **Geometry**: Calculating distances, areas, and volumes
• **Physics**: Velocity calculations, wave equations
• **Statistics**: Standard deviation, variance calculations
• **Computer graphics**: 3D transformations, lighting calculations

**Best Practices:**
• Use math.sqrt() for clarity and readability
• Consider precision requirements for your specific use case
• Handle negative numbers appropriately (they cause errors)`
    },
    'area-of-triangle': {
      title: 'Area of Triangle',
      code: `# Calculate area of triangle using base and height
base = 10
height = 8
area = 0.5 * base * height
print(f"Area of triangle with base {base} and height {height} is {area}")

# Using Heron's formula for three sides
import math
a, b, c = 3, 4, 5  # Triangle sides
s = (a + b + c) / 2  # Semi-perimeter
area_heron = math.sqrt(s * (s - a) * (s - b) * (s - c))
print(f"Area using Heron's formula: {area_heron}")`,
      explanation: `This program demonstrates two different methods to calculate the area of a triangle: the basic formula using base and height, and Heron's formula using the three sides.

The program illustrates:

• **Basic geometry formulas**: Area = 0.5 × base × height
• **Heron's formula**: Calculate area when you know all three sides
• **Semi-perimeter calculation**: s = (a + b + c) / 2
• **Complex mathematical expressions**: Breaking down formulas into steps

Both methods are useful in different scenarios depending on what triangle measurements you have available.`,
      summary: `This program teaches two fundamental approaches to calculating triangle areas.

**Method 1 - Base and Height:**
• **Formula**: Area = 0.5 × base × height
• **When to use**: When you have perpendicular base and height measurements
• **Simplicity**: Most straightforward calculation method

**Method 2 - Heron's Formula:**
• **Formula**: Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2
• **When to use**: When you know all three side lengths
• **Complexity**: More complex but works with any triangle

**Mathematical Concepts:**
• **Semi-perimeter**: Half the perimeter of the triangle
• **Square root operations**: Using math.sqrt() for complex calculations
• **Variable assignment**: Storing intermediate calculations

**Practical Applications:**
• **Construction**: Calculating material needed for triangular structures
• **Land surveying**: Determining area of triangular plots
• **Computer graphics**: Triangle rendering and collision detection
• **Engineering**: Structural analysis and design

**Programming Techniques:**
• **Multiple assignment**: a, b, c = 3, 4, 5
• **Mathematical precision**: Handling floating-point calculations
• **Code organization**: Breaking complex formulas into readable steps`
    },
    'swap-two-variables': {
      title: 'Swap Two Variables',
      code: `# Method 1: Using a temporary variable
a = 10
b = 20
print(f"Before swap: a = {a}, b = {b}")

temp = a
a = b
b = temp
print(f"After swap (temp method): a = {a}, b = {b}")

# Method 2: Pythonic tuple unpacking
x = 100
y = 200
print(f"Before swap: x = {x}, y = {y}")

x, y = y, x
print(f"After swap (tuple method): x = {x}, y = {y}")

# Method 3: Arithmetic method (for numbers only)
p = 5
q = 15
print(f"Before swap: p = {p}, q = {q}")

p = p + q
q = p - q
p = p - q
print(f"After swap (arithmetic method): p = {p}, q = {q}")`,
      explanation: `This program demonstrates three different methods to swap the values of two variables in Python. Variable swapping is a fundamental programming concept used in sorting algorithms, data manipulation, and many other scenarios.

The three methods shown are:

• **Temporary variable method**: Traditional approach using an extra variable
• **Tuple unpacking**: Pythonic and elegant approach
• **Arithmetic method**: Mathematical approach without extra variables

Each method has its advantages and use cases depending on the programming context and requirements.`,
      summary: `This program explores three different approaches to swapping variable values.

**Method 1 - Temporary Variable:**
• **Concept**: Use a third variable to hold one value temporarily
• **Steps**: temp = a; a = b; b = temp
• **Pros**: Clear, works with any data type, easy to understand
• **Cons**: Requires extra memory for temporary variable

**Method 2 - Tuple Unpacking (Recommended):**
• **Concept**: Python's elegant multiple assignment feature
• **Syntax**: x, y = y, x
• **Pros**: Pythonic, concise, readable, works with any data type
• **Cons**: Python-specific syntax

**Method 3 - Arithmetic Method:**
• **Concept**: Mathematical operations without extra variables
• **Steps**: a = a + b; b = a - b; a = a - b
• **Pros**: No extra memory needed
• **Cons**: Only works with numbers, risk of overflow

**Programming Concepts:**
• **Multiple assignment**: Assigning values to multiple variables simultaneously
• **Tuple creation**: Understanding implicit tuple creation in Python
• **Memory efficiency**: Different approaches use memory differently

**Real-world Applications:**
• **Sorting algorithms**: Bubble sort, quick sort implementations
• **Data structure manipulation**: Reorganizing arrays and lists
• **Game development**: Position swapping, turn-based mechanics
• **Algorithm optimization**: In-place operations

**Best Practice:**
Use tuple unpacking (x, y = y, x) as it's the most Pythonic and readable approach.`
    },
    'quadratic-equation': {
      title: 'Find Roots of Quadratic Equation',
      code: `import math

# Quadratic equation: ax² + bx + c = 0
a = 1
b = -7
c = 12

print(f"Quadratic equation: {a}x² + {b}x + {c} = 0")

# Calculate discriminant
discriminant = b**2 - 4*a*c
print(f"Discriminant: {discriminant}")

if discriminant > 0:
    # Two real and different roots
    root1 = (-b + math.sqrt(discriminant)) / (2*a)
    root2 = (-b - math.sqrt(discriminant)) / (2*a)
    print(f"Two real roots: {root1} and {root2}")
elif discriminant == 0:
    # One real root (repeated)
    root = -b / (2*a)
    print(f"One real root: {root}")
else:
    # Complex roots
    real_part = -b / (2*a)
    imaginary_part = math.sqrt(abs(discriminant)) / (2*a)
    print(f"Complex roots: {real_part} + {imaginary_part}i and {real_part} - {imaginary_part}i")`,
      explanation: `This program solves quadratic equations using the quadratic formula. A quadratic equation has the form ax² + bx + c = 0, and the program handles all possible cases based on the discriminant.

The program demonstrates:

• **Quadratic formula**: x = (-b ± √(b² - 4ac)) / 2a
• **Discriminant calculation**: b² - 4ac determines the nature of roots
• **Conditional logic**: Different cases based on discriminant value
• **Complex number handling**: When discriminant is negative

This is a fundamental algebraic concept with many applications in mathematics, physics, and engineering.`,
      summary: `This program implements the complete solution for quadratic equations with all possible cases.

**Quadratic Formula Components:**
• **Standard form**: ax² + bx + c = 0
• **Discriminant**: Δ = b² - 4ac
• **Formula**: x = (-b ± √Δ) / 2a

**Three Cases Based on Discriminant:**
• **Δ > 0**: Two real and different roots
• **Δ = 0**: One real root (repeated root)
• **Δ < 0**: Two complex conjugate roots

**Mathematical Concepts:**
• **Square root calculations**: Using math.sqrt() for real roots
• **Complex numbers**: Handling imaginary parts when discriminant is negative
• **Conditional logic**: Making decisions based on mathematical conditions

**Programming Techniques:**
• **Variable naming**: Clear coefficient names (a, b, c)
• **Intermediate calculations**: Storing discriminant for reuse
• **Formatted output**: Clear presentation of results
• **Error handling**: Managing different mathematical scenarios

**Real-world Applications:**
• **Physics**: Projectile motion, wave equations
• **Engineering**: Circuit analysis, structural calculations
• **Economics**: Optimization problems, cost analysis
• **Computer graphics**: Curve intersections, trajectory calculations

**Educational Value:**
This example combines mathematical theory with programming logic, showing how to implement mathematical formulas and handle edge cases programmatically.`
    },
    'kilometers-to-miles': {
      title: 'Convert Kilometers to Miles',
      code: `# Conversion factor: 1 kilometer = 0.621371 miles
MILE_CONVERSION_FACTOR = 0.621371

# Convert kilometers to miles
kilometers = 10
miles = kilometers * MILE_CONVERSION_FACTOR
print(f"{kilometers} kilometers = {miles:.2f} miles")

# Function for reusable conversion
def km_to_miles(km):
    """Convert kilometers to miles"""
    return km * MILE_CONVERSION_FACTOR

def miles_to_km(miles):
    """Convert miles to kilometers"""
    return miles / MILE_CONVERSION_FACTOR

# Test the functions
test_km = 50
test_miles = 31.07

print(f"{test_km} km = {km_to_miles(test_km):.2f} miles")
print(f"{test_miles} miles = {miles_to_km(test_miles):.2f} km")

# Batch conversion
distances_km = [1, 5, 10, 25, 100]
print("\\nBatch conversion:")
for km in distances_km:
    print(f"{km} km = {km_to_miles(km):.2f} miles")`,
      explanation: `This program demonstrates unit conversion between kilometers and miles, introducing concepts like constants, functions, and batch processing.

Key programming concepts covered:

• **Constants**: Using uppercase naming for conversion factors
• **Function definition**: Creating reusable conversion functions
• **Docstrings**: Documenting function purposes
• **Round formatting**: Using :.2f for decimal precision
• **Loops**: Processing multiple values efficiently
• **Bidirectional conversion**: Converting both ways

Unit conversion is a fundamental programming task used in scientific calculations, international applications, and data processing.`,
      summary: `This program teaches unit conversion programming with functions and constants.

**Conversion Mathematics:**
• **Conversion factor**: 1 kilometer = 0.621371 miles
• **Forward conversion**: miles = kilometers × 0.621371
• **Reverse conversion**: kilometers = miles ÷ 0.621371

**Programming Best Practices:**
• **Constants**: Using UPPERCASE for unchanging values
• **Function design**: Single-responsibility functions
• **Documentation**: Clear docstrings for function purposes
• **DRY principle**: Don't repeat yourself - use functions

**Key Features Demonstrated:**
• **Precision control**: .2f format for two decimal places
• **Bidirectional conversion**: Both km→miles and miles→km
• **Batch processing**: Converting multiple values in a loop
• **Function reusability**: Write once, use many times

**Real-world Applications:**
• **Travel planning**: Distance calculations for international trips
• **Sports tracking**: Converting running/cycling distances
• **Mapping applications**: Supporting multiple unit systems
• **Scientific research**: Data standardization across regions
• **International business**: Global measurement compatibility

**Programming Concepts:**
• **Function parameters**: Accepting input values
• **Return values**: Sending results back to caller
• **Loop iteration**: Processing lists of data
• **String formatting**: Professional output presentation

**Extension Ideas:**
• Add input validation for negative numbers
• Create a general conversion system for multiple units
• Add temperature, weight, and volume conversions`
    },
    'celsius-to-fahrenheit': {
      title: 'Convert Celsius to Fahrenheit',
      code: `# Temperature conversion formulas:
# Fahrenheit = (Celsius × 9/5) + 32
# Celsius = (Fahrenheit - 32) × 5/9

def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit"""
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius"""
    celsius = (fahrenheit - 32) * 5/9
    return celsius

# Test conversions
temp_c = 25
temp_f = 77

print(f"{temp_c}°C = {celsius_to_fahrenheit(temp_c):.1f}°F")
print(f"{temp_f}°F = {fahrenheit_to_celsius(temp_f):.1f}°C")

# Common temperature points
print("\\nCommon temperature conversions:")
common_temps = [0, 10, 20, 25, 30, 37, 100]

for temp in common_temps:
    f_temp = celsius_to_fahrenheit(temp)
    print(f"{temp}°C = {f_temp:.1f}°F")

# Interactive example
def temperature_converter():
    """Interactive temperature converter"""
    print("\\nTemperature Converter")
    print("1. Celsius to Fahrenheit")
    print("2. Fahrenheit to Celsius")
    
    choice = 1  # Simulated user choice
    temp_value = 30  # Simulated input
    
    if choice == 1:
        result = celsius_to_fahrenheit(temp_value)
        print(f"{temp_value}°C = {result:.1f}°F")
    else:
        result = fahrenheit_to_celsius(temp_value)
        print(f"{temp_value}°F = {result:.1f}°C")

temperature_converter()`,
      explanation: `This program demonstrates temperature conversion between Celsius and Fahrenheit scales, showcasing mathematical formulas, function design, and practical applications.

The program covers:

• **Mathematical formulas**: Understanding the relationship between temperature scales
• **Function encapsulation**: Wrapping conversion logic in reusable functions
• **Bidirectional conversion**: Converting in both directions
• **Common temperature points**: Showing familiar reference temperatures
• **Interactive design**: Building user-friendly interfaces

Temperature conversion is essential in scientific applications, weather services, cooking, and international communication.`,
      summary: `This program provides comprehensive temperature conversion functionality.

**Temperature Scale Formulas:**
• **Celsius to Fahrenheit**: F = (C × 9/5) + 32
• **Fahrenheit to Celsius**: C = (F - 32) × 5/9
• **Key relationship**: 0°C = 32°F, 100°C = 212°F

**Programming Features:**
• **Function modularity**: Separate functions for each conversion direction
• **Parameter passing**: Functions accept temperature values as arguments
• **Return values**: Functions return converted temperatures
• **Loop processing**: Batch conversion of multiple temperatures

**Important Temperature References:**
• **Freezing point of water**: 0°C = 32°F
• **Room temperature**: ~20°C = 68°F
• **Body temperature**: 37°C = 98.6°F
• **Boiling point of water**: 100°C = 212°F

**Real-world Applications:**
• **Weather services**: International weather reporting
• **Cooking**: Recipe temperature conversions
• **Science**: Laboratory temperature standardization
• **Travel**: Understanding local weather conditions
• **HVAC systems**: Climate control programming

**Programming Concepts:**
• **Mathematical operations**: Proper order of operations
• **Function documentation**: Using docstrings effectively
• **User interface design**: Creating interactive programs
• **Data validation**: Ensuring reasonable temperature ranges

**Educational Benefits:**
• **Mathematical application**: Real-world use of linear equations
• **Function design**: Creating reusable, testable code
• **User experience**: Building helpful, interactive tools
• **International awareness**: Understanding global measurement systems`
    }
  }

  const currentExample = examples[params.id] || examples['hello-world']
  
  const runCode = async () => {
    if (isReady && runPython) {
      try {
        await runPython(currentExample.code)
      } catch (error) {
        console.error('Error running Python code:', error)
      }
    }
  }

  const tabs = [
    { id: 0, label: 'Explanation', icon: FaLightbulb },
    { id: 1, label: 'Code', icon: FaCode },
    { id: 2, label: 'Summary', icon: FaFileAlt }
  ]

  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1)
    } else {
      // If on last tab, go back to first tab or navigate to examples list
      router.push('/examples')
    }
  }

  const getNextButtonText = () => {
    if (activeTab === 0) return 'View Code'
    if (activeTab === 1) return 'View Summary' 
    return 'Back to Examples'
  }

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
        {/* Progress indicator */}
        <div className="px-6 py-2 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Step {activeTab + 1} of {tabs.length}</span>
            <div className="flex gap-1">
              {tabs.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= activeTab ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
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
                  disabled={!isReady || isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlay className="text-sm" />
                  {isLoading ? 'Running...' : 'Run Code'}
                </button>
                
                {/* Initialization Error */}
                {initError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">
                      <strong>Package Loading Warning:</strong> {initError}
                    </p>
                    <p className="text-red-500 text-xs mt-1">
                      Some advanced features may not work, but basic Python code should run fine.
                    </p>
                  </div>
                )}
                
                {/* Output */}
                {(stdout || stderr) && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Output:</h4>
                    <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm">
                      {stdout && <div className="text-green-400 whitespace-pre-wrap">{stdout}</div>}
                      {stderr && <div className="text-red-400 whitespace-pre-wrap">{stderr}</div>}
                    </div>
                  </div>
                )}
                
                {/* Loading States */}
                {!isReady && (
                  <div className="mt-4 text-center text-gray-600">
                    <div className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    {packagesLoaded ? 'Loading Python environment...' : 'Loading packages...'}
                  </div>
                )}
                
                {isReady && !packagesLoaded && (
                  <div className="mt-4 text-center text-gray-600">
                    <div className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Initializing Python packages...
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
        <button 
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          {getNextButtonText()}
          {activeTab < tabs.length - 1 ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default ExampleDetail
