'use client';
import React, { useState, useEffect } from 'react';
import { getCashFlowDefault } from '@/api/FinancialApi'; // Importa la API
import FinancialSummary from '@/components/dashboard/FinancialSummary'; // Importa el componente

function Dashboard() {
  const [finances, setFinances] = useState({ income: 0, expenses: 0, netCashFlow: 0 });
  const [selectedPeriod, setSelectedPeriod] = useState('anual'); // Periodo inicial (anual)
  const [selectedOption, setSelectedOption] = useState(null); // Opción de mes o trimestre seleccionada
  const [year, setYear] = useState(new Date().getFullYear()); // Año actual como valor predeterminado
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let periodValue = year; // Por defecto, si es anual solo necesitamos el año

      if (selectedPeriod === 'monthly' && selectedOption) {
        periodValue = `${selectedOption}-${year}`; // Ejemplo: 'Enero-2025'
      } else if (selectedPeriod === 'quarterly' && selectedOption) {
        periodValue = `${selectedOption}-${year}`; // Ejemplo: 'Q1-2025'
      }

      try {
        const data = await getCashFlowDefault(periodValue); // Llamada a la API con el valor del periodo
        setFinances(data.data);
      } catch (error) {
        console.error('Error fetching financial data', error);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedOption, year]); // Dependemos del periodo, la opción y el año

  return (
    <div>
      <FinancialSummary
        finances={finances}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setYear={setYear}
      />
    </div>
  );
}

export default Dashboard;
