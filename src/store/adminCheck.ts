import { jwtDecode, JwtPayload } from 'jwt-decode';

function isAdmin(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role === 'ROLE_ADMIN';
  } catch (error) {
    console.error('Invalid token or decoding error', error);
    return false;
  }
}

export default isAdmin;
