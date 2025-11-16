import { useState } from 'react'
import ConnectPrivateModal from './ConnectPrivateModal'

export default function Fab() {
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [connectOpen, setConnectOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button
          className="w-14 h-14 bg-neon-green rounded-full shadow-elevation-1 flex items-center justify-center text-2xl text-deep-black kernel-ripple"
          onClick={() => setOptionsOpen(!optionsOpen)}
        >
          +
        </button>
        {optionsOpen && (
          <div className="absolute bottom-16 right-0 space-y-2">
            <button className="block w-48 py-2 terminal-panel text-text-primary crt-scan" onClick={() => { setConnectOpen(true); setOptionsOpen(false) }}>CONNECT PRIVATE</button>
            <button className="block w-48 py-2 terminal-panel text-text-primary crt-scan">CREATE ROOM</button>
            <button className="block w-48 py-2 terminal-panel text-text-primary crt-scan">SUBSCRIBE CHANNEL</button>
          </div>
        )}
      </div>
      {connectOpen && <ConnectPrivateModal onClose={() => setConnectOpen(false)} />}
    </>
  )
}