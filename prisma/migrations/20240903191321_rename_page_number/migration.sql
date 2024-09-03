/*
  Warnings:

  - You are about to drop the column `pageId` on the `PageComponent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pageNumber]` on the table `PageComponent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageNumber` to the `PageComponent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PageComponent" DROP CONSTRAINT "PageComponent_pageId_fkey";

-- AlterTable
ALTER TABLE "PageComponent" DROP COLUMN "pageId",
ADD COLUMN     "pageNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PageComponent_pageNumber_key" ON "PageComponent"("pageNumber");

-- AddForeignKey
ALTER TABLE "PageComponent" ADD CONSTRAINT "PageComponent_pageNumber_fkey" FOREIGN KEY ("pageNumber") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
