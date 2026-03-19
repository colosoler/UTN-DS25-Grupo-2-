import { OAuth2Client, TokenPayload } from 'google-auth-library';

let client: OAuth2Client | null = null;

function getGoogleClient(): OAuth2Client {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    throw new Error('GOOGLE_CLIENT_ID no está configurado en las variables de entorno');
  }

  if (!client) {
    client = new OAuth2Client(googleClientId);
  }

  return client;
}

export async function verifyGoogleCredential(credential: string): Promise<TokenPayload> {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    throw new Error('GOOGLE_CLIENT_ID no está configurado en las variables de entorno');
  }

  const ticket = await getGoogleClient().verifyIdToken({
    idToken: credential,
    audience: googleClientId,
  }).catch((err: Error) => {
    const error = new Error('El token de Google no es válido o ha expirado') as Error & { statusCode?: number };
    error.statusCode = 401;
    throw error;
  });

  const payload = ticket.getPayload();
  if (!payload?.email) {
    const error = new Error('No se pudo obtener el email de la cuenta de Google') as Error & { statusCode?: number };
    error.statusCode = 400;
    throw error;
  }

  if (!payload.email_verified) {
    const error = new Error('La cuenta de Google no tiene el email verificado') as Error & { statusCode?: number };
    error.statusCode = 400;
    throw error;
  }

  return payload;
}