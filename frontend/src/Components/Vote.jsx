import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { useAuth } from '../Contexts/AuthContext';
import './styles/Vote.css';
import { getToken } from '../Helpers/auth';

export const Vote = ({ material }) => {

	const API_URL = import.meta.env.VITE_API_URL;

	const { user } = useAuth()
	const [vote, setVote] = useState(null);
	const [upvotes, setUpvotes] = useState(material.upvotes);
	const [downvotes, setDownvotes] = useState(material.downvotes);
	
	const upvoted = vote === true;
	const downvoted = vote === false;

	//carga manual de votos del usuario al material (solo se ejecuta si el usuario existe)
	useEffect(() => {
		const fetchUserVote = async () => {
			if (!user) { //si no esta registrado no hace fetch
				setVote(null);
				return;
			}
			
			const token = getToken();
			if (!token) return;

			try {
				const response = await fetch(`${API_URL}/calificaciones/${material.id}/calificacion`, {
					headers: {
						'Authorization': `Bearer ${token}`
					},
				});

				//si la respuesta es OK o 404 (no hay voto), se actualiza el estado local.
				if (response.ok) {
					const calificacion = await response.json();
					const value =
						calificacion.value ??
						calificacion.calificacion?.value ??
						calificacion.data?.value ??
						null;
					setVote(value !== null ? Boolean(value) : null);
				} else if (response.status === 404) {
					setVote(null);
				} else {
					setVote(null);
				}
			} catch (error) {
				console.error('Error cargando voto de usuario: ', error);
				setVote(null);
			}
		};
		fetchUserVote();
	}, [user, material.id, API_URL]);

	const handleVote = async (type) => {
		if (!user) {
			alert('Debes iniciar sesión para votar'); //avisa q para votar debe estar logueado
			return;
		}

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