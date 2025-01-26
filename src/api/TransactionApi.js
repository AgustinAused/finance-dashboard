'use server';
import apiClient from "./ClientAxios";
import { cookies } from "next/headers";


export const addTransaction = async (newTransaction) => {
    try {
        const cookieInstance = await cookies();
        const token = cookieInstance.get("access_token");

        console.log(newTransaction);

        const response = await apiClient.post("/api/transactions/", newTransaction, {
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


export const getTransactions = async (companyId, page = 0, pageSize = 10) => {
    try {
        const cookieInstance = await cookies();
        const token = cookieInstance.get("access_token");

        const response = await apiClient.get(`/api/transactions/${companyId}?page=${page}&size=${pageSize}`, {
            headers: {
                "Authorization": `Bearer ${token.value}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};



