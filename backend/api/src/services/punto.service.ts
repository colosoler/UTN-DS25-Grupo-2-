import prisma from '../config/prisma';
import { MotivoPunto } from '@prisma/client';

export async function otorgarPuntosPorMaterial(userId: number, materialData: any): Promise<void> {
    let totalPoints = 20;
    
    if (materialData.añoCursada) totalPoints += 5;
    if (materialData.comision) totalPoints += 5;
    if (materialData.descripcion) totalPoints += 5;
    if (materialData.numeroParcial) totalPoints += 5;

    await prisma.user.update({
        where: { id: userId },
        data: { points: { increment: totalPoints } }
    });

    await prisma.punto.create({
        data: {
            userId,
            valor: totalPoints,
            motivo: MotivoPunto.SUBIDA_MATERIAL
        }
    });
}

export async function procesarPuntosPorVoto(authorId: number, isUpvote: boolean): Promise<void> {
    const pointsToAdd = isUpvote ? 1 : -1;
    const motivo = isUpvote ? MotivoPunto.UPVOTE : MotivoPunto.DOWNVOTE;

    await prisma.user.update({
        where: { id: authorId },
        data: { points: { increment: pointsToAdd } }
    });

    await prisma.punto.create({
        data: {
            userId: authorId,
            valor: pointsToAdd,
            motivo: motivo
        }
    });
}

export async function procesarActualizacionVoto(authorId: number, isNewUpvote: boolean): Promise<void> {
    const pointsToAdd = isNewUpvote ? 2 : -2;
    
    await prisma.user.update({
        where: { id: authorId },
        data: { points: { increment: pointsToAdd } }
    });

    await prisma.punto.create({
        data: {
            userId: authorId,
            valor: pointsToAdd,
            motivo: 'VOTO_ACTUALIZADO'
        }
    });
}

export async function procesarEliminacionVoto(authorId: number, wasUpvote: boolean): Promise<void> {
    const pointsToAdd = wasUpvote ? -1 : 1;

    await prisma.user.update({
        where: { id: authorId },
        data: { points: { increment: pointsToAdd } }
    });

    await prisma.punto.create({
        data: {
            userId: authorId,
            valor: pointsToAdd,
            motivo: 'VOTO_ELIMINADO'
        }
    });
}