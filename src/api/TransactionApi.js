'use server';
import apiClient from "./ClientAxios";
import { cookies } from "next/headers";


export const addTransaction = async (newTransaction) => {
    try {
        const cookieInstance = await cookies();
        const token = cookieInstance.get("access_token");

        const response = await apiClient.post("/transactions/", newTransaction, {
            headers: {
                "Authorization": `Bearer ${token.value}`,
                "Content-Type": "application/json",
                },
                });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


