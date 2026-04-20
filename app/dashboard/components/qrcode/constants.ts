export const QR_CODE_CONFIG = {
  SIZE: 400, // High resolution for print quality
  ERROR_CORRECTION: "H" as const, // Highest error correction (30% recovery)
  MARGIN: 2,
  COLOR: {
    DARK: "#000000",
    LIGHT: "#FFFFFF",
  },
  // DPI settings for print
  PRINT_DPI: 300,
  PRINT_SIZE_INCHES: 3, // 3x3 inches for table display
} as const;

export const PDF_CONFIG = {
  FORMAT: "a4" as const,
  ORIENTATION: "portrait" as const,
  UNIT: "mm" as const,
  QR_SIZE: 80, // 80mm QR code size
  MARGIN: 20,
} as const;

export const DOWNLOAD_FORMATS = ["png", "svg", "pdf"] as const;

export const COPY_SUCCESS_DURATION = 2000;

export const MESSAGES = {
  TITLE: "Votre QR Code",
  SUBTITLE: "Imprimez ce QR code  pour que vos clients puissent accéder à votre plateforme numérique",
  DESCRIPTION: "Scannez pour consulter la plateforme numérique du Letoile Mobile",
  COPY_SUCCESS: "Lien copié dans le presse-papiers",
  COPY_ERROR: "Échec de la copie du lien",
  DOWNLOAD_SUCCESS: (format: string) =>
    `QR code téléchargé en ${format.toUpperCase()}`,
  DOWNLOAD_ERROR: "Échec du téléchargement du QR code. Veuillez réessayer.",
  GENERATION_ERROR: "Échec de la génération du QR code",
  TIP_TITLE: "Instructions d'impression",
  TIP_CONTENT:
    "Pour de meilleurs résultats, imprimez sur du papier de haute qualité ou plastifiez pour plus de durabilité. Taille recommandée : minimum 3x3 pouces.",
  RETRY: "Réessayer",
} as const;

