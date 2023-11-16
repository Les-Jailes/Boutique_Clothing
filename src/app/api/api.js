import axios from 'axios';

const api = axios.create({
  baseURL: 'https://boutique-clothing-api.onrender.com/',
});

export default api;