import axios from 'axios';
import Toast from "react-native-root-toast";
import {environment} from "@/config/environment";

const apiClient = axios.create({
    baseURL: environment.baseUrl,
    responseType: 'json',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        credentials: 'include',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error: {
        response?: { data?: { message?: string }; status: number };
        message?: string;
        config: any;
        request: any;
        name: any;
        code: any;
    }) {
        Toast.show(error?.response?.data?.message ?? error?.message ?? 'Error fetching data', {duration: Toast.durations.SHORT})
        return Promise.reject(error)
    })

export {
    apiClient
}
