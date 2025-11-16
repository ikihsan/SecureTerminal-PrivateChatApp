import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-carbon-matte shadow-elevation-1 p-4 flex items-center justify-between relative terminal-texture grid-overlay">
      <Image src="/IMG_0119.JPG" alt="Logo" width={40} height={40} className="rounded-full led-pulse" />
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-neon-green text-2xl font-bold hover:text-acid-cyan transition-colors chromatic-aberration">⋮</button>
      {menuOpen && (
        <div className="absolute top-16 right-4 terminal-panel p-4 z-10 border-2 border-neon-green crt-scan">
          <button className="block mb-2 text-acid-cyan hover:text-neon-green transition-colors">CONFIG</button>
          <button className="block mb-2 text-acid-cyan hover:text-neon-green transition-colors">SECURITY</button>
          <button className="block text-acid-cyan hover:text-neon-green transition-colors">SESSIONS</button>
        </div>
      )}
    </header>
  )
}