import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { MdShare } from 'react-icons/md';

export const Share = ({shareUrl}) => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);

  const copyLink = () => {
    const url = window.location.href;
    console.log("Copiando link:", shareUrl);
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setIsError(false);
        setShow(true);
        autoClose();
      })
      .catch(() => {
        setIsError(true);
        setShow(true);
        autoClose();
      });
  };

  const autoClose = () => {
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <>
      <div id="share" onClick={copyLink} style={{ cursor: 'pointer' }}>
        <MdShare size={24} />
      </div>

      <ToastContainer
        position="bottom-center"
        className="p-3"
        style={{position: 'fixed', marginBottom: '20px'}}
      >
        <Toast show={show} onClose={() => setShow(false)} bg={isError ? 'danger' : 'success'} delay={1500} autohide>
          <Toast.Body className="text-white text-center">
            {isError ? 'Error al copiar el link' : '¡Link copiado al portapapeles!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
