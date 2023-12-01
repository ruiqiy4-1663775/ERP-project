import { useState } from "react";
import useAxios from "../../../utils/useAxios";

function PurchaseOrder() {
    let fields = ['Purchase ID', 'Supplier ID', 'Product ID', 'Unit Price', 'Quantity', 'Location ID']
    const [formState, setFormState] = useState(initialState());
    const [errors, setErrors] = useState({});
    const axios = useAxios()
    function initialState() {
        let initial = {}
        for (let field of fields) {
            initial[field] = ''
        }
        return initial
    }
    const validateForm = () => {
        let newErrors = {};
        for (let field of fields) {
            if (formState[field].trim() === '') {
                newErrors[field] = `* ${field} is required.`
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };
    async function handleSubmit() {
        if (validateForm()) {
            await axios.post('/api/new_purchase_order', formState, 
                'Successfully added new purchase order')
        }
    }
    function handleClear() {
        setErrors({})
        axios.setData(null)
        setFormState(initialState);
    }
    return (
        <div>
            <h1 className="text-xl font-semibold mb-5">New Purchase Order</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-2 
            mb-5">
                {fields.map((field, index) =>
                        <div className="flex flex-col" key={index}>
                            <label className="font-medium"> {field} </label>
                            <input
                                type={field === 'Unit Price' ? 'number' : "text"}
                                name={field}
                                value={formState[field]}
                                onChange={handleChange}
                                className="border border-gray-300 p-0.5 rounded" />
                            {errors[field] && <p className='text-red-500'>{errors[field]}</p>}
                        </div>
                    )}
            </div>
            <div className="mt-5">
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700  text-white py-1 px-3 rounded mr-5">
                    Add Order
                </button>
                <button onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-1 rounded w-28">
                    Clear All
                </button>
            </div>
        </div>
    )
}

export default PurchaseOrder