/*
  Warnings:

  - You are about to drop the column `name` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the `PageComponent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pageNumber]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `components` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageNumber` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PageComponent" DROP CONSTRAINT "PageComponent_pageNumber_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "name",
ADD COLUMN     "components" JSONB NOT NULL,
ADD COLUMN     "pageNumber" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PageComponent";

-- CreateIndex
CREATE UNIQUE INDEX "Page_pageNumber_key" ON "Page"("pageNumber");
