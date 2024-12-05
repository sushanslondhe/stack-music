-- CreateEnum
CREATE TYPE "StreamType" AS ENUM ('Youtube', 'Spotify');

-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('Google');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "Providers" "Providers" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" TEXT NOT NULL,
    "Type" "StreamType" NOT NULL,
    "url" TEXT NOT NULL,
    "extractedId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upvote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_userId_streamId_key" ON "Upvote"("userId", "streamId");

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
