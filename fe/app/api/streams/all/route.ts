import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await prisma.stream.findMany({});
  console.log(response);

  return NextResponse.json({
    response,
  });
}
