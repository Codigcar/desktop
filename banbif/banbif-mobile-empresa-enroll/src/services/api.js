import axios from 'axios';
import { enviroment } from '../utils/enviroments';
import { StorageService } from '../services/storage';
import { AuthService } from '../services/auth';
import { navigate } from './navigation';
import { ErrorStateService } from './errorState';

const api = axios.create({

    baseURL: enviroment.baseURL,
    timeout: 90000,

    headers: {
        'codigoCanal': 'APP_BANCA_MOVIL'
    }
});

api.interceptors.request.use(
    async (config) => {
        await AuthService.runSSLPinning();

        ErrorStateService.setIsLogout(false);
        const token = await StorageService.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json; charset=UTF-8'
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    async (response) => {
        try {
            const token = await StorageService.getItem('token');
            var isSessionActive = await AuthService.checkSesionUser();
            if (isSessionActive == 0) {
                ErrorStateService.setIsLogout(true);
                await StorageService.removeItem('token')
                await StorageService.removeItem('refreshToken')
                await StorageService.removeItem('user')
                await StorageService.removeItem('DNI')
                navigate("IntermediateScreen");
            }
        } catch (e) {
        }
        return response;
    }, async (error) => {
        const { config } = error;
        const originalRequest = config;

        const refreshAttempted = await StorageService.getItem('refreshAttempted');

        if (error && error.response && [401, 403].indexOf(error.response.status) > -1) {
            try {
                if (refreshAttempted) {
                    return Promise.reject(error);
                } else {
                    await AuthService.doRefreshToken();
                    const token = await StorageService.getItem('token');
                    var isSessionActive = await AuthService.checkSesionUser();
                    if (isSessionActive == 0) {
                        await AuthService.doLogout();
                        ErrorStateService.setIsLogout(true);
                        await StorageService.removeItem('token')
                        await StorageService.removeItem('refreshToken')
                        await StorageService.removeItem('user')
                        await StorageService.removeItem('DNI')
                        navigate("IntermediateScreen");
                    } else {
                        return new Promise(async resolve => {
                            originalRequest.headers.Authorization = 'Bearer ' + await StorageService.getItem('token')
                            originalRequest.headers.tokenClient = await StorageService.getItem('token')
                            resolve(api(originalRequest))
                        })
                    }
                }
            } catch (e) {
                await AuthService.doLogout();
                ErrorStateService.setIsLogout(true);
                await StorageService.removeItem('token')
                await StorageService.removeItem('refreshToken')
                await StorageService.removeItem('user')
                await StorageService.removeItem('DNI')
                navigate("IntermediateScreen");
            }
        } else {
            return Promise.reject(error);
        }

    });

export default api;
