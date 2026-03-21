import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: "published",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const property = await prisma.property.create({
      data: {
        title: body.title,
        price: Number(body.price),
        area: body.area || null,
        city: body.city || null,
        listingType: body.listingType,
        propertyType: body.propertyType || null,
        verified: Boolean(body.verified),
        featured: Boolean(body.featured),
        status: body.status || "published",
        coverImageUrl: body.coverImageUrl || null,
        description: body.description || null,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}