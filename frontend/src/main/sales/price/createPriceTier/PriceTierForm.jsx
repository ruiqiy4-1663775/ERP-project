// This file is the search form for products. 
// Used to select the products to set price tier for
import { useState } from "react"
import useAxios from "../../../../utils/useAxios";
import Table2 from "./PriceTierTable";
import PriceForm from "./PriceForm";

// if successMessage is set, that means the form does not need to display the result
function PriceTierForm({ fields, url, successMessage, tablename, changeableFields, tableKey }) {
    const [formState, setFormState] = useState(initialState());
    const [errors, setErrors] = useState({});
    const { data, setData, get } = useAxios();

    function initialState() {
        let initial = {}
        for (let field of fields) {
            initial[field.Name] = ''
        }
        return initial
    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleClear = () => {
        setFormState(initialState);
        setErrors({})
        setData(null)
    };

    const validateForm = () => {
        let newErrors = {};
        for (let field of fields) {
            if (field.required && formState[field.Name].trim() === '') {
                newErrors[field.label] = `* ${field.label} is required.`
            }
        }
        // console.log(newErrors)
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function handleSubmit() {

        if (validateForm()) {
            let filteredData = {};
            for (let field of fields) {
                if (formState[field.Name] !== '') {
                    if (field.type === 'number') {
                        filteredData[field.Name] = Number(formState[field.Name])
                    } else {
                        filteredData[field.Name] = formState[field.Name]
                    }
                }
            }
            get(url, filteredData, successMessage);
        }
    }

    return (
        <div className="space-y-5">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-4">
                {fields.map((field, index) =>
                    <div className="flex flex-col" key={index}>
                        <label className="font-medium"> {field.Name} </label>
                        <input
                            type={field.type ? field.type : "text"}
                            name={field.Name}
                            value={formState[field.Name]}
                            onChange={handleChange}
                            className="border border-gray-300 p-0.5 rounded"
                        />
                        {errors && errors[field.label] && <p className='text-red-500'>{errors[field.label]}</p>}
                    </div>
                )}
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-0.5 px-3 rounded mr-5">
                Select Items
            </button>
            <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white 
                py-0.5 rounded w-28 whitespace-nowrap">
                Clear All
            </button>
            {data && (data.length !== 0 ?
                <>
                    <Table2
                        updateTable={handleSubmit} tablename={tablename} tableKey={tableKey}
                        data={data} setData={setData} changeableFields={changeableFields} />
                    <PriceForm data={data} />
                </>
                : <p className='text-rose-500 text-center'>No result</p>)
            }
        </div>

    )
}

export default PriceTierForm;