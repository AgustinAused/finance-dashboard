'use server'
import { cookies } from 'next/headers';

export default async function verifyToken() {
  const cookiesInstance = await cookies();
  const token =  cookiesInstance.get('access_token');  // Obtener el token de las cookies

  if (!token) {
    return { isLoggedIn: false }
  }
  try {
    return ({ isLoggedIn: true })
  } catch (error) {
    return { isLoggedIn: false }
    }
}
