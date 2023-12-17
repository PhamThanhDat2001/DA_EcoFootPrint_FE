import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
    // timeout: 5000, // default is `0` (no timeout)
    responseType: 'json'
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data !== undefined) {
        // only get data
        return response.data;
    }

    return response;
}, (error) => {
    // Handle errors
    // if(error.response){
    //     throw error.response,
    //     console.log('loi 1')
    // }else if(error.request){
    //     throw error.request ,
    //     console.log('loi 1')
    // } 
    // else {
    //     throw error;
    // }
    throw error;
});

export default axiosClient;

