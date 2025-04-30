import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.api.promo.petronassprinta.com.br/api',
  auth: {
    username: 'cantacom@cantacom.com.br',
    password: 'c@nt@022083',
  },
});

export default api;
