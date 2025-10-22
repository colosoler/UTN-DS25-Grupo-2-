import { ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../Contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMaterialVotes, mutateVote } from '../Services/voteService';
import { useState } from 'react';
import { Alert } from './Alert'
import './styles/Vote.css'

export const Vote = ({ material }) => {

    const { user } = useAuth();
    const materialId = material.id;
    const userId = user?.id;
    const queryClient = useQueryClient();
    const queryKey = ['materialVotes', materialId];

    const [showAlert, setShowAlert] = useState(false);

    const { data, isLoading } = useQuery({
      queryKey: queryKey,
      queryFn: () => fetchMaterialVotes(materialId),
    });

    const currentVote = data?.value !== undefined ? data.value : null;

    const upvoted = currentVote === true;
    const downvoted = currentVote === false;

    const totalVotes = (data?.upvotes ?? 0) + (data?.downvotes ?? 0);

    const voteMutation = useMutation({
      mutationFn: (newVote) => mutateVote({ materialId, newVote, currentVote, userId}),
      onMutate: async (newVote) => {
        await queryClient.cancelQueries({ queryKey: queryKey });
        const previousData = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old) => {
          if (!old) return old;

		  const currentVoteInCache = old.value !== undefined ? old.value : null;

          let newUpvotes = old.upvotes;
          let newDownvotes = old.downvotes;
          let finalVote;

          if (newVote === currentVoteInCache) {
            finalVote = null;
            if (newVote === true) newUpvotes--; else newDownvotes--;
          } else if (currentVoteInCache === null) {
            finalVote = newVote;
            if (newVote === true) newUpvotes++; else newDownvotes++;
          } else {
            finalVote = newVote;
            if (currentVoteInCache === true) { newUpvotes--;} 
            else { newDownvotes--;}

            if (newVote === true){
              newUpvotes++;
            }else {
              newDownvotes++;
            }
          }
          return { ...old, upvotes: newUpvotes, downvotes: newDownvotes, value: finalVote };
        });
        return { previousData };

      },
      onError: (err, newVote, context) => {
        console.error('Error al mutar, revirtiendo estado: ', err);
        queryClient.setQueryData(queryKey, context.previousData);
        setShowAlert(true);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: queryKey });
      },
  });

  const handleVote = (type) => {
	if (!user) {
		setShowAlert(true);
		return;
		}
    if (voteMutation.isPending) return;
    voteMutation.mutate(type === 'upvote');
  }

  const handleCloseAlert = () => setShowAlert(false);
    return (
        <>
          <div className="vote-container">
            <button
              onClick={() => handleVote('upvote')}
              className={`vote-button upvote ${upvoted ? 'active' : ''}`}
              disabled={voteMutation.isPending || isLoading}
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
            <div className="vote-counter">
              <span className={`vote-count-text ${
                upvoted ? 'upvoted' : downvoted ? 'downvoted' : ''
              }`}>
                {totalVotes}
              </span>
            </div>
            <button
              onClick={() => handleVote('downvote')}
              className={`vote-button downvote ${downvoted ? 'active' : ''}`}
              disabled={voteMutation.isPending || isLoading}
            >
              <ArrowDown size={18} strokeWidth={2.5} />
            </button>
          </div>

          <Alert 
                show={showAlert}
                message={!user ? "Debes iniciar sesión para votar." : "Hubo un error al registrar tu voto. Inténtalo de nuevo."}
                onClose={handleCloseAlert}
            />
        </>
    );
};