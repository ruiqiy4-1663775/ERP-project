
import useAxios from '../../../utils/useAxios';
import { FormV2, useForm } from './Form';

function AddUserForm() {
    let obj = { Username: "username", Password: 'password', Email: 'email', Name: 'name', Role: 'role', };
    const handler = useForm(obj);
    const { getData } = useAxios();
    function submit() {
        if (handler.validateForm(obj)) {
            console.log(handler.data);
            getData('/api/add_user', handler.data, 'Sucessfully Added User');
        }
    }
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">New User</h1>
            <FormV2 obj={obj} handleChange={handler.handleInputChange} data={handler.data} errors={handler.errors} />
            <button onClick={submit} className="bg-blue-500 text-white p-0.5 w-28 rounded mr-5">
                Add User
            </button>
            <button onClick={handler.handleClear} className="bg-rose-500 text-white p-0.5 w-28 rounded">
                Clear All
            </button>
        </div>
    );
}

export default AddUserForm;