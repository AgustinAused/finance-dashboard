'use server'
import apiClient from "./ClientAxios";
import { cookies } from "next/headers";


export async function getMonthlyData(companyId) {
    const cookiesInstance = await cookies();
    const token = cookiesInstance.get('access_token');
    const response = await apiClient.get('/api/graphic/monthly/' + companyId, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
                }
});
return response.data;
    
}