// This file is used to input tier names and price to create the price tier
import { useState } from "react";
import useAxios from "../../../../utils/useAxios";

function PriceForm({ data }) {
    let fields = [
        { Name: 'Price Tier', required: true },
        { Name: 'Unit Price', type: 'number' },
        { Name: 'Base Tier' }
    ]
    const [formState, setFormState] = useState(initialState());
    const [errors, setErrors] = useState({});
    const { setData, getData } = useAxios();
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    function initialState() {
        let ini = {}
        for (let field of fields) {
            ini[field.Name] = ''
        }
        return ini
    }
    const handleClear = () => {
        setFormState(initialState());
        setErrors({})
        setData(null)
    };
    const validateForm = () => {
        let newErrors = {};
        for (let field of fields) {
            console.log(`\nThis is validateForm in PriceForm\nThe field is`, field)
            console.log(formState[field.Name])
            console.log(formState)
            if (field.required && formState[field.Name].trim() === '') {
                newErrors[field.Name] = `* ${field.Name} is required.`
            }
        }
        console.log(newErrors)
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    function handleSubmit() {
        if (validateForm()) {
            let filteredData = {};
            let rowIds = []
            for (let row of data) {
                rowIds.push(row['Item ID'])
            }
            filteredData.list = rowIds
            if (formState['Base Tier'] !== '') {
                filteredData['Base Tier'] = formState['Base Tier']
                filteredData['Price Tier'] = formState['Price Tier']
                getData('/api/create_tier_from_base', filteredData, 'Price Tier updated')
            } else {
                for (let field of fields) {
                    if (formState[field.Name] !== '') {
                        if (field.type === 'number') {
                            filteredData[field.Name] = Number(formState[field.Name])
                        } else {
                            filteredData[field.Name] = formState[field.Name]
                        }
                    }
                }
                getData('/api/update_price_list', filteredData, 'Price Update succeeded');
            }
        }

    }
    return (
        <div className="space-y-3">
            <h1 className="text-lg font-semibold">Step 2: Give tier name and base tier or price</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 container md:gap-x-20 md:gap-y-1">
                {fields.map((field, index) =>
                    <div className="flex flex-col" key={index}>
                        <label className="font-medium"> {field.Name}{field.required && '*'} </label>
                        <input
                            type={field.type ? field.type : "text"}
                            name={field.Name}
                            value={formState[field.Name]}
                            onChange={handleChange}
                            className="border border-gray-300 p-0.5 rounded"
                        />
                        {errors && errors[field.Name] && <p className='text-red-500'>{errors[field.Name]}</p>}
                    </div>
                )}
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-0.5 px-3 rounded mr-5">
                Create/Update Tier
            </button>
            <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white 
                py-0.5 rounded w-28">
                Clear All
            </button>
        </div>
    )
}

export default PriceForm