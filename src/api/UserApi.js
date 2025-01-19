
import { cookies } from "next/headers";
import apiClient from "./ClientAxios";

export const addNewUser = async (data) => {
    try {
        const token = cookies().get("token");
        const response = await apiClient.post("/users", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
