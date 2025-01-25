import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { getCategories } from "@/api/CategoryApi";
import { UserContext } from "@/context/UserContext";

export default function CategorySelector({ formData, setFormData }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await getCategories(user.company.id);
                console.log(response.data)
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

    return (
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
                    sx={{ mb: 2 }}
                />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
        />
    );
}
