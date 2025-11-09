-- CreateEnum
CREATE TYPE "MotivoReporte" AS ENUM ('CONTENIDO_INAPROPIADO', 'SPAM', 'PLAGIO', 'OTRO');

-- CreateTable
CREATE TABLE "reportes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "descripcion" TEXT,
    "motivo" "MotivoReporte" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reportes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reportes_userId_materialId_key" ON "reportes"("userId", "materialId");

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
