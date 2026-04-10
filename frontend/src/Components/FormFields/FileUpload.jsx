import { useState } from "react";
import { Form } from "react-bootstrap";

export const FileUpload = ({ useForm, fieldError }) => {
  const [type, setType] = useState()
  const [formData, setFormData, handleChange] = useForm;
  const FieldError = fieldError;
  return (
    <>
      <Form.Group className="material-form-group">
        <div className="d-flex justify-content-between align-items-baseline">
          <Form.Label className="material-form-label">Subí tus archivos, nosotros los combinamos</Form.Label>
          <FieldError field="archivos" />
        </div>
        <Form.Control
          type="file"
          name="archivos"
          onChange={(e) => setFormData({ ...formData, archivos: e.target.files })}
          className="material-form-control"
          multiple
        />
      </Form.Group>
    </>
  )
}
