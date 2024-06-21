/*
  Warnings:

  - Added the required column `content` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_post" ("id") SELECT "id" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
