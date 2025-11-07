import React from 'react'
import { Spinner } from 'react-bootstrap';

export const Loading = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Spinner animation="border" role="status" className="mb-3" />
      <h4>Cargando...</h4>
    </div>
  )
}
