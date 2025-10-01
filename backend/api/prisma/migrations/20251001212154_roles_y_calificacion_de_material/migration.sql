/*
  Warnings:

  - Added the required column `careerId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."carreras" ADD COLUMN     "icon" VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "careerId" INTEGER NOT NULL,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "public"."material_votes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "value" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "material_votes_userId_materialId_key" ON "public"."material_votes"("userId", "materialId");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "public"."carreras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."material_votes" ADD CONSTRAINT "material_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."material_votes" ADD CONSTRAINT "material_votes_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "public"."materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
