import { useRef, useState, useEffect, useCallback } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './styles/GoogleAuthButton.css';

export function GoogleAuthButton({
  onSuccess,
  onError,
  text = 'continue_with',
  disabled = false,
}) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [buttonWidth, setButtonWidth] = useState(0);

  const wrapperRef = useCallback((node) => {
    if (!node) return;
    setButtonWidth(Math.floor(node.getBoundingClientRect().width));
  }, []);

  if (!googleClientId) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className={`google-auth-wrapper${disabled ? ' google-auth-wrapper-disabled' : ''}`}
    >
      {disabled && <div className="google-auth-overlay" aria-hidden="true" />}
      {buttonWidth > 0 && (
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          text={text}
          shape="pill"
          size="large"
          width={buttonWidth}
          locale="es"
          useOneTap={false}
        />
      )}
    </div>
  );
}