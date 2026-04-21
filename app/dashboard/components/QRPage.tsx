import React from "react";
import { Card } from "@/components/ui/card";
import { useQRCodeGeneration } from "../queries/useQRCodeGeneration";
import { useQRCodeActions } from "../queries/useQRCodeActions";
import { MESSAGES } from "./qrcode/constants";
import { QRCodeDisplay } from "./qrcode/QRCodeDisplay";

const URL = "https://letoile-mobile.vercel.app/";
export function QRCodePage() {
  try {
  } catch (error) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="p-6 text-center border-destructive">
          <p className="text-destructive font-medium">
            Configuration du restaurant invalide{" "}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Veuillez consulter l'URL du restaurant{" "}
          </p>
        </Card>
      </div>
    );
  }

  const { qrCodeDataUrl, isGenerating, error, retry } =
    useQRCodeGeneration(URL);
  const { copied, isDownloading, handleCopyLink, handleDownloadQR } =
    useQRCodeActions(URL, qrCodeDataUrl, "LETOILE MOBILE");

  return (
    <div className=" space-y-6">
      {/* Header */}
      <header className=" space-y-1">
        <h1 className="text-2xl font-heading font-bold ">
          {MESSAGES.TITLE}
        </h1>
        <p className="text-muted-foreground ">{MESSAGES.SUBTITLE}</p>
        <p className="text-xs text-muted-foreground  ">LETOILE MOBILE</p>
      </header>

      {/* Main QR Code Display */}
      <QRCodeDisplay
        menuUrl={URL}
        qrCodeDataUrl={qrCodeDataUrl}
        onCopyLink={handleCopyLink}
        onDownload={handleDownloadQR}
        onRetry={retry}
        copied={copied}
        isGenerating={isGenerating}
        hasError={!!error}
      />

      {/* Print Guidelines */}
      <Card className="p-4  border-primary/20">
        <h3 className="font-semibold  text-sm  flex items-center gap-2">
          <span role="img" aria-label="Tip">
            💡
          </span>
          {MESSAGES.TIP_TITLE}
        </h3>
        <p className="text-sm leading-relaxed">{MESSAGES.TIP_CONTENT}</p>
      </Card>
    </div>
  );
}
