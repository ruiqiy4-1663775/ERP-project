import useAxios from "../../../../utils/useAxios";
import Table from "./TablePrice";
import useForm from "../../../../utils/useForm";

function Form() {
    const form = useForm(['Item ID', 'Collection', 'Price Tier'])
    const { data, setData, get } = useAxios();

    const handleClear = () => {
        form.handleClear()
        setData(null)
    };

    function handleSubmit() {
        let filteredData = {};
        for (let field of Object.keys(form.formState)) {
            if (form.formState[field] !== '') {
                filteredData[field] = form.formState[field]
            }
        }
        get('/api/find_price', filteredData);
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Price Records</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-4">
                {Object.keys(form.formState).map((field, index) =>
                    <div className="flex flex-col" key={index}>
                        <label className="font-medium"> {field} </label>
                        <input
                            type={"text"}
                            name={field}
                            value={form.formState[field]}
                            onChange={form.handleInputChange}
                            className="border border-gray-300 p-0.5 rounded"
                        />
                    </div>
                )}
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white p-0.5 rounded mr-5 w-28">
                Find Price
            </button>
            <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-28">
                Clear All
            </button>
            {data && (data.length !== 0 ?
                <Table
                    updateTable={handleSubmit} data={data} setData={setData} />
                : <p className='text-rose-500 text-center'>No result</p>)
            }
        </div>

    )
}

export default Form;