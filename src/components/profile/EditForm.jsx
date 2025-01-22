import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const EditForm = ({ user, onSave }) => {
  const [userData, setUserData] = useState(user); // Asegúrate de que las claves de `user` sean correctas
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value, // Actualiza el estado dinámicamente
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!userData.firstName?.trim()) {
      newErrors.first_name = "El nombre es obligatorio.";
    }

    if (!userData.lastName?.trim()) {
      newErrors.last_name = "El apellido es obligatorio.";
    }

    if (!userData.email?.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = { ...userData };
      console.log(data);
      if (onSave) {
        onSave(data); // Llama al callback si está definido
      }
    }
  };

  return (
    <form
      className=""
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mb-4">
        <TextField
          id="firstName"
          label="Nombre"
          name="firstName" // Asegúrate de que coincide con la clave del estado
          value={userData.firstName || ""}
          onChange={handleChange}
          fullWidth
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </div>

      <div className="mb-4">
        <TextField
          id="lastName"
          label="Apellido"
          name="lastName" // Asegúrate de que coincide con la clave del estado
          value={userData.lastName || ""}
          onChange={handleChange}
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </div>

      <div className="mb-4">
        <TextField
          id="email"
          label="Correo Electrónico"
          type="email"
          name="email" // Asegúrate de que coincide con la clave del estado
          value={userData.email || ""}
          onChange={handleChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
      >
        Guardar Cambios
      </Button>
    </form>
  );
};

export default EditForm;
