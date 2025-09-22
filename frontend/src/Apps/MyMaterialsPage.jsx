
import { useState, useEffect } from "react"
import { DeleteConfirmModal } from "../Components/DeleteConfirmModal"
import { Share } from "../Components/Share"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { Link, useNavigate } from "react-router-dom"
import { MdEdit, MdArrowUpward, MdArrowDownward } from "react-icons/md"
import { useFetch } from "../Hooks/useFetch"
import { SERVER_URL } from "../Constants"
import "./styles/MyMaterialsPage.css"

export const MyMaterialsPage = () => {
  const { data, isLoading, error } = useFetch("/apuntes", SERVER_URL)
  const navigate = useNavigate()
  const [materials, setMaterials] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [filteredMaterials, setFilteredMaterials] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [materialToDelete, setMaterialToDelete] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (data) {
      setMaterials(data)
      setFilteredMaterials(data)
    }
  }, [data])

  useEffect(() => {
    if (searchValue) {
      const filtered = materials.filter(
        (material) =>
          material.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          material.description.toLowerCase().includes(searchValue.toLowerCase()),
      )
      setFilteredMaterials(filtered)
    } else {
      setFilteredMaterials(materials)
    }
  }, [searchValue, materials])

  if (isLoading) return <p>Cargando apuntes...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleDeleteClick = (material) => {
    setMaterialToDelete(material)
    setShowDeleteModal(true)
  }

  const handleEdit = (material) => {
    console.log("Editar material:", material.id)
    
    navigate(`/edit/${material.id}`, {
      state: {
        materialData: material,
      },
    })
  }

  const confirmDelete = () => {
    setMaterials((prev) => prev.filter((m) => m.id !== materialToDelete.id))
    setShowDeleteModal(false)
    setMaterialToDelete(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Búsqueda:", searchValue)
    }
  }

  const handleClear = () => {
    setSearchValue("")
  }

  const handleMenuClick = () => {
    setShowForm(!showForm)
    console.log("Menu clicked, form visibility toggled:", !showForm)
  }

  return (
    <Container className="my-4">
      {/* Título */}
      <div className="mb-4">
        <h2 className="fw-bold">Mis Publicaciones</h2>
        <p className="text-muted">Gestiona todo el material de estudio que has subido</p>
      </div>

      {/* Estadísticas rápidas */}
      <Row className="mb-4">
        <Col md={3} xs={6} className="mb-3">
          <Card className="stats-card text-center">
            <Card.Body>
              <i className="bi bi-file-earmark-text text-primary fs-3"></i>
              <h4 className="mt-2 mb-0">{materials.length}</h4>
              <small className="text-muted">Publicaciones</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} xs={6} className="mb-3">
          <Card className="stats-card text-center">
            <Card.Body>
              <MdArrowUpward className="text-success fs-3" />
              <h4 className="mt-2 mb-0">{materials.reduce((acc, m) => acc + m.upvotes, 0)}</h4>
              <small className="text-muted">Upvotes totales</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} xs={6} className="mb-3">
          <Card className="stats-card text-center">
            <Card.Body>
              <MdArrowDownward className="text-danger fs-3" />
              <h4 className="mt-2 mb-0">{materials.reduce((acc, m) => acc + m.downvotes, 0)}</h4>
              <small className="text-muted">Downvotes totales</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} xs={6} className="mb-3">
          <Card className="stats-card text-center">
            <Card.Body>
              <i className="bi bi-trophy text-warning fs-3"></i>
              <h4 className="mt-2 mb-0">{materials.reduce((acc, m) => acc + (m.upvotes - m.downvotes), 0)}</h4>
              <small className="text-muted">Puntuación neta</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Barra de búsqueda */}
      <div className="container-fluid py-3">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="input-group input-group-lg rounded-lg shadow-sm">
              <input
                type="text"
                className="form-control focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-l-lg"
                placeholder="Buscar en mis publicaciones..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="btn flex items-center justify-center p-2"
                type="button"
                onClick={handleClear}
                title="Borrar"
                style={{
                  border: "1px solid #ced4da",
                  borderLeft: "none",
                  borderRight: "none",
                  backgroundColor: "#fff",
                  color: "#6c757d",
                }}
              >
                ×
              </button>
              <button
                className="btn flex items-center justify-center p-2 rounded-r-lg"
                type="button"
                onClick={handleMenuClick}
                title="Menú"
                style={{
                  border: "1px solid #ced4da",
                  borderLeft: "none",
                  backgroundColor: "#fff",
                  color: "#6c757d",
                }}
              >
                ≡
              </button>
            </div>
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
                  <button className="btn btn-primary">
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
                      <Card.Title>{material.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">@{material.user}</Card.Subtitle>
                    </div>
                    <button
                      className="btn btn-link p-1 text-muted edit-btn"
                      onClick={() => handleEdit(material)}
                      title="Editar material"
                    >
                      <MdEdit size={20} />
                    </button>
                  </div>

                  <Card.Text>{material.description}</Card.Text>

                  <Link to={`/material/${material.id}`} className="text-primary fw-semibold">
                    Ver material
                  </Link>

                  {/* Mostrar votos sin permitir votar */}
                  <div className="votes-display d-flex align-items-center gap-3 mt-3 pt-3 border-top">
                    <div className="d-flex align-items-center gap-4">
                      {/* Upvotes (solo mostrar) */}
                      <div className="d-flex align-items-center vote-display">
                        <MdArrowUpward className="text-success me-1" size={20} />
                        <span className="fw-semibold">{material.upvotes}</span>
                      </div>

                      {/* Downvotes (solo mostrar) */}
                      <div className="d-flex align-items-center vote-display">
                        <MdArrowDownward className="text-danger me-1" size={20} />
                        <span className="fw-semibold">{material.downvotes}</span>
                      </div>

                      {/* Puntuación neta */}
                      <div className="d-flex align-items-center">
                        <i className="bi bi-trophy text-warning me-1"></i>
                        <span className="fw-semibold text-muted">
                          {material.upvotes - material.downvotes > 0 ? "+" : ""}
                          {material.upvotes - material.downvotes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones: Compartir y Eliminar */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center gap-3">
                      {/* Compartir */}
                      <Share shareUrl={`${window.location.origin}/material/${material.id}`} />
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