import { useContext, useEffect, useState } from 'react'
import format from 'date-fns-tz/format'
import parseISO from 'date-fns/parseISO';
import useAxios from '../../../../utils/useAxios'
import { OrderDetailContext } from '../detailForm/DetailForm';
// todo: add shipping cost
function ShipmentDetail({ shippingId }) {
    const [shipmentInfo, setShipmentInfo] = useState(null)
    const [shipmentInfoOrigin, setShipmentInfoOrigin] = useState(null)
    const { get, post } = useAxios()
    const [errors, setErrors] = useState(null)
    const { refresh } = useContext(OrderDetailContext)

    // get the shipmentDetail
    useEffect(() => {
        async function ok() {
            let data = await get('/api/get_shipment', { 'Shipping ID': shippingId })
            setShipmentInfoOrigin(initial(data[0]))
            setShipmentInfo(initial(data[0]))
        }
        ok()
    }, [get, shippingId])

    // this function returns the initial state based on the init
    // It separates data and time
    function initial(init) {
        let result = {}
        for (let field in init) {
            if (field === 'Estimated Delivery') {
                const initialDateTime = init['Estimated Delivery'];
                // console.log(initialDateTime)
                const parsedInitialDateTime = parseISO(initialDateTime);
                const initialDate = format(parsedInitialDateTime, 'yyyy-MM-dd');
                const initialTime = format(parsedInitialDateTime, 'HH:mm');
                result['Estimated Delivery Date'] = initialDate
                result['Estimated Delivery Time'] = initialTime
            } else if (field === 'Actual Delivery') {
                if (!init[field]) {
                    result['Actual Delivery Date'] = ''
                    result['Actual Delivery Time'] = ''
                } else {
                    const initialDateTime = init[field];
                    // console.log(initialDateTime)
                    const parsedInitialDateTime = parseISO(initialDateTime);
                    const initialDate = format(parsedInitialDateTime, 'yyyy-MM-dd');
                    const initialTime = format(parsedInitialDateTime, 'HH:mm');
                    result['Actual Delivery Date'] = initialDate
                    result['Actual Delivery Time'] = initialTime
                }
            } else {
                result[field] = init[field]
            }
        }
        return result
    }
    // This function ensures that Time and Date are set at the same time.
    function validate() {
        if (shipmentInfo['Actual Delivery Time'] === '' && shipmentInfo['Actual Delivery Date']
            !== '') {
            let newError = {
                'Actual Delivery Time': 'If you set Actual Delivery Date, ' +
                    'you must also set Actual Delivery Time'
            }
            setErrors(newError)
            return false
        } else if (shipmentInfo['Actual Delivery Date'] === '' && shipmentInfo['Actual Delivery Time']
            !== '') {
            let newError = {
                'Actual Delivery Date': 'If you set Actual Delivery Time, ' +
                    'you must also set Actual Delivery Date'
            }
            setErrors(newError)
            return false
        }
        setErrors(null)
        return true
    }

    function handleChange(e) {
        setShipmentInfo({
            ...shipmentInfo,
            [e.target.name]: e.target.value,
        });
    }
    // This function returns the input type of the given field
    function inputType(field) {
        if (field === 'Estimated Delivery Time' || field === 'Actual Delivery Time') {
            return "time"
        } else if (field === 'Estimated Delivery Date' || field === 'Actual Delivery Date') {
            return 'date'
        } else {
            return 'text'
        }
    }
    // This functiion returns the input value of the given field
    function inputValue(field) {
        if (!shipmentInfo[field]) {
            return ''
        } else {
            return shipmentInfo[field]
        }
    }

    function input(field) {
        if (field === 'Shipping Status') {
            return (<select
                value={shipmentInfo[field]}
                name={field}
                onChange={handleChange}
                className={`border border-gray-300 p-0.5 rounded`}
            >
                <option>Pending</option>
                <option>In Transit</option>
                <option>Delivered</option>
            </select>)
        } else {
            return (
                <input
                    type={inputType(field)}
                    name={field}
                    value={inputValue(field)}
                    onChange={handleChange}
                    className={`w-full border border-gray-300 p-0.5 rounded`}
                />
            )
        }

    }

    // This function prepares and the newValues sent to the backend
    function formatNewValues() {
        let newValues = {}
        if (shipmentInfo['Estimated Delivery Time'] !== shipmentInfoOrigin['Estimated Delivery Time'] ||
            shipmentInfo['Estimated Delivery Date'] !== shipmentInfoOrigin['Estimated Delivery Date']) {
            const combined = '' + shipmentInfo['Estimated Delivery Date'] + 'T' +
                shipmentInfo['Estimated Delivery Time'] + ':00';
            const dateTimeISO = new Date(combined).toISOString();
            newValues['Estimated Delivery'] = dateTimeISO
        }
        if (shipmentInfo['Actual Delivery Time'] !== shipmentInfoOrigin['Actual Delivery Time'] ||
            shipmentInfo['Actual Delivery Date'] !== shipmentInfoOrigin['Actual Delivery Date']) {
            if (shipmentInfo['Actual Delivery Time'] === ''
                && shipmentInfo['Actual Delivery Date'] === '') {
                newValues['Actual Delivery'] = null
            } else {
                const combined = '' + shipmentInfo['Actual Delivery Date'] + 'T' +
                    shipmentInfo['Actual Delivery Time'] + ':00';
                const dateTimeISO = new Date(combined).toISOString();
                newValues['Actual Delivery'] = dateTimeISO
            }
        }
        const changedFields = Object.keys(shipmentInfo).reduce((acc, key) => {
            if (shipmentInfo[key] !== shipmentInfoOrigin[key] && key !== 'Actual Delivery Time' &&
                key !== 'Actual Delivery Date' && key !== 'Estimated Delivery Date' &&
                key !== 'Estimated Delivery Time') {
                acc[key] = shipmentInfo[key];
            }
            return acc;
        }, newValues);
        return changedFields
    }

    async function handleSubmit() {
        if (validate()) {
            let newValeus = formatNewValues()
            // console.log(newValeus)
            if (Object.keys(newValeus).length !== 0) {
                await post('/api/update_shipment', { shippingId, newValues: newValeus }, 'Updated successfully')

            }
            refresh()
        }
    }

    // This function resets the form to original
    function handleClear() {
        setShipmentInfo(shipmentInfoOrigin)
        setErrors(null)
    }

    return (
        <div>
            {shipmentInfo &&
                <>
                    <h1 className="font-semibold text-lg text-violet-400">Shipment: {shippingId}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 container md:gap-x-10">
                        {Object.keys(shipmentInfo).map((key, index) =>
                            <div className="flex flex-col w-full" key={index}>
                                <label className="font-medium"> {key} </label>
                                {input(key)}
                                {errors && errors[key] &&
                                    <p className='text-red-500'>{errors[key]}</p>}
                            </div>
                        )}
                    </div>
                    <div className='mt-2'>
                        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white px-1 py-0.5 rounded mr-5">
                            Update Shipment
                        </button>
                        <button onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-32">
                            Clear All
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default ShipmentDetail