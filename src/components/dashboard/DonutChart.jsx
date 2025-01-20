'use client';
import { Doughnut } from 'react-chartjs-2'; // Importa el gráfico de donut de Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Importa las dependencias necesarias de Chart.js

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ listCategories }) => {
  // Verifica que listCategories no sea undefined o null
  if (!listCategories || listCategories.length === 0) {
    return <p>No hay datos disponibles para mostrar el gráfico.</p>;
  }

  // Genera colores dinámicos para las categorías
  const generateColors = (count) => {
    const colors = [];
    const colorPalette = [
      '#36A2EB', '#FFCD56', '#FF9F40', '#FF6384', '#4BC0C0', '#9966FF', '#FF3366', '#FF5733', '#C70039', '#DAF7A6'
    ];

    for (let i = 0; i < count; i++) {
      colors.push(colorPalette[i % colorPalette.length]);
    }
    return colors;
  };

  const data = {
    labels: listCategories.map(item => item.category), // Extrae las categorías de ingresos
    datasets: [
      {
        label: 'Ingresos',
        data: listCategories.map(item => item.incomeAmount || 0), // Extrae los valores de los ingresos
        backgroundColor: generateColors(listCategories.length), // Colores dinámicos para los ingresos
      },
      {
        label: 'Egresos',
        data: listCategories.map(item => item.expenseAmount || 0), // Extrae los valores de los egresos
        backgroundColor: generateColors(listCategories.length), // Colores dinámicos para los egresos
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Deshabilita mantener el aspecto para personalizar altura
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Ingresos y Egresos por Categoría',
      },
    },
  };

  return (
    <div style={{height: '400px', width:"30%"}}>
      <Doughnut data={data} options={chartOptions} />
    </div>
  );
};

export default DonutChart;
