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
import QuickTransactionForm from '@/components/dashboard/QuickTransactionForm';

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
  const [showModalIncome, setShowModalIncome] = useState(false);
  const [showModalExpense, setShowModalExpense] = useState(false);
  const [showModalReports, setShowModalReports] = useState(false);

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


  const handleIncomeAdd = async (newTransaction) => setShowModalIncome(true);

  const handleTransactionAdd = async (newTransaction) => {
    try {
      const response = await addTransaction(newTransaction);
      setSnackbarMessage('¡Transacción agregada con éxito!');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      window.location.reload();
    } catch (error) {
      setSnackbarMessage('Error al agregar la transacción. Intenta de nuevo.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
  };

  const handleExpenseAdd = async () => setShowModalExpense(true);

  const handleReportsView = async () => setShowModalReports(true);


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

      {/* Quick Actions */}
      <QuickTransactionForm
        title="Agregar Ingreso"
        transactionType="income"
        onSubmit={handleTransactionAdd}
        onCancel={() => setShowModalIncome(false)} // Corregido
        open={showModalIncome}
        userId={user.id}
        companyId={user.company.id}
      />
      <QuickTransactionForm
        title="Agregar Gasto"
        transactionType="expense"
        onSubmit={handleTransactionAdd}
        onCancel={() => setShowModalExpense(false)} // Corregido
        open={showModalExpense}
        userId={user.id}
        companyId={user.company.id}
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
