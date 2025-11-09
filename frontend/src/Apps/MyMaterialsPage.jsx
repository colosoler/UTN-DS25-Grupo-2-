import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../Hooks/useFetch"
import { getUser } from "../Helpers/auth"
import { Searchbar } from "../Components/Searchbar"
import { StatsCards } from "../Components/StatsCards"
import { MaterialCard } from "../Components/MaterialCard"
import { Loading } from "../Components/Loading"
import "../Apps/styles/MyMaterialsPage.css"


export const MyMaterialsPage = () => {
  const user = getUser();
  const userId = user?.id;
  const API_URL = import.meta.env.VITE_API_URL;
  
  const { data, loading, error } = useFetch(`${API_URL}/materials?userId=${userId}`);
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    // Accede a data.data si existe
    if (data && data.data) {
      setMaterials(data.data);
      setFilteredMaterials(data.data);
    } else if (Array.isArray(data)) {
      setMaterials(data);
      setFilteredMaterials(data);
    }
  }, [data]);

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

  return (
    <Container className="my-4">
      {/* Título */}
      <div className="mb-4">
        <h2 className="fw-bold">Mis Publicaciones</h2>
        <p className="text-muted">Gestiona todo el material de estudio que subiste</p>
      </div>

      {/* Estadísticas rápidas */}
      <StatsCards materials={materials} />

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
    </Container>
  )
}