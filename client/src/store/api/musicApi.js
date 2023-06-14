import axios from 'axios';

const musicAPI = axios.create({
  baseURL: 'http://localhost:8000/music',
});

export default musicAPI;