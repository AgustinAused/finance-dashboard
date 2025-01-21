'use client';
import React, { useState, useEffect } from 'react';
import { getCashFlowDefault } from '@/api/FinancialApi'; // Importa la API
import { getProfile, changePassword } from '@/api/UserApi'; // Importa la API para cambiar la contraseña
import FinancialSummary from '@/components/dashboard/FinancialSummary'; // Importa el componente
import FinancialCharts from '@/components/dashboard/FinancialCharts'; // Importa el componente de gráficos
import CircularProgress from '@mui/material/CircularProgress'; // Importa CircularProgress de MUI
import Box from '@mui/material/Box'; // Importa Box para centrar el loader
import Modal from '@mui/material/Modal'; // Importa Modal de MUI
import TextField from '@mui/material/TextField'; // Importa TextField para el formulario
import Button from '@mui/material/Button'; // Importa Button de MUI

export default function Dashboard() {
  const [finances, setFinances] = useState({ income: 0, expenses: 0, netCashFlow: 0 });
  const [selectedPeriod, setSelectedPeriod] = useState('anual'); // Periodo inicial (anual)
  const [selectedOption, setSelectedOption] = useState(null); // Opción de mes o trimestre seleccionada
  const [year, setYear] = useState(new Date().getFullYear()); // Año actual como valor predeterminado
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [newPassword, setNewPassword] = useState(''); // Nuevo valor de la contraseña
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error

  useEffect(() => {
    const fetchData = async () => {
      let periodValue = year;

      // Construye el valor del periodo según la selección
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

        // Asegura que los datos sean válidos antes de actualizar el estado
        if (userData && userData.data) {
          setUser(userData.data);

          // Si el usuario está inactivo, mostrar el modal
          if (!userData.data.active) {
            setShowModal(true); // Mostrar el modal si el usuario no está activo
          }
        }

        // Aquí, si la respuesta de la API no es válida, mantiene los datos anteriores
        if (cashflowData && cashflowData.data) {
          setFinances(cashflowData.data);
        } else {
          setFinances(prevFinances => ({ ...prevFinances }));
        }

      } catch (error) {
        setErrorMessage('Error fetching data');
        setFinances(prevFinances => ({ ...prevFinances }));
      } finally {
        setLoading(false); // Al finalizar, actualiza el estado de carga
      }
    };

    fetchData();
  }, [selectedPeriod, selectedOption, year]);

  const handlePasswordChange = async () => {
    try {
      // Enviar la nueva contraseña al backend
      // await changePassword(newPassword);
      setShowModal(false); // Cerrar el modal tras el cambio
    } catch (error) {
      setErrorMessage('Error al cambiar la contraseña');
    }
  };

  // Si los datos están siendo cargados, muestra el loader de MUI
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
        onClose={() => { } /* No hacemos nada aquí para prevenir el cierre */}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableEscapeKeyDown // Deshabilita el cierre al presionar la tecla "Esc"
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
    </div>
  );
}

