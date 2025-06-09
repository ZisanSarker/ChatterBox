import { useState } from 'react'
import ChatPage from './pages/ChatPage'

function App() {
  const [username, setUsername] = useState<string>('')

  if (!username) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow">
          <input
            type="text"
            placeholder="Enter your username"
            className="border px-3 py-2 rounded w-64"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                setUsername(e.currentTarget.value)
              }
            }}
          />
        </div>
      </div>
    )
  }

  return <ChatPage username={username} />
}

export default App
