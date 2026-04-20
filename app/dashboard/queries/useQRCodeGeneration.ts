"use client"
import { useState, useEffect, useCallback } from "react"
import { generateQRCodeDataUrl } from "../services/qrCodeGenerator"

export function useQRCodeGeneration(url: string) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const generate = useCallback(async () => {
    try {
      setIsGenerating(true)
      setError(null)
      
      const dataUrl = await generateQRCodeDataUrl(url)
      setQrCodeDataUrl(dataUrl)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('QR generation failed:', err)
    } finally {
      setIsGenerating(false)
    }
  }, [url])

  useEffect(() => {
    generate()
  }, [generate])

  const retry = useCallback(() => {
    generate()
  }, [generate])

  return { 
    qrCodeDataUrl, 
    isGenerating, 
    error: error?.message || null,
    retry 
  }
}