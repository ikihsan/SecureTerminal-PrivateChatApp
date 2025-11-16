interface TabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex border-b border-border-panel">
      <button
        className={`flex-1 py-2 text-center ${activeTab === 'private' ? 'text-deep-black bg-neon-green' : 'text-text-primary'} transition-colors`}
        onClick={() => onTabChange('private')}
      >
        PRIVATE
      </button>
      <button
        className={`flex-1 py-2 text-center ${activeTab === 'rooms' ? 'text-deep-black bg-neon-green' : 'text-text-primary'} transition-colors`}
        onClick={() => onTabChange('rooms')}
      >
        ROOMS
      </button>
      <button
        className={`flex-1 py-2 text-center ${activeTab === 'channels' ? 'text-deep-black bg-neon-green' : 'text-text-primary'} transition-colors`}
        onClick={() => onTabChange('channels')}
      >
        CHANNELS
      </button>
    </div>
  )
}