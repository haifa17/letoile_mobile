import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const form = await prisma.contactFormSubmission.findUnique({
    where: { id },
  });

  if (!form) {
    return NextResponse.json({ error: "Formulaire introuvable" }, { status: 404 });
  }

  return NextResponse.json(form);
}