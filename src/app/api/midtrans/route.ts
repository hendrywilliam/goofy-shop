import { coreAPI } from "@/lib/midtrans";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await coreAPI.charge(body);
    return NextResponse.json({
      success: true,
      message: "Transaction created",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error occured.",
      data: {},
    });
  }
}
