// Code for the AuthApi
import apiClient from './ClientAxios';

const AuthApi = {
    login: async (username, password) => {
        try {
            const response = await apiClient.post('/api/auth/login', { username, password });
            return response.data;
        } catch (error) {
            console.error('Error en AuthApi.login:', error);
            return null;
        }
    }
};

export default AuthApi;



 

