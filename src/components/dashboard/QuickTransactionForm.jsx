import React, { useState } from "react";
import CategorySelector from "@/components/global/CategorySelector";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Modal, Box, Button, Typography } from "@mui/material";

export default function QuickTransactionForm({
    title = "Transacción Rápida",
    transactionType,
    onSubmit,
    onCancel,
    open,
    companyId,
    userId,
}) {
    const [formData, setFormData] = useState({
            company_id: companyId,
            category_id: null,
            user_id: userId,
            amount: "",
            date: null,
            transaction_type: transactionType,
            description: "",
        });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.date) newErrors.date = "La fecha es requerida.";
        if (
            !formData.amount ||
            isNaN(formData.amount) ||
            Number(formData.amount) <= 0
        ) {
            newErrors.amount = "Por favor ingresa un monto válido mayor a 0.";
        }
        if (!formData.description.trim())
            formData.description = null;
        if (!formData.category_id)
            newErrors.category_id = "Por favor selecciona una categoría.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleDateChange = (newDate) => {
        setFormData({ ...formData, date: newDate?.toISOString() });
        setErrors((prev) => ({ ...prev, date: "" }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const sanitizedData = {
                ...formData,
                amount: parseFloat(formData.amount), // Convierte a número decimal
            };
            console.log(sanitizedData);
            console.log(formData);

            onSubmit(formData);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Modal open={open} onClose={onCancel}>
                <Box
                    component="form"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 3,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                    <DatePicker
                        label="Fecha"
                        value={formData.date ? new Date(formData.date) : null}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                error={Boolean(errors.date)}
                                helperText={errors.date}
                            />
                        )}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        name="amount"
                        label="Monto"
                        type="number"
                        step="0.01"
                        fullWidth
                        value={formData.amount}
                        onChange={handleChange}
                        error={Boolean(errors.amount)}
                        helperText={errors.amount}
                        sx={{ mb: 2 }}
                    />
                    <CategorySelector
                        formData={formData}
                        setFormData={setFormData}
                        error={errors.category_id}
                    />

                    <TextField
                        name="description"
                        label="Descripción"
                        multiline
                        rows={3}
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Button variant="outlined" onClick={onCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Crear
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </LocalizationProvider>
    );
}
