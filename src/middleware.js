import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('access_token')?.value;

    // Redirige al login si no hay token
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Continúa a la ruta protegida si el token existe
    return NextResponse.next();
}

// Configuración para las rutas protegidas
export const config = {
    matcher: ['/dashboard/:path*'], // Protege todas las rutas bajo /dashboard
};
