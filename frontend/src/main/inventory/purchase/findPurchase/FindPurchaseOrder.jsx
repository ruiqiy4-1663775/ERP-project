// This file is the handler of the findOrder
import { useState } from 'react';
import useAxios from '../../../../utils/useAxios';
import ResultTable from './Table'

function FindPurchaseOrder() {
    let fields = ['Purchase ID', 'Supplier ID', 'Status', 'Product ID']
    const [formState, setFormState] = useState(initialState());
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const axios = useAxios();

    function initialState() {
        let initial = {}
        for (let field of fields) {
            initial[field] = ''
        }
        return initial
    }

    function handleChange(e) {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    function handleClear() {
        setFormState(initialState());
        setStartDate('')
        setEndDate('')
        axios.setData(null)
    };

    function handleSubmit() {
        let filteredData = {};
        for (let field of fields) {
            // only want non empty fields
            if (formState[field] !== '') {
                filteredData[field] = formState[field]
            }
        }
        if (startDate !== '') {
            filteredData.startDate = startDate
        }
        if (endDate !== '') {
            filteredData.endDate = endDate
        }
        axios.get('/api/find_purchase_order', filteredData);
    }
    return (
        <div className="space-y-4 w-full">
            <h1 className="text-xl font-semibold">Find Order</h1>
            <div className="space-y-5">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-5 md:gap-y-1">
                    {fields.map((field, index) =>
                        <div className="flex flex-col" key={index}>
                            <label className="font-medium"> {field} </label>
                            <input
                                type={"text"}
                                name={field}
                                value={formState[field]}
                                onChange={handleChange}
                                className="border border-gray-300 p-0.5 rounded" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <label className="font-semibold">
                            Start Date:
                        </label>
                        <input className="border border-gray-300 p-0.5 rounded" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">
                            End Date:
                        </label>
                        <input className="border border-gray-300 p-0.5 rounded" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white p-0.5 rounded mr-5 w-32">
                    Find Order
                </button>
                <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-32">
                    Clear All
                </button>
                {axios.data && (axios.data.length !== 0 ?
                    <ResultTable updateTable={handleSubmit} data={axios.data} />
                    : <p className='text-rose-500 text-center'>No result</p>
                )}
            </div>
        </div>
    );
}

export default FindPurchaseOrder;