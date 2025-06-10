export default function MessageItem({
  message,
  isOwn,
}: {
  message: any
  isOwn: boolean
}) {
  return (
    <div
      className={`p-2 rounded ${
        isOwn ? 'bg-blue-100 text-right ml-auto' : 'bg-white text-left mr-auto'
      }`}
    >
      <div className="text-xs text-gray-500">{message.username}</div>
      <div>{message.text}</div>
      <div className="text-xs text-gray-400">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  )
}
