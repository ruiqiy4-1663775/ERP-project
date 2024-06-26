// This file is the handler of the findOrder
import { useState, useEffect} from 'react';
import useAxios from '../../../../hooks/useAxios';
import ResultTable from './Table';

function FindSupplier() {
    let fields = ['Supplier ID', 'Supplier Name']
    const [formState, setFormState] = useState(initialState());
    const [data, setData] = useState([])
    const axios = useAxios()

    useEffect(() => {
        const get = async () => {
            let response = await axios.get('/api/find_supplier', {});
            setData(response)
        }
        get()
        // eslint-disable-next-line
    }, [])

    function initialState() {
        let initial = {}
        for (let field of fields) {
            initial[field] = ''
        }
        return initial
    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleClear = async () => {
        setFormState(initialState());
        let response = await axios.get('/api/find_supplier', {});
        setData(response)
    };

    async function handleSubmit() {
        let filteredData = {};
        for (let field of fields) {
            // only want non empty fields
            if (formState[field] !== '') {
                filteredData[field] = formState[field]
            }
        }
        let response = await axios.get('/api/find_supplier', filteredData);
        setData(response)
    }
    return (
        <div className="space-y-4 w-full">
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
                </div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white p-0.5 rounded mr-5 w-32">
                    Search
                </button>
                <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-32">
                    Clear All
                </button>
                {data && (data.length !== 0 ?
                    <ResultTable updateTable={handleSubmit} data={data} />
                    : <p className='text-rose-500 text-center'>No result</p>
                )}
            </div>
        </div>
    );
}

export default FindSupplier;