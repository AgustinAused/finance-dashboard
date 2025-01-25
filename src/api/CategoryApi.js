'use server';
import apiClient from "./ClientAxios";
import { cookies } from "next/headers";



export async function getCategories(companyId){
    try{
        const cookiesInstance = await cookies()
        const token = cookiesInstance.get('access_token')

        const response = await apiClient.get(`/api/categories/${companyId}`, {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

