

import axiosInstance from '../utils/axios';

export const moviesApi = axiosInstance.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchToken = async () => { 
    try {
        const { data } = await moviesApi.post('/Authentication/Login');
        const token = data?.accessToken;
        if(data.success){
            localStorage.setItem('accessToken', token);
        }
    } catch (error) {
        console.log('Sorry, your token could not be created.');
    }
}


export const createSessionId = async () => {
    const token = localStorage.getItem('accessToken');

    if(token) {
        try {
            const { data: { session_id } } = await moviesApi.post('/Authentication/Login', {
                accessToken: token,
            });
            localStorage.setItem('session_id', session_id);
            return session_id;
        } catch (error) {
            console.log(error);
        }
    }
}



