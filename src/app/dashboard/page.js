'use client';
import React, { useContext, useState, useEffect } from 'react';
import { getCashFlowDefault } from '@/api/FinancialApi';
import { addTransaction } from '@/api/TransactionApi';
import { getProfile, changePassword } from '@/api/UserApi';
import { UserContext } from '@/context/UserContext';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import FinancialCharts from '@/components/dashboard/FinancialCharts';
import ChangePasswordModal from '@/components/dashboard/ChangePasswordModal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CustomSnackbar from '@/components/global/CustomSnackbar';

export default function Dashboard() {
  const [finances, setFinances] = useState({ income: 0, expenses: 0, netCashFlow: 0 });
  const [selectedPeriod, setSelectedPeriod] = useState('anual');
  const [selectedOption, setSelectedOption] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const { user, setUser, loading } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
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
      }
    };

    fetchData();
  }, [selectedPeriod, selectedOption, year, setUser]);

  const handlePasswordChange = async ({ newPassword, email }) => {
    try {
      const data = { newPassword, email };
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


  const handleIncomeAdd = async (newTransaction) => {
    try {
      const data = {
        category_id: newTransaction.category_id,
        user_id: newTransaction.user_id,
        transaction_type: "income",
        amount: newTransaction.amount,
        date: newTransaction.date,
      }
      const response = await addTransaction(data);

      // Configura y muestra el Snackbar de éxito
      setSnackbarMessage('¡Transacción agregada con éxito!');
      setSnackbarSeverity('success'); // Tipo de mensaje
      setShowSnackbar(true); // Muestra la notificación

      // recargar pagina 
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const handleExpenseAdd = async () => {
    console.log('Add Expense');
    // recargar pagina 
    window.location.reload();
  }

  const handleReportsView = async () => {
    console.log('View Reports');
  }


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
        onIncome={handleIncomeAdd}
        onExpense={handleExpenseAdd}
        onReports={handleReportsView}
      />
      <FinancialCharts companyId={user.company.id} />

      {/* Modal de cambio de contraseña */}
      <ChangePasswordModal
      open={showModal}
      onClose={() => setShowModal(false)}
      onSubmit={handlePasswordChange}
      email={user.email}
    />

      {/* Alerta de éxito */}
      <CustomSnackbar
        open={showSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setShowSnackbar(false)}
      />
    </div>
  );
}
