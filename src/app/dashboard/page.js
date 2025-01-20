'use client';
import React, { useState, useEffect } from 'react';
import { getCashFlowDefault } from '@/api/FinancialApi'; // Importa la API
import { getProfile } from '@/api/UserApi';
import FinancialSummary from '@/components/dashboard/FinancialSummary'; // Importa el componente
import FinancialCharts from '@/components/dashboard/FinancialCharts'; // Importa el componente de gráficos
import CircularProgress from '@mui/material/CircularProgress'; // Importa CircularProgress de MUI
import Box from '@mui/material/Box'; // Importa Box para centrar el loader


function Dashboard() {
  const [finances, setFinances] = useState({ income: 0, expenses: 0, netCashFlow: 0 });
  const [selectedPeriod, setSelectedPeriod] = useState('anual'); // Periodo inicial (anual)
  const [selectedOption, setSelectedOption] = useState(null); // Opción de mes o trimestre seleccionada
  const [year, setYear] = useState(new Date().getFullYear()); // Año actual como valor predeterminado
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

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
        } else {
          console.error('User data not found');
        }
  
        // Aquí, si la respuesta de la API no es válida, mantiene los datos anteriores
        if (cashflowData && cashflowData.data) {
          setFinances(cashflowData.data);
        } else {
          // console.error('Financial data not found');
          // Mantener los datos anteriores en caso de error
          setFinances(prevFinances => ({
            ...prevFinances, 
          }));
        }
  
      } catch (error) {
        setError(true);
        // En caso de error, asegurarse de mantener los datos anteriores
        setFinances(prevFinances => ({
          ...prevFinances, 
        }));
        // console.error('Error fetching financial data', error);
      } finally {
        setLoading(false); // Al finalizar, actualiza el estado de carga
      }
    };

    fetchData();
  }, [selectedPeriod, selectedOption, year]); // Dependemos del periodo, la opción y el año

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
    </div>
  );
}

export default Dashboard;