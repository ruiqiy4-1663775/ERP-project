// This file is the handler of the findOrder
import { useState } from 'react';
function FindOrderForm({ get }) {
    let fields = ['Order Number', 'Customer ID', 'Customer Name', 'Phone Number', 'Email Address',
        'Employee ID']
    const [formState, setFormState] = useState(initialState());
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const orderStatusValues = ['All', 'Pending', 'Completed', 'Shipped']

    function initialState() {
        let initial = {}
        for (let field of fields) {
            initial[field] = ''
        }
        initial['Order Status'] = 'All'
        return initial
    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleClear = () => {
        setFormState(initialState());
        setStartDate('')
        setEndDate('')
        // setData(null)
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
        if (formState['Order Status'] !== 'All') {
            filteredData['Order Status'] = formState['Order Status']
        }
        console.log(filteredData)
        get('/api/find_order', filteredData);
    }
    return (
        
            <div className="space-y-4 w-full">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Find Order</h1>
                {/* <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-300 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg> */}
            </div>
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
                            <label className="font-medium"> Order Status </label>
                            <select
                                name={'Order Status'}
                                value={formState['Order Status']}
                                onChange={handleChange}
                                className="border border-gray-300 p-1 rounded"
                            >
                                {orderStatusValues.map((value, index) =>
                                    <option key={index}>{value}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium">
                                Start Date:
                            </label>
                            <div className='flex space-x-4'>
                                <input className="border border-gray-300 p-0.5 rounded w-full" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                <button onClick={() => setStartDate('')} className='px-2 md:hidden bg-lime-200 rounded-lg hover:bg-lime-400'>reset</button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium">
                                End Date:
                            </label>
                            <div className="flex space-x-4">
                                <input className="border border-gray-300 p-0.5 rounded w-full" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                <button onClick={() => setEndDate('')} className='px-2 md:hidden bg-lime-200 rounded-lg hover:bg-lime-400'>reset</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white p-0.5 rounded mr-5 w-28">
                            Filter Order
                        </button>
                        <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-28">
                            Clear All
                        </button>
                    </div>
                </div>
            </div>

    );
}

export default FindOrderForm;