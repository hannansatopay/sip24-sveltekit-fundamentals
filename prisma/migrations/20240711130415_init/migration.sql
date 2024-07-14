-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);
