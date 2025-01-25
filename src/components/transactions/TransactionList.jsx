import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export default function TransactionList({
  transactions,
  onSelectTransaction,
  onPageChange,
  pageSize,
  setPageSize,
  totalRows,
}) {
  const columns = [
    { field: "createdAt", headerName: "Fecha", flex: 1 },
    { field: "amount", headerName: "Monto", flex: 1 },
    { field: "type", headerName: "Tipo", flex: 1 },
    { field: "categoryName", headerName: "Categoría", flex: 1 },
    { field: "description", headerName: "Descripción", flex: 2 },
  ];

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Transacciones
      </Typography>
      <DataGrid
        rows={transactions} // Los datos de las transacciones
        columns={columns} // Las columnas definidas
        pageSize={pageSize} // Tamaño de página seleccionado
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // Cambio en el tamaño de página
        pagination // Activar paginación
        rowCount={totalRows} // Cantidad total de filas en el servidor
        paginationMode="server" // Indicar que la paginación es del lado del servidor
        onPageChange={(newPage) => onPageChange(newPage)} // Callback al cambiar de página
        onRowClick={(params) => onSelectTransaction(params.row)} // Selección de una fila
        sx={{ height: 400, width: "100%" }}
      />
    </Box>
  );
}
