import axios from "./AxiosSetup";

export default class Services {

    static baseUrl = 'http://localhost:3600/';

    static signInPanel(requestData) {
        return axios.post(`/base/realStateLogin`, {
            username: requestData.username,
            password: requestData.password,
        })
    }

    static signIn(requestData) {
        axios.defaults.headers['content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = '/';
        axios.defaults.headers['Cache-Control'] = 'no-cache';
        axios.defaults.withCredentials = true;
        return axios.post(`/base/login`, {
            username: requestData.username,
            password: requestData.password,
        })
    }

    static logoutUser() {
        return axios.get(`/client/logout`)
    }

    static logoutRealEstate() {
        return axios.get(`/base/logout`)
    }

    static signInClient(requestData) {
        axios.defaults.headers['content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = '/';
        axios.defaults.headers['Cache-Control'] = 'no-cache';
        axios.defaults.withCredentials = true;
        return axios.post(`/client/login`, {
            username: requestData.username,
            password: requestData.password,
        })
    }

    static registerClient(requestData) {
        axios.defaults.headers['content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = '/';
        axios.defaults.headers['Cache-Control'] = 'no-cache';
        axios.defaults.withCredentials = true;
        return axios.post(`/client/register`, {
            username: requestData.username,
            password: requestData.password,
            email: requestData.email,
        })
    }

    static editClientProfile(requestData) {
        return axios.post(`/client/clientUsers/edit`, requestData)
    }

    static changeClientPassword(requestData) {
        return axios.post(`/client/clientUsers/edit`, {
            username: requestData.username,
            currentPassword: requestData.currentPassword,
            newPassword: requestData.newPassword
        })
    }

    static getConfigList(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/base/clientConfig/list`, {
            params: requestData
        })
    }

    static getFileById(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/base/agencyFiles/file`, {
            params: requestData
        })
    }

    static getNextFile(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/base/agencyFiles/nextFile`, {
            params: requestData
        })
    }

    static getPrevFile(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/base/agencyFiles/prevFile`, {
            params: requestData
        })
    }

    static searchAgencyFiles(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/base/agencyFiles/list`, requestData)
    }

    static searchFiles(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/base/getFiles/list`, {
            params: requestData
        })
    }

    static async insertConfig(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/configs/insert`, requestData)
    }

    static async deleteConfig(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/configs/delete`, requestData)
    }

    static async editConfig(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/configs/edit`, requestData)
    }

    static getRegionPriceList(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/regionPrice/list`, {
            params: requestData
        })
    }

    static async insertRegionPrice(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/regionPrice/insert`, requestData)
    }

    static async deleteRegionPrice(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/regionPrice/delete`, requestData)
    }

    static async editRegionPrice(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/regionPrice/edit`, requestData)
    }

    static async insertAdvertise(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/client/advertising/insert`, requestData)
    }

    static searchAdvertiseList(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/client/advertise/list`, {
            params: requestData
        })
    }

    static latestAdvertiseList(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/client/advertise/latestList`, {
            params: requestData
        })
    }

    static bestAgenciesList(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/base/bestAgencies/list`, {
            params: requestData
        })
    }

    static getAdvertiseImageDownloadUrl(fileName){
        // var url = `/client/advertise/download?fileName=` + fileName;
        // return axios.get(url);
        return this.baseUrl + `client/advertise/download?fileName=` + fileName;

    }

    static geAdvertiseTotalCount(requestData) {
        return axios.get(`/client/advertise/totalCount`, requestData)
    }

    static async editRealStateProfile(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/base/agencyProfile/edit`, requestData)
    }

    static getRealStateProfileImageDownloadUrl(fileName){
        return this.baseUrl + `base/agencyProfile/download?fileName=` + fileName;
    }

    static getUserProfileImageDownloadUrl(fileName){
        return this.baseUrl + `client/clientUsers/download?fileName=` + fileName;
    }

    static getBlogImageDownloadUrl(fileName){
        return this.baseUrl + `base/blogList/download?fileName=` + fileName;
    }

    static getBlogList(requestData) {
        return axios.get(`/base/blogList/list`, {
            params: requestData
        })
    }

    static async insertBlog(requestData) {
        return axios.post(`/base/blogManager/insert`, requestData)
    }

    static async deleteBlog(requestData) {
        return axios.post(`/base/blogManager/delete`, requestData)
    }

    static async editBlog(requestData) {
        return axios.post(`/base/blogManager/edit`, requestData)
    }

    static uploadBlogImage(requestData){
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/base/blogManager/uploadImage`, requestData)
    }
}
