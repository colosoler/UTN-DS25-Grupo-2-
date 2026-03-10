import prisma from '../config/prisma';

const materialInclude = {
  user: { select: { username: true } },
  carrera: { select: { nombre: true } },
};

const mapMaterial = (material: any) => {
  const { user, carrera, ...rest } = material;
  return {
    ...rest,
    username: user?.username ?? null,
    carreraNombre: carrera?.nombre ?? null,
  };
};

export async function getFavorito(userId: number, materialId: number) {
  return prisma.favorito.findUnique({
    where: { userId_materialId: { userId, materialId } },
  });
}

export async function getUserFavorites(userId: number, query?: string, page: number = 1, limit: number = 10) {
  const where: any = { userId };

  if (query) {
    where.material = {
      OR: [
        { titulo: { contains: query, mode: 'insensitive' } },
        { descripcion: { contains: query, mode: 'insensitive' } },
      ],
    };
  }

  const skip = (page - 1) * limit;

  const [favoritos, total] = await Promise.all([
    prisma.favorito.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        material: { include: materialInclude },
      },
      skip,
      take: limit,
    }),
    prisma.favorito.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: favoritos.map((f) => mapMaterial(f.material)),
    total,
    page,
    limit,
    totalPages,
  };
}

export async function toggleFavorito(userId: number, materialId: number) {
  const existing = await getFavorito(userId, materialId);

  if (existing) {
    await prisma.favorito.delete({
      where: { id: existing.id },
    });
    return { isFavorite: false };
  }

  await prisma.favorito.create({
    data: { userId, materialId },
  });
  return { isFavorite: true };
}
