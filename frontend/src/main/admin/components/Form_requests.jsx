import { useState } from "react"
import useAxios from "../../../utils/useAxios";
import Table from "./Table_requests";

// if successMessage is set, that means the form does not need to display the result
function Form({ fields, url, successMessage, tablename, changeableFields, buttonName, tableKey }) {
    const [formState, setFormState] = useState(initialState());
    const [errors, setErrors] = useState({});
    const { data, setData, getData } = useAxios();

    function initialState() {
        let initial = {}
        for (let field of fields) {
            initial[field.databaseName] = ''
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
            if (field.required && formState[field.databaseName].trim() === '') {
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
                if (formState[field.databaseName] !== '') {
                    if (field.type === 'number') {
                        filteredData[field.databaseName] = Number(formState[field.databaseName])
                    } else {
                        filteredData[field.databaseName] = formState[field.databaseName]
                    }
                }
            }
            getData(url, filteredData, successMessage);
        }
    }

    return (
        <div className="space-y-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-2">
            {fields.map((field, index) =>
                <div className="flex flex-col" key={index}>
                    <label className="font-semibold"> {field.label} </label>
                    <input
                        type={field.type ? field.type : "text"}
                        name={field.databaseName}
                        value={formState[field.databaseName]}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded"
                    />
                    {errors && errors[field.label] && <p className='text-red-500'>{errors[field.label]}</p>}
                </div>
            )}
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 text-white py-1 px-3 rounded mr-5">
                {buttonName}
            </button>
            <button type="button" onClick={handleClear} className="bg-rose-500 text-white p-1 rounded w-28">
                Clear All
            </button>
            {!successMessage && data && (data.length !== 0 ?
                <Table 
                    updateTable={handleSubmit} tablename={tablename} tableKey={tableKey}
                    data={data} setData={setData} changeableFields={changeableFields} /> 
            :   <p className='text-rose-500 text-center'>No result</p>)
            }
        </div>

    )
}

export default Form;