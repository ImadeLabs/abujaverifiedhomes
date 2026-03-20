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

    let propertyTitle: string | null = null;
    let propertyArea: string | null = null;
    let propertyCity: string | null = null;

    if (body.requestType === "internal" && body.propertyId) {
      const property = await prisma.property.findUnique({
        where: { id: body.propertyId },
      });

      if (property) {
        propertyTitle = property.title;
        propertyArea = property.area;
        propertyCity = property.city;
      }
    }

    const request = await prisma.dueDiligence.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,

        requestType: body.requestType || "internal",
        propertyId:
          body.requestType === "internal" ? body.propertyId || null : null,
        propertyTitle,
        propertyArea,
        propertyCity,

        externalPropertyUrl:
          body.requestType === "external"
            ? body.externalPropertyUrl || null
            : null,
        externalPropertyAddress:
          body.requestType === "external"
            ? body.externalPropertyAddress || null
            : null,
        externalAgentPhone:
          body.requestType === "external"
            ? body.externalAgentPhone || null
            : null,
        sourcePlatform:
          body.requestType === "external" ? body.sourcePlatform || null : null,

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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, adminNote } = body;

    const updated = await prisma.dueDiligence.update({
      where: { id },
      data: {
        status,
        adminNote,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update request" },
      { status: 500 }
    );
  }
}
