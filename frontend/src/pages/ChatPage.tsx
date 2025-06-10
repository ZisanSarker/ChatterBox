import React, { useEffect, useState } from 'react'
import { SocketProvider, useSocket } from '../context/SocketContext'
import ChatBox from '../components/ChatBox'
import OnlineUsers from '../components/OnlineUsers'
import TypingIndicator from '../components/TypingIndicator'
import { fetchMessages } from '../services/api'

interface Props {
  username: string
}

function ChatContent({ username }: Props) {
  const socket = useSocket()
  const [messages, setMessages] = useState<any[]>([])
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [typingUser, setTypingUser] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages().then(setMessages)
    socket.emit('join', username)

    socket.on('message', (msg) => setMessages((prev) => [...prev, msg]))
    socket.on('online-users', setOnlineUsers)
    socket.on('typing', setTypingUser)
    socket.on('stop-typing', () => setTypingUser(null))

    return () => {
      socket.off('message')
      socket.off('online-users')
      socket.off('typing')
      socket.off('stop-typing')
    }
  }, [socket, username])

  return (
    <div className="flex flex-col h-screen">
      <OnlineUsers users={onlineUsers} />
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        <ChatBox messages={messages} username={username} />
        <TypingIndicator username={typingUser} />
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
