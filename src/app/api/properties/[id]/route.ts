import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updatedRequest = await prisma.dueDiligence.update({
      where: { id },
      data: {
        status: body.status,
        adminNote: body.adminNote,
      },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("PATCH /api/due-diligence/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update due diligence request" },
      { status: 500 }
    );
  }
}