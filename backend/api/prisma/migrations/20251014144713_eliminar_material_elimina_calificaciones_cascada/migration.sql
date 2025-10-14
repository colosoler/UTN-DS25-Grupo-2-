-- DropForeignKey
ALTER TABLE "public"."material_votes" DROP CONSTRAINT "material_votes_materialId_fkey";

-- AddForeignKey
ALTER TABLE "public"."material_votes" ADD CONSTRAINT "material_votes_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "public"."materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
