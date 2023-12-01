import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { LOCAL_STORAGE_KEY, API_ENDPOINT, TIMEOUT } from './constants';
import { useContext } from 'react';
import { ModalContext } from './ModalContext';

// This hook has different versions of internet request
function useAxios() {
    // data = null means has not search anything data.length = 0 means search result is empty
    const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(false);
    const { openModal } = useContext(ModalContext);
    const openModalRef = useRef(openModal);
    openModalRef.current = openModal;
    // successMessage is optional, if not give, then do not open messageModal
    // Give successMessage if you want to open a message model upon success
    const getData = useCallback(async function getData(url, data, successMessage) {
        try {
            let loginInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
            // let config = {timeout: TIMEOUT}
            let config = {}
            if (loginInfo) {
                loginInfo = JSON.parse(loginInfo);
                config.headers = { Authorization: `Bearer ${loginInfo.token}` }
            }
            const response = await axios.post(API_ENDPOINT + url, data, config);
            setData(response.data);
            if (successMessage) {
                openModalRef.current(null, successMessage);
            }
            // console.log(data);
        } catch (error) {
            openModalRef.current(error);
            // console.log(error)
            setData(null);
        }
    }, [])

    // this function does not update the data. 
    const updateData = useCallback(async function updateData(url, data, successMessage) {
        try {
            let loginInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
            let config = { timeout: TIMEOUT }
            if (loginInfo) {
                loginInfo = JSON.parse(loginInfo);
                config.headers = { Authorization: `Bearer ${loginInfo.token}` }
            }
            console.log(API_ENDPOINT + url)
            await axios.post(API_ENDPOINT + url, data, config);

            if (successMessage) {
                openModalRef.current(null, successMessage);
            }
        } catch (error) {
            openModalRef.current(error);
        }
    }, [])
    // This function will never throw a 404 error, because it will be catched by defualt handler
    const get = useCallback(async function get(url, data) {
        try {
            let loginInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
            // let config = {timeout: TIMEOUT}
            let config = { params: data, timeout: TIMEOUT }
            if (loginInfo) {
                loginInfo = JSON.parse(loginInfo);
                config.headers = { Authorization: `Bearer ${loginInfo.token}` }
            }
            const response = await axios.get(API_ENDPOINT + url, config);
            setData(response.data);
            return response.data
        } catch (error) {
            openModalRef.current(error);
            setData(null);
        }
    }, [])

    async function post(url, data, successMessage) {
        try {
            let loginInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
            let config = { timeout: TIMEOUT }
            if (loginInfo) {
                loginInfo = JSON.parse(loginInfo);
                config.headers = { Authorization: `Bearer ${loginInfo.token}` }
            }
            console.log(API_ENDPOINT + url)
            await axios.post(API_ENDPOINT + url, data, config);

            if (successMessage) {
                openModalRef.current(null, successMessage);
            }
        } catch (error) {
            openModalRef.current(error);
        }
    }

    return { data, setData, getData, updateData, get, post};
}

export default useAxios;