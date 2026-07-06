import axios from 'axios';

// إنشاء نسخة مخصصة من axios برابط السيرفر الأساسي
const API = axios.create({
 baseURL: 'https://syria-travel.onrender.com/api', 
});

export default API;