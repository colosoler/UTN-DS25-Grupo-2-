import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Share2 } from 'lucide-react';

export const ShareButton = ({ shareUrl }) => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsError(false);
    } catch {
      setIsError(false);
    } finally {
      setShow(true);
      setTimeout(() => setShow(false), 2500);
    }
  };

  return (
    <>
      <div id="share" onClick={copyLink} style={{ cursor: 'pointer' }}>
        <Share2 size={24} />
      </div>

      <ToastContainer
        position="bottom-center"
        className="p-3"
        style={{position: 'fixed', marginBottom: '20px'}}
      >
        <Toast show={show} bg={isError ? 'danger' : 'success'} delay={1500} autohide>
          <Toast.Body className="text-white text-center">
            {isError ? 'Error al copiar el link' : '¡Link copiado al portapapeles!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
