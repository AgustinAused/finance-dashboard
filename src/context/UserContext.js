'use client';
import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '@/api/UserApi'; // Asume que este endpoint devuelve la información del usuario

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getProfile();
                if (userData && userData.data) {
                    setUser(userData.data);
                } else {
                    console.error('No se encontró información del usuario');
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;