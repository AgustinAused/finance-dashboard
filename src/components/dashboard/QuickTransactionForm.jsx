import React, { useState } from "react";
import CategorySelector from "@/components/global/CategorySelector";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import esLocale from "date-fns/locale/es";

export default function QuickTransactionForm({
    title = "Transacción Rápida",
    transactionType,
    onSubmit,
    onCancel,
}) {
    const [formData, setFormData] = useState({
        date: null,
        amount: "",
        transaction_type: transactionType,
        description: "",
        category_id: null,
        company_id: 0,
        user_id: 0,
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Validación de fecha
        if (!formData.date) {
            newErrors.date = "La fecha es requerida.";
        }

        // Validación de monto
        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            newErrors.amount = "Por favor ingresa un monto válido mayor a 0.";
        }

        // Validación de descripción
        if (!formData.description.trim()) {
            newErrors.description = "La descripción no puede estar vacía.";
        }

        // Validación de categoría
        if (!formData.category_id) {
            newErrors.category_id = "Por favor selecciona una categoría.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const handleDateChange = (newDate) => {
        setFormData({ ...formData, date: newDate });
        setErrors((prev) => ({ ...prev, date: "" })); // Limpia el error si existe
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Limpia el error del campo
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };
    
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <Box component="form" sx={{ p: 3 }} onSubmit={handleSubmit}>
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <DatePicker
                    label="Fecha"
                    value={formData.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                />

                <TextField
                    name="amount"
                    label="Monto"
                    type="number"
                    fullWidth
                    value={formData.amount}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <CategorySelector formData={formData} setFormData={setFormData} />
                <TextField
                    name="description"
                    label="Descripción"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
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
        </LocalizationProvider>
    );
}
