import { useState, useEffect } from 'react';

export function useRanking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchRanking() {
      try {
        setLoading(true);
        setError(null);

        // Obtener usuarios y materiales en paralelo
        const [usersResponse, materialsResponse] = await Promise.all([
          fetch(`${API_URL}/users/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch(`${API_URL}/materials/`)
        ]);

        if (!usersResponse.ok || !materialsResponse.ok) {
          throw new Error('Error al obtener datos');
        }

        const usersData = await usersResponse.json();
        const materialsData = await materialsResponse.json();
        
        const users = usersData;
        const materials = materialsData.data || materialsData;

        // Calcular estadísticas para cada usuario
        const usersWithStats = users.map(user => {
          const userMaterials = materials.filter(material => material.userId === user.id);
          const totalUpvotes = userMaterials.reduce((sum, material) => sum + (material.upvotes || 0), 0);
          const totalDownvotes = userMaterials.reduce((sum, material) => sum + (material.downvotes || 0), 0);
          const netScore = totalUpvotes - totalDownvotes;

          return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            username: user.username,
            profilePicture: user.profilePicture,
            career: user.career?.nombre || 'Sin carrera',
            netScore,
            materialsCount: userMaterials.length
          };
        });

        // Ordenar por puntuación neta descendente y tomar los primeros 10
        const sortedRanking = usersWithStats
          .sort((a, b) => b.netScore - a.netScore)
          .slice(0, 10);

        setRanking(sortedRanking);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching ranking:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, [API_URL]);

  return { ranking, loading, error };
}
