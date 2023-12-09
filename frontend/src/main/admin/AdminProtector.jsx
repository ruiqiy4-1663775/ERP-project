
import { LOCAL_STORAGE_KEY, ADMIN_CONTROL } from '../../utils/constants';
import Admin from './Admin';
import { ModalContext } from '../../utils/ModalContext';
import { useContext, useEffect } from 'react';
function AdminProtector() {
    const { openModal } = useContext(ModalContext)
    let loginInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    useEffect(() => {
        if (!loginInfo || !ADMIN_CONTROL.includes(loginInfo.role)) {
            openModal(new Error('You have no access to this page'))
        }
    // eslint-disable-next-line
    }, [])
    if (!loginInfo || !ADMIN_CONTROL.includes(loginInfo.role)) {
        return null
    }
    return (
        <Admin></Admin>
    );
}

export default AdminProtector;