import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    const submission = await prisma.contactFormSubmission.create({
      data: {
        fullName: String(data.fullName),
        phone: String(data.phone),
        email: String(data.email),
        message: String(data.message),
      },
    });
    console.log("Form submitted with data:", data);
    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save form" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contactforms = await prisma.contactFormSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contactforms);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contact forms" },
      { status: 500 },
    );
  }
}
