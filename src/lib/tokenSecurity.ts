import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'adminadminhhh';

export function createToken(payload: {id: number, username: string}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): { valid: boolean; expired: boolean; decoded?: JwtPayload | string } {
  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, expired: false, decoded };

  } catch (error: any) {

    if (error.name === 'TokenExpiredError') {
      return { valid: false, expired: true };
    } else {
      return { valid: false, expired: false };
    }
  }
}
