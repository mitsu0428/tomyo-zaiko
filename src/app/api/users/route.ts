import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllUser() {
  const users = await prisma.user.findMany();
  return users;
}

export async function GET() {
  const users = await getAllUser();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {}

export async function DELETE(request: NextRequest) {
  const id = parseInt(request.nextUrl.searchParams.get("id")!);

  await prisma.user.delete({
    where: {
      id: id,
    },
  });

  const users = await getAllUser();
  return NextResponse.json(users);
}
