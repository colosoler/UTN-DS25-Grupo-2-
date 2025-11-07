import { useState, useEffect } from "react"
import { Toast, ToastContainer } from "react-bootstrap"
import "./styles/Alert.css";

export const Alert = ({ show, message, onClose, variant = "success"}) => {
  const [showToast, setShowToast] = useState(show)
  const color = "#4862caff";

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
    <ToastContainer position="top-center" className="p-3 m-2 m-lg-3 w-auto alert-max-width-md" style={{ zIndex: 1080 }}>
      <Toast
        show={showToast}
        onClose={handleClose}
        className="alert-custom-toast" 
				style={{
					backgroundColor: color,
					color: "#ffffff",
				}}
      >
        <Toast.Header
          closeButton={true}
          className="alert-custom-header" 
					style={{
						backgroundColor: color,
						color: "#ffffff",
					}}
        >
          <strong className="me-auto">UTNotas</strong>
        </Toast.Header>
        <Toast.Body className="alert-custom-body" style={{ color: "#ffffff" }}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}