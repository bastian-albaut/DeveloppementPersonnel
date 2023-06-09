import axios from 'axios';

const API = axios.create({ baseURL : 'https://us-central1-developpementpersonnel-dce64.cloudfunctions.net/default' })

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
export const getResult = (resultId) => API.get(`/result/${resultId}`);
export const getResultByUserId = (userId) => API.get(`/result/user/${userId}`);
export const getAllCategories = () => API.get('/categorie');
export const getCategoryByName = (categoryName) => API.get(`/categorie/${categoryName}`);
export const postArticle = (data) => API.post('/article', data);
export const getArticle = (articleId) => API.get(`/article/${articleId}`);
export const getAllArticles = () => API.get('/article');
export const getArticlesById = (userId) => API.get(`/article/user/${userId}`);
export const deleteArticle = (articleId) => API.delete(`/article/${articleId}`);
export const getRandomQuote = () => API.get('/quote/random');
export const postTip = (data) => API.post('/tip', data);
export const getTip = (tipId) => API.get(`/tip/${tipId}`);
export const getAllTips = () => API.get('/tip');
export const getTipsById = (userId) => API.get(`/tip/user/${userId}`);
export const deleteTip = (tipId) => API.delete(`/tip/${tipId}`);
export const updateTip = (tipId, data) => API.put(`/tip/${tipId}`, data);