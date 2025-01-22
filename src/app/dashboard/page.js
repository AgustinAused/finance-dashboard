'use client';
import React, { useState, useEffect } from 'react';
import { getCashFlowDefault } from '@/api/FinancialApi';
import { getProfile, changePassword } from '@/api/UserApi';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import FinancialCharts from '@/components/dashboard/FinancialCharts';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'; // Importa el componente Alert
import Snackbar from '@mui/material/Snackbar'; // Importa el componente Snackbar

export default function Dashboard() {
  const [finances, setFinances] = useState({ income: 0, expenses: 0, netCashFlow: 0 });
  const [selectedPeriod, setSelectedPeriod] = useState('anual');
  const [selectedOption, setSelectedOption] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false); // Controla la alerta de éxito
  const [showSnackbar, setShowSnackbar] = useState(false); // Controla la visibilidad del Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensaje del Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState(''); // Tipo de mensaje
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let periodValue = year;
      if (selectedPeriod === 'monthly' && selectedOption) {
        periodValue = `${selectedOption} ${year}`;
      } else if (selectedPeriod === 'quarterly' && selectedOption) {
        periodValue = `${selectedOption} ${year}`;
      } else if (selectedPeriod === 'anual') {
        periodValue = `${year}`;
      }

      try {
        const cashflowData = await getCashFlowDefault(periodValue);
        const userData = await getProfile();

        if (userData && userData.data) {
          setUser(userData.data);
          if (!userData.data.active) {
            setShowModal(true);
          }
        }

        if (cashflowData && cashflowData.data) {
          setFinances(cashflowData.data);
        } else {
          setFinances(prevFinances => ({ ...prevFinances }));
        }
      } catch (error) {
        setErrorMessage('Error fetching data');
        setFinances(prevFinances => ({ ...prevFinances }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedOption, year]);

  const handlePasswordChange = async () => {
    try {
      const data = {
        newPassword: newPassword,
        email: user.email,
      };
      await changePassword(data);
      setShowModal(false); // Cierra el modal
  
      // Configura y muestra el Snackbar de éxito
      setSnackbarMessage('¡Contraseña actualizada con éxito!');
      setSnackbarSeverity('success'); // Tipo de mensaje
      setShowSnackbar(true); // Muestra la notificación
    } catch (error) {
      // Configura y muestra el Snackbar de error
      setSnackbarMessage('Error al actualizar la contraseña. Intenta de nuevo.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
  };
  

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <FinancialSummary
        finances={finances}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setYear={setYear}
        year={year}
      />
      <FinancialCharts companyId={user.company.id} />

      {/* Modal de cambio de contraseña */}
      <Modal
        open={showModal}
        onClose={() => {}}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
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
            boxShadow: 24,
            padding: 3,
            maxWidth: 400,
            margin: 'auto',
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        >
          <div>
            <h2 id="modal-title">Cambiar por primer ingreso </h2>
            <TextField
              label="Nueva Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePasswordChange}
            >
              Cambiar Contraseña
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Alerta de éxito */}
        <Snackbar
        open={showSnackbar}
        autoHideDuration={6000} // Tiempo que permanece visible (en ms)
        onClose={() => setShowSnackbar(false)} // Cierra el Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Posición
      >
        <Alert
          onClose={() => setShowSnackbar(false)} // Opción para cerrar manualmente
          severity={snackbarSeverity} // Tipo de alerta (success, error, etc.)
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
