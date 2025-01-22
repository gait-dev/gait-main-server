import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, removeTokens } from './auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

// Ajouter le token d'accès dans les en-têtes Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Rafraîchir le token si une erreur 401 est détectée
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post('/token/refresh/', { refresh: refreshToken });
          const { access } = response.data;

          setTokens("", access, refreshToken); // Mettre à jour le token d'accès

          // Réessayer la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Erreur lors du rafraîchissement du token :', refreshError);
          removeTokens(); // Déconnexion si le refresh échoue
          window.location.href = '/'; // Rediriger vers la page de connexion
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
