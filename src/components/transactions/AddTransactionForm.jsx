"use client";
import React, { useState } from "react";
import CategorySelector from "../global/CategorySelector";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import esLocale from "date-fns/locale/es";

export default function AddTransactionForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        date: null,
        amount: "",
        transaction_type: "",
        description: "",
        category_id: null,
        company_id: 0,
        user_id: 0,
    });

    const handleDateChange = (newDate) => {
        setFormData({ ...formData, date: newDate });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <Box component="form" sx={{ p: 3 }} onSubmit={handleSubmit}>
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
                <TextField
                    name="transaction_type"
                    label="Tipo"
                    select
                    fullWidth
                    value={formData.transaction_type}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="income">Ingreso</MenuItem>
                    <MenuItem value="expense">Egreso</MenuItem>
                </TextField>
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
