import { FormHeader, FormLabel, InputGrid } from '../../../components/Components';
import useAxios from '../../../utils/useAxios';
import useForm from '../../../utils/useForm';
function AddItemsForm() {
    let fields = ['Item Name', 'Item Description', 'Collection']
    const formHandler = useForm(fields)
    const { post } = useAxios();

    const handleSubmit = () => {
        if (formHandler.validateForm()) {
            const map = {
                'Item Name': 'item_name',
                'Item Description': 'item_description',
                'Collection': 'collection'
            }
            let data = {}
            for (let field in formHandler.formState) {
                data[map[field]] = formHandler.formState[field]
            }
            console.log(data)
            post('/api/add_item', data, "Successfully Added Item");
        }
    }

    function handleClear() {
        formHandler.handleClear()
    }

    return (
        <div className="space-y-4">
            <FormHeader>New Item</FormHeader>
            <InputGrid>
                {Object.keys(formHandler.formState).map((field, index) =>
                    <div className="flex flex-col" key={index}>
                        <FormLabel> {field} </FormLabel>
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
            </InputGrid>
            <div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700  text-white py-0.5 rounded w-28 mr-5">
                    Add Item
                </button>
                <button onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white py-0.5 rounded w-28">
                    Clear All
                </button>
            </div>

        </div>
    );
}

export default AddItemsForm;