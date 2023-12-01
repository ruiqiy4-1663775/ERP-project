import { useState } from "react";
import useAxios from "../../../utils/useAxios";
import useForm from "../../../utils/useForm";
function AddSupplier({ close }) {
    let contactInfo = ['Contact Name', 'Contact Title', 'Contact Phone',
        'Contact Primary Email', 'Contact Secondary Email']
    let addressInfo = ['Address line 1', 'Address line 2', 'City',
        'State', 'Zip', 'Country']
    let formHandler = useForm([...contactInfo, ...addressInfo, 'Supplier Name', 'Note'])
    const [errors, setErrors] = useState({});
    const axios = useAxios()

    const validateForm = () => {
        let requiredFields = ['Supplier Name', 'Contact Name', 'Contact Title', 'Contact Phone',
            'Contact Primary Email', 'Address line 1', 'City',
            'State', 'Zip', 'Country']
        let newErrors = {};
        for (let field of requiredFields) {
            // console.log(formHandler.formState[field])
            if (formHandler.formState[field].trim() === '') {
                newErrors[field] = `* ${field} is required.`
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit() {
        if (validateForm()) {
            console.log(formHandler.formState)
            await axios.post('/api/new_supplier', formHandler.formState, 
                'Successfully added supplier')
        }
    }
    function handleClear() {
        setErrors({})
        axios.setData(null)
        formHandler.handleClear()
    }
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold ">New Supplier</h1>
                <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-300 hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div className='border-t my-2 border-gray-400'></div>
            <h1 className="text-base font-medium mb-2 text-orange-600 ">Supplier Info : </h1>
            <div className="flex my-3">
                <label> Supplier Name:</label>
                <input
                    type={"text"}
                    name={'Supplier Name'}
                    value={formHandler.formState['Supplier Name']}
                    onChange={formHandler.handleInputChange}
                    className="border border-gray-300 p-0.5 mx-5 rounded" />
                {errors['Supplier Name'] && <p className='text-red-500'>{errors['Supplier Name']}</p>}
            </div>
            <div className='border-t my-2 border-gray-400'></div>
            <h1 className="text-base font-medium mb-2 text-orange-600 ">Contact Info : </h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-x-10 md:gap-y-2 
            mb-5">
                {contactInfo.map((field, index) =>
                    <div className="flex flex-col" key={index}>
                        <label> {field} </label>
                        <input
                            type={"text"}
                            name={field}
                            value={formHandler.formState[field]}
                            onChange={formHandler.handleInputChange}
                            className="border border-gray-300 p-0.5 rounded" />
                        {errors[field] && <p className='text-red-500'>{errors[field]}</p>}
                    </div>
                )}
            </div>
            <div className='border-t my-2 border-gray-400'></div>
            <h1 className="text-base font-medium mb-2 text-orange-600 ">Address Info : </h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-x-10 md:gap-y-2 
            mb-5">
                {addressInfo.map((field, index) =>
                    <div className="flex flex-col" key={index}>
                        <label> {field} </label>
                        <input
                            type={"text"}
                            name={field}
                            value={formHandler.formState[field]}
                            onChange={formHandler.handleInputChange}
                            className="border border-gray-300 p-0.5 rounded" />
                        {errors[field] && <p className='text-red-500'>{errors[field]}</p>}
                    </div>
                )}
            </div>
            <h1 className="text-base font-medium mb-2 text-orange-600 ">Note : </h1>
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your note here..."
                name="Note"
                value={formHandler.formState['Note']}
                onChange={formHandler.handleInputChange}
            />
            <div className="mt-5">
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700  text-white py-0.5 
                    px-3 rounded mr-5">
                    Add Supplier
                </button>
                <button onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5
                    rounded w-28">
                    Clear All
                </button>
            </div>
        </div>
    )
}

export default AddSupplier