import { useState, useRef, useEffect } from 'react'
import { fetchTTS } from './services/api'

const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window

// Mini waveform bars (decorative)
function Waveform({ active }) {
  const heights = [3, 6, 10, 7, 4, 8, 12, 6, 3, 9, 5, 11, 4, 7, 3]
  return (
    <div className="flex items-center gap-0.5 h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-300 ${active ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          style={{
            height: `${h * (active ? 1 : 0.5)}px`,
            animationDelay: `${i * 60}ms`,
            animation: active ? `bounce 0.8s ease-in-out ${i * 60}ms infinite alternate` : 'none',
          }}
        />
      ))}
    </div>
  )
}

function TTSPlayer({ text, enabled, onToggle, persona = '', query = '' }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const audioRef = useRef(null)
  const utteranceRef = useRef(null)
  const intervalRef = useRef(null)

  const canPlay = enabled && !!text && hasSpeechSynthesis

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      if (audioRef.current) audioRef.current.pause()
      if (hasSpeechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  function startProgressTimer(duration) {
    const start = Date.now()
    intervalRef.current = setInterval(() => {
      const secs = Math.floor((Date.now() - start) / 1000)
      setElapsed(secs)
      setProgress(duration > 0 ? Math.min((secs / duration) * 100, 100) : 0)
    }, 500)
  }

  function stopProgress() {
    clearInterval(intervalRef.current)
    setIsPlaying(false)
    setProgress(0)
    setElapsed(0)
  }

  async function handlePlay() {
    if (!canPlay) return
    if (audioRef.current) audioRef.current.pause()
    if (hasSpeechSynthesis) window.speechSynthesis.cancel()
    clearInterval(intervalRef.current)

    const result = await fetchTTS({ persona, query })

    if (result?.audioUrl) {
      const audio = new Audio(result.audioUrl)
      audioRef.current = audio
      audio.addEventListener('loadedmetadata', () => startProgressTimer(audio.duration))
      audio.addEventListener('ended', stopProgress)
      audio.play()
      setIsPlaying(true)
      return
    }

    if (hasSpeechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      utteranceRef.current = utterance
      const wordCount = text.split(/\s+/).length
      const estimatedDuration = Math.max((wordCount / 150) * 60, 5)
      utterance.onstart = () => { setIsPlaying(true); startProgressTimer(estimatedDuration) }
      utterance.onend = stopProgress
      utterance.onerror = stopProgress
      window.speechSynthesis.speak(utterance)
    }
  }

  function handlePause() {
    if (audioRef.current) audioRef.current.pause()
    if (hasSpeechSynthesis) window.speechSynthesis.pause()
    clearInterval(intervalRef.current)
    setIsPlaying(false)
  }

  function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎙️</span>
          <h2 className="text-lg font-bold text-red-700 dark:text-red-400">Audio Briefing</h2>
        </div>

        {/* toggle */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {enabled ? 'Enabled' : 'Disabled'}
          </span>
          <button
            onClick={onToggle}
            aria-label="Toggle TTS"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 ${
              enabled ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* player body */}
      <div className="p-6 space-y-4">
        {/* waveform + controls */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3 border border-gray-100 dark:border-gray-600">
          {/* waveform */}
          <div className="flex items-center justify-center py-1">
            <Waveform active={isPlaying} />
          </div>

          {/* progress bar */}
          <div
            className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 cursor-pointer overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
          >
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* controls row */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono tabular-nums">
              {formatTime(elapsed)}
            </span>

            <div className="relative group">
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                disabled={!canPlay}
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  canPlay
                    ? 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white shadow-sm hover:shadow-md hover:shadow-red-900/20'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                {isPlaying ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Play Audio
                  </>
                )}
              </button>

              {!hasSpeechSynthesis && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  Speech synthesis not supported in this browser
                </div>
              )}
            </div>

            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">--:--</span>
          </div>
        </div>

        {/* status messages */}
        {!enabled && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Enable TTS above to activate audio playback.
          </p>
        )}
        {enabled && !text && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Generate an AI Briefing first to enable audio playback.
          </p>
        )}
      </div>
    </div>
  )
}

export default TTSPlayer
