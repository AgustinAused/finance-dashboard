'use client';
import React from "react";
import { Box, Button } from "@mui/material";

export default function TransactionActions({ onCreate }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, p: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={onCreate}
            >
                Crear Transacción
            </Button>
            {/* Agrega más botones aquí si es necesario */}
        </Box>
    );
}
