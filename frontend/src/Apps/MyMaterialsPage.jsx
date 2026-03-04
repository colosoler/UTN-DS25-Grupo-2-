import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { useNavigate, useLocation } from "react-router-dom"
import { useFetch } from "../Hooks/useFetch"
import { getUser } from "../Helpers/auth"
import { Searchbar } from "../Components/Searchbar"
import { StatsCards } from "../Components/StatsCards"
import { MaterialCard } from "../Components/MaterialCard"
import { Loading } from "../Components/Loading"
import { Alert } from "../Components/Alert"
import { Pagination } from "../Components/Pagination"
import "../Apps/styles/MyMaterialsPage.css"

const ITEMS_PER_PAGE = 10;

export const MyMaterialsPage = () => {
  const user = getUser();
  const userId = user?.id;
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  
  const params = new URLSearchParams(location.search);
  const currentPage = Math.max(1, parseInt(params.get("page") || "1", 10));
  
  const { data, loading, error } = useFetch(`${API_URL}/materials?userId=${userId}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
  const [materials, setMaterials] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [successAlert, setSuccessAlert] = useState({ show: false, message: '' });
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Accede a data.data si existe
    if (data && data.data) {
      setMaterials(data.data);
      setFilteredMaterials(data.data);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } else if (Array.isArray(data)) {
      setMaterials(data);
      setFilteredMaterials(data);
    }
  }, [data]);

  useEffect(() => {
    // Mostrar alerta de éxito si viene del redirect
    if (location.state?.successMessage) {
      setSuccessAlert({ show: true, message: location.state.successMessage });
      // Ocultarla después de 3 segundos
      const timer = setTimeout(() => {
        setSuccessAlert({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    if (searchValue) {
      const filtered = materials.filter(
        (material) =>
          material.titulo?.toLowerCase().includes(searchValue.toLowerCase()) ||
          material.descripcion?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredMaterials(filtered);
    } else {
      setFilteredMaterials(materials);
    }
  }, [searchValue, materials]);

  if (loading) {return <Loading />} ;
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
      {/* Alerta de éxito */}
      <Alert
        show={successAlert.show}
        message={successAlert.message}
        variant="success"
        onClose={() => setSuccessAlert({ show: false, message: '' })}
      />

      {/* Título */}
      <div className="mb-4">
        <h2 className="fw-bold">Mis Publicaciones</h2>
        <p className="text-muted">Gestiona todo el material de estudio que subiste</p>
      </div>

      {/* Estadísticas rápidas */}
      <StatsCards materials={materials} stats={data?.stats} total={total} />

      {/* Barra de búsqueda */}
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

      {/* Lista de materiales */}
      <Row xs={1} md={2} lg={2} className="g-4">
        {filteredMaterials.length === 0 ? (
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <i className="bi bi-journal-x text-muted" style={{ fontSize: "3rem" }}></i>
                <h4 className="mt-3 text-muted">
                  {searchValue ? "No se encontraron resultados" : "Todavía no subiste ningún material"}
                </h4>
                <p className="text-muted">
                  {searchValue ? "Intenta ajustar tu búsqueda" : "Comenzá subiendo tu primer material de estudio"}
                </p>
                {!searchValue && (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/add")}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Subir material
                  </button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ) : (
          filteredMaterials.map((material) => (
            <Col key={material.id}>
              <MaterialCard material={material} />
            </Col>
          ))
        )}
      </Row>

      {/* Paginación */}
      {!searchValue && filteredMaterials.length > 0 && totalPages > 1 && (
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