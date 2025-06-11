import React, { useState, useRef, useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import MessageItem from './MessageItem'

interface Message {
  username: string
  text: string
  createdAt: string
}

interface Props {
  messages: Message[]
  username: string
}

export default function ChatBox({ messages, username }: Props) {
  const [text, setText] = useState('')
  const socket = useContext(SocketContext)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (text.trim() && socket) {
      socket.emit('sendMessage', text.trim())
      setText('')
      // Stop typing when message is sent
      socket.emit('typing', false)
    }
  }

  const handleTyping = () => {
    if (!socket) return
    
    socket.emit('typing', true)
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Set new timeout to stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing', false)
    }, 2000)
  }

  const handleStopTyping = () => {
    if (!socket) return
    socket.emit('typing', false)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
  }

  if (!socket) {
    return <div className="flex items-center justify-center h-full">Connecting...</div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 p-2">
        {messages.map((msg, i) => (
          <MessageItem key={i} message={msg} isOwn={msg.username === username} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 p-2 border-t bg-white">
        <input
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            handleTyping()
          }}
          onBlur={handleStopTyping}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  )
}