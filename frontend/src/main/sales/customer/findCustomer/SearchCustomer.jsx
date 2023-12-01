
import useAxios from '../../../../utils/useAxios';
import ResultTable from './Table_customer';
import useForm from '../../../../utils/useForm'

function SearchCustomer() {
    let fields = ['Customer ID', 'Customer Name', 'Phone Number', 'Email Address', 'Price Tier']
    const { data, setData, get } = useAxios();
    const formLogic = useForm(fields)

    const handleClear = () => {
        formLogic.handleClear()
        setData(null)
    };

    function handleSubmit() {
        let filteredData = {};
        for (let field of fields) {
            // only want non empty fields
            if (formLogic.formState[field] !== '') {
                filteredData[field] = formLogic.formState[field]
            }
        }
        get('/api/find_customer', filteredData);
    }
    return (
        <div className="space-y-4 w-full">
            <h1 className="text-xl font-semibold">Search Customer</h1>
            <div className="space-y-5">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-5 md:gap-y-1">
                    {fields.map((field, index) =>
                        <div className="flex flex-col" key={index}>
                            <label className="font-medium"> {field} </label>
                            <input
                                type={"text"}
                                name={field}
                                value={formLogic.formState[field]}
                                onChange={formLogic.handleInputChange}
                                className="border border-gray-300 p-0.5 rounded" />
                        </div>
                    )}
                </div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-0.5 rounded mr-5 w-32">
                    Find Customer
                </button>
                <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white py-0.5 rounded px-3">
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

export default SearchCustomer;
