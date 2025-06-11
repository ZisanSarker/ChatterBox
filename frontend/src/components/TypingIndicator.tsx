interface Props {
  typingUsers: { username: string; isTyping: boolean }[]
}

export default function TypingIndicator({ typingUsers }: Props) {
  const activeTypers = typingUsers.filter(user => user.isTyping)
  
  if (activeTypers.length === 0) return null

  const typingText = activeTypers.length === 1 
    ? `${activeTypers[0].username} is typing...`
    : `${activeTypers.map(u => u.username).join(', ')} are typing...`

  return (
    <div className="flex items-center space-x-2 p-2 text-sm text-gray-500">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span>{typingText}</span>
    </div>
  )
}