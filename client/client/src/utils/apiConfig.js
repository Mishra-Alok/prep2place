const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://prep2place-backend-alok.onrender.com/api';
export const SERVER_URL = API_BASE_URL.replace('/api', '');

export default API_BASE_URL;
