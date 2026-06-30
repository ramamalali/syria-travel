import axios from 'axios';

// إنشاء نسخة مخصصة من axios برابط السيرفر الأساسي
const API = axios.create({
 baseURL: 'http://localhost:5000/api', 
});

export default API;