import React, { useState, useEffect } from 'react';
import { getMonthlyData } from '@/api/GraphicApi'; // Asegúrate de tener la función API configurada correctamente
import StackedBarChart from './StackedBarChart';  // Importa tu gráfico de barras apiladas
import LineChart from './LineChart';  // Importa tu gráfico de líneas

const FinancialCharts = ({companyId}) => {
  const [dataSC, setDataSC] = useState([]);  // Datos para el gráfico de barras apiladas
  const [dataLC, setDataLC] = useState([]);  // Datos para el gráfico de líneas
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos
  const [error, setError] = useState(null);  // Estado para manejar posibles errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSC = await getMonthlyData(companyId);  // Llama a la API para obtener los datos SC
        // const responseLC = await getMonthlyData(companyId);  // Llama a la API para obtener los datos LC
        setDataSC(responseSC.data); // Asegúrate de que la API te devuelva datos de barras apiladas
        // setDataLC(responseLC.data);  // Asegúrate de que la API te devuelva datos para el gráfico de líneas
        setLoading(false);  // Actualiza el estado de carga
      } catch (error) {
        console.error('Error fetching financial data for charts', error);
        setError(error);  // Si hay un error, lo guardamos en el estado
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // El array vacío asegura que la llamada solo se haga una vez al montar el componente

  if (loading) return <div>Loading...</div>;  // Muestra un mensaje de carga mientras esperas la respuesta
  if (error) return <div>Error loading data.</div>;  // Muestra un mensaje de error si la API falla

  return (
    <div>
      <h2>Gráficos Financieros</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Ingresos y Gastos por Mes (Barra Apilada)</h3>
        <StackedBarChart data={dataSC} />
      </div>

      {/* <div>
        <h3>Tendencia de Ingresos y Gastos (Línea)</h3>
        <LineChart data={dataLC} />
      </div> */}
    </div>
  );
};

export default FinancialCharts;
