import { useState, useEffect } from 'react';
import { Flag } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Alert } from './Alert';
import Spinner from 'react-bootstrap/Spinner';
import { getToken } from '../Helpers/auth';
import { useAuth } from '../Contexts/AuthContext';

export const ReportModel = ({ materialId }) => {
    const [show, setShow] = useState(false);
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [reporteExistente, setReporteExistente] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [alertInfo, setAlertInfo] = useState({ 
        show: false, 
        message: '', 
        variant: 'success' 
    });

    const API_URL = import.meta.env.VITE_API_URL;
    const { user } = useAuth();

    useEffect(() => {
        const ExistingReport = async () => {
            setIsChecking(true);
            setReporteExistente(false);

            try {
                const res = await fetch(`${API_URL}/reportes/${materialId}/reporte`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}` 
                        },
                    });
                if (res.ok) {
                    const data = await res.json();
                    if (data.reporte) {
                        setReporteExistente(true);
                    }
                }
            } catch(e) {
                console.error("Error al verificar reporte:", e);
            } finally {
                setIsChecking(false);
            }
        };
        ExistingReport();
    }, [materialId, user]);
    
    const handleClose = () => {
        setShow(false);
        setReason('');
        setOtherReason('');
    };

    const handleShow = () => setShow(true);


    const handleReasonChange = (e) => {
        setReason(e.target.value);
        if (e.target.value !== 'OTRO') {
            setOtherReason('');
        }
    };

    const handleSubmit = async () => {
        if (!reason) {
            setAlertInfo({ show: true, message: 'Falta completar el motivo.', variant: 'danger' });            
            return;
        }
        if (reason === 'OTRO' && !otherReason.trim()) {
            setAlertInfo({ show: true, message: 'Falta especificar el motivo.', variant: 'danger' });            
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(`${API_URL}/reportes/${materialId}/reporte`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}` 
                },
                body: JSON.stringify({
                    motivo: reason,
                    descripcion: reason === 'OTRO' ? otherReason : null
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al enviar el reporte');            
            }
            setAlertInfo({ 
                show: true, 
                message: '¡Reporte enviado con éxito!', 
                variant: 'success' 
            });
            setReporteExistente(true);
            handleClose()

        } catch (e) {
            setAlertInfo({ 
                show: true, 
                message: e.message || 'Ocurrió un error inesperado.', 
                variant: 'danger' 
            });      
        }finally {
            setIsLoading(false);
        }
    }

    const handleAlertClose = () => {
        setAlertInfo({ ...alertInfo, show: false });
    };

    const isDisabled = isChecking || reporteExistente;
return (
    <>
        <div onClick={isDisabled ? null : handleShow}
            style={{ 
                cursor: isDisabled ? 'not-allowed' : 'pointer', 
                opacity: isDisabled ? 0.5 : 1,
                pointerEvents: isDisabled ? 'none' : 'auto',
            }}
            >
                <Flag />
            </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>¿Querés reportar este apunte?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Seleccioná el motivo por el cual estás reportando este contenido.
                </p>
                <Form.Select value={reason} onChange={handleReasonChange}>
                    <option value="" disabled hidden>
                        Seleccioná un motivo
                    </option>
                    <option value="CONTENIDO_INAPROPIADO">Contenido inapropiado</option>
                    <option value="SPAM">Spam o publicidad</option>
                    <option value="PLAGIO">Plagio o infracción de derechos de autor</option>
                    <option value="OTRO">Otro motivo</option>
                </Form.Select>
                {reason === 'OTRO' && (
                    <Form.Group className="mt-3">
                        <Form.Label>Por favor, especificá el motivo</Form.Label>
                        <Form.Control
                            type="text"
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            placeholder="Escribí el motivo.."
                        />
                    </Form.Group>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {isLoading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : 'Enviar'}
                </Button>
            </Modal.Footer>
        </Modal>
        <Alert 
            show={alertInfo.show}
            message={alertInfo.message}
            variant={alertInfo.variant}
            onClose={handleAlertClose}
        />
    </>
);
}