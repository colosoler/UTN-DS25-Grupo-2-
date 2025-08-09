import { Material, CreateMaterialRequest, UpdateMaterialRequest } from '../types/material.types';

let materials: Material[] = [
  {
    id: 1,
    añoCursada: 2024,
    archivos: ['parcial1.pdf'],
    cantidadReportes: 0,
    comision: 'A',
    descripcion: 'Parcial de Sistemas Operativos',
    fecha: new Date(),
    numeroParcial: 1,
    titulo: 'Parcial 1',
    materiaId: 'MAT101',
    carreraId: 'CARR123',
    tipo: 'parcial',
    userId: '1'
  },
  {
    id: 2,
    añoCursada: 2023,
    archivos: ['tp-redes.docx'],
    cantidadReportes: 1,
    comision: 'B',
    descripcion: 'TP final de Redes',
    fecha: new Date(),
    numeroParcial: 0,
    titulo: 'TP Redes',
    materiaId: 'MAT202',
    carreraId: 'CARR456',
    tipo: 'tp',
    userId: '2'
  }
];

export async function getAllMaterials(): Promise<Material[]> {
  return materials;
}

export async function getMaterialById(id: number): Promise<Material> {
  const material = materials.find(m => m.id === id);
  if (!material) {
    const error = new Error('Material not found');
    (error as any).statusCode = 404;
    throw error;
  }
  return material;
}

export async function findMaterials(filters: any): Promise<Material[]> {
  return materials.filter(material => {
    return Object.entries(filters).every(([key, value]) => {
      if (key === 'query') {
        return [
          material.titulo,
          material.descripcion,
          material.comision,
          material.materiaId,
          material.carreraId,
        ].some(field =>
          field && field.toString().toLowerCase().includes((value as string).toLowerCase())
        );
      }
      return (material as any)[key]?.toString().toLowerCase() === (value as string).toLowerCase();
    });
  });
}

export async function createMaterial(data: CreateMaterialRequest): Promise<Material> {
  const newMaterial: Material = {
    id: materials.length ? Math.max(...materials.map(m => m.id)) + 1 : 1,
    ...data,
    cantidadReportes: 0,
    fecha: new Date()
  };
  materials.push(newMaterial);
  return newMaterial;
}

export async function updateMaterial(id: number, updateData: UpdateMaterialRequest): Promise<Material> {
  const index = materials.findIndex(m => m.id === id);
  if (index === -1) {
    const error = new Error('Material not found');
    (error as any).statusCode = 404;
    throw error;
  }

  materials[index] = {
    ...materials[index],
    ...updateData
  };

  return materials[index];
}

export async function deleteMaterial(id: string): Promise<void> {
  const index = materials.findIndex(m => m.id === parseInt(id));
  if (index === -1) {
    const error = new Error('Material not found');
    (error as any).statusCode = 404;
    throw error;
  }
  materials.splice(index, 1);
}
