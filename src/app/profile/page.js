"use client";
import React, { useState, useEffect } from "react";
import ProfileHeader from "@/components/profile/Header";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import EditForm from "@/components/profile/EditForm";
import { getProfile, updateProfile } from "@/api/UserApi";
import CustomSnackbar from"@/components/global/CustomSnackbar"

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
        const data = {
            last_name: updatedUser.lastName,
            first_name: updatedUser.firstName,
            email: updatedUser.email,
        }
        const response = await updateProfile(user.id, data);
        if (response && response.status === "success") {
            setUser(updatedUser); // Actualizar el estado con los cambios
            setOpenModal(false); // Cerrar el modal

            // Mostrar Snackbar
            setShowSnackbar(true);
            setSnackbarMessage("Perfil actualizado con éxito");
            setSnackbarSeverity("success");
        } else {
            console.error("Error al actualizar el perfil");
            setShowSnackbar(true);
            setSnackbarMessage("Error al actualizar el perfil");
            setSnackbarSeverity("error");
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
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" component="h2" mb={2}>
                        Editar Perfil
                    </Typography>
                    <EditForm user={user} onSave={handleSaveChanges} />
                </Box>
            </Modal>

            <CustomSnackbar
                open={showSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setShowSnackbar(false)}
            />
        </div>
    );
}
