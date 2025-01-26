import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { addCategory } from "@/api/CategoryApi";

export default function AddCategoryForm({ onCategoryAdded, onCancel, companyId }) {
    const [newCategory, setNewCategory] = useState({
        companyId: companyId,
        name: "",
        description: "",
    })
    const [error, setError] = useState("");


    const validate = () => {
        if (newCategory.name.trim() === "") {
            setError("Category name is required");
            return false;
        }
        if (newCategory.description.trim() === "") {
            setError("Category description is required");
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prev) => ({ ...prev, [name]: value }));
        setError((prev) => ({ ...prev, [name]: "" })); // Limpia el error del campo
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()){
            try {
                const response = await addCategory(newCategory);
                onCategoryAdded(response.data); // Notifica que la categoría fue creada
            } catch (error) {
                console.error("Error al crear la categoría:", error);
                setError("No se pudo crear la categoría. Inténtalo de nuevo.");
            }
        }

    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <TextField
                label="Nombre de la categoría"
                name="name"
                variant="outlined"
                fullWidth
                value={newCategory.name}
                onChange={handleChange}
                error={!!error.name}
                helperText={error.name}
                sx={{ mb: 2 }}
            />
            <TextField
            label="Descripción de la categoría"
            name="description"
            variant="outlined"
            fullWidth
            value={newCategory.description}
            onChange={handleChange}
            error={!!error.description}
            helperText={error.description}
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
    );
}
