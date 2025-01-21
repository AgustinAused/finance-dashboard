"use client";
import React, { useState, useEffect } from "react";
import ProfileHeader from "@/components/profile/Header";
import CircularProgress from "@mui/material/CircularProgress"; // Importar el loader de MUI
import { getProfile } from "@/api/UserApi";

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userData = await getProfile();
            if (userData && userData.data) {
                console.log(userData);
                setUser(userData.data);
            } else {
                console.error("User data not found");
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        // Lógica para editar el perfil
        console.log("Editar perfil");
    };

    if (!user) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="profile-page">
            <ProfileHeader user={user} onEditClick={handleEditClick} />
        </div>
    );
}
