import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [portalElement, setPortalElement] = useState<Element | null>(null)
  const [dropdownStyle, setDropdownStyle] = useState({})
  const [loggingOut, setLoggingOut] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setPortalElement(document.body)
  }, [])

  useEffect(() => {
    if (menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left - 10,
        zIndex: 10,
      })
    }
  }, [menuOpen])

  const handleLogout = () => {
    setLoggingOut(true)
    setTimeout(() => {
      localStorage.removeItem('userId')
      window.location.href = '/'
    }, 1500)
  }

  return (
    <>
      <header className="bg-carbon-matte shadow-elevation-1 p-4 flex items-center justify-between terminal-texture grid-overlay">
        <Image src="/IMG_0119.JPG" alt="Logo" width={40} height={40} className="rounded-full crt-scan chromatic-aberration" />
        <div className="flex items-center space-x-2">
        <button onClick={handleLogout} className="terminal-panel px-3 py-1 !text-red-500 hover:bg-carbon-matte transition-colors">LOGOUT</button>
        <button ref={buttonRef} onClick={() => setMenuOpen(!menuOpen)} className="terminal-panel px-3 py-1 text-text-primary hover:bg-carbon-matte transition-colors">MENU</button>
      </div>
      </header>
      {portalElement && menuOpen && createPortal(
        <div style={dropdownStyle} className="terminal-panel p-4 border-2 border-neon-green crt-scan">
          <button className="block mb-2 text-acid-cyan hover:text-neon-green transition-colors">CONFIG</button>
          <button className="block mb-2 text-acid-cyan hover:text-neon-green transition-colors">SECURITY</button>
          <button className="block text-acid-cyan hover:text-neon-green transition-colors">SESSIONS</button>
        </div>,
        portalElement
      )}
      {loggingOut && (
        <div className="fixed inset-0 bg-deep-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="terminal-panel p-6 crt-scan">
            <p className="text-text-primary text-lg">LOGGING OUT...</p>
          </div>
        </div>
      )}
    </>
  )
}