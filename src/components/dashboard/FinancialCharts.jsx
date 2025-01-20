import React, { useState, useEffect } from 'react';
import { getMonthlyData } from '@/api/GraphicApi';
import StackedBarChart from './StackedBarChart';
import LineChart from './LineChart';
import { CircularProgress } from '@mui/material';

const FinancialCharts = ({ companyId }) => {
  const [dataSC, setDataSC] = useState([]);
  const [dataLC, setDataLC] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSC = await getMonthlyData(companyId);
        setDataSC(responseSC);
        setDataLC(responseSC); // Placeholder para dataLC
        setLoading(false);
      } catch (error) {
        console.error('Error fetching financial data for charts', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-red-500">Error loading data.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-center text-xl font-semibold mb-5">Gráficos Financieros</h2>

      <div className="flex items-center gap-4 p-5">
        {/* Gráfico de barras apiladas */}
          <StackedBarChart data={dataSC} />
        {/* Gráfico de líneas */}
          <LineChart data={dataLC} />
      </div>
    </div>
  );
};

export default FinancialCharts;
