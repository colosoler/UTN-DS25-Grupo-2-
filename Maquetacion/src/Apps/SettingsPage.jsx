import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
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
  const navigate = useNavigate()

  const [profilePic, setProfilePic] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      alert('Perfil actualizado correctamente')
      navigate('/profile')
    }

    setValidated(true)
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

  return (
    <div className="profile-settings-container">
      <Form.Group className="mb-4">
        <Form.Label>Foto de Perfil</Form.Label>
        <div className="profile-photo-section">
          {profilePic ? (
            <img
                src={profilePic ? profilePic : "/images/profile-user-icon.png"}
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

        {/* Primera fila: Nombre y Apellido */}
        <div className="form-row">
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresá un nombre válido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Dejá este campo vacío para no modificar el nombre.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formSurname">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresá un apellido válido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Dejá este campo vacío para no modificar el apellido.
            </Form.Text>
          </Form.Group>
        </div>

        {/* Segunda fila: Usuario y Email */}
        <div className="form-row">
          <Form.Group controlId="formUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresá un usuario válido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Dejá este campo vacío para no modificar el usuario.
            </Form.Text>
          </Form.Group>
          
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresá un correo válido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Dejá este campo vacío para no modificar el correo.
            </Form.Text>
          </Form.Group>
        </div>

        {/* Tercera fila: Contraseña y Carrera */}
        <div className="form-row">
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nueva contraseña (opcional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              Dejá en blanco para mantener la contraseña actual.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formCareer">
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

        <Button type="submit" className="w-100">
          Guardar cambios
        </Button>
      </Form>
    </div>
  )
}