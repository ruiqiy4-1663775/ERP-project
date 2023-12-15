import axios from 'axios';
import { LOCAL_STORAGE_KEY, API_ENDPOINT, TIMEOUT } from '../utils/constants';

// This hook has different versions of internet request
function useAxios() {
    async function get(url, data) {
        try {
            let loginInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
            // let config = {timeout: TIMEOUT}
            let config = { params: data, timeout: TIMEOUT }
            if (loginInfo) {
                loginInfo = JSON.parse(loginInfo);
                config.headers = { Authorization: `Bearer ${loginInfo.token}` }
            }
            const response = await axios.get(API_ENDPOINT + url, config);
            console.log(response)
            return response.data
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    // async function post(url, data) {
    //     try {
    //         let loginInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
    //         let config = { timeout: TIMEOUT }
    //         if (loginInfo) {
    //             loginInfo = JSON.parse(loginInfo);
    //             config.headers = { Authorization: `Bearer ${loginInfo.token}` }
    //         }
    //         console.log(API_ENDPOINT + url)
    //         let response = await axios.post(API_ENDPOINT + url, data, config);
    //         console.log(response)
    //     } catch (error) {
    //         openModalRef.current(error);
    //     }
    // }
    return { get };
}

export default useAxios;