import axios from 'axios';
let baseUrl = 'https://gilanfile.ir/';
// let baseUrl = 'http://192.168.1.102:3600/';

const instance = axios.create({
    baseURL: baseUrl
});
export default instance;
