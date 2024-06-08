import axios from 'axios';

export const darshanaApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API}/api`,
});

darshanaApi.interceptors.request.use(function (config) {
    if(typeof(localStorage) != undefined){
        const token = localStorage.getItem('access_token') || '';
        config.headers!.Authorization = `Bearer ${token}`;
        return config;
    }
});

