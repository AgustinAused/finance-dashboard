import React, { useState } from "react";

const EditForm = ({ user, onSave }) => {
  const [userData, setUserData] = useState(user);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!userData.photo?.trim()) {
      newErrors.photo = "La URL de la foto es obligatoria.";
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(userData.photo)) {
      newErrors.photo = "Ingresa una URL válida para la foto.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(userData); // Llama a la función de guardar con los datos válidos
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Editar Perfil</h2>

      <div className="mb-4">
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          value={userData.first_name || ""}
          onChange={handleChange}
          placeholder="Nombre"
          className={`w-full p-2 mt-1 border rounded-md ${
            errors.first_name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
          Apellido
        </label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          value={userData.last_name || ""}
          onChange={handleChange}
          placeholder="Apellido"
          className={`w-full p-2 mt-1 border rounded-md ${
            errors.last_name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className={`w-full p-2 mt-1 border rounded-md ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Foto de Perfil (URL)
        </label>
        <input
          id="photo"
          type="url"
          name="photo"
          value={userData.photo || ""}
          onChange={handleChange}
          placeholder="URL de la foto de perfil"
          className={`w-full p-2 mt-1 border rounded-md ${
            errors.photo ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditForm;
