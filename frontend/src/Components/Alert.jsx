import { useState, useEffect } from "react"
import { Toast, ToastContainer } from "react-bootstrap"

export const Alert = ({ show, message, onClose, variant = "success" }) => {
  const [showToast, setShowToast] = useState(show)

  useEffect(() => {
    setShowToast(show)
    if (show) {
      const timer = setTimeout(() => {
        setShowToast(false)
        if (onClose) onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  const handleClose = () => {
    setShowToast(false)
    if (onClose) onClose()
  }

  return (
    <ToastContainer position="bottom-start" className="p-3">
      <Toast
        show={showToast}
        onClose={handleClose}
        style={{
          backgroundColor: "var(--primary-color)",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(74, 144, 226, 0.3)",
        }}
      >
        <Toast.Header
          closeButton={true}
          style={{
            backgroundColor: "var(--primary-color)",
            color: "#ffffff",
            border: "none",
          }}
        >
          <strong className="me-auto">UTNotas</strong>
        </Toast.Header>
        <Toast.Body style={{ color: "#ffffff" }}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}