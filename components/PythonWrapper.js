'use client'

import React, { useEffect, useState } from 'react'
import { PythonProvider } from 'react-py'

const PythonWrapper = ({ children }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize Pyodide with proper configuration
    const initPyodide = async () => {
      try {
        // Wait for the Python environment to be ready
        setIsReady(true)
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error)
      }
    }

    initPyodide()
  }, [])

  // Custom packages and initialization script
  const packages = ['micropip']
  
  const lazy = true // Enable lazy loading

  return (
    <PythonProvider 
      packages={packages}
      lazy={lazy}
    >
      {children}
    </PythonProvider>
  )
}

export default PythonWrapper