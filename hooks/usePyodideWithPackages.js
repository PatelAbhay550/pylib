'use client'

import { usePython } from 'react-py'
import { useEffect, useState } from 'react'

export const usePyodideWithPackages = () => {
  const { 
    runPython, 
    stdout, 
    stderr, 
    isLoading, 
    isReady,
    interruptExecution,
    sendInput
  } = usePython()
  
  const [packagesLoaded, setPackagesLoaded] = useState(false)
  const [initError, setInitError] = useState(null)

  // Initialize required packages when Pyodide is ready
  useEffect(() => {
    const initializePackages = async () => {
      if (isReady && !packagesLoaded) {
        try {
          // Load micropip first
          await runPython(`
import micropip
await micropip.install("pyodide-http")
print("Packages loaded successfully")
          `)
          setPackagesLoaded(true)
          setInitError(null)
        } catch (error) {
          console.error('Failed to load packages:', error)
          setInitError(error.message)
          // Set packages as loaded anyway to allow basic functionality
          setPackagesLoaded(true)
        }
      }
    }

    initializePackages()
  }, [isReady, packagesLoaded, runPython])

  const runPythonCode = async (code) => {
    if (!isReady) {
      throw new Error('Python environment not ready')
    }
    
    try {
      return await runPython(code)
    } catch (error) {
      console.error('Python execution error:', error)
      throw error
    }
  }

  return {
    runPython: runPythonCode,
    stdout,
    stderr,
    isLoading,
    isReady: isReady && packagesLoaded,
    packagesLoaded,
    initError,
    interruptExecution,
    sendInput
  }
}