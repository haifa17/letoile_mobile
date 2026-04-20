import QRCode from 'qrcode'
import { QR_CODE_CONFIG } from '../components/qrcode/constants'


/**
 * Generate high-quality QR code for production use
 */
export async function generateQRCodeDataUrl(text: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: QR_CODE_CONFIG.SIZE,
      margin: QR_CODE_CONFIG.MARGIN,
      errorCorrectionLevel: QR_CODE_CONFIG.ERROR_CORRECTION,
      color: {
        dark: QR_CODE_CONFIG.COLOR.DARK,
        light: QR_CODE_CONFIG.COLOR.LIGHT,
      },
      type: 'image/png',
    })
    return dataUrl
  } catch (error) {
    console.error('QR Code generation error:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Generate SVG QR code for scalable graphics
 */
export async function generateQRCodeSVG(text: string): Promise<string> {
  try {
    const svg = await QRCode.toString(text, {
      type: 'svg',
      margin: QR_CODE_CONFIG.MARGIN,
      errorCorrectionLevel: QR_CODE_CONFIG.ERROR_CORRECTION,
      color: {
        dark: QR_CODE_CONFIG.COLOR.DARK,
        light: QR_CODE_CONFIG.COLOR.LIGHT,
      },
    })
    return svg
  } catch (error) {
    console.error('QR Code SVG generation error:', error)
    throw new Error('Failed to generate QR code SVG')
  }
}

/**
 * Converts a data URL to a Blob
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  
  return new Blob([u8arr], { type: mime })
}