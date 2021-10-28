import axios from 'axios';
let baseUrl = 'http://localhost:3600/';

const instance = axios.create({
    baseURL: baseUrl
});
export default instance;
