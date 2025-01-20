import React from 'react';
import { FaDollarSign, FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

function FinancialSummary({
  finances,
  selectedPeriod,
  setSelectedPeriod,
  selectedOption,
  setSelectedOption,
  setYear,
  year
}) {

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
    setSelectedOption(""); // Limpiar la opción cuando el periodo cambia
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Cambiar la opción seleccionada
  };

  const handleYearChange = (event) => {
    setYear(event.target.value); // Cambiar el año seleccionado
  };

  return (
    <div className="p-6">
      <div className="filter flex justify-end items-center mb-6">
        
        <div className="flex gap-4">
          {/* Filtro de año */}
          <input
            type="number"
            value={year || ''}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Año"
          />

          {/* Filtro de periodo */}
          <select
            onChange={handlePeriodChange}
            value={selectedPeriod}
            className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="anual">Anual</option>
            <option value="quarterly">Trimestral</option>
            <option value="monthly">Mensual</option>
          </select>

          {/* Filtro de trimestre o mes */}
          {selectedPeriod !== 'anual' && (
            <select
              onChange={handleOptionChange}
              value={selectedOption || ""}
              className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="" disabled>
                Seleccionar {selectedPeriod === "quarterly" ? "Trimestre" : "Mes"}
              </option>
              {(selectedPeriod === "quarterly" ? quarters : months).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Income */}
        <div className="stat-card p-6 bg-green-500 text-white rounded-lg shadow-lg flex items-center">
          <div className="icon bg-green-600 p-3 rounded-full">
            <FaArrowUp className="text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-bold">Total Income</h2>
            <p className="text-2xl font-semibold">${finances.income}</p>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="stat-card p-6 bg-red-500 text-white rounded-lg shadow-lg flex items-center">
          <div className="icon bg-red-600 p-3 rounded-full">
            <FaArrowDown className="text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-bold">Total Expenses</h2>
            <p className="text-2xl font-semibold">${finances.expenses}</p>
          </div>
        </div>

        {/* Net Balance */}
        <div
          className={`stat-card p-6 ${finances.netCashFlow >= 0 ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded-lg shadow-lg flex items-center`}
        >
          <div className="icon bg-blue-600 p-3 rounded-full">
            <FaBalanceScale className="text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-bold">Net Balance</h2>
            <p className="text-2xl font-semibold">
              {finances.netCashFlow >= 0
                ? `$${finances.netCashFlow}`
                : `-$${Math.abs(finances.netCashFlow)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialSummary;
