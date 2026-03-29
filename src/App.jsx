import React, { useState } from 'react'
import Dashboard from './Dashboard'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => setDarkMode(prev => !prev)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  )
}

export default App
