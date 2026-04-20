import { dataUrlToBlob, generateQRCodeSVG } from "./qrCodeGenerator";
import { PDF_CONFIG } from "../components/qrcode/constants";
import { DownloadFormat } from "../components/qrcode/QRCodeScreen";

/**
 * Sanitize filename for download
 */
function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Trigger browser download
 */
function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Download QR code as high-resolution PNG
 */
export async function downloadQRCodeAsPNG(
  dataUrl: string,
  restaurantName: string,
): Promise<void> {
  try {
    const blob = dataUrlToBlob(dataUrl);
    const filename = `${sanitizeFilename(restaurantName)}-menu-qr.png`;
    triggerDownload(blob, filename);
  } catch (error) {
    console.error("PNG download error:", error);
    throw new Error("Failed to download PNG");
  }
}

/**
 * Download QR code as SVG (scalable for any print size)
 */
export async function downloadQRCodeAsSVG(
  menuUrl: string,
  restaurantName: string,
): Promise<void> {
  try {
    const svgString = await generateQRCodeSVG(menuUrl);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const filename = `${sanitizeFilename(restaurantName)}-menu-qr.svg`;
    triggerDownload(blob, filename);
  } catch (error) {
    console.error("SVG download error:", error);
    throw new Error("Failed to download SVG");
  }
}

/**
 * Convert a dataUrl to a Uint8Array
 */
function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Download QR code as professional PDF with branding (uses pdf-lib — SSR safe)
 */
export async function downloadQRCodeAsPDF(
  dataUrl: string,
  restaurantName: string,
  menuUrl: string,
): Promise<void> {
  try {
    const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");

    const pdfDoc = await PDFDocument.create();

    // A4 in points: 595 x 842
    const pageWidth = 595;
    const pageHeight = 842;
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Embed fonts
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Embed QR code image
    const qrImageBytes = dataUrlToUint8Array(dataUrl);
    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    const qrSize = PDF_CONFIG.QR_SIZE ?? 150; // pts — adjust to match your config
    const qrX = (pageWidth - qrSize) / 2;
    const qrY = pageHeight - 60 - 30 - qrSize; // top margin + title height + gap

    // --- Restaurant name ---
    const titleFontSize = 24;
    const titleText = restaurantName;
    const titleWidth = helveticaBold.widthOfTextAtSize(titleText, titleFontSize);
    page.drawText(titleText, {
      x: (pageWidth - titleWidth) / 2,
      y: pageHeight - 50,
      size: titleFontSize,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    // --- Subtitle ---
    const subtitleText = "Scan for Digital Menu";
    const subtitleFontSize = 14;
    const subtitleWidth = helvetica.widthOfTextAtSize(subtitleText, subtitleFontSize);
    page.drawText(subtitleText, {
      x: (pageWidth - subtitleWidth) / 2,
      y: pageHeight - 80,
      size: subtitleFontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    });

    // --- QR code ---
    page.drawImage(qrImage, {
      x: qrX,
      y: qrY,
      width: qrSize,
      height: qrSize,
    });

    // --- URL below QR ---
    const urlFontSize = 10;
    const urlWidth = helvetica.widthOfTextAtSize(menuUrl, urlFontSize);
    page.drawText(menuUrl, {
      x: (pageWidth - urlWidth) / 2,
      y: qrY - 20,
      size: urlFontSize,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    });

    // --- Instructions ---
    const instructionsTitleFontSize = 12;
    const instructionsTitle = "Instructions:";
    const instructionsTitleWidth = helvetica.widthOfTextAtSize(
      instructionsTitle,
      instructionsTitleFontSize,
    );
    const instructionsY = qrY - 50;
    page.drawText(instructionsTitle, {
      x: (pageWidth - instructionsTitleWidth) / 2,
      y: instructionsY,
      size: instructionsTitleFontSize,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    const instructions = [
      "1. Open your phone camera app",
      "2. Point it at this QR code",
      "3. Tap the notification to view our menu",
    ];
    instructions.forEach((line, i) => {
      const lineWidth = helvetica.widthOfTextAtSize(line, 10);
      page.drawText(line, {
        x: (pageWidth - lineWidth) / 2,
        y: instructionsY - 18 - i * 16,
        size: 10,
        font: helvetica,
        color: rgb(0.4, 0.4, 0.4),
      });
    });

    // --- Footer ---
    const footerText = "For assistance, please ask your server";
    const footerWidth = helvetica.widthOfTextAtSize(footerText, 8);
    page.drawText(footerText, {
      x: (pageWidth - footerWidth) / 2,
      y: 20,
      size: 8,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    });

    // --- Save & download ---
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const filename = `${sanitizeFilename(restaurantName)}-menu-qr.pdf`;
    triggerDownload(blob, filename);
  } catch (error) {
    console.error("PDF download error:", error);
    throw new Error("Failed to download PDF");
  }
}

/**
 * Main download router
 */
export async function downloadQRCode(
  format: DownloadFormat,
  dataUrl: string,
  menuUrl: string,
  restaurantName: string,
): Promise<void> {
  switch (format) {
    case "png":
      await downloadQRCodeAsPNG(dataUrl, restaurantName);
      break;
    case "svg":
      await downloadQRCodeAsSVG(menuUrl, restaurantName);
      break;
    case "pdf":
      await downloadQRCodeAsPDF(dataUrl, restaurantName, menuUrl);
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}