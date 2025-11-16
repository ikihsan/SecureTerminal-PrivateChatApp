import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

interface ConnectPrivateModalProps {
  onClose: () => void
}

export default function ConnectPrivateModal({ onClose }: ConnectPrivateModalProps) {
  const [username, setUsername] = useState('')
  const [connectionCode, setConnectionCode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const connect = useMutation(api.connections.createRequest)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId') as any
    setError('')
    try {
      await connect({ targetUsername: username, connectionCode, currentUserId: userId })
      setMessage('Handshake initiated!')
      setTimeout(() => onClose(), 2000)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="fixed inset-0 bg-deep-black bg-opacity-80 flex items-center justify-center">
      <div className="terminal-panel p-8 max-w-md mx-4 crt-scan">
        <h2 className="text-xl font-bold text-text-primary mb-4">INITIATE HANDSHAKE</h2>
        {message ? (
          <p className="text-green-500 text-center">{message}</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="> Target Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-terminal w-full"
            />
            <input
              type="text"
              placeholder="> Connection Code"
              value={connectionCode}
              onChange={(e) => setConnectionCode(e.target.value)}
              className="input-terminal w-full"
            />
            <button type="submit" className="button-terminal w-full">CONNECT</button>
          </form>
        )}
        {!message && <button onClick={onClose} className="mt-4 text-text-muted hover:text-acid-cyan">ABORT</button>}
      </div>
    </div>
  )
}