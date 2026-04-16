'use client'

import { useState, useEffect, useRef } from 'react'

export default function SoundCloudPlayer() {
  const [muted, setMuted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    // Avoid loading script twice
    if (document.getElementById('sc-api-script')) {
      initWidget()
      return
    }

    const script = document.createElement('script')
    script.id = 'sc-api-script'
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.async = true
    document.body.appendChild(script)
    script.onload = () => initWidget()
  }, [])

  function initWidget() {
    if (!iframeRef.current) return

    const tryInit = setInterval(() => {
      // @ts-ignore
      if (!window.SC) return

      clearInterval(tryInit)

      // @ts-ignore
      const widget = window.SC.Widget(iframeRef.current)
      widgetRef.current = widget

      widget.bind(
        // @ts-ignore
        window.SC.Widget.Events.READY,
        () => {
          widget.play()

          // @ts-ignore
          widget.bind(window.SC.Widget.Events.FINISH, () => {
            setTimeout(() => {
              widget.seekTo(0)
              widget.play()
            }, 300)
          })
        }
      )
    }, 100)
  }

  const toggleMute = () => {
    const widget = widgetRef.current
    if (!widget) return
    if (muted) {
      widget.setVolume(100)
    } else {
      widget.setVolume(0)
    }
    setMuted(!muted)
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        id="sc-player"
        width="0"
        height="0"
        style={{ position: 'absolute', pointerEvents: 'none' }}
        scrolling="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https://soundcloud.com/brigaderouge/06-piste-06&auto_play=true&hide_related=true&show_artwork=false&show_comments=false"
      />

      <button
        onClick={toggleMute}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: '#1a1a2e',
          border: '1px solid #ffffff30',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={muted ? 'Activer la musique' : 'Couper la musique'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </>
  )
}