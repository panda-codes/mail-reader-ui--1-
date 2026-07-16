"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type SpeechStatus = "ready" | "reading" | "paused" | "finished"

export interface SpeechConfig {
  voiceURI?: string
  rate?: number
  pitch?: number
}

/**
 * Wraps the browser Web Speech API (SpeechSynthesis) to read a queue of
 * strings aloud with Start / Pause / Resume / Stop controls. Only one
 * utterance queue runs at a time — starting again always cancels the previous.
 */
export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [status, setStatus] = useState<SpeechStatus>("ready")
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [supported, setSupported] = useState(true)

  const queueRef = useRef<string[]>([])
  const indexRef = useRef(0)
  // A session token guards against stale onend callbacks firing after stop/start.
  const sessionRef = useRef(0)
  const configRef = useRef<Required<SpeechConfig>>({ voiceURI: "", rate: 1, pitch: 1 })

  // Load available system voices and keep them in sync via onvoiceschanged.
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false)
      return
    }
    const synth = window.speechSynthesis
    const loadVoices = () => setVoices(synth.getVoices())
    loadVoices()
    synth.addEventListener("voiceschanged", loadVoices)
    return () => {
      synth.removeEventListener("voiceschanged", loadVoices)
      synth.cancel()
    }
  }, [])

  const speakFrom = useCallback((session: number) => {
    if (session !== sessionRef.current) return
    const synth = window.speechSynthesis
    const queue = queueRef.current

    if (indexRef.current >= queue.length) {
      setStatus("finished")
      setCurrentIndex(-1)
      return
    }

    setCurrentIndex(indexRef.current)
    const utterance = new SpeechSynthesisUtterance(queue[indexRef.current])
    const { voiceURI, rate, pitch } = configRef.current
    const selectedVoice = synth.getVoices().find((v) => v.voiceURI === voiceURI)
    if (selectedVoice) utterance.voice = selectedVoice
    utterance.rate = rate
    utterance.pitch = pitch

    utterance.onend = () => {
      // Ignore callbacks from a cancelled/replaced session.
      if (session !== sessionRef.current) return
      indexRef.current += 1
      speakFrom(session)
    }
    utterance.onerror = () => {
      if (session !== sessionRef.current) return
      indexRef.current += 1
      speakFrom(session)
    }

    synth.speak(utterance)
  }, [])

  const start = useCallback(
    (items: string[], config: SpeechConfig = {}) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return
      const synth = window.speechSynthesis
      // Prevent overlapping speech instances.
      synth.cancel()
      configRef.current = {
        voiceURI: config.voiceURI ?? "",
        rate: config.rate ?? 1,
        pitch: config.pitch ?? 1,
      }
      queueRef.current = items
      indexRef.current = 0
      sessionRef.current += 1
      setStatus("reading")
      speakFrom(sessionRef.current)
    },
    [speakFrom],
  )

  const pause = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    const synth = window.speechSynthesis
    if (synth.speaking && !synth.paused) {
      synth.pause()
      setStatus("paused")
    }
  }, [])

  const resume = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    const synth = window.speechSynthesis
    if (synth.paused) {
      synth.resume()
      setStatus("reading")
    }
  }, [])

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    // Invalidate the current session so pending onend callbacks are ignored.
    sessionRef.current += 1
    window.speechSynthesis.cancel()
    indexRef.current = 0
    setCurrentIndex(-1)
    setStatus("ready")
  }, [])

  return { voices, status, currentIndex, supported, start, pause, resume, stop }
}
