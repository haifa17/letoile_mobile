import { Download, Copy, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QRCodePlaceholder } from "./QRCodePlaceholder";
import { DOWNLOAD_FORMATS, MESSAGES } from "./constants";
export type DownloadFormat = (typeof DOWNLOAD_FORMATS)[number];

export interface QRCodeDisplayProps {
  menuUrl: string;
  qrCodeDataUrl: string;
  onCopyLink: () => void;
  onDownload: (format: DownloadFormat) => void;
  onRetry: () => void;
  copied: boolean;
  isGenerating: boolean;
  hasError: boolean;
}
export function QRCodeDisplay({
  menuUrl,
  qrCodeDataUrl,
  onCopyLink,
  onDownload,
  onRetry,
  copied,
  isGenerating,
  hasError,
}: QRCodeDisplayProps) {
  return (
    <Card className="p-8 ">
      <div className="flex flex-col items-center">
        {/* QR Code Display */}
        <div
          className="w-64 h-64 bg-white border-2 border-border rounded-xl p-4 mb-6 flex items-center justify-center shadow-sm"
          role="img"
          aria-label=" QR code"
        >
          {hasError ? (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <AlertCircle className="h-12 w-12 text-destructive mb-3" />
              <p className="text-sm text-muted-foreground mb-3">
                {MESSAGES.GENERATION_ERROR}
              </p>
              <Button onClick={onRetry} variant="outline" size="sm">
                {MESSAGES.RETRY}
              </Button>
            </div>
          ) : isGenerating || !qrCodeDataUrl ? (
            <QRCodePlaceholder />
          ) : (
            <img
              src={qrCodeDataUrl}
              alt="QR Code for restaurant menu"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <p className="text-sm  text-center mb-6">
          {MESSAGES.DESCRIPTION}
        </p>

        {/* Menu URL Display */}
        <div
          className="w-full p-3 bg-muted rounded-lg mb-6"
          role="region"
          aria-label=" URL"
        >
          <p className="text-xs text-center text-muted-foreground break-all font-mono">
            {menuUrl}
          </p>
        </div>

        {/* Download Format Info */}
        {!hasError && !isGenerating && (
          <Alert className="mb-4 bg-white/80">
            <AlertDescription className="text-xs text-black">
              <strong>PNG :</strong> • Idéal pour une utilisation digitale{" "}
              <strong>SVG :</strong> • Parfait pour les impressions grand format{" "}
              <strong>PDF :</strong> • Prêt à imprimer avec instructions
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {DOWNLOAD_FORMATS.map((format) => (
              <Button
                key={format}
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => onDownload(format)}
                disabled={isGenerating || hasError}
                aria-label={`Télécharger le QR code en ${format.toUpperCase()}`}
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {format.toUpperCase()}
              </Button>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full gap-2"
            onClick={onCopyLink}
            disabled={isGenerating}
            aria-label={copied ? "Lien copié" : "Copier le lien du menu"}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Copié !              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                Copier le lien du menu
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
