'use client';
import react, { useContext,useState, useEffect } from 'react';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionDetails from '@/components/transactions/TransactionDetails';
import { getTransactions } from '@/api/TransactionApi';
import { UserContext } from '@/context/UserContext';



export default function transactionsPage() {
    const [transactions, setTransactions] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [error, setError] = useState(null);
    const [user, loading] = useContext(UserContext);


    useEffect(() => {
        const response = await getTransactions(1);
        setTransactions(response);
    }, []);


    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />
            {/* Lista de transacciones */}
            <TransactionList onSelectTransaction={setSelectedTransaction} />

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
};
