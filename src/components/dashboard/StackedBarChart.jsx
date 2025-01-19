import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios para Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = ({ data = [] }) => {
  // Verifica si data está disponible y es un arreglo
  if (!Array.isArray(data)) {
    return <div>No se han recibido datos válidos para mostrar el gráfico.</div>;
  }

  // Preparar los datos para el gráfico
  const chartData = {
    labels: data.map(item => `${item.month}/${item.year}`), // Mes/Año
    datasets: [
      {
        label: 'Ingresos',
        data: data.map(item => item.totalIncome),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de los ingresos
      },
      {
        label: 'Gastos',
        data: data.map(item => item.totalExpenses),
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color de los gastos
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ingresos y Gastos por Mes',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
