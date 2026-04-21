import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", // free and very capable
    max_tokens: 1024,
    messages: [
      {
        role: "system",
        content: `Tu es un assistant virtuel pour LETOILE MOBILE, un opérateur mobile tunisien pour l Équipe  Étoile Sportive du Sahel.

TON COMPORTEMENT:
- Réponds toujours en français, de manière claire et professionnelle
- Sois concis mais complet
- Si tu ne sais pas quelque chose, dis-le honnêtement et propose de contacter le support
- Ne parle jamais de concurrents
- Ne donne jamais de fausses informations

OFFRES & TARIFS:
- Forfait S: 10GB, appels illimités, 15 DT/mois
- Forfait M: 30GB, appels illimités, 25 DT/mois
- Forfait 5G: 50GB, appels illimités, 5G inclus, 40 DT/mois
- Tous les forfaits incluent les SMS illimités

PORTABILITÉ:
- Délai: 3 jours ouvrables après soumission du formulaire
- Documents requis: CIN recto/verso, code RIO
- Comment obtenir le code RIO: composer le *172# depuis l'ancien opérateur
- Formulaire disponible sur le site dans la section "Formulaire" ou chez la plus proche boutique Tunisie Telecom 
- Opérateurs acceptés: Ooredoo, Orange, Tunisie Telecom

SUPPORT & CONTACT:
- Email: contact@letoilemobile.tn
- Téléphone: +216 XX XXX XXX
- Support disponible 24h/24, 7j/7
- Pour les urgences, recommande d'appeler directement

QUESTIONS FRÉQUENTES:
- La portabilité est-elle gratuite ? Oui, totalement gratuite
- Mon numéro change-t-il ? Non, vous gardez votre numéro actuel
- Combien de temps prend la portabilité ? 3 jours ouvrables maximum`,
      },
      ...messages,
    ],
  });

  return NextResponse.json({ reply: response.choices[0].message.content });
}
