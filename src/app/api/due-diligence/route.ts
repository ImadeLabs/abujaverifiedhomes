import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const requests = await prisma.dueDiligence.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("GET /api/due-diligence error:", error);
    return NextResponse.json(
      { error: "Failed to fetch due diligence requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const request = await prisma.dueDiligence.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        propertyId: body.propertyId || null,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("POST /api/due-diligence error:", error);
    return NextResponse.json(
      { error: "Failed to submit due diligence request" },
      { status: 500 }
    );
  }
}