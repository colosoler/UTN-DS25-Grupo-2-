import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { MaterialCard } from "../Components/MaterialCard";
import { Searchbar } from "../Components/Searchbar";
import { Loading } from "../Components/Loading"
import { Pagination } from "../Components/Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoResults from "../Components/NoResult";

const ITEMS_PER_PAGE = 10;

export const SearchResultPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(location.search);

	const currentPage = Math.max(1, parseInt(params.get("page") || "1", 10));

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
		if (!["tipo", "parcial", "anio", "uploaderId", "page"].includes(key)) {
			queryParams.append(key, value);
		}
	}

	// Agregar parámetros de paginación
	queryParams.append("page", currentPage.toString());
	queryParams.append("limit", ITEMS_PER_PAGE.toString());

	const apiUrl = `${import.meta.env.VITE_API_URL}/materials?${queryParams.toString()}`;

	const { data, loading, error } = useFetch(apiUrl);

	const resultsArray = data?.data;
	const totalPages = data?.totalPages || 1;
	const total = data?.total || 0;

	const handlePageChange = (newPage) => {
		const newParams = new URLSearchParams(location.search);
		newParams.set("page", newPage.toString());
		navigate(`?${newParams.toString()}`);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<Container style={{paddingTop: "35px"}}>
			<Searchbar />
			<Row style={{paddingTop: "35px"}}>
				{loading && <Loading />}
				{!loading && resultsArray && resultsArray.length === 0 && (
					<NoResults />
				)}
				{!loading && resultsArray && resultsArray.length > 0 && (
					<>
						<Col xs={12} className="mb-3">
							<div style={{ color: "#666", fontSize: "0.9rem" }}>
								Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
								{Math.min(currentPage * ITEMS_PER_PAGE, total)} de {total} resultados
							</div>
						</Col>
						{resultsArray.map((result) => (
							<Col key={result.id} xs={12} lg={6} className="mb-4">
								<MaterialCard material={result} />
							</Col>
						))}
					</>
				)}
			</Row>
			{!loading && resultsArray && resultsArray.length > 0 && totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					isLoading={loading}
				/>
			)}
		</Container>
	);
};