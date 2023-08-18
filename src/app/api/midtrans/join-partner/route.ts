import { coreIris } from "@/lib/midtrans";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await coreIris.createBeneficiaries(body);
    return NextResponse.json({
      success: true,
      message: "Partner created",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error occured.",
    });
  }
}
