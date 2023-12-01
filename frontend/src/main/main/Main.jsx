// This is the main page of the application.
import { Outlet, useNavigate } from 'react-router-dom';
// import Nav from './NavHorizontal';
import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEY } from '../../utils/constants';
import useAxios from '../../utils/useAxios';
import NavVertical from './NavVertical';
import MessageModal from '../../components/MessageModal';

function Main() {
    // It needs to check if the user is logged in and if the token is still valid
    const navigate = useNavigate();
    const [user, setUser] = useState("no user");
    const { updateData } = useAxios();
    useEffect(() => {       // This force user to login
        let loginInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (!loginInfo) {
            navigate('/login');
        } else {
            updateData('/api/verify');
            setUser(loginInfo.username)
        }

    }, [navigate, updateData]);
    
    return (
        <div className='flex w-full h-full'>
            <MessageModal></MessageModal>
            <NavVertical user={user}/>
            <div className='flex grow min-h-0 w-full'>
                <Outlet />
            </div>
        </div>
    );
}
export default Main