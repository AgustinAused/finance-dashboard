'use client';
import React, { useContext, useState, useEffect } from "react";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionDetails from "@/components/transactions/TransactionDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { getTransactions } from "@/api/TransactionApi";
import { UserContext } from "@/context/UserContext";
import { Box, CssBaseline, Drawer } from "@mui/material";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [totalRows, setTotalRows] = useState(0);

    const { user, loading: userLoading } = useContext(UserContext);

    const fetchTransactions = async () => {
        if (!user || userLoading) return;

        setLoading(true);

        try {
            const response = await getTransactions(
                user.company.id,
                paginationModel.page,
                paginationModel.pageSize
            );

            if (response.data && response.status === "success") {
                setTransactions(response.data);
                setTotalRows(response.totalItems);
            }
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError("No se pudieron cargar las transacciones.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [user, userLoading, paginationModel]);

    const columns = [
        { field: "createdAt", headerName: "Fecha", flex: 1 },
        { field: "amount", headerName: "Monto", flex: 1 },
        { field: "type", headerName: "Tipo", flex: 1 },
        { field: "categoryName", headerName: "Categoría", flex: 1 },
        { field: "description", headerName: "Descripción", flex: 2 },
    ];

    if (userLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />
            {/* Lista de transacciones */}
            <TransactionList
                rows={transactions}
                columns={columns}
                totalRows={totalRows}
                loading={loading}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowClick={(row) => setSelectedTransaction(row.row)}
            />

            {/* Drawer de detalles de transacción */}
            <Drawer
                anchor="right"
                open={!!selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
                sx={{ width: 400 }}
            >
                {selectedTransaction && (
                    <TransactionDetails
                        transaction={selectedTransaction}
                        onClose={() => setSelectedTransaction(null)}
                    />
                )}
            </Drawer>
        </Box>
    );
}
