import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const EditForm = ({ user, onSave }) => {
  const [userData, setUserData] = useState(user);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUserData((prev) => ({
        ...prev,
        photo: selectedFile.name, // Asigna el nombre del archivo para el ejemplo
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!userData.first_name?.trim()) {
      newErrors.first_name = "El nombre es obligatorio.";
    }

    if (!userData.last_name?.trim()) {
      newErrors.last_name = "El apellido es obligatorio.";
    }

    if (!userData.email?.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (!file) {
      newErrors.photo = "La foto de perfil es obligatoria.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append("first_name", userData.first_name);
      formData.append("last_name", userData.last_name);
      formData.append("email", userData.email);
      formData.append("photo", file);

      onSave(formData); // Envía los datos del formulario al manejador
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 shadow-md rounded-lg"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Editar Perfil</h2>

      <div className="mb-4">
        <TextField
          id="first_name"
          label="Nombre"
          name="first_name"
          value={userData.first_name || ""}
          onChange={handleChange}
          fullWidth
          error={!!errors.first_name}
          helperText={errors.first_name}
        />
      </div>

      <div className="mb-4">
        <TextField
          id="last_name"
          label="Apellido"
          name="last_name"
          value={userData.last_name || ""}
          onChange={handleChange}
          fullWidth
          error={!!errors.last_name}
          helperText={errors.last_name}
        />
      </div>

      <div className="mb-4">
        <TextField
          id="email"
          label="Correo Electrónico"
          type="email"
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
          Foto de Perfil
        </label>
        <Button
          variant="contained"
          component="label"
          className="mb-2"
        >
          Seleccionar Archivo
          <input
            id="photo"
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        {file && <p className="text-sm text-gray-600">{file.name}</p>}
        {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
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
