import { format } from 'date-fns-tz';
import { useState, useEffect, useContext } from 'react';
import useAxios from '../../../../utils/useAxios';
import { ModalContext } from "../../../../utils/ModalContext";

function OrderBasics({ orderId, trigger, refresh }) {
    const [currentState, setCurrentState] = useState(null)
    const [originState, setOriginState] = useState(null)
    const changedKeys = ['Order Status', 'Employee ID'] // these are the fields that can be changed
    const { get, post } = useAxios()
    const { openModal } = useContext(ModalContext)
    const orderStatusValues = ['Pending', 'Completed', 'Shipped']

    useEffect(() => {
        async function ok() {
            let result = await get('/api/find_order', { 'Order Number': orderId })
            setCurrentState(result[0])
            setOriginState(result[0])
        }
        ok()
    }, [orderId, get, trigger])

    async function handleUpdate() {
        const changedFields = Object.keys(currentState).reduce((acc, key) => {
            if (currentState[key] !== originState[key]) {
                acc[key] = currentState[key]; // if the field has changed, add it to the changedFields object
            }
            return acc;
        }, {});
        if (Object.keys(changedFields).length !== 0) {
            post('/api/update_salesorderv2', {
                orderId: originState['Order Number'], newValues: changedFields
            }, 'Update Success')
        } else {
            openModal(new Error('No change has been detected'))
        }
        refresh()

    }

    // delete the given sales order
    async function handleDelete() {
        await post('/api/delete_order', { orderId: originState['Order Number'] },
            'sucessfully deleted order');
    }

    function handleChange(e) {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setCurrentState({
            ...currentState,
            [e.target.name]: e.target.value,
        });
    }

    // function printCurrentState() {
    //     console.log(currentState)
    // }

    function renderInput(key) {
        if (key === 'Order Status') {
            let statueOptions = orderStatusValues.map((value, index) => 
                <option key={index}>{value}</option>)
            return (
                <select
                    value={currentState[key]}
                    name={key}
                    onChange={handleChange}
                    className={`border border-gray-300 p-1 rounded`}
                >
                    {statueOptions}    
                </select>
            )
        } else {
            return (
                <input
                    type='text'
                    name={key}
                    readOnly={!changedKeys.includes(key)}
                    value={key === 'Order Time' ? format(new Date(currentState[key]), 'yyyy-MM-dd HH:mm:ss') : currentState[key]}
                    onChange={handleChange}
                    className={`border border-gray-300 p-0.5 rounded ${!changedKeys.includes(key) &&
                        'bg-gray-500/20 cursor-not-allowed'}`}
                />
            )
        }

    }

    return (
        <>
            {currentState &&
                <>
                    <div className="border border-gray-400 my-2" />
                    <div className="flex justify-between">
                        <h1 className="font-semibold text-lg text-violet-400">Order basics</h1>
                        <div>
                            <button onClick={handleUpdate} className="bg-blue-400 hover:bg-blue-500 text-white px-1 rounded mt-3 mr-2">
                                Update
                            </button>
                            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white px-1 rounded mt-3">
                                Delete
                            </button>
                            {/* <button onClick={printCurrentState} className="bg-red-500 hover:bg-red-700 text-white px-1 rounded mt-3">
                                print
                            </button> */}
                        </div>
                    </div>
                    <div className=" grid grid-cols-1 md:grid-cols-3 container md:gap-x-10">
                        {Object.keys(currentState).map((key, index) =>
                            <div className="flex flex-col" key={index}>
                                <label className="font-medium"> {key} </label>
                                {renderInput(key)}
                            </div>
                        )}
                    </div>
                </>
            }
        </>
    )
}
export default OrderBasics
