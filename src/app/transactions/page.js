'use client';
import React, { useContext, useState, useEffect } from 'react';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionDetails from '@/components/transactions/TransactionDetails';
import CircularProgress from '@mui/material/CircularProgress';
import { getTransactions } from '@/api/TransactionApi';
import { UserContext } from '@/context/UserContext';
import { Box, CssBaseline, Drawer } from '@mui/material';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [error, setError] = useState(null);
  const { user, setUser, loading } = useContext(UserContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user || loading) return; 
      try {
        const response = await getTransactions(user.id); 
        setTransactions(response);
      } catch (err) {
        console.error('Error al obtener transacciones:', err);
        setError('No se pudieron cargar las transacciones.');
      }
    };

    fetchTransactions();
  }, [user, loading]); // Ejecuta el efecto solo cuando el usuario o el estado de carga cambien

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      {/* Lista de transacciones */}
      <TransactionList
        transactions={transactions}
        onSelectTransaction={setSelectedTransaction}
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
