import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useFetch } from "../Hooks/useFetch"
import { getUser } from "../Helpers/auth"
import { Searchbar } from "../Components/Searchbar"
import { MaterialCard } from "../Components/MaterialCard"
import { Loading } from "../Components/Loading"
import { Pagination } from "../Components/Pagination"
import "../Apps/styles/FavoritePage.css"

const ITEMS_PER_PAGE = 10;

export const FavoritePage = () => {
  const user = getUser();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const currentPage = Math.max(1, parseInt(params.get("page") || "1", 10));

  const [materials, setMaterials] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if (currentPage !== 1) {
      const newParams = new URLSearchParams(location.search);
      newParams.set("page", "1");
      navigate(`?${newParams.toString()}`, { replace: true });
    }
  }, [debouncedSearch]);

  const apiUrl = debouncedSearch
    ? `${API_URL}/favoritos?query=${encodeURIComponent(debouncedSearch)}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
    : `${API_URL}/favoritos?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;

  const { data, loading, error } = useFetch(apiUrl, {}, { requireAuth: true });

  useEffect(() => {
    if (data && data.data) {
      setMaterials(data.data);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
      setInitialLoad(false);
    }
  }, [data]);

  if (initialLoad && loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const handleClear = () => {
    setSearchValue("");
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("page", newPage.toString());
    navigate(`?${newParams.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className="my-4">
      <Link to="/profile" className="favorite-back-link">
        <ArrowLeft size={20} />
        Volver a Mi Perfil
      </Link>

      <div className="mb-4">
        <h2 className="fw-bold">Mis Favoritos</h2>
        <p className="text-muted">Los materiales que guardaste como favoritos</p>
      </div>

      <div className="container-fluid py-3">
        <Row className="justify-content-center">
          <Col xs={12} md={15} lg={12}>
            <Searchbar
              localMode={true}
              localValue={searchValue}
              onLocalChange={(e) => setSearchValue(e.target.value)}
              onLocalClear={handleClear}
            />
          </Col>
        </Row>
      </div>

      <Row xs={1} md={2} lg={2} className="g-4" style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s', pointerEvents: loading ? 'none' : 'auto' }}>
        {materials.length === 0 ? (
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <i className="bi bi-star text-muted" style={{ fontSize: "3rem" }}></i>
                <h4 className="mt-3 text-muted">
                  {searchValue ? "No se encontraron resultados" : "Todavía no tenés materiales favoritos"}
                </h4>
                <p className="text-muted">
                  {searchValue ? "Intenta ajustar tu búsqueda" : "Marcá materiales con la estrella para guardarlos acá"}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          materials.map((material) => (
            <Col key={material.id}>
              <MaterialCard material={material} />
            </Col>
          ))
        )}
      </Row>

      {materials.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
        />
      )}
    </Container>
  )
}
