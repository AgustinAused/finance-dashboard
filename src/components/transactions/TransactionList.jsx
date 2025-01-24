import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";


export default function TransactionList({ onSelectTransaction, transactions }) {
    const transactions = [
        { id: 1, date: "2024-01-24", amount: 100.0, type: "income", category: "Salary", description: "Pago mensual" },
        { id: 2, date: "2024-01-23", amount: 50.0, type: "expense", category: "Rent", description: "Pago alquiler" },
      ];
    
      const columns = [
        { field: "date", headerName: "Fecha", flex: 1 },
        { field: "amount", headerName: "Monto", flex: 1 },
        { field: "type", headerName: "Tipo", flex: 1 },
        { field: "category", headerName: "Categoría", flex: 1 },
        { field: "description", headerName: "Descripción", flex: 2 },
      ];
    
      return (
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Transacciones
          </Typography>
          <DataGrid
            rows={transactions}
            columns={columns}
            pageSize={5}
            onRowClick={(params) => onSelectTransaction(params.row)}
            autoHeight
          />
        </Box>
      );
    };