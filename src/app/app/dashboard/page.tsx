'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import Header from '../../../components/Header'
import Tabs from '../../../components/Tabs'
import Fab from '../../../components/Fab'

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('private')
  const [userId, setUserId] = useState<string | null>(null)
  const connections = useQuery(api.connections.getConnections, userId ? { userId: userId as any } : 'skip')
  const user = useQuery(api.users.getById, userId ? { id: userId as any } : 'skip')

  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  }, [])

  return (
    <div className="min-h-screen bg-deep-black terminal-texture grid-overlay">
      <Header />
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 crt-scan">ACCESS GRANTED: {user?.username?.toUpperCase() || 'ANONYMOUS'}</h1>
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'private' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-acid-cyan">PRIVATE CONNECTIONS</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {connections?.map((conn: any) => {
                  const otherName = conn.userA === userId ? conn.userBName : conn.userAName;
                  return (
                    <div key={conn._id} className="terminal-panel cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 crt-scan kernel-ripple" onClick={() => window.location.href = `/app/chat/${conn.conversationId}`}>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gunmetal-gold rounded-full flex items-center justify-center text-deep-black font-bold text-lg led-pulse">
                          {otherName?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-neon-green text-lg">{otherName}</div>
                          <div className="text-sm text-text-muted">Tap to connect</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {activeTab === 'rooms' && <div className="text-text-muted">ROOMS LIST</div>}
          {activeTab === 'channels' && <div className="text-text-muted">CHANNELS LIST</div>}
        </div>
      </div>
      <Fab />
    </div>
  )
}