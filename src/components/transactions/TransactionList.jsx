import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";

export default function TransactionList({
  rows,
  columns,
  totalRows,
  paginationModel,
  loading,
  onPaginationModelChange,
  onRowClick,
}){
  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ height: 400 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={totalRows}
            pagination
            paginationMode="server"
            pageSizeOptions={[10, 25, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            onRowClick={onRowClick}
          />
        )}
      </div>
    </Box>
  );
};


