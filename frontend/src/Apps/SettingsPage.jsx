import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { DeleteConfirmAccount } from '../Components/DeleteConfirmAccount'
import { Alert } from '../Components/Alert'
import './styles/SettingsPage.css'

export const SettingsPage = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [career, setCareer] = useState('')
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setSuccessMessage('Perfil actualizado correctamente')
    setShowSuccessToast(true)
    setValidated(false)

    setTimeout(() => {
      setShowSuccessToast(false)
      navigate('/profile')
    }, 1500)
  }

  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePic(URL.createObjectURL(file))
    }
  }

  const handleDeletePhoto = () => {
    setProfilePic(null)
  }

  const handleOpenDeleteModal = () => setShowDeleteModal(true)
  const handleCloseDeleteModal = () => setShowDeleteModal(false)

  const handleConfirmDelete = () => {
    setShowDeleteModal(false)
    setSuccessMessage('Cuenta eliminada correctamente')
    setShowSuccessToast(true)

    setTimeout(() => {
      setShowSuccessToast(false)
      navigate('/')
    }, 1500)
  }

  const handleToastClose = () => {
    setShowSuccessToast(false)
  }

  return (
    <div className="profile-settings-container">
      <Form.Group className="mb-4">
        <Form.Label className="profile-photo-label">Foto de Perfil</Form.Label>
        <div className="profile-photo-section">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Foto de perfil"
              className="profile-photo"
            />
          ) : (
            <div className="profile-photo-placeholder">?</div>
          )}
          <div className="profile-photo-buttons">
            <Button variant="primary" onClick={handleChangePhotoClick} className="me-2">
              Cambiar foto de perfil
            </Button>
            <Button variant="danger" onClick={handleDeletePhoto}>
              Eliminar foto de perfil
            </Button>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Form.Group>

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="profile-settings-form">
        <h2>Configuración de Perfil</h2>

        <div className="form-row">
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={false}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresá un nombre válido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Dejá este campo vacío para no modificar el nombre.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formSurname" className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required={false}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresá un apellido válido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Dejá este campo vacío para no modificar el apellido.
            </Form.Text>
          </Form.Group>
        </div>

        <div className="form-row">
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={false}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresá un usuario válido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Dejá este campo vacío para no modificar el usuario.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={false}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresá un correo válido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Dejá este campo vacío para no modificar el correo.
            </Form.Text>
          </Form.Group>
        </div>

        <div className="form-row">
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nueva contraseña (opcional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={false}
            />
            <Form.Text className="text-muted">
              Dejá en blanco para mantener la contraseña actual.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formCareer" className="mb-3">
            <Form.Label>Carrera</Form.Label>
            <Form.Select
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            >
              <option value="" disabled>
                Seleccioná tu carrera
              </option>
              <option value="civil">Ingeniería Civil</option>
              <option value="electrica">Ingeniería Eléctrica</option>
              <option value="industrial">Ingeniería Industrial</option>
              <option value="mecanica">Ingeniería Mecánica</option>
              <option value="quimica">Ingeniería Química</option>
              <option value="sistemas">Ingeniería en Sistemas</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Por favor seleccioná una carrera.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Podés dejarlo vacío para no modificar la carrera.
            </Form.Text>
          </Form.Group>
        </div>

        {error && <p className="profile-error">{error}</p>}

        <Button type="submit" className="w-100 mb-2">
          Guardar cambios
        </Button>

        <Button
          type="button"
          className="w-100"
          variant="danger"
          onClick={handleOpenDeleteModal}
        >
          Eliminar cuenta
        </Button>
      </Form>

      <DeleteConfirmAccount
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de que querés eliminar tu cuenta?"
        confirmText="acción"
        buttonTitle="Eliminar cuenta"
      />

      <Alert
        show={showSuccessToast}
        message={successMessage}
        onClose={handleToastClose}
        variant="success"
      />
    </div>
  )
}