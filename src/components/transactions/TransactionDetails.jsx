import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function TransactionDetails({ transaction, onClose }) {
    if (!transaction) {
        return (
            <Box sx={{ width: 350, p: 3, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Detalles no disponibles
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    No hay información de la transacción seleccionada.
                </Typography>
                <Box mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={onClose}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ width: 350, p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Detalles de la Transacción
            </Typography>
            <Typography variant="body1">
                <strong>Fecha:</strong> {transaction.createdAt || "No disponible"}
            </Typography>
            <Typography variant="body1">
                <strong>Monto:</strong>{" "}
                {transaction.amount ? `$${transaction.amount}` : "No disponible"}
            </Typography>
            <Typography variant="body1">
                <strong>Tipo:</strong> {transaction.type || "No disponible"}
            </Typography>
            <Typography variant="body1">
                <strong>Categoría:</strong>{" "}
                {transaction.categoryName || "No disponible"}
            </Typography>
            <Typography variant="body1">
                <strong>Descripción:</strong>{" "}
                {transaction.description || "No disponible"}
            </Typography>
            <Typography variant="body1">
                <strong>Usuario:</strong> {transaction.userName || "No disponible"}
            </Typography>
            <Box mt={3}>
                <Button variant="contained" color="primary" fullWidth onClick={onClose}>
                    Cerrar
                </Button>
            </Box>
        </Box>
    );
}
