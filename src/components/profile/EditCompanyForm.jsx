import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

export default function EditCompanyForm({ company, onSave }) {
  const [companyData, setCompanyData] = useState(company || {}); // Estado inicial basado en los datos de la compañía
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simula la llamada al backend para guardar los cambios
      await onSave(companyData); // onSave es una función pasada como prop
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error al guardar los cambios. Inténtalo de nuevo.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      {/* Campo de nombre */}
      <TextField
        label="Nombre de la Compañía"
        name="name"
        value={companyData.name || ""}
        onChange={handleChange}
        fullWidth
        required
      />

      {/* Campo de dirección */}
      <TextField
        label="Dirección"
        name="address"
        value={companyData.address || ""}
        onChange={handleChange}
        fullWidth
      />

      {/* Campo de email */}
      <TextField
        label="Email"
        name="email"
        type="email"
        value={companyData.email || ""}
        onChange={handleChange}
        fullWidth
      />

      {/* Campo de teléfono */}
      <TextField
        label="Teléfono"
        name="phone"
        value={companyData.phone || ""}
        onChange={handleChange}
        fullWidth
      />

      {/* Botón de guardar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        )}
      </Box>

      {/* Muestra el error si ocurre */}
      {error && (
        <Box
          sx={{
            mt: 2,
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </Box>
      )}
    </Box>
  );
}
