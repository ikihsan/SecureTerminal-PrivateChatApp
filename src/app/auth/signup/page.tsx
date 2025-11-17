'use client'

import { useState } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import PrivacyModal from '../../../components/PrivacyModal'

export default function Signup() {
  const [realName, setRealName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [connectionCode, setConnectionCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [error, setError] = useState('')
  const signup = useAction(api.auth.signup)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const result = await signup({ realName, email, username, connectionCode, password })
      localStorage.setItem('userId', result.userId)
      setShowPrivacy(true)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  if (showPrivacy) {
    return <PrivacyModal onAccept={() => window.location.href = '/app/dashboard'} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-black terminal-texture grid-overlay">
      <div className="w-full max-w-md p-6 sm:p-8 terminal-panel crt-scan">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 text-center">REGISTER</h1>
        {error && <p className="text-amber mb-4 text-center text-sm sm:text-base">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="> Real Name"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
            className="input-terminal w-full"
          />
          <input
            type="email"
            placeholder="> Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-terminal w-full"
          />
          <input
            type="text"
            placeholder="> Username"
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
          <p className="text-xs text-gray-500 mt-1">Note:Used further for adding connections.</p>
          <input
            type="password"
            placeholder="> Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-terminal w-full"
          />
          <button type="submit" className="button-terminal w-full">REGISTER</button>
        </form>
        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-acid-cyan text-base hover:text-neon-green">LOGIN</a>
        </div>
      </div>
    </div>
  )
}