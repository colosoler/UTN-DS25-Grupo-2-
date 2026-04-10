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
        const scale = 150 / viewport.height;
        const scaledViewport = page.getViewport({ scale });
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport: scaledViewport }).promise;
      } catch {
        if (!cancelled) setError(true);
      }
    };
    render();
    return () => { cancelled = true; };
  }, [file]);

  if (error) {
    return <div className="file-preview-fallback pdf"><i className="bi bi-file-earmark-pdf-fill"></i></div>;
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

  // Ref para drag. Usamos ref (no state) para evitar re-renders que interfieren con el drag
  const draggedIndexRef = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null); // solo para estilos

  const [isDraggingExternal, setIsDraggingExternal] = useState(false);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

  // Para animaciones
  const [movingIndex, setMovingIndex] = useState(null);       // índice que se está moviendo
  const [movingDir, setMovingDir] = useState(null);           // 'left'|'right'|'up'|'down'
  const [exitingIndex, setExitingIndex] = useState(null);     // índice que se está eliminando

  const files = formData.archivos ? Array.from(formData.archivos) : [];

  const setFiles = useCallback((updated) => {
    setFormData(prev => ({ ...prev, archivos: updated }));
  }, [setFormData]);

  // ── Agregar ──────────────────────────────────────────────────
  const addFiles = useCallback((newFiles) => {
    if (newFiles.length === 0) return;
    const existing = formData.archivos ? Array.from(formData.archivos) : [];
    setFiles([...existing, ...newFiles]);
  }, [formData.archivos, setFiles]);

  const handleFileChange = (e) => {
    addFiles(Array.from(e.target.files));
    if (inputRef.current) inputRef.current.value = "";
  };

  // ── Eliminar con animación ────────────────────────────────────
  const removeFile = (index) => {
    setExitingIndex(index);
    setTimeout(() => {
      setExitingIndex(null);
      setFiles(Array.from(formData.archivos).filter((_, i) => i !== index));
    }, 450); // duración de la animación CSS
  };

  // ── Mover con animación ───────────────────────────────────────
  const moveFile = (index, direction) => {
    const updated = Array.from(formData.archivos);
    const canMove = direction === -1 ? index > 0 : index < updated.length - 1;
    if (!canMove) return;

    const dir = direction === -1
      ? (window.innerWidth < 768 ? "up" : "left")
      : (window.innerWidth < 768 ? "down" : "right");

    setMovingIndex(index);
    setMovingDir(dir);

    setTimeout(() => {
      const newArr = Array.from(formData.archivos);
      const swapWith = index + direction;
      [newArr[index], newArr[swapWith]] = [newArr[swapWith], newArr[index]];
      setFiles(newArr);
      setMovingIndex(null);
      setMovingDir(null);
    }, 220);
  };

  // ── Drag & Drop de cards (reordenar) ─────────────────────────
  const handleCardDragStart = (e, index) => {
    e.stopPropagation();
    draggedIndexRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleCardDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setDropTargetIndex(index);
  };

  const handleCardDragLeave = (e) => {
    e.stopPropagation();
    setDropTargetIndex(null);
  };

  const handleCardDrop = (e, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const sourceIndex = draggedIndexRef.current;
    draggedIndexRef.current = null;
    setDraggingIndex(null);
    setDropTargetIndex(null);
    if (sourceIndex === null || sourceIndex === targetIndex) return;
    const updated = Array.from(formData.archivos);
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setFiles(updated);
  };

  const handleCardDragEnd = () => {
    draggedIndexRef.current = null;
    setDraggingIndex(null);
    setDropTargetIndex(null);
  };

  // ── Drag & Drop externo (subir archivos) ─────────────────────
  const handleZoneDragOver = (e) => {
    // Solo activar si vienen archivos externos (no cards internas)
    if (draggedIndexRef.current !== null) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingExternal(true);
  };

  const handleZoneDragLeave = (e) => {
    if (draggedIndexRef.current !== null) return;
    e.preventDefault();
    e.stopPropagation();
    // Solo desactivar si el cursor salió afuera del dropZone completo
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget)) {
      setIsDraggingExternal(false);
    }
  };

  const handleZoneDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingExternal(false);
    // Si hay una card siendo arrastrada, ignorar (ya lo maneja handleCardDrop)
    if (draggedIndexRef.current !== null) return;
    if (e.dataTransfer.files?.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  // ── Preview ───────────────────────────────────────────────────
  const getPreview = (file) => {
    if (file.type.startsWith("image/")) return <ImageThumbnail file={file} />;
    if (file.type === "application/pdf") return <PdfThumbnail file={file} />;
    return <div className="file-preview-fallback generic"><i className="bi bi-file-earmark-fill"></i></div>;
  };

  // ── "Bloqueado" mientras anima para no stackear clicks ────────
  const isBusy = movingIndex !== null || exitingIndex !== null;

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
        className={`file-upload-zone ${isDraggingExternal ? "dragging" : ""} ${files.length > 0 ? "has-files" : ""}`}
        onDragOver={handleZoneDragOver}
        onDragLeave={handleZoneDragLeave}
        onDrop={handleZoneDrop}
        onClick={() => files.length === 0 && inputRef.current?.click()}
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
              Arrastrá tus archivos acá o <span className="file-upload-link" onClick={() => inputRef.current?.click()}>buscalos</span>
            </p>
            <p className="file-upload-hint">PDFs, imágenes</p>
          </div>
        ) : (
          <div className="file-upload-content">
            <div className="file-cards-grid">
              {files.map((file, i) => {
                const isBeingDragged = draggingIndex === i;
                const isDropTarget = dropTargetIndex === i && draggingIndex !== i;
                const isMoving = movingIndex === i;
                const isExiting = exitingIndex === i;

                let cardClass = "file-card";
                if (isBeingDragged) cardClass += " dragging-card";
                if (isDropTarget) cardClass += " drop-target";
                if (isMoving) cardClass += ` moving-${movingDir}`;
                if (isExiting) cardClass += " exiting";

                return (
                  <Card
                    key={`${file.name}-${file.size}-${i}`}
                    className={cardClass}
                    draggable
                    onDragStart={(e) => handleCardDragStart(e, i)}
                    onDragOver={(e) => handleCardDragOver(e, i)}
                    onDragLeave={handleCardDragLeave}
                    onDrop={(e) => handleCardDrop(e, i)}
                    onDragEnd={handleCardDragEnd}
                  >
                    {/* Número de orden */}
                    <span className="file-card-order">{i + 1}</span>

                    <div className="file-card-preview">
                      {getPreview(file)}
                    </div>

                    <Card.Body className="file-card-body">
                      <span className="file-card-name" title={file.name}>{file.name}</span>
                      <span className="file-card-size">{(file.size / 1024).toFixed(0)} KB</span>
                    </Card.Body>

                    {/* Botón: mover prev */}
                    {i > 0 && (
                      <button
                        type="button"
                        className="file-card-move move-prev"
                        onPointerDown={(e) => e.preventDefault()} // evitar que el botón quede en :active
                        onClick={(e) => { e.stopPropagation(); if (!isBusy) moveFile(i, -1); }}
                        title="Mover anterior"
                      >
                        <i className="bi bi-chevron-left d-none d-md-inline"></i>
                        <i className="bi bi-chevron-up d-inline d-md-none"></i>
                      </button>
                    )}

                    {/* Botón: eliminar */}
                    <button
                      type="button"
                      className="file-card-remove"
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={(e) => { e.stopPropagation(); if (!isBusy) removeFile(i); }}
                      title="Quitar archivo"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>

                    {/* Botón: mover next */}
                    {i < files.length - 1 && (
                      <button
                        type="button"
                        className="file-card-move move-next"
                        onPointerDown={(e) => e.preventDefault()}
                        onClick={(e) => { e.stopPropagation(); if (!isBusy) moveFile(i, 1); }}
                        title="Mover siguiente"
                      >
                        <i className="bi bi-chevron-right d-none d-md-inline"></i>
                        <i className="bi bi-chevron-down d-inline d-md-none"></i>
                      </button>
                    )}
                  </Card>
                );
              })}
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
