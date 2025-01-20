import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios para Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  // Preparar los datos para el gráfico
  const chartData = {
    labels: data.map(item => `${item.month}/${item.year}`), // Mes/Año
    datasets: [
      {
        label: 'Ingresos',
        data: data.map(item => item.totalIncome),
        borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea de ingresos
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo para los puntos
        fill: true, // Para llenar debajo de la línea
      },
      {
        label: 'Gastos',
        data: data.map(item => item.totalExpenses),
        borderColor: 'rgba(255, 99, 132, 1)', // Color de la línea de gastos
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo para los puntos
        fill: true, // Para llenar debajo de la línea
      }
    ]
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
        text: 'Tendencia de Ingresos y Gastos',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div style={{ height: '400px', width:"30%" }} > 
      <Line data={chartData} options={options}/>
    </div>
  );
};

export default LineChart;
