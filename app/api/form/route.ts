import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    // Upload file to Cloudinary
    const idFileUrls: string[] = [];
    const idFiles = formData.getAll("idFile");
    for (const idFile of idFiles) {
      if (idFile instanceof File) {
        const bytes = await idFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<string>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "letoile_mobile/id_documents" },
              (error, result) => {
                if (error || !result) return reject(error);
                resolve(result.secure_url);
              },
            )
            .end(buffer);
        });

        idFileUrls.push(uploaded);
      }
    }
    console.log(
      "idFileUrls type:",
      typeof idFileUrls,
      Array.isArray(idFileUrls),
    );
    console.log("idFileUrls value:", idFileUrls);
    const submission = await prisma.formSubmission.create({
      data: {
        currentNumber: String(data.currentNumber),
        previousOperator: String(data.previousOperator),
        customerType: String(data.customerType),

        firstName: String(data.firstName),
        lastName: String(data.lastName),
        email: String(data.email),

        birthDate: new Date(String(data.birthDate)),

        idType: String(data.idType),
        idNumber: String(data.idNumber),

        rioCode: String(data.rioCode),
        portabilityDate: new Date(String(data.portabilityDate)),

        idFileUrl: {
          set: idFileUrls,
        },
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
    const users = await prisma.formSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
