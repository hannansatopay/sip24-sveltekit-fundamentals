-- CreateTable
CREATE TABLE "Post" (
    "Id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("Id")
);
