import axios from 'axios';

const api = axios.create({
  baseURL: 'https://boutique-clothing-api.onrender.com/api',
});

export default api;