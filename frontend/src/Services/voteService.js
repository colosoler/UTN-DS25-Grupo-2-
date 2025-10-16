import { getToken } from "../Helpers/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMaterialVotes = async (materialId) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/calificaciones/${materialId}/calificacion`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
        throw new Error('Error al cargar la calificación.');
    }

    const json = await response.json();

    const calificacion = json.calificacion;

    if (!calificacion) {
        return { 
            upvotes: json.material?.upvotes || 0,
            downvotes: json.material?.downvotes || 0,
            value: null,
        };
    }
    return {
        upvotes: calificacion.material.upvotes,
        downvotes: calificacion.material.downvotes,
        value: calificacion.value,
    }
};

export const mutateVote = async ({ userId, materialId, newVote, currentVote }) => {
    const token = getToken();
    if (!userId) throw new Error('Usuario no autenticado.');
    const url = `${API_URL}/calificaciones/${materialId}/calificacion`;
    
    let method;
    let bodyData = {};

    if (newVote === currentVote) {
        method = 'DELETE';
    } else if (currentVote === null) {
        method = 'POST';
        bodyData = { userId, materialId, value: newVote };
    } else {
        method = 'PUT';
        bodyData = { value: newVote };
    }

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        ...(method !== 'DELETE' && { body: JSON.stringify(bodyData) }),
    });

    if (!response.ok) {
        throw new Error('Error en la votación.');
    }
};