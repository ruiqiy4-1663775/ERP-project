import { useState, useContext } from 'react';
import { ModalContext } from '../utils/ModalContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOCAL_STORAGE_KEY, API_ENDPOINT } from '../utils/constants';
import { TIMEOUT } from '../utils/constants';
import MessageModal from '../components/MessageModal';

function LoginPage() {
    const { openModal } = useContext(ModalContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        console.log(`Logging in with ${username} and ${password}`);
        let config = {timeout: TIMEOUT}
        try {
            let response = await axios.post(`${API_ENDPOINT}/login`, { username: username, password: password }, config);
            // Save login info in local storage
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
            navigate("/");
        } catch (err) {
            setPassword("");
            openModal(err);
        }
    };

    return (
        <div className="bg-background1 w-full h-full">
            <MessageModal></MessageModal>
            <div className='w-full h-full flex justify-center items-center backdrop-blur-3xl'>
                <div className='w-11/12 md:w-5/12 rounded-lg md:px-36 px-10 py-24 space-y-8 shadow-2xl bg-white bg-opacity-20 text-slate-100'>
                    <h2 className="text-center md:text-2xl font-bold italic">
                        Sign in to your account
                    </h2>
                    <label className="block text-sm font-medium leading-6 text-slate-100">
                        Username
                        <input
                            type="text" name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 
                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                        focus:ring-indigo-600 text-lg"
                        />
                    </label>
                    <label className="block text-sm font-medium leading-6">
                        Password
                        <input
                            type="password" name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                      
                            className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 
                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                        focus:ring-indigo-600 text-lg"
                        />
                    </label>
                    <button
                        className="w-full rounded-md bg-indigo-600 py-1 text-lg 
                      font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
