import apiClient from "./ClientAxios";
import { cookies } from "next/headers";

// Función para obtener el flujo de efectivo según el periodo seleccionado
export async function getCashFlowDefault(period) {
    const cookiesInstance = await cookies();
    const token = cookiesInstance.get('token');
  try {
    const response = await apiClient.get(`/api/financial/cashflow?period=${period}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching financial data:", error);
    throw error;
  }
}


