import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.api.promo.petronassprinta.com.br/api',
  auth: {
    username: 'cantacom@cantacom.com.br',
    password: 'E9Y4viBcXQX5P5d',
  
  },
});

export default api;
