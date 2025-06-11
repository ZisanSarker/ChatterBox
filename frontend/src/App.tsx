import React, { useState } from 'react'
import ChatPage from './pages/ChatPage'

function App() {
  const [username, setUsername] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  const handleJoinChat = () => {
    if (inputValue.trim()) {
      setUsername(inputValue.trim())
    }
  }

  if (!username) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome to ChatterBox
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleJoinChat()
                }
              }}
              maxLength={20}
            />
            <button
              onClick={handleJoinChat}
              disabled={!inputValue.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
            >
              Join Chat
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Choose a username to start chatting
          </p>
        </div>
      </div>
    )
  }

  return <ChatPage username={username} />
}

export default App