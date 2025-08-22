-- CreateEnum
CREATE TYPE "public"."TipoMaterial" AS ENUM ('PARCIAL', 'PARCIAL_RESUELTO', 'FINAL', 'FINAL_RESUELTO', 'PRACTICA', 'PRACTICA_RESULTA', 'APUNTE', 'RESUMEN', 'OTRO');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carreras" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "carreras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."materias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carrera_materia" (
    "carreraId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "anio" INTEGER NOT NULL,

    CONSTRAINT "carrera_materia_pkey" PRIMARY KEY ("carreraId","materiaId")
);

-- CreateTable
CREATE TABLE "public"."materials" (
    "id" SERIAL NOT NULL,
    "añoCursada" INTEGER NOT NULL,
    "archivo" TEXT NOT NULL,
    "cantidadReportes" INTEGER NOT NULL DEFAULT 0,
    "comision" VARCHAR(50) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numeroParcial" INTEGER,
    "titulo" VARCHAR(200) NOT NULL,
    "tipo" "public"."TipoMaterial" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "carreraId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- AddForeignKey
ALTER TABLE "public"."carrera_materia" ADD CONSTRAINT "carrera_materia_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "public"."carreras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."carrera_materia" ADD CONSTRAINT "carrera_materia_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."materials" ADD CONSTRAINT "materials_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."materials" ADD CONSTRAINT "materials_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "public"."carreras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."materials" ADD CONSTRAINT "materials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
