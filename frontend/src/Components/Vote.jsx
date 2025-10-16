import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { useAuth } from '../Contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from './Alert';
import { fetchMaterialVotes, mutateVote } from '../Services/voteService';
import { useState } from 'react';
import './styles/Vote.css';

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
    const voteMutation = useMutation({
      mutationFn: (newVote) => mutateVote({ materialId, newVote, currentVote, userId}),
      onMutate: async (newVote) => {
        await queryClient.cancelQueries({ queryKey: queryKey });
        const previousData = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old) => {
          if (!old) return old;

          let newUpvotes = old.upvotes;
          let newDownvotes = old.downvotes;
          let finalVote;

          if (newVote === currentVote) {
            finalVote = null;
            if (newVote === true) newUpvotes--; else newDownvotes--;
          } else if (currentVote === null) {
            finalVote = newVote;
            if (newVote === true) newUpvotes++; else newDownvotes--;
          } else {
            finalVote = newVote;
            if (currentVote === true) { newUpvotes--;} 
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
    if (!user || voteMutation.isPending) return;
    voteMutation.mutate(type === 'upvote');
  }

  const handleCloseAlert = () => setShowAlert(false);
    return (
        <>
          <div className='vote'>
            <div
                id='upvote'
                className={`upvote ${upvoted ? 'active' : ''}`}
                onClick={() => handleVote('upvote')}
            >
                <MdArrowUpward />
                <p>{data?.upvotes ?? 0}</p>
            </div>
            <div
              id='downvote'
              className={`downvote ${downvoted ? 'active' : ''}`}
              onClick={() => handleVote('downvote')}
            >
                <MdArrowDownward />
                <p>{data?.downvotes ?? 0}</p>
            </div>
          </div>

          <Alert 
                show={showAlert}
                message={"Hubo un error al registrar tu voto. Inténtalo de nuevo."}
                onClose={handleCloseAlert}
            />
        </>
    );
};