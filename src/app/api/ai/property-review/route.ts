import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = `
PROPERTY REVIEW

Summary:
This is a ${body.propertyType || "property"} listed for ${
      body.listingType
    } in ${body.area || "unknown area"}, ${body.city || "unknown city"}.

Key Things to Check:
- Verify ownership documents (C of O, deed of assignment)
- Confirm property is not under dispute
- Check road access and infrastructure
- Confirm price aligns with market value

Risk Factors:
- ${body.verified ? "Lower risk (platform verified)" : "Higher risk (not verified)"}
- Location-based pricing variations
- Seller authenticity

Recommended Actions:
- Request full due diligence report
- Visit property physically
- Verify documents with land registry

Final Recommendation:
Do not make payment until verification is complete.
`;

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: "AI temporarily unavailable" },
      { status: 500 }
    );
  }
}
