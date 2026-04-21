import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { status } = await req.json();

  if (!["pending", "approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const updated = await prisma.formSubmission.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}
