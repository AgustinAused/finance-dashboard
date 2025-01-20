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
  // Validar que el array data no esté vacío
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No hay datos disponibles para mostrar en el gráfico.</div>;
  }

  // Preparar los datos para el gráfico
  const chartData = {
    labels: data.map(item => `${item.month}/${item.year}`), // Etiquetas en formato Mes/Año
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
      },
    ],
  };

  const options = {
      responsive: true,
      maintainAspectRatio: false, // Deshabilita mantener el aspecto para personalizar altura
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      title: {
        display: true,
        text: 'Ingresos y Gastos por Mes',
      },
    },
    scales: {
      x: {
        stacked: true, // Habilitar barras apiladas en el eje X
      },
      y: {
        stacked: true, // Habilitar barras apiladas en el eje Y
        beginAtZero: true, // Comenzar desde 0
      },
    },
  };

  return (
    <div style={{ height: '400px', width:"30%"}} > {/* Establece el tamaño del contenedor */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
