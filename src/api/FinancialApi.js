'use server'
import apiClient from "./ClientAxios";
import { cookies } from "next/headers";

// Función para obtener el flujo de efectivo según el periodo seleccionado
export async function getCashFlowDefault(period) {
    const cookiesInstance = await cookies();
    const token = cookiesInstance.get('access_token');
    // console.log(period)
  try {
    const response = await apiClient.get(`/api/financial/cashflow?period=${period}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`, // Token correcto
        'Cache-Control': 'no-cache',       // Evitar caché
        'Accept': '*/*',                   // Aceptar todos los tipos de respuesta
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}


