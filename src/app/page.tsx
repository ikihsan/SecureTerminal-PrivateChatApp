'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function Home() {
  const [code, setCode] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [banned, setBanned] = useState(false)
  const authorize = useAction(api.authorizeEntryCode.authorizeEntryCode)

  console.log('key = anonymous')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Compute device hash
    let uuid = localStorage.getItem('deviceUUID')
    if (!uuid) {
      uuid = crypto.randomUUID()
      localStorage.setItem('deviceUUID', uuid)
    }
    const deviceHash = btoa(uuid + navigator.userAgent + screen.width + screen.height).slice(0, 64)
    // Get real IP
    let ip = '127.0.0.1'
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      ip = data.ip
    } catch (e) {
      // fallback
    }
    const result = await authorize({ code, deviceHash, ip })
    if (result.status === 'ok') {
      window.location.href = '/auth/login'
    } else if (result.status === 'banned') {
      setBanned(true)
    } else {
      setAttempts(result.attemptsLeft ? 3 - result.attemptsLeft : 0)
    }
  }

  if (banned) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep-black terminal-texture grid-overlay">
        <div className="text-center crt-scan terminal-panel">
          <Image src="/IMG_0119.JPG" alt="Logo" width={100} height={100} className="mx-auto mb-4 rounded-full shadow-elevation-1 chromatic-aberration" />
          <h1 className="text-xl font-bold text-amber mb-4">ACCESS DENIED</h1>
          <p className="text-text-muted mb-4">Too many failed attempts. Retry later.</p>
          <button className="button-terminal" onClick={() => window.open('mailto:support@example.com')}>CONTACT SUPPORT</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-black terminal-texture grid-overlay">
      <div className="text-center crt-scan terminal-panel">
        <Image src="/IMG_0119.JPG" alt="Logo" width={100} height={100} className="mx-auto mb-4 rounded-full shadow-elevation-1 chromatic-aberration" />
        <h1 className="text-2xl font-bold text-text-primary mb-2">SECURE TERMINAL v2.0</h1>
        <p className="text-text-muted mb-8">Initializing secure channel...</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="> Enter Access Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input-terminal w-full"
          />
          <button type="submit" className="button-terminal text-text-primary">EXECUTE</button>
        </form>
        <p className="text-text-muted text-sm mt-4 crt-scan">HACKER HINT: Check console.</p>
        {attempts > 0 && (
          <p className="text-amber mt-4">
            {attempts === 1 ? 'Last attempt.' : attempts === 2 ? 'One more try.' : 'Warning: attempts low.'}
          </p>
        )}
      </div>
    </div>
  )
}