import { useRef, useEffect, useState, useCallback } from "react";
import { Form, Card } from "react-bootstrap";
import * as pdfjsLib from "pdfjs-dist";
import "../styles/FileUpload.css";

// Configurar el worker de pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

// Componente para generar la miniatura de un PDF (primera página)
const PdfThumbnail = ({ file }) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        // Escalar para que quepa en el thumbnail (150px de alto max)
        const scale = 150 / viewport.height;
        const scaledViewport = page.getViewport({ scale });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({
          canvasContext: canvas.getContext("2d"),
          viewport: scaledViewport,
        }).promise;
      } catch {
        if (!cancelled) setError(true);
      }
    };

    render();
    return () => { cancelled = true; };
  }, [file]);

  if (error) {
    return (
      <div className="file-preview-fallback pdf">
        <i className="bi bi-file-earmark-pdf-fill"></i>
      </div>
    );
  }

  return <canvas ref={canvasRef} className="file-preview-canvas" />;
};

// Componente para la miniatura de una imagen
const ImageThumbnail = ({ file }) => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!src) return null;
  return <img src={src} alt={file.name} className="file-preview-img" />;
};

export const FileUpload = ({ useForm, fieldError }) => {
  const [formData, setFormData] = useForm;
  const FieldError = fieldError;
  const inputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback((newFiles) => {
    if (newFiles.length === 0) return;
    const existing = formData.archivos ? Array.from(formData.archivos) : [];
    const accumulated = [...existing, ...newFiles];
    setFormData({ ...formData, archivos: accumulated });
  }, [formData, setFormData]);

  const handleFileChange = (e) => {
    addFiles(Array.from(e.target.files));
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index) => {
    const updated = Array.from(formData.archivos).filter((_, i) => i !== index);
    setFormData({ ...formData, archivos: updated });
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const files = formData.archivos ? Array.from(formData.archivos) : [];

  const getPreview = (file) => {
    if (file.type.startsWith("image/")) {
      return <ImageThumbnail file={file} />;
    }
    if (file.type === "application/pdf") {
      return <PdfThumbnail file={file} />;
    }
    return (
      <div className="file-preview-fallback generic">
        <i className="bi bi-file-earmark-fill"></i>
      </div>
    );
  };

  return (
    <Form.Group className="material-form-group">
      <div className="d-flex justify-content-between align-items-baseline">
        <Form.Label className="material-form-label">
          Subí tus archivos, nosotros los combinamos
        </Form.Label>
        <FieldError field="archivos" />
      </div>

      <div
        ref={dropZoneRef}
        className={`file-upload-zone ${isDragging ? "dragging" : ""} ${files.length > 0 ? "has-files" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          name="archivos"
          onChange={handleFileChange}
          multiple
          className="file-upload-hidden-input"
        />

        {files.length === 0 ? (
          <div className="file-upload-placeholder">
            <i className="bi bi-cloud-arrow-up-fill file-upload-icon"></i>
            <p className="file-upload-text">
              Arrastrá tus archivos acá o <span className="file-upload-link">buscalos</span>
            </p>
            <p className="file-upload-hint"> PDFs, imágenes</p>
          </div>
        ) : (
          <div className="file-upload-content" onClick={(e) => e.stopPropagation()}>
            <div className="file-cards-grid">
              {files.map((file, i) => (
                <Card key={i} className="file-card">
                  <div className="file-card-preview">
                    {getPreview(file)}
                  </div>
                  <Card.Body className="file-card-body">
                    <span className="file-card-name" title={file.name}>
                      {file.name}
                    </span>
                    <span className="file-card-size">
                      {(file.size / 1024).toFixed(0)} KB
                    </span>
                  </Card.Body>
                  <button
                    type="button"
                    className="file-card-remove"
                    onClick={() => removeFile(i)}
                    title="Quitar archivo"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </Card>
              ))}
            </div>

            <button
              type="button"
              className="file-add-more-btn"
              onClick={() => inputRef.current?.click()}
            >
              <i className="bi bi-plus-circle"></i> Agregar más archivos
            </button>
          </div>
        )}
      </div>
    </Form.Group>
  );
};
