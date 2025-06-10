export default function OnlineUsers({ users }: { users: string[] }) {
  return (
    <div className="bg-white border-b px-4 py-2 text-sm text-gray-600">
      Online: {users.join(', ')}
    </div>
  )
}
