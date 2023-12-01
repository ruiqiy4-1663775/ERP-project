
import { LOCAL_STORAGE_KEY, ADMIN_CONTROL } from '../../utils/constants';
import Admin from './Admin';
import NoAccess from '../../components/Modal';
import { useNavigate } from "react-router-dom";

function AdminProtector() {
    let navigate = useNavigate();
    let loginInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return (
        loginInfo && ADMIN_CONTROL.includes(loginInfo.role)
            ?<Admin></Admin>
            :<NoAccess close={() => navigate(-1)}>you have no access to this page</NoAccess> 
    );
}

export default AdminProtector;