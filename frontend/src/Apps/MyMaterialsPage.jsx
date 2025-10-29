import { useState, useEffect } from "react"
import { DeleteConfirmModal } from "../Components/DeleteConfirmModal"
import { ShareButton } from "../Components/ShareButton"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { Link, useNavigate } from "react-router-dom"
import { MdEdit, MdArrowUpward, MdArrowDownward } from "react-icons/md"
import { useFetch } from "../Hooks/useFetch"
import "../Apps/styles/MyMaterialsPage.css"
import { getToken, getUser } from "../Helpers/auth"
import { Searchbar } from "../Components/Searchbar"
import { VotesDisplay } from "../Components/VotesDisplay";
import { StatsCards } from "../Components/StatsCards"


export const MyMaterialsPage = () => {
  const user = getUser();
  const userId = user?.id;
  const API_URL = import.meta.env.VITE_API_URL;
  
  const { data, loading, error } = useFetch(`${API_URL}/materials?userId=${userId}`);
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  if (loading) return <p>Cargando apuntes...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleteClick = (material) => {
    setMaterialToDelete(material);
    setShowDeleteModal(true);
  };

  const handleEdit = (material) => {
    navigate(`/edit/${material.id}`, {
      state: {
        materialData: material,
      },
    });
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${API_URL}/materials/${materialToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${getToken()}` // si usas autenticación
        }
      });
      setMaterials((prev) => prev.filter((m) => m.id !== materialToDelete.id));
    } catch (err) {
      alert("Error al eliminar el material");
    }
    setShowDeleteModal(false);
    setMaterialToDelete(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleMenuClick = () => {
    setShowForm(!showForm);
  };

  return (
    <Container className="my-4">
      {/* Título */}
      <div className="mb-4">
        <h2 className="fw-bold">Mis Publicaciones</h2>
        <p className="text-muted">Gestiona todo el material de estudio que has subido</p>
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
                  {searchValue ? "No se encontraron resultados" : "Todavía no has subido ningún material"}
                </h4>
                <p className="text-muted">
                  {searchValue ? "Intenta ajustar tu búsqueda" : "Comienza subiendo tu primer material de estudio"}
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
              {/* Tarjeta personalizada para mis publicaciones */}
              <Card className="material-card h-100">
                <Card.Body>
                  {/* Header con botón de editar */}
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="flex-grow-1">
                      <Card.Title>{material.titulo}</Card.Title>
                      
                    </div>
                    <button
                      className="btn btn-link p-1 text-muted edit-btn"
                      onClick={() => handleEdit(material)}
                      title="Editar material"
                    >
                      <MdEdit size={20} />
                    </button>
                  </div>

                  <Card.Text>{material.descripcion}</Card.Text>

                  <Link to={`/material/${material.id}`} className="text-primary fw-semibold">
                    Ver material
                  </Link>

                  <VotesDisplay upvotes={material.upvotes || 0} downvotes={material.downvotes || 0} />

                  {/* Acciones: Compartir y Eliminar */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center gap-3">
                      {/* Compartir */}
                      <ShareButton shareUrl={`${window.location.origin}/material/${material.id}`} />
                    </div>

                    {/* Eliminar */}
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(material)}>
                      <i className="bi bi-trash me-1"></i>
                      Eliminar
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Modal de confirmación */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        materialTitle={materialToDelete?.title}
      />
    </Container>
  )
}