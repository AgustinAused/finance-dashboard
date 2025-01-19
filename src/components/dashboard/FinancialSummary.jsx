import React from 'react';

function FinancialSummary({
  finances,
  selectedPeriod,
  setSelectedPeriod,
  selectedOption,
  setSelectedOption,
  setYear,
}) {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
    setSelectedOption(null); // Resetear la opción seleccionada cuando cambia el periodo
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Cambiar la opción seleccionada
  };

  const handleYearChange = (event) => {
    setYear(event.target.value); // Cambiar el año seleccionado
  };

  return (
    <div>
      <div className="filter flex justify-end mb-4">
        {/* Filtro de año */}
        <input
          type="number"
          value={finances.year || new Date().getFullYear()}
          onChange={handleYearChange}
          className="p-2 rounded-md bg-gray-200"
        />

        {/* Filtro de periodo */}
        <select onChange={handlePeriodChange} value={selectedPeriod} className="p-2 rounded-md bg-gray-200">
          <option value="anual">Anual</option>
          <option value="quarterly">Trimestral</option>
          <option value="monthly">Mensual</option>
        </select>

        {/* Filtro de trimestre o mes */}
        {selectedPeriod !== 'anual' && (
          <select onChange={handleOptionChange} value={selectedOption} className="p-2 ml-2 rounded-md bg-gray-200">
            <option value="" disabled>
              Seleccionar {selectedPeriod === 'quarterly' ? 'Trimestre' : 'Mes'}
            </option>
            {(selectedPeriod === 'quarterly' ? quarters : months).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
  <div className="stat-card p-4 bg-gray-800 text-white rounded-lg shadow-md">
    <h2 className="text-xl font-bold">Total Income</h2>
    <p className="text-lg">${finances.income}</p>
  </div>
  <div className="stat-card p-4 bg-gray-800 text-white rounded-lg shadow-md">
    <h2 className="text-xl font-bold">Total Expenses</h2>
    <p className="text-lg">${finances.expenses}</p>
  </div>
  <div className="stat-card p-4 bg-gray-800 text-white rounded-lg shadow-md">
    <h2 className="text-xl font-bold">Balance</h2>
    <p className="text-lg">{finances.netCashFlow > 0 ? `$${finances.netCashFlow}` : `-$${Math.abs(finances.netCashFlow)}`}</p>
  </div>
</div>
    </div>
  );
}

export default FinancialSummary;
