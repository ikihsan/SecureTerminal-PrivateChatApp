'use client'

import { useState } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = useAction(api.auth.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    // Compute device hash
    let uuid = localStorage.getItem('deviceUUID')
    if (!uuid) {
      uuid = crypto.randomUUID()
      localStorage.setItem('deviceUUID', uuid)
    }
    const deviceHash = btoa(uuid + navigator.userAgent + screen.width + screen.height).slice(0, 64)
    try {
      const result = await login({ identifier, password, deviceHash })
      localStorage.setItem('userId', result.userId)
      window.location.href = '/app/dashboard'
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-black terminal-texture grid-overlay">
      <div className="w-full max-w-md p-6 sm:p-8 terminal-panel crt-scan">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 text-center">LOGIN</h1>
        {error && <p className="text-amber mb-4 text-center text-sm sm:text-base">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="> Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="input-terminal w-full"
          />
          <input
            type="password"
            placeholder="> Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-terminal w-full"
          />
          <button type="submit" className="button-terminal w-full text-lg">AUTHENTICATE</button>
        </form>
        <div className="mt-4 text-center">
          <a href="/auth/signup" className="text-acid-cyan text-base hover:text-neon-green">REGISTER</a> | <a href="/auth/forgot" className="text-acid-cyan text-base hover:text-neon-green">RESET</a>
        </div>
      </div>
    </div>
  )
}