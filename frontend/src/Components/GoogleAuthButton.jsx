import { GoogleLogin } from '@react-oauth/google';
import './styles/GoogleAuthButton.css';

export function GoogleAuthButton({
  onSuccess,
  onError,
  text = 'continue_with',
  disabled = false,
}) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    return null;
  }

  return (
    <div className={`google-auth-wrapper${disabled ? ' google-auth-wrapper-disabled' : ''}`}>
      {disabled && <div className="google-auth-overlay" aria-hidden="true" />}
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        text={text}
        shape="pill"
        size="large"
        width="100%"
        locale="es"
        useOneTap={false}
      />
    </div>
  );
}