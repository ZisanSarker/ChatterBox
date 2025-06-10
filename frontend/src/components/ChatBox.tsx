import React, { useState } from 'react'
import { useSocket } from '../context/SocketContext'
import MessageItem from './MessageItem'

interface Props {
  messages: any[]
  username: string
}

export default function ChatBox({ messages, username }: Props) {
  const [text, setText] = useState('')
  const socket = useSocket()

  const handleSend = () => {
    if (text.trim()) {
      socket.emit('send-message', { username, text })
      setText('')
    }
  }

  return (
    <div>
      <div className="space-y-2 mb-4">
        {messages.map((msg, i) => (
          <MessageItem key={i} message={msg} isOwn={msg.username === username} />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            socket.emit('typing', username)
          }}
          onBlur={() => socket.emit('stop-typing')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}
