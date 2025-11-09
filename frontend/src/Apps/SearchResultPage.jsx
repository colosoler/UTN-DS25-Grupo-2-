import { useLocation } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { MaterialCard } from "../Components/MaterialCard";
import { Searchbar } from "../Components/Searchbar";
import { Loading } from "../Components/Loading"
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
				{loading && <Loading />}
				{resultsArray && resultsArray.length === 0 && !loading && (
					<NoResults />
				)}
				{resultsArray && resultsArray.map((result) => (
					<Col key={result.id} xs={12} lg={6} className="mb-4">
						<MaterialCard material={result} />
					</Col>
				))}
			</Row>
		</Container>
	);
};