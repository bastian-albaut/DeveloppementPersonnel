import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:8082' })

// Executé à chaque requête
API.interceptors.request.use((req) => {
    if(localStorage.getItem('token')) {
        req.headers.Authorization = `${JSON.parse(localStorage.getItem('token'))}`
    }
    return req;
});

export const getQuiz = () => API.get('/quiz');