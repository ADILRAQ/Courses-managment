// src/utils/auth.ts
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'adminadminhhh'); // Ensure this secret is kept safe and secure

// Create a JWT token
export async function createToken(payload: { id: number; username: string }): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })  
    .setIssuedAt()
    .setExpirationTime('1d') // Token expiration time set to 1 day
    .sign(JWT_SECRET);
  return token;
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<{ valid: boolean; expired: boolean; decoded?: object }> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { valid: true, expired: false, decoded: payload };
  } catch (error: any) {
    if (error.code === 'ERR_JWT_EXPIRED') {
      return { valid: false, expired: true };
    } else {
      return { valid: false, expired: false };
    }
  }
}
