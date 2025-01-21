import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000/api', // URL-ul backend-ului
  timeout: 10000, // Timeout opțional (10 secunde)
  headers: {
    'Content-Type': 'application/json', // Setări pentru toate cererile
  },
});

export default api;
