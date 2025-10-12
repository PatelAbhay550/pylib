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
          // Try to load packages - first attempt with micropip
          await runPython(`
try:
    import micropip
    print("micropip available")
except ImportError:
    print("micropip not available")

# Try to import basic modules that should work
import math
import sys
print("Basic Python modules loaded successfully")
print(f"Python version: {sys.version}")
          `)
          
          // Try to load pyodide-http if available
          try {
            await runPython(`
try:
    import micropip
    await micropip.install("pyodide-http")
    print("pyodide-http installed successfully")
except Exception as e:
    print(f"pyodide-http installation failed: {e}")
    print("Continuing without pyodide-http - basic Python functionality available")
            `)
          } catch (httpError) {
            console.warn('pyodide-http loading failed, continuing with basic functionality:', httpError)
          }
          
          setPackagesLoaded(true)
          setInitError(null)
        } catch (error) {
          console.error('Failed to initialize Python environment:', error)
          setInitError('Package loading failed, but basic Python should work')
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
