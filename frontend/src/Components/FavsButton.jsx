import { Star } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFavoriteStatus, toggleFavorite } from '../Services/favService';
import { Alert } from './Alert';
import './styles/FavsButton.css';

export const FavsButton = ({ materialId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ['favorite', materialId];
  const [showAlert, setShowAlert] = useState(false);

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

  const handleClick = () => {
    if (!user) {
      setShowAlert(true);
      return;
    }
    mutation.mutate();
  };

  return (
    <>
      <button
        className={`favs-button ${isFavorite ? 'active' : ''}`}
        onClick={handleClick}
        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <Star size={24} fill={isFavorite ? '#f5a623' : 'none'} stroke={isFavorite ? '#f5a623' : 'currentColor'} />
      </button>

      <Alert
        show={showAlert}
        message="Debes iniciar sesión para agregar a favoritos."
        onClose={() => setShowAlert(false)}
      />
    </>
  );
};
