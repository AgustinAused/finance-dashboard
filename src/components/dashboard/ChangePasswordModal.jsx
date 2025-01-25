import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function ChangePasswordModal({ open, onClose, onSubmit, email }) {
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = async () => {
    if (!newPassword.trim()) {
      setErrorMessage('La contraseña no puede estar vacía.');
      return;
    }

    try {
      await onSubmit({ newPassword, email }); // Llama a la función de cambio de contraseña
      setNewPassword('');
      onClose(); // Cierra el modal
    } catch (error) {
      setErrorMessage('Error al actualizar la contraseña. Intenta de nuevo.');
    }
  };

  return (
    <Modal
        open={open}
        onClose={() => { }}
        aria-labelledby="modal-title"
        disableEscapeKeyDown
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
          }}
          className="modal-container"
        >
          <div>
            <h2 className="modal-title">
              Cambiar por primer ingreso
            </h2>
            <TextField
              label="Nueva Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              sx={{ marginBottom: '1rem' }}
              onChange={(e) => setNewPassword(e.target.value)}
              className="modal-input"
            />
            {errorMessage && <p className="modal-error">{errorMessage}</p>}
            <Button
              className="modal-button"
              onClick={handlePasswordChange}
              disabled={!newPassword.trim()}
            >
              Cambiar Contraseña
            </Button>
          </div>
        </Box>
      </Modal>
  );
}
