'use server';

import apiClient from './ClientAxios';
import { cookies } from 'next/headers';

export default async function login(email, password) {
    try {
        // Realiza la solicitud al backend para autenticar al usuario
        const data = {
            email: email,
            password: password
        }
        const response = await apiClient.post('/api/auth/login', data );

        if (response.data.status !== "success" || !response.data.data.access_token) {
            throw new Error('Error en AuthApi.login: Login no exitoso');
        }

         // Obtiene la instancia de cookies
         const cookiesInstance = await cookies();

         // Guarda el token en las cookies
         cookiesInstance.set('access_token', response.data.data.access_token, {
             httpOnly: true, // Configuración para mayor seguridad
             secure: process.env.NODE_ENV === 'production', // Solo para conexiones HTTPS en producción
             sameSite: 'strict', // Evita el uso de cookies en contextos cruzados
             path: '/', // La cookie será accesible en todas las rutas
         });

        return response.data;
    } catch (error) {
        console.error('Error en AuthApi.login:', error.message);
        throw new Error('Login failed');
    }
}


export async function logout({params}) {
    try {
        // Obtiene la instancia de cookies
        const cookiesInstance = await cookies();
        // Elimina el token de las cookies
        cookiesInstance.delete('access_token');
        return true;
    } catch (error) {
        console.error('Error en AuthApi.logout:', error.message);
        throw new error('Logout failed');
    }
}

