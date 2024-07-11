import axios from 'axios';

const api = axios.create({
  baseURL: 'http://corte.fymmx.com',
});

export default api;
