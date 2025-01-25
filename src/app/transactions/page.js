'use client'; 
import React, { useContext, useState, useEffect } from "react";
import TransactionList from "@/components/transactions/TransactionList";
import CircularProgress from "@mui/material/CircularProgress";
import { getTransactions } from "@/api/TransactionApi";
import { UserContext } from "@/context/UserContext";
import { Box, CssBaseline, Drawer } from "@mui/material";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10); // Default size
    const [totalRows, setTotalRows] = useState(0);
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!user || loading) return;
            try {
                const response = await getTransactions(user.company.id, page, pageSize);
                setTransactions(response.content); // Supongamos que `content` contiene los datos
                setTotalRows(response.totalElements); // Total de filas en la base
            } catch (err) {
                console.error("Error al obtener transacciones:", err);
            }
        };

        fetchTransactions();
    }, [user, loading, page, pageSize]); // Dependencias

    if (loading) {
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
            <TransactionList
                transactions={transactions}
                onSelectTransaction={setSelectedTransaction}
                onPageChange={(newPage) => setPage(newPage)}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRows={totalRows}
                
            />
        </Box>
    );
}
