'use server';
import apiClient from "./ClientAxios";
import { cookies } from 'next/headers';

export async function updateCompany(id, data) {
    try{
        const cookiesInstance = await cookies();
        const token = cookiesInstance.get('access_token');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await apiClient.put('/api/companies/' + id, data, {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })
        if (response.status === 200) {
            return response.data;
        }


    } catch (error) {

    }
}