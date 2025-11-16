'use client'

import { useState } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export default function Forgot() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const forgot = useAction(api.forgotPassword.forgotPassword)

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!isValidEmail(email)) {
      setError('INVALID EMAIL FORMAT DETECTED')
      return
    }
    try {
      await forgot({ email })
      setMessage('PASSWORD IS YOUR DIGITAL KEY. LOST KEYS CANNOT BE RECOVERED. FORGE A NEW ONE.')
    } catch (err) {
      setError('SYSTEM ERROR - UNABLE TO PROCESS REQUEST')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-black terminal-texture grid-overlay">
      <div className="w-full max-w-md p-8 terminal-panel crt-scan">
        <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">RESET PASSWORD</h1>
        {message ? (
          <p className="text-green-500 text-center crt-scan">{message}</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="> Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-terminal w-full"
            />
            <button type="submit" className="button-terminal w-full">SEND RESET LINK</button>
          </form>
        )}
        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-acid-cyan hover:text-neon-green">BACK TO LOGIN</a>
        </div>
      </div>
    </div>
  )
}