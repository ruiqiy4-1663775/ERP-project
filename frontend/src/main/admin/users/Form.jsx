import { useState } from "react"

export function useForm(obj) {
    let initialStatev2 = {}
    for (let label in obj) {
        initialStatev2[obj[label]] = '';
    }
    const [data, setData] = useState(initialStatev2);
    const [errors, setErrors] = useState({});
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleClear = () => {
        setData(initialStatev2);
        setErrors({})
    };
    const validateForm = () => {
        let newErrors = {};
        for (let field in obj) {
            if (data[obj[field]].trim() === '') {
                newErrors[field] = `* ${field} is required.`;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    return { data, handleInputChange, handleClear, validateForm, errors };
}

export function FormV2({ obj, data, handleChange, errors }) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-1">
            {Object.keys(obj).map((key, index) =>
                <div className="flex flex-col" key={index}>
                    <label className="font-medium"> {key} </label>
                    <input
                        type="text"
                        name={obj[key]}
                        value={data[obj[key]]}
                        onChange={handleChange}
                        className="border border-gray-300 p-0.5 rounded"
                    />
                    {errors && errors[key] && <p className='text-red-500'>{errors[key]}</p>}
                </div>
            )}
        </div>
    )
}
