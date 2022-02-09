import axios from "./AxiosSetup";

export default class Services {

    static baseUrl = 'https://gilanfile.ir/';
    // static baseUrl = 'http://192.168.1.102:3600/';

    static signInPanel(requestData) {
        return axios.post(`/api/base/realStateLogin/mobile`, {
            agencyCode: requestData.agencyCode,
            username: requestData.username,
            password: requestData.password,
        })
    }

    static registerMobilePanel(requestData) {
        return axios.post(`/api/base/agency/registerAgencyMobileUser`, requestData)
    }

    static signIn(requestData) {
        axios.defaults.headers['content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = '/';
        axios.defaults.headers['Cache-Control'] = 'no-cache';
        axios.defaults.withCredentials = true;
        return axios.post(`/api/base/login`, {
            username: requestData.username,
            password: requestData.password,
        })
    }

    static logoutUser() {
        return axios.get(`/api/client/logout`)
    }

    static logoutRealEstate() {
        return axios.get(`/api/base/logout`)
    }

    static signInClient(requestData) {
        axios.defaults.headers['content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = '/';
        axios.defaults.headers['Cache-Control'] = 'no-cache';
        axios.defaults.withCredentials = true;
        return axios.post(`/api/client/login`, {
            username: requestData.username,
            password: requestData.password,
        })
    }

    static registerClient(requestData) {
        axios.defaults.headers['content-Type'] = 'application/json';
        axios.defaults.headers['Accept'] = '/';
        axios.defaults.headers['Cache-Control'] = 'no-cache';
        axios.defaults.withCredentials = true;
        return axios.post(`/api/client/register`, {
            username: requestData.username,
            password: requestData.password,
            email: requestData.email,
        })
    }

    static editClientProfile(requestData) {
        return axios.post(`/api/client/clientUsers/edit`, requestData)
    }

    static changeClientPassword(requestData) {
        return axios.post(`/api/client/clientUsers/edit`, {
            username: requestData.username,
            currentPassword: requestData.currentPassword,
            newPassword: requestData.newPassword
        })
    }

    static getConfigList(requestData) {
        return axios.get(`/api/base/clientConfig/list`, {
            params: requestData
        })
    }

    static getFileById(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/api/base/agencyFiles/file`, {
            params: requestData
        })
    }

    static getNextFile(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/api/base/agencyFiles/nextFile`, {
            params: requestData
        })
    }

    static getPrevFile(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/api/base/agencyFiles/prevFile`, {
            params: requestData
        })
    }

    static searchAgencyFiles(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/api/base/agencyFiles/list`, requestData)
    }

    static searchFiles(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/api/base/getFiles/list`, {
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
        return axios.post(`/api/client/advertising/insert`, requestData)
    }

    static searchAdvertiseList(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/api/client/advertise/list`, {
            params: requestData
        })
    }

    static latestAdvertiseList(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/api/client/advertise/latestList`, {
            params: requestData
        })
    }

    static bestAgenciesList(requestData) {
        // axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.get(`/api/base/bestAgencies/list`, {
            params: requestData
        })
    }

    static getAdvertiseImageDownloadUrl(fileName){
        // var url = `/api/client/advertise/download?fileName=` + fileName;
        // return axios.get(url);
        return this.baseUrl + `client/advertise/download?fileName=` + fileName;

    }

    static geAdvertiseTotalCount(requestData) {
        return axios.get(`/api/client/advertise/totalCount`, requestData)
    }

    static async editRealStateProfile(requestData) {
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/api/base/agencyProfile/edit`, requestData)
    }

    static getRealStateProfileImageDownloadUrl(fileName){
        return this.baseUrl + `base/agencyProfile/download?fileName=` + fileName;
    }

    static getUserProfileImageDownloadUrl(fileName){
        return this.baseUrl + `api/client/clientUsers/download?fileName=` + fileName;
    }

    static getBlogImageDownloadUrl(fileName){
        return this.baseUrl + `base/blogList/download?fileName=` + fileName;
    }

    static getBlogList(requestData) {
        return axios.get(`/api/base/blogList/list`, {
            params: requestData
        })
    }

    static async insertBlog(requestData) {
        return axios.post(`/api/base/blogManager/insert`, requestData)
    }

    static async deleteBlog(requestData) {
        return axios.post(`/api/base/blogManager/delete`, requestData)
    }

    static async editBlog(requestData) {
        return axios.post(`/api/base/blogManager/edit`, requestData)
    }

    static uploadBlogImage(requestData){
        axios.defaults.headers['Cookie'] = localStorage.getItem('session');
        return axios.post(`/api/base/blogManager/uploadImage`, requestData)
    }

    static getFileFromFilling(requestData) {
        return axios.post(`/api/base/clientFiles/getMobileClientFileList`, requestData)
    }
}
