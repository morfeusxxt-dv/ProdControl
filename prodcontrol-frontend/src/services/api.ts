import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Pointing to Spring Boot backend
});

export default api;
