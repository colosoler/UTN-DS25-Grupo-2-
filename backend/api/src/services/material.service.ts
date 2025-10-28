import { CreateMaterialRequest, MaterialWithUser, UpdateMaterialRequest } from '../types/material.types';
import prisma from '../config/prisma';
import { Material, TipoMaterial } from '@prisma/client';
import { Prisma } from '@prisma/client';

const materialInclude = { //objeto para incluir la relación con User y seleccionar solo el username
	user: {
		select: {
			username: true,
		}
	}
};

const mapMaterialToMaterialWithUser = (material: any): MaterialWithUser => { //formatea la respuesta para agregar el username como una porpiedad mas del objeto q devuelve el json
	const { user, ...rest } = material;
	return {
		...rest,
		username: user.username,
	} as MaterialWithUser;
};

export async function getAllMaterials(): Promise<MaterialWithUser[]> {
  const materials = await prisma.material.findMany({
    orderBy: { createdAt: 'desc' },
    include: materialInclude,
  });
  const materialsWithUser = materials.map(mapMaterialToMaterialWithUser); //formatea respuesta
	materialsWithUser.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)); //calcula upvotes - downvotes y devuelve de forma descendente
	return materialsWithUser;
}

export async function findMaterials(filters: any):Promise<MaterialWithUser[]> {
    const query = filters.query as string | undefined;

    const { query: _, ...directFilters } = filters;

    const processedDirectFilters: Record<string, number | string> = {};
    for (const key in directFilters) {
        const value = directFilters[key];
        if (value !== '' && value !== null && value !== undefined) {
            if (!isNaN(Number(value))) {
                processedDirectFilters[key] = Number(value);
            } else {
                processedDirectFilters[key] = value;
            }
        }
    }

    const directFilterArray = Object.keys(processedDirectFilters).map(key => ({
        [key]: processedDirectFilters[key]
    }));

    // Construir textSearchFilter: contains para strings; para enum 'tipo' -> in con matches parciales del enum
    const textSearchFilter = query
        ? (() => {
            const q = String(query).toLowerCase();
            const or: any[] = [
                { titulo: { contains: query, mode: Prisma.QueryMode.insensitive } },
                { descripcion: { contains: query, mode: Prisma.QueryMode.insensitive } },
                { comision: { contains: query, mode: Prisma.QueryMode.insensitive } },
            ];

            // Buscar valores del enum TipoMaterial que coincidan parcialmente (case-insensitive)
            const tipoMatches = Object.values(TipoMaterial).filter(v =>
                String(v).toLowerCase().includes(q)
            );
            if (tipoMatches.length > 0) {
                or.push({ tipo: { in: tipoMatches } });
            }

            return { OR: or } as any;
        })()
        : {};

    const combinedFilters = [
        ...directFilterArray, 
        textSearchFilter
    ].filter(f => Object.keys(f).length > 0);

    const materials = await prisma.material.findMany({
		  where: {
			  AND: combinedFilters,
		  },
		    include: materialInclude, // se agrega la inclusión para traer el username
	  });
	  const materialsWithUser = materials.map(mapMaterialToMaterialWithUser); //formatea la respuesta
	  materialsWithUser.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)); //calcula upvotes - downvotes y devuelve de forma descendente
	  return materialsWithUser;
}

export async function getMaterialById(id: number): Promise<MaterialWithUser> {
  const material = await prisma.material.findUnique({ 
    where: { id },
		include: materialInclude, //se agrega la inclusión para traer el usuario
	});
  if (!material) {
    const error = new Error('Material not found');
    (error as any).statusCode = 404;
    throw error;
  }
  return mapMaterialToMaterialWithUser(material);
}

export async function createMaterial(data: CreateMaterialRequest): Promise<Material> {
  // Validar que el usuario existe
  const userExists = await prisma.user.findUnique({
    where: { id: data.userId }
  });
  
  if (!userExists) {
    const error = new Error('User not found');
    (error as any).statusCode = 400;
    throw error;
  }


  const created = await prisma.material.create({
    data: {
      añoCursada: data.añoCursada,
      archivo: data.archivo,
      comision: data.comision,
      descripcion: data.descripcion,
      numeroParcial: data.numeroParcial,
      titulo: data.titulo,
      materiaId: data.materiaId,
      carreraId: data.carreraId,
      tipo: data.tipo,
      userId: data.userId,
      cantidadReportes: 0
    }
  });
  return created;
}

export async function updateMaterial(id: number, updateData: UpdateMaterialRequest): Promise<Material> {
  // Validar que el usuario existe si se está actualizando
  if (updateData.userId !== undefined) {
    const userExists = await prisma.user.findUnique({
      where: { id: updateData.userId}
    });
    
    if (!userExists) {
      const error = new Error('User not found');
      (error as any).statusCode = 400;
      throw error;
    }
  }

  try {
    const updated = await prisma.material.update({
      where: { id },
      data: {
        ...(updateData.añoCursada !== undefined ? { añoCursada: updateData.añoCursada } : {}),
        ...(updateData.archivo !== undefined ? { archivo: updateData.archivo } : {}),
        ...(updateData.comision !== undefined ? { comision: updateData.comision } : {}),
        ...(updateData.descripcion !== undefined ? { descripcion: updateData.descripcion } : {}),
        ...(updateData.numeroParcial !== undefined ? { numeroParcial: updateData.numeroParcial } : {}),
        ...(updateData.titulo !== undefined ? { titulo: updateData.titulo } : {}),
        ...(updateData.materiaId !== undefined ? { materiaId: updateData.materiaId } : {}),
        ...(updateData.carreraId !== undefined ? { carreraId: updateData.carreraId } : {}),
        ...(updateData.tipo !== undefined ? { tipo: updateData.tipo } : {}),
        ...(updateData.userId !== undefined ? { userId: updateData.userId } : {}),
        ...(updateData.upvotes !== undefined ? { upvotes: updateData.upvotes } : {}),
        ...(updateData.downvotes !== undefined ? { downvotes: updateData.downvotes } : {})
      }
    });
    return updated;
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Material not found');
      (error as any).statusCode = 404;
      throw error;
    }
    throw e;
  }
}

export async function deleteMaterial(id: number): Promise<void> {
  try {
    await prisma.material.delete({
      where: { id }
    });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Material not found');
      (error as any).statusCode = 404;
      throw error;
    }
    throw e;
  }
}