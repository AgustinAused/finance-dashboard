import { Autocomplete, TextField, Button, Dialog, DialogContent } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { getCategories } from "@/api/CategoryApi";
import { UserContext } from "@/context/UserContext";
import AddCategoryForm from "./AddCategoryForm";

export default function CategorySelector({ formData, setFormData, error }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddCategory, setOpenAddCategory] = useState(false); // Estado para el modal
    const { user } = useContext(UserContext);

    // Fetch categories on load
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await getCategories(user.company.id);
                setCategories(response.data || []);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [user.company.id]);

    const handleCategoryChange = (event, value) => {
        setFormData((prev) => ({
            ...prev,
            category_id: value ? value.id : null,
        }));
    };

    // Callback para agregar la categoría y cerrar el formulario
    const handleCategoryAdded = (newCategory) => {
        setCategories((prev) => [...prev, newCategory]); 
        setFormData((prev) => ({ ...prev, category_id: newCategory.id })); 
        setOpenAddCategory(false);
    };

    return (
        <div>
            <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.name || ""}
                loading={loading}
                value={categories.find((cat) => cat.id === formData.category_id) || null}
                onChange={handleCategoryChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Categoría"
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error}
                        sx={{ mb: 2 }}
                    />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText={
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpenAddCategory(true)}
                    >
                        Crear nueva categoría
                    </Button>
                }
            />

            {/* Modal para agregar nueva categoría */}
            <Dialog open={openAddCategory} onClose={() => setOpenAddCategory(false)}>
                <DialogContent>
                    <AddCategoryForm
                        onCategoryAdded={handleCategoryAdded}
                        onCancel={() => setOpenAddCategory(false)}
                        companyId={user.company.id}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
