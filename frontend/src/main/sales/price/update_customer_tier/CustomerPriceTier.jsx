// This file is the handler for customer's update tier.
// It submits a request for the price tier change
import useForm from '../../../../utils/useForm';
import useAxios from '../../../../utils/useAxios';
import Table from './Table';
import Form from './Form';
// todo: this function is not working, temporarily removed
function UpdateCustomerTier() {
    let fields = ['Customer ID', 'Customer Name', 'Phone Number', 'Email Address', 'Price Tier']
    const formLogic = useForm(fields)
    const { data, setData, getData } = useAxios();

    function groupRows(data) {
        const result = data.reduce((acc, cur) => {
            if (acc[cur['Customer ID']]) {
                acc[cur['Customer ID']].push(cur)
            } else {
                acc[cur['Customer ID']] = [cur]
            }
            return acc
        }, {})
        return result
    }

    function handleSubmit() {
        let filteredData = {};
        for (let field of fields) {
            if (formLogic.formState[field] !== '') {
                filteredData[field] = formLogic.formState[field]
            }
        }
        getData("/api/get_customer_price", filteredData);
    }


    const handleClear = () => {
        formLogic.handleClear()
        setData(null)
    };

    return (
        <div className="space-y-8">
            <h1 className="text-xl font-bold mb-4">Change Customer Price Tier</h1>
            <Form handleChange={formLogic.handleInputChange} formState={formLogic.formState} />
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded mr-5">
                Find Customer
            </button>
            <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-1 rounded w-28">
                Clear All
            </button>
            {data && (data.length !== 0 ?
                <Table 
                    data={groupRows(data)} setData={setData} /> 
            :   <p className='text-rose-500 text-center'>No result</p>)
            }
        </div>
    );
}

export default UpdateCustomerTier;
