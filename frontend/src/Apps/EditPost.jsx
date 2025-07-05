"use client"

import { useState, useEffect } from "react"
import { Form, Row, Col, Button, Alert } from "react-bootstrap"
import { SearchOptions } from "../Components/SearchOptions"
import { carreras } from "./HomeApp"
import { useForm } from "../Hooks/useForm"
import { useFetch } from "../Hooks/useFetch"
import { useParams } from "react-router-dom"
import { SERVER_URL } from "../Constants"

const materias = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2"]

export const EditMaterial = () => {
  const { id } = useParams()
  const [formData, setFormData, handleChange] = useForm()
  const { data, isLoading, error } = useFetch(`/apuntes/${id}`, SERVER_URL)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (data && !isLoading && !error) {
      setFormData({
        titulo: data.title || "",
        materia: data.materia || "",
        carrera: data.carrera || "",
        tipo: data.tipo || "",
        parcial: data.parcial || "",
        comision: data.comision || "",
        descripcion: data.description || "",
      })
    }
  }, [data, isLoading, error, setFormData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("titulo", formData.titulo || "")
      formDataToSend.append("materia", formData.materia || "")
      formDataToSend.append("carrera", formData.carrera || "")
      formDataToSend.append("tipo", formData.tipo || "")
      formDataToSend.append("parcial", formData.parcial || "")
      formDataToSend.append("comision", formData.comision || "")
      formDataToSend.append("descripcion", formData.descripcion || "")

      const fileInput = document.querySelector("input[name='archivos']")
      if (fileInput && fileInput.files.length > 0) {
        for (const file of fileInput.files) {
          formDataToSend.append("archivos", file)
        }
      }

      const response = await fetch(`${SERVER_URL}/apuntes/${id}`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (response.ok) {
        setShowSuccessToast(true)
        setTimeout(() => {
          window.location.href = "/MyPosts"
        }, 2000)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Alert
        show={showSuccessToast}
        variant="success"
        className="position-fixed top-0 start-50 translate-middle-x mt-3"
        style={{ zIndex: 1050 }}
      >
        ¡Material actualizado exitosamente! Redirigiendo...
      </Alert>

      <Form className="container mt-5 bg-light p-4 rounded" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Editando: {data?.title || "Cargando..."}</h1>

        <Form.Group className="mb-4">
          <Form.Label>Título del material</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="titulo"
            size="lg"
            type="text"
            placeholder="Ej: Resumen Ecuaciones Diferenciales"
            value={formData.titulo || ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Actualizar archivos (opcional)</Form.Label>
          <Form.Control onChange={handleChange} type="file" name="archivos" multiple />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <SearchOptions
              options={materias}
              onChange={handleChange}
              name="materia"
              placeholder="Materia"
              value={formData.materia || ""}
            />
          </Col>
          <Col>
            <SearchOptions
              options={carreras.map((e) => e.name)}
              onChange={handleChange}
              name="carrera"
              placeholder="Carrera"
              value={formData.carrera || ""}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Select onChange={handleChange} name="tipo" value={formData.tipo || ""}>
              <option>Tipo de material</option>
              <option value="parcial">Parcial</option>
              <option value="parcial resuelto">Parcial Resuelto</option>
              <option value="practica">Práctica</option>
              <option value="practica resuelta">Práctica Resuelta</option>
              <option value="final">Final</option>
              <option value="final resuelto">Final resuelto</option>
              <option value="apunte">Apunte</option>
              <option value="resumen">Resumen</option>
              <option value="otro">Otro</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select onChange={handleChange} name="parcial" value={formData.parcial || ""}>
              <option>Parcial relacionado</option>
              <option value={0}>Ninguno</option>
              <option value={1}>1ero</option>
              <option value={2}>2do</option>
              <option value={3}>3ro</option>
              <option value={4}>4to</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="Comisión"
              name="comision"
              value={formData.comision || ""}
            />
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="descripcion"
            as="textarea"
            rows={3}
            placeholder="Descripción del material..."
            value={formData.descripcion || ""}
          />
        </Form.Group>

        <Button type="submit" className="d-block mx-auto" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Actualizando..." : "Actualizar Material"}
        </Button>
      </Form>
    </>
  )
}
