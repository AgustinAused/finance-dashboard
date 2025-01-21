"use client";
import React, { useState, useEffect } from "react";
import ProfileHeader from "@/components/profile/Header";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EditForm from "@/components/profile/EditForm";
import { getProfile, updateProfile } from "@/api/UserApi";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userData = await getProfile();
            if (userData && userData.data) {
                setUser(userData.data);
            } else {
                console.error("User data not found");
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setOpenModal(true); // Abrir el modal
    };

    const handleSaveChanges = async (updatedUser) => {
        const response = await updateProfile(updatedUser);
        if (response && response.status === "success") {
            setUser(updatedUser); // Actualizar el estado con los cambios
            setOpenModal(false); // Cerrar el modal
        } else {
            console.error("Error al actualizar el perfil");
        }
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

            {/* Modal para editar perfil */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <EditForm
                        user={user}
                        onSave={handleSaveChanges}
                    />
                </Box>
            </Modal>
        </div>
    );
}
