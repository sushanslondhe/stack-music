import { prisma } from "@/app/lib";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
});
export async function POST(req: NextRequest) {
  const session = await getServerSession();

  // if (!session?.user) {
  //   return NextResponse.json(
  //     {
  //       message: "User not signed in",
  //     },
  //     {
  //       status: 403,
  //     }
  //   );
  // }

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  console.log(user?.id);

  try {
    const data = UpvoteSchema.parse(await req.json());
    const res = await prisma.upvote.create({
      // @ts-expect-error check
      data: {
        userId: user?.id,
        streamId: data.streamId,
      },
    });

    return NextResponse.json({
      msg: `upvote for streamId :${res.streamId} success`,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Error while upvoting",
      },
      {
        status: 403,
      }
    );
  }
}
