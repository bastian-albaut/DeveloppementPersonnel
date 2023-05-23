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
export const login = (data) => API.post('/user/login', data);
export const register = (data) => API.post('/user/register', data);
export const getUser = (token) => API.get('/user', { headers: { Authorization: token } });
export const postResult = (data) => API.post('/result', data);