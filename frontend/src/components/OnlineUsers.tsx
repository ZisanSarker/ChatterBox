interface Props {
  users: string[]
}

export default function OnlineUsers({ users }: Props) {
  return (
    <div className="bg-white border-b p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Online Users ({users.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {users.map((user, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
            {user}
          </span>
        ))}
      </div>
    </div>
  )
}