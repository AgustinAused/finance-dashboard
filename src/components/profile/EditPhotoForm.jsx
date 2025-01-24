import React, { useState } from "react";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function EditPhotoForm({ onSave }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        onSave(file);
    };

    return (
        <div className="form-container">
            {/* Vista previa de la imagen seleccionada */}
          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}

          {/* Botón para seleccionar archivo */}
          <div className="form-group">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Seleccionar archivo
              {/* Input oculto para manejar la selección de archivos */}
              <input
                type="file"
                name="avatarUrl"
                id="avatarUrl"
                onChange={handleFileChange}
                hidden
              />
            </Button>
          </div>
    
          
    
          {/* Botón para guardar cambios */}
          <div className="form-actions">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!file}
            >
              Guardar
            </Button>
          </div>
        </div>
      );
}
