// This file is the detail form after the user clicks any row of the result table
import useAxios from "../../../../utils/useAxios";
import useForm from "../../../../utils/useFormInitial";

function UpdateForm({ content, clearSelected, updateTable}) {
    let changeableFields = [
        {
            Name: 'Unit Price',
        },
    ]
    const form = useForm(content)
    const axios = useAxios();

    async function handleUpdate() {
        const changedFields = Object.keys(form.formState).reduce((acc, key) => {
            if (form.formState[key] !== content[key]) {
                acc[key] = form.formState[key]; // if the field has changed, add it to the changedFields object
            }
            return acc;
        }, {});
        // Only make the update request if at least one field has changed
        if (Object.keys(changedFields).length > 0) {
            await axios.updateData(`/api/update_price`, 
            {newValues: {
                    itemId : form.formState['Item ID'],
                    price: form.formState['Unit Price'],
                    priceTier: form.formState['Price Tier']}}, 'Update is successful!')
            updateTable()
            clearSelected()
        }
    }

    function contains(key) {
        for (let field of changeableFields) {
            if (field.Name === key) {
                return true
            }
        }
        return false
    }

    async function deletePriceTier() {
        await axios.post('/api/delete_tier', {priceTier: content['Price Tier']}, 'Price Tier' + 
            ' has been deleted')
        clearSelected()
        await updateTable()
    }

    return (
        <div className="bg-white w-full max-h-[70%] p-5 rounded-lg space-y-2">
            <svg onClick={clearSelected} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <h1 className="font-semibold text-xl text-sky-400">Detail Info Card</h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 container md:gap-x-10 md:gap-y-4">
                {Object.keys(form.formState).map((key, index) =>
                    <div className="flex flex-col" key={index}>
                        <label className="font-medium"> {key} </label>
                        <input
                            type={key === 'Unit Price' ? 'number':'text'}
                            name={key}
                            readOnly = {!contains(key)}
                            value={form.formState[key]}
                            onChange={form.handleInputChange}
                            className={'border border-gray-300 p-0.5 rounded ' + (!contains(key) && 'bg-gray-500/30 cursor-not-allowed')}
                        />
                    </div>
                )}
            </div>
            <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white py-0.5 px-3 mr-3
                rounded">
                Update
            </button>
            <button onClick={deletePriceTier} className="bg-red-500 hover:bg-red-700 text-white py-0.5 px-3
                whitespace-nowrap rounded"> Delete the Price Tier</button>
        </div>
    )
}

export default UpdateForm;