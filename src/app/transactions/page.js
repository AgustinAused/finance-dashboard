'use client';
import React, { useContext, useState, useEffect } from "react";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionDetails from "@/components/transactions/TransactionDetails";
import TransactionActions from "@/components/transactions/TransactionActios";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import CircularProgress from "@mui/material/CircularProgress";
import { getTransactions, addTransaction } from "@/api/TransactionApi";
import { UserContext } from "@/context/UserContext";
import { Box, CssBaseline, Drawer, Modal } from "@mui/material";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [totalRows, setTotalRows] = useState(0);

    const { user, loading: userLoading } = useContext(UserContext);



    useEffect(() => {
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
                    // Convierte las fechas antes de establecer las transacciones
                    // const updatedDataList = response.data.map(item => {
                    //     const [day, month, year] = item.createdAt.split('/');
                    //     item.createdAt = new Date(`${year}-${month}-${day}`);
                    //     return item;
                    // });
                    const updatedDataList = response.data;
                    setTransactions(updatedDataList);
                    setTotalRows(response.totalItems);
                }
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("No se pudieron cargar las transacciones.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [user, userLoading, paginationModel]);

    const handleCreateTransaction = async (formData) => {
        try {
            const response = await addTransaction(user.company.id, formData);
            if (response.status === "success") {
                setTransactions((prev) => [response.data, ...prev]);
                setShowForm(false);
            }
        } catch (err) {
            console.error("Error creating transaction:", err);
        }
    };

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

    const columns = [
        { field: "createdAt", headerName: "Fecha", flex: 1 },
        { field: "amount", headerName: "Monto", flex: 1 },
        { field: "type", headerName: "Tipo", flex: 1 },
        { field: "categoryName", headerName: "Categoría", flex: 1 },
        { field: "description", headerName: "Descripción", flex: 2 },
    ];


    return (
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <CssBaseline />

            {/* Botones para acciones de transacciones */}
            <TransactionActions onCreate={() => setShowForm(true)} />

            {/* Lista de transacciones */}
            <Box
                sx={{
                    flexDirection: "column",
                    maxWidth: "100%",
                    overflowX: "auto", // Para evitar que se salga de los límites
                }}
            >

                <TransactionList
                    rows={transactions}
                    columns={columns}
                    totalRows={totalRows}
                    loading={loading}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onRowClick={(row) => setSelectedTransaction(row.row)}
                />
            </Box>

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

            {/* Modal para el formulario */}
            <Modal open={showForm} onClose={() => setShowForm(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                    }}
                >
                    <AddTransactionForm
                        onSubmit={handleCreateTransaction}
                        onCancel={() => setShowForm(false)}
                    />
                </Box>
            </Modal>
        </Box>
    );
}
