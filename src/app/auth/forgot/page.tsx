'use client'

import { useState } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export default function Forgot() {
  const [email, setEmail] = useState('')
  const forgot = useAction(api.forgotPassword.forgotPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await forgot({ email })
      alert('Reset link sent to your email!')
    } catch (error) {
      alert('Error: ' + (error as Error).message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-black terminal-texture grid-overlay">
      <div className="w-full max-w-md p-8 terminal-panel crt-scan">
        <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">RESET PASSWORD</h1>
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
        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-acid-cyan hover:text-neon-green">BACK TO LOGIN</a>
        </div>
      </div>
    </div>
  )
}