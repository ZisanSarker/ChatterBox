export default function TypingIndicator({ username }: { username: string | null }) {
  return username ? (
    <div className="text-sm text-gray-500 mt-2">{username} is typing...</div>
  ) : null
}
