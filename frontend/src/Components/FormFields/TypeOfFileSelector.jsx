import { useState } from "react";
import { ExpandedSelector } from "./ExpandedSelector";
import { Form } from "react-bootstrap";

export const TypeOfFileSelector = ({ useForm, fieldError }) => {
  const [type, setType] = useState()
  const [formData, setFormData, handleChange] = useForm;
  const FieldError = fieldError;
  return (
    <>
      <ExpandedSelector
        options={[
          { id: "PDF", name: "PDF" },
          { id: "Images", name: "Imágenes" },
          { id: "docx", name: "Word/docx" },
          { id: "xlsx", name: "Excel/xlsx" },
        ]}
        name="type_of_file"
        label="Qué querés publicar?"
        onChange={(e) => { setType(JSON.parse(e.target.value).id); }}
        value={type}
      />
      {type === "PDF" &&
        <Form.Group className="material-form-group slide-down-form">
          <div className="d-flex justify-content-between align-items-baseline">
            <Form.Label className="material-form-label">Subí el pdf</Form.Label>
            <FieldError field="archivos" />
          </div>
          <Form.Control
            type="file"
            name="archivos"
            accept=".pdf"
            onChange={(e) => setFormData({ ...formData, archivos: e.target.files })}
            className="material-form-control"
            multiple
          />
        </Form.Group>
      }
      {type === "Images" && <div className="slide-down-form">Subí una imágen</div>
      }
      {type === "docx" && <div className="slide-down-form">Subí un archivo .docx</div>
      }
      {type === "xlsx" && <div className="slide-down-form">Subí un archivo .xlsx</div>
      }
    </>
  )
}
