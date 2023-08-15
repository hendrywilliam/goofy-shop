import { coreAPI } from "@/lib/midtrans";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const r = await req.json();
  // const rez = coreAPI.charge(r).then((chargeResponse) => {
  //   console.log("chargeResponse");
  //   console.log(chargeResponse);
  // });

  return NextResponse.json({
    data: r,
  });
}
