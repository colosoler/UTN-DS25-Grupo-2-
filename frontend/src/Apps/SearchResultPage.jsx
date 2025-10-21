import { useLocation } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { Result } from "../components/Result";
import { Searchbar } from "../Components/Searchbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoResults from "../Components/NoResult";

export const SearchResultPage = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);

	const queryParams = new URLSearchParams();

	const tipo = params.get("tipo");
	if (tipo) {
		queryParams.append("tipo", tipo.trim().toUpperCase().replace(" ", "_"));
	}

	const parcial = params.get("parcial");
	if (parcial) {
		queryParams.append("numeroParcial", parcial);
	}

	const anio = params.get("anio");
	if (anio) {
		queryParams.append("añoCursada", anio);
	}

	const uploaderId = params.get("uploaderId");
	if (uploaderId) {
		queryParams.append("userId", uploaderId);
	}

	// cualquier otro parámetro se conserva igual
	for (const [key, value] of params.entries()) {
		if (!["tipo", "parcial", "anio", "uploaderId"].includes(key)) {
			queryParams.append(key, value);
		}
	}

	const apiUrl = `${import.meta.env.VITE_API_URL}/materials?${queryParams.toString()}`;

	const { data, loading, error } = useFetch(apiUrl);

	const resultsArray = data?.data;

	return (
		<Container style={{paddingTop: "35px"}}>
			<Searchbar />
			<Row style={{paddingTop: "35px"}}>
				{loading && <p>Cargando...</p>}
				{error && <p>Error: {error.message}</p>}
				{resultsArray && resultsArray.length === 0 && !loading && (
  					< NoResults />
				)}
				{resultsArray && resultsArray.map((result) => (
					<Col key={result.id} md={4} className="mb-3">
						<Result result={result} />
					</Col>
				))}
			</Row>
		</Container>
	);
};