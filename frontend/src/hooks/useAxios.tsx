"use client"

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { SERVER_API_URL } from '@/lib/config';

axios.defaults.baseURL = SERVER_API_URL;
// axios.defaults.baseURL = '192.168.0.20';

const useAxios = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<Error | AxiosError | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (url: string, options: any = {}): Promise<any> => {
        setIsLoading(true);
        try {
            const response = await axios(url, { 
                ...options, 
                withCredentials: true });
            setData(response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error as AxiosError); // Cast error to AxiosError
                
            } else {
                setError(new Error("An unknown error occurred")); // Handle other types of errors
            }
        }
        setIsLoading(false);
    };

    const axiosPost = async (url: string, data: any, options: any = {}) => {
        setIsLoading(true);
        try {
            const response = await axios.post(url, data, { ...options, withCredentials: true });
            setData(response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error as AxiosError); // Cast error to AxiosError
            } else {
                setError(new Error("An unknown error occurred")); // Handle other types of errors
            }
        }
        setIsLoading(false);
    }

    return { 
        data, 
        error, 
        isLoading,
        fetchData,
        axiosPost
    };
};

export default useAxios;
