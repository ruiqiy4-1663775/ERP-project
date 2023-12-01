import useForm from "../../../../utils/useForm"
import useAxios from "../../../../utils/useAxios"
import { useContext } from "react"
import { OrderDetailContext } from "../detailForm/DetailForm"
// todo: add shipping cost
function AddShippingForm() {
    let formHandler = useForm(['Carrier', 'Tracking Number', 
        'Estimated Delivery Date', 'Estimated Delivery Time'])
    const axios = useAxios()
    const {orderId, refresh} = useContext(OrderDetailContext)
    function handleClear() {
        formHandler.handleClear()
    }

    async function handleSubmit() {
        if (formHandler.validateForm()) {
            let data = format()
            await axios.post('/api/create_shipping', data, 'Successfully created shipment!')
        }
        refresh()
    }
    // This function format the data to send to backend
    function format() {
        let estimatedDelivery = '' + formHandler.formState['Estimated Delivery Date'] + ' ' +
            formHandler.formState['Estimated Delivery Time'] + ':00'
        const mysqlDatetime = new Date(estimatedDelivery).toISOString().slice(0, 19).replace('T', ' ');
        let result = {'Estimated Delivery': mysqlDatetime}
        for (let field in formHandler.formState) {
            if (field !== 'Estimated Delivery Time' && field !== 'Estimated Delivery Date') {
                result[field] = formHandler.formState[field]
            }
        }
        result['Order Number'] = orderId
        return result
    }

    function type(field) {
        if (field === 'Estimated Delivery Time') {
            return 'time'
        } else if (field === 'Estimated Delivery Date') {
            return 'date'
        } else {
            return 'text'
        }
    }
    return (
        <div className="pt-3">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-5 md:gap-y-1">
                {Object.keys(formHandler.formState).map((field, index) =>
                    <div className="flex flex-col" key={index}>
                        <label className="font-semibold"> {field} </label>
                        <input
                            type={type(field)}
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
            <div className="mt-3">
            <button onClick={handleSubmit} className="bg-blue-400 hover:bg-blue-500 text-white px-1 py-0.5 rounded mr-5">
                Create Shipment
            </button>
            <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white px-1 py-0.5 rounded">
                Clear All
            </button>
            </div>
        </div>
    )
}

export default AddShippingForm

