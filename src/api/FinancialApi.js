'use server'
import apiClient from "./ClientAxios";
import { cookies } from "next/headers";

// Función para obtener el flujo de efectivo según el periodo seleccionado
export async function getCashFlowDefault(period) {
    const cookiesInstance = await cookies();
    const token = cookiesInstance.get('access_token');
  try {
    const response = await apiClient.get(`/api/financial/cashflow?period=${period}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`, // Token correcto
        'Cache-Control': 'no-cache',       // Evitar caché
        'Accept': '*/*',                   // Aceptar todos los tipos de respuesta
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    return Error(error.message)
  }
}


