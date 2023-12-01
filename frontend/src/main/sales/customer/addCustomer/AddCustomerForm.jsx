import useForm from '../../../../utils/useForm';
import useAxios from '../../../../utils/useAxios';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { customStyles } from '../../../../utils/constants';

function AddCustomerForm() {
    let fields = ['Customer ID', 'Customer Name', 'Phone Number', 'Email', 'Address', 'Price Tier']
    let formHandler = useForm(fields)
    const {get, post} = useAxios()
    const [priceTierList, setPriceTierList] = useState()

    useEffect(() => {
        async function fetchData() {
            let list = await get('/api/get_priceTier_list')
            if (Array.isArray(list)) {
                // console.log(list)
                const transformedOptions = list.map(item => ({
                    value: item['Price Tier'],
                    label: item['Price Tier']
                }));
                // console.log(transformedOptions)
                setPriceTierList(transformedOptions)
            }
        }
        fetchData()
    }, [get])

    async function handleSubmit() {
        if (formHandler.validateForm()) {
            console.log(formHandler.formState)
            await post('/api/add_customer', formHandler.formState, 'Customer Added successfully')
        }
    }
    const handleClear = () => {
        formHandler.handleClear()
    };

    function handleOnchange(selectedOption) {
        let e = {
            target: {
                name:'Price Tier',
                value: selectedOption ? selectedOption.value : ''
            }
        }
        formHandler.handleInputChange(e)
    }

    function findValueOption() {
        let result = priceTierList?.find(option => option.value === formHandler.formState['Price Tier'])
        if (result) {
            return result
        }
        return { value: '', label: '' }
    }

    function renderInput(field, index) {
        if (field !== 'Price Tier') {
            return (
                <div className="flex flex-col" key={index}>
                    <label className="font-medium"> {field} </label>
                    <input
                        type={"text"}
                        name={field}
                        value={formHandler.formState[field]}
                        onChange={formHandler.handleInputChange}
                        className="border border-gray-300 p-0.5 rounded"
                    />
                    {formHandler.errors && formHandler.errors[field] &&
                        <p className='text-red-500'>{formHandler.errors[field]}</p>}
                </div>)
        }
        return (
            <div className="flex flex-col" key={index}>
                <label className="font-medium"> {field} </label>
                <Select
                    options={priceTierList}
                    value={
                        findValueOption()
                    }
                    onChange={handleOnchange}
                    isSearchable={true}
                    styles={customStyles}
                />
                {formHandler.errors && formHandler.errors[field] &&
                    <p className='text-red-500'>{formHandler.errors[field]}</p>}
            </div>)
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold mb-4">New Customer</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-2 mb-5">
                {Object.keys(formHandler.formState).map((field, index) => { return renderInput(field, index) }
                )}
            </div>
            <div className="mt-5">
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700  text-white p-0.5 rounded mr-5 w-28">
                    Add Customer
                </button>
                <button onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-28">
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default AddCustomerForm;