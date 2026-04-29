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

        const usersResponse = await fetch(`${API_URL}/users/`);

        if (!usersResponse.ok) {
          throw new Error(`Error al obtener usuarios (${usersResponse.status})`);
        }

        const users = await usersResponse.json();

        const usersWithStats = users.map(user => {
          const netScore = user.points;

          return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            username: user.username,
            profilePicture: user.profilePicture,
            career: user.career?.nombre || 'Sin carrera',
            netScore,
            materialsCount: user.materialsCount || 0
          };
        });

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
