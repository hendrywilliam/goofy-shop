import { coreIris } from "@/lib/midtrans";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await coreIris.createBeneficiaries(body);
    return NextResponse.json(
      {
        success: true,
        code: "201",
        message: `Partnership ${response.status}`,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        code: "400",
        message: err instanceof Error ? err.message : "Unknown error occured.",
      },
      {
        status: 400,
      }
    );
  }
}
