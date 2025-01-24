import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function TransactionDetails({ transaction, onClose }) {
    return (
        <Box sx={{ width: 350, p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Detalles de la Transacción
            </Typography>
            <Typography variant="body1">
                <strong>Fecha:</strong> {transaction.date}
            </Typography>
            <Typography variant="body1">
                <strong>Monto:</strong> ${transaction.amount}
            </Typography>
            <Typography variant="body1">
                <strong>Tipo:</strong> {transaction.type}
            </Typography>
            <Typography variant="body1">
                <strong>Categoría:</strong> {transaction.category}
            </Typography>
            <Typography variant="body1">
                <strong>Descripción:</strong> {transaction.description}
            </Typography>
            <Box mt={3}>
                <Button variant="contained" color="primary" fullWidth onClick={onClose}>
                    Cerrar
                </Button>
            </Box>
        </Box>
    );
}
