'use client'

import React from 'react'
import { PythonProvider } from 'react-py'

const PythonWrapper = ({ children }) => {
  return (
    <PythonProvider
      lazy={false}
      packages={['micropip']}
      transformStdin={(stdin) => stdin}
      transformStdout={(stdout) => stdout}
      transformStderr={(stderr) => stderr}
    >
      {children}
    </PythonProvider>
  )
}

export default PythonWrapper