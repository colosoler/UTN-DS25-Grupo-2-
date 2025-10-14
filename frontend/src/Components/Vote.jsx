import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useFetch } from '../Hooks/useFetch'
import './styles/Vote.css';
import { getToken } from '../Helpers/auth';
import { get } from 'react-hook-form';

export const Vote = ({ material }) => {

    const API_URL = import.meta.env.VITE_API_URL;
    const { data: calificacion, loading } = useFetch(`${API_URL}/calificaciones/${material.id}/calificacion`, {}, { requireAuth: true });
    
    const { user } = useAuth()
    const [vote, setVote] = useState(null);
    const [upvotes, setUpvotes] = useState(material.upvotes);
    const [downvotes, setDownvotes] = useState(material.downvotes);
    
    const upvoted = vote === true;
    const downvoted = vote === false;

    useEffect(() => {
      if (!loading && calificacion) {
        const value =
          calificacion.value ??
          calificacion.calificacion?.value ??
          calificacion.data?.value ??
          null;
        setVote(value !== null ? Boolean(value) : null);
      }
    }, [loading, calificacion]);


    
    const handleVote = async (type) => {
      if (!user) return;

      const isUpvote = type === 'upvote';
      let newVote = isUpvote ? true: false;
      const sameVote = vote === newVote
      
      let newUpvotes = upvotes;
      let newDownvotes = downvotes;
      
      try {
        if (sameVote) {
          await fetch(`${API_URL}/calificaciones/${material.id}/calificacion`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}`},
          });

          if (isUpvote) newUpvotes--;
          else newDownvotes--;
          setVote(null);
        } else if (vote === null) {
          await fetch(`${API_URL}/calificaciones/${material.id}/calificacion`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({
              materialId: material.id,
              userId: user.id,
              value: newVote
            }),
          });

          if (isUpvote) newUpvotes++;
          else newDownvotes++;
          setVote(newVote);
        }
        else {
          await fetch(`${API_URL}/calificaciones/${material.id}/calificacion`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ value: newVote }),
          });

          if (isUpvote) {
            newUpvotes++;
            newDownvotes--;
          } else {
            newDownvotes++;
            newUpvotes--;
          }
          setVote(newVote);
        }
        setUpvotes(newUpvotes);
        setDownvotes(newDownvotes);

      } catch (error) {
        console.error('Error actualizando votos: ', error);
      };
    };
    return (
        <>
          <div className='vote'>
            <div
                id='upvote'
                className={`upvote ${upvoted ? 'active' : ''}`}
                onClick={() => handleVote('upvote')}
            >
                <MdArrowUpward />
                <p>{upvotes}</p>
            </div>
            <div
              id='downvote'
              className={`downvote ${downvoted ? 'active' : ''}`}
              onClick={() => handleVote('downvote')}
            >
                <MdArrowDownward />
                <p>{downvotes}</p>
            </div>
          </div>
        </>
    );
};