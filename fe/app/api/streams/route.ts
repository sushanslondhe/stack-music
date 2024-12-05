import { prisma } from "@/app/lib";
import { YT_REGEX } from "@/app/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-expect-error api
import youtubesearchapi from "youtube-search-api";

const createStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        {
          message: "Unauthenticated",
        },
        {
          status: 403,
        }
      );
    }

    const data = await createStreamSchema.parse(await req.json());
    const isYt = data.url.match(YT_REGEX);
    console.log(isYt);
    const videoId = data.url ? data.url.match(YT_REGEX)?.[1] : null;

    if (!isYt || videoId) {
      return NextResponse.json(
        {
          message: "Url Youtube format is incorrect try again!!",
        },
        {
          status: 400,
        }
      );
    }

    const res = await youtubesearchapi.GetVideoDetails(videoId);

    // console.log(res);

    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    const stream = await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: videoId || "",
        Type: "Youtube",

        title: res.title ?? "Can't find video",

        smallImg:
          thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url ??
              "https://imgs.search.brave.com/BmgqaD8Bdji1CRhySyrIln_-EDpqHbofsXuRckT0KcE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2V0d294LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/NC9Zb3VUdWJlLXRo/dW1ibmFpbHMtbm90/LXNob3dpbmcuanBl/Zw",
      },
    });

    return NextResponse.json({
      message: "Added Stream",
      id: stream.id,
      stream,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      {
        message: "Error while adding stream",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prisma.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });

  return NextResponse.json({
    streams,
  });
}
