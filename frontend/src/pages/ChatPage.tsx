import React, { useEffect, useState, useContext } from 'react'
import { SocketProvider, SocketContext } from '../context/SocketContext'
import ChatBox from '../components/ChatBox'
import OnlineUsers from '../components/OnlineUsers'
import TypingIndicator from '../components/TypingIndicator'

interface Message {
  username: string
  text: string
  createdAt: string
}

interface Props {
  username: string
}

function ChatContent({ username }: Props) {
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState<Message[]>([])
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [typingUsers, setTypingUsers] = useState<{ username: string; isTyping: boolean }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load messages from localStorage
    const loadMessages = () => {
      try {
        const savedMessages = localStorage.getItem('chatterbox-messages')
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages)
          setMessages(parsedMessages)
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to load messages from localStorage:', err)
        setError('Failed to load messages')
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [])

  useEffect(() => {
    if (!socket) return

    // Join chat room
    socket.emit('join', username)

    // Socket event listeners
    const handleMessage = (msg: Message) => {
      setMessages((prev) => {
        const newMessages = [...prev, msg]
        // Save to localStorage
        localStorage.setItem('chatterbox-messages', JSON.stringify(newMessages))
        return newMessages
      })
    }

    const handleUsers = (users: string[]) => {
      setOnlineUsers(users)
    }

    const handleTyping = ({ username: typingUsername, isTyping }: { username: string; isTyping: boolean }) => {
      setTypingUsers(prev => {
        const filtered = prev.filter(user => user.username !== typingUsername)
        if (isTyping) {
          return [...filtered, { username: typingUsername, isTyping: true }]
        }
        return filtered
      })
    }

    const handleClearMessages = () => {
      setMessages([])
      localStorage.removeItem('chatterbox-messages')
    }

    const handleInitialMessages = (initialMessages: Message[]) => {
      setMessages(initialMessages)
      localStorage.setItem('chatterbox-messages', JSON.stringify(initialMessages))
    }

    // Add event listeners
    socket.on('message', handleMessage)
    socket.on('users', handleUsers)
    socket.on('typing', handleTyping)
    socket.on('clearMessages', handleClearMessages)
    socket.on('initialMessages', handleInitialMessages)

    // Cleanup function
    return () => {
      socket.off('message', handleMessage)
      socket.off('users', handleUsers)
      socket.off('typing', handleTyping)
      socket.off('clearMessages', handleClearMessages)
      socket.off('initialMessages', handleInitialMessages)
    }
  }, [socket, username])

  if (!socket || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading chat...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <OnlineUsers users={onlineUsers} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatBox messages={messages} username={username} />
        <TypingIndicator typingUsers={typingUsers} />
      </div>
    </div>
  )
}

export default function ChatPage({ username }: Props) {
  return (
    <SocketProvider>
      <ChatContent username={username} />
    </SocketProvider>
  )
}