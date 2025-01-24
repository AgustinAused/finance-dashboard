'use server'
import { cookies } from "next/headers";
import apiClient from "./ClientAxios";

export const addNewUser = async (data) => {
    try {
        const response = await apiClient.post("/api/user/", data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export async function getProfile() {
    try {
        const cookiesInstance = await cookies()
        const token = cookiesInstance.get('access_token');

        const response = await apiClient.get("/api/user/profile", {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in getProfile:", error.message);
    }
}

export async function updateProfile(id, data) {
    try {
        const cookiesInstance = await cookies();
        const token = cookiesInstance.get("access_token");
        const response = await apiClient.put("/api/user/"+ id, data, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in UpdateProfile:", error.message)
    }
}


export async function changePassword(data) {
    try {
        const cookiesInstance = await cookies();
        const token = cookiesInstance.get("access_token");
        const response = await apiClient.put("/api/user/change-password", data, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
            });
        return response.data;
    } catch (error) {
        console.error("Error in changePassword:", error.message)
    }
}


export async function updatePhoto(id, file) {
    try {
        const cookiesInstance = await cookies();
        const token = cookiesInstance.get("access_token");

        // Crear un FormData para envolver el archivo
        const formData = new FormData();
        formData.append("file", file);  // 'photo' debe coincidir con el nombre esperado en el backend

        const response = await apiClient.put(`/api/user/${id}/photo`, formData, {
            headers: {
                Authorization: `Bearer ${token.value}`,
                "Content-Type": "multipart/form-data",  // Aunque no es necesario, es bueno especificarlo
            }
        });

        return response.data;
    } catch ( error ){
        console.error("Error in chagePhoto:", error.message)
    }
}


