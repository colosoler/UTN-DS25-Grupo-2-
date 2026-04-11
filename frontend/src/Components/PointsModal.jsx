import { Modal, Button } from "react-bootstrap";

export const PointsModal = ({ pointsAlert, onClose }) => {
    const showModal = !!pointsAlert;

    return (
        <Modal 
        show={showModal} 
        onHide={onClose} 
        centered 
        backdrop="static"
        animation={true}
        >
        <Modal.Header className="border-bottom-0 pb-0">
            <Modal.Title 
            style={{ cursor: 'default' }}
            className="text-success fw-bold w-100 text-center fs-3 bg-transparent">
            ¡Excelente aporte!
            </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="text-center px-4 pt-2 pb-4">
            <p className="text-muted fs-5 mb-4">Tu material ha sido publicado correctamente.</p>
            <div 
            className="rounded-circle bg-success text-white d-flex flex-column justify-content-center align-items-center mx-auto mb-4 shadow"
            style={{ width: '120px', height: '120px' }}
            >
            <span className="fs-1 fw-bold">+{pointsAlert?.total}</span>
            <span className="fs-6">puntos</span>
            </div>

            <div className="text-start bg-light rounded p-3 shadow-sm border">
            <h6 className="fw-bold text-secondary mb-3 border-bottom pb-2">Desglose de tu recompensa:</h6>
            
            <div className="d-flex justify-content-between mb-2">
                <span><i className="bi bi-file-earmark-arrow-up text-success me-2"></i>Subir material:</span>
                <span className="fw-bold">+20 pts</span>
            </div>

            {pointsAlert?.bonus > 0 && (
                <>
                <div className="d-flex justify-content-between mb-1 text-primary">
                    <span><i className="bi bi-plus-circle-dotted me-2"></i>Campos extra:</span>
                    <span className="fw-bold">+{pointsAlert.bonus} pts</span>
                </div>
                
                <ul className="text-muted small mb-0 ms-4" style={{ listStyleType: 'circle' }}>
                    {pointsAlert.breakdown.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
                </>
            )}
            </div>
        </Modal.Body>

        <Modal.Footer className="border-top-0 d-flex justify-content-center pb-4">
            <Button variant="success" size="lg" className="px-5 rounded-pill shadow-sm" onClick={onClose}>
            Continuar a mi Perfil
            </Button>
        </Modal.Footer>
        </Modal>
    );
};