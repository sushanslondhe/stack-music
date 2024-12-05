import { prisma } from "@/app/lib";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DownvoteSchema = z.object({
  streamId: z.string(),
});
export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "User not signed in",
      },
      {
        status: 403,
      }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  try {
    const data = DownvoteSchema.parse(await req.json());
    await prisma.upvote.delete({
      where: {
        userId_streamId: {
          // @ts-expect-error check
          userId: user?.id,
          streamId: data.streamId,
        },
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while upvoting",
      },
      {
        status: 403,
      }
    );
    console.log(e);
  }
}
