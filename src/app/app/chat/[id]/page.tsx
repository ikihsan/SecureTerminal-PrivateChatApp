'use client'

import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useAction, useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import { api } from 'convex/_generated/api'
import Image from 'next/image'
import Header from '../../../../components/Header'

export const dynamic = 'force-dynamic'

export default function Chat() {
  const { id } = useParams()
  const [userId, setUserId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [ttl, setTtl] = useState('30')
  const [error, setError] = useState('')
  const messages = useQuery(api.messages.getByConversation, { conversationId: id as any })
  const sendMessage = useMutation(api.messages.send)
  const generateUploadUrl = useAction(api.media.generateUploadUrl)
  const getStorageUrl = useAction(api.media.getStorageUrl)
  const convex = useConvex()
  const baseUrl = convex.url
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const fetchUrls = async () => {
      if (!messages) return
      const urls: Record<string, string> = {}
      for (const msg of messages) {
        if (msg.mediaMeta?.storageId && !mediaUrls[msg.mediaMeta.storageId]) {
          try {
            const url = await getStorageUrl({ storageId: msg.mediaMeta.storageId })
            if (url) urls[msg.mediaMeta.storageId] = url
          } catch (e) {
            console.error('Failed to get storage URL:', e)
          }
        }
      }
      setMediaUrls(prev => ({ ...prev, ...urls }))
    }
    fetchUrls()
  }, [messages, getStorageUrl, mediaUrls])

  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  }, [])

  useEffect(() => {
    console.log('User ID:', userId)
    console.log('Messages:', messages)
    if (messages) {
      messages.forEach((msg, index) => {
        console.log(`Message ${index}:`, { id: msg._id, authorId: msg.authorId, text: msg.text, createdAt: msg.createdAt })
      })
    }
  }, [userId, messages])

  const handleSend = async () => {
    if (!message.trim() && !file) return
    if (!userId) return
    setError('')
    let mediaMeta = undefined
    if (file) {
      try {
        const ttlSec = parseInt(ttl)
        const uploadUrl = await generateUploadUrl({ ttlSec })
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': file.type },
          body: file,
        })
        const { storageId } = await response.json()
        mediaMeta = {
          storageId,
          mime: file.type,
          size: file.size,
          ttlSec,
          expiresAt: Date.now() + ttlSec * 1000,
        }
      } catch (err) {
        setError('Upload failed: ' + (err as Error).message)
        return
      }
    }
    await sendMessage({ conversationId: id as any, text: message, authorId: userId as any, mediaMeta })
    setMessage('')
    setFile(null)
  }

  return (
    <div className="min-h-screen bg-deep-black terminal-texture grid-overlay">
      <Header />
      <div className="p-4">
        {error && <p className="text-amber mb-4 text-center">{error}</p>}
        <div className="space-y-4 mb-4 h-96 overflow-y-auto p-4 terminal-panel">
          {messages ? (
            messages.map((msg: any) => (
              <div key={msg._id} className={`flex ${msg.authorId === userId ? 'justify-end' : 'justify-start'}`}>
                <div className={`${msg.authorId === userId ? 'message-outgoing' : 'message-incoming'} relative overflow-hidden crt-scan`}>
                  {msg.mediaMeta && (
                    <div className="mb-2">
                      {mediaUrls[msg.mediaMeta.storageId] ? (
                        msg.mediaMeta.mime.startsWith('image/') ? (
                          <Image src={mediaUrls[msg.mediaMeta.storageId]} alt="Media" width={500} height={300} className="max-w-full rounded max-h-64 shadow-elevation-1 hover:scale-105 transition-transform duration-300 chromatic-aberration object-cover" />
                        ) : msg.mediaMeta.mime.startsWith('video/') ? (
                          <video src={mediaUrls[msg.mediaMeta.storageId]} controls className="max-w-full rounded max-h-64 shadow-elevation-1" />
                        ) : (
                          <a href={mediaUrls[msg.mediaMeta.storageId]} target="_blank" rel="noopener noreferrer" className="text-acid-cyan underline hover:text-neon-green transition-colors">DOWNLOAD PAYLOAD</a>
                        )
                      ) : (
                        <div className="text-sm text-text-muted led-pulse">Loading payload...</div>
                      )}
                    </div>
                  )}
                  {msg.text && <div className="break-words">{msg.text}</div>}
                  <div className="message-timestamp">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-text-muted">Loading messages...</div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-end">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="input-terminal flex-1 px-4 py-3 bg-carbon-matte text-text-primary text-base"
            placeholder="> Message"
          />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="input-terminal px-3 py-2 bg-carbon-matte text-text-primary text-sm sm:text-base"
          />
          <select
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            className="input-terminal px-3 py-2 bg-carbon-matte text-text-primary text-sm sm:text-base"
          >
            <option value="10">10s</option>
            <option value="30">30s</option>
            <option value="60">1m</option>
            <option value="300">5m</option>
          </select>
          <button onClick={handleSend} className="button-terminal text-base">TRANSMIT</button>
        </div>
      </div>
    </div>
  )
}