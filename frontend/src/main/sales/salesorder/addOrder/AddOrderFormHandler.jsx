// This is the handler of add order
// This file is the search form of the add order
import { useState } from "react"
import useAxios from "../../../../utils/useAxios";
import AddProduct from "./AddProduct";
import useForm from '../../../../utils/useForm'
import { FormHeader } from "../../../../components/Components";
import CustomerSection from "./CustomerSection";

function AddSalesOrderForm({ close }) {
    let fields = ['Employee ID']
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const formHandler = useForm(fields)
    const [errors, setErrors] = useState({});
    const { post } = useAxios()
    const [itemList, setItemList] = useState([]) // This is the list of items that can be added
    const [open, setOpen] = useState(false) // control the opening of addProduct

    const handleClear = () => {
        formHandler.handleClear()
        setItemList([])
        setErrors({})
        setSelectedCustomer('')
    };

    const validateForm = () => {
        let valid = formHandler.validateForm()
        let newErrors = {};

        if (itemList.length === 0) {
            newErrors.products = '* You have not added any products'
        }
        if (selectedCustomer === '') {
            newErrors.customer = '* Customer is required'
        }
        setErrors(newErrors);
        return valid && Object.keys(newErrors).length === 0;
    };

    function handleSubmit() {
        if (validateForm()) {
            let filteredData = {};
            filteredData.formState = {
                ...formHandler.formState, 'Customer ID':
                    selectedCustomer.customer_id
            }
            filteredData.itemList = itemList
            post('/api/add_order', filteredData, 'Order Added successfully');
        }
    }

    function deleteItem(id) {
        const newitemList = itemList.filter(item => item['Item ID'] !== id);
        setItemList(newitemList)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <FormHeader>New Order</FormHeader>
                <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-300 hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-2 mb-5">
                    {Object.keys(formHandler.formState).map((field, index) =>
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
                        </div>
                    )}

                </div>
                <CustomerSection setError={setErrors} error={errors.customer} selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />
                <button onClick={() => setOpen(!open)} className="flex border border-gray-500 hover:border-green-500 
                hover:text-green-300 text-gray-500 py-0.5 px-3 rounded mr-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-6 h-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Item
                </button>
                {errors && errors.products && <p className='text-red-500'>{errors.products}</p>}
                {open &&
                    <AddProduct setProductList={setItemList} productList={itemList} setOpen={setOpen} />
                }
                {itemList.length !== 0 &&
                    <div className="table min-w-full inline-block m-auto">
                        <div className="table-header-group">
                            <div className="table-row">
                                <div className="table-cell text-center px-4 p-1 bg-pink-100 whitespace-nowrap">
                                    Item ID
                                </div>
                                <div className="table-cell text-center px-4 p-1 bg-pink-100 whitespace-nowrap">
                                    Quantity
                                </div>
                                <div className="table-cell text-center px-4 p-1 bg-pink-100 whitespace-nowrap">
                                    Delete
                                </div>
                            </div>
                        </div>
                        <div className="table-row-group ">
                            {itemList.map((item, index) => (
                                <div
                                    className={`table-row ${index % 2 === 0 ? 'bg-purple-100' : 'bg-sky-100'}`}
                                    key={index}
                                >
                                    <div className="table-cell p-1 text-center whitespace-nowrap"> {item['Item ID']} </div>
                                    <div className="table-cell p-1 text-center whitespace-nowrap"> {item.Quantity} </div>
                                    <div className="table-cell p-1 text-center whitespace-nowrap align-bottom">
                                        <div className="flex justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                stroke="currentColor" className="w-6 h-6 fill-red-300 hover:fill-red-500"
                                                onClick={() => deleteItem(item['Item ID'])}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                }
                <div className="mt-5">
                    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700  text-white p-0.5 rounded mr-5 w-28">
                        Add Order
                    </button>
                    <button onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-28">
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddSalesOrderForm;