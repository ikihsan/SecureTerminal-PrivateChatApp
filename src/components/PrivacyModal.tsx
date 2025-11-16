interface PrivacyModalProps {
  onAccept: () => void
}

export default function PrivacyModal({ onAccept }: PrivacyModalProps) {
  return (
    <div className="fixed inset-0 bg-deep-black bg-opacity-80 flex items-center justify-center">
      <div className="terminal-panel p-8 max-w-md mx-4 crt-scan">
        <h2 className="text-xl font-bold text-text-primary mb-4">SECURITY PROTOCOL</h2>
        <p className="text-text-muted mb-4">
          1. Payloads (media) auto-destruct from servers and UI within 24h or selected TTL.
        </p>
        <p className="text-text-muted mb-4">
          2. Transmissions retained 30 days for sync; permanent deletion thereafter.
        </p>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 led-pulse" />
            <span className="text-text-primary">Enable E2E Encryption: Messages undecryptable by servers.</span>
          </label>
        </div>
        <button onClick={onAccept} className="button-terminal w-full">ACCEPT & PROCEED</button>
      </div>
    </div>
  )
}