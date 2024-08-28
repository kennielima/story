import axios from 'axios';

const api = axios.create({
  baseURL: 'https://story-api.ikattey.com',
  headers: {
    'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
  }
});

export default api;
