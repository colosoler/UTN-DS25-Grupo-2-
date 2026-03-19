import { useRef, useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './styles/GoogleAuthButton.css';

export function GoogleAuthButton({
  onSuccess,
  onError,
  text = 'continue_with',
  disabled = false,
}) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const wrapperRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setButtonWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
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