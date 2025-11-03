import React from 'react'
import { Spinner } from 'react-bootstrap';

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
          <span>UTNotas...</span>
      </div>
    </div>
  )
}
