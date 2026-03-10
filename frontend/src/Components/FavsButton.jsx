import { Star } from 'lucide-react';
import { useAuth } from '../Contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFavoriteStatus, toggleFavorite } from '../Services/favService';
import './styles/FavsButton.css';

export const FavsButton = ({ materialId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ['favorite', materialId];

  const { data } = useQuery({
    queryKey,
    queryFn: () => fetchFavoriteStatus(materialId),
    enabled: !!user,
  });

  const isFavorite = data?.isFavorite ?? false;

  const mutation = useMutation({
    mutationFn: () => toggleFavorite(materialId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, { isFavorite: !isFavorite });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(queryKey, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  if (!user) return null;

  return (
    <button
      className={`favs-button ${isFavorite ? 'active' : ''}`}
      onClick={() => mutation.mutate()}
      title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Star size={24} fill={isFavorite ? '#f5a623' : 'none'} stroke={isFavorite ? '#f5a623' : 'currentColor'} />
    </button>
  );
};
