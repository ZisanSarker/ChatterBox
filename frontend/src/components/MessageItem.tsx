interface Message {
  username: string
  text: string
  createdAt: string
}

interface Props {
  message: Message
  isOwn: boolean
}

export default function MessageItem({ message, isOwn }: Props) {
  return (
    <div
      className={`p-3 rounded-lg max-w-xs ${
        isOwn 
          ? 'bg-blue-500 text-white ml-auto' 
          : 'bg-white border shadow-sm mr-auto'
      }`}
    >
      {!isOwn && (
        <div className="text-xs text-gray-500 mb-1 font-medium">
          {message.username}
        </div>
      )}
      <div className="text-sm">{message.text}</div>
      <div className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  )
}