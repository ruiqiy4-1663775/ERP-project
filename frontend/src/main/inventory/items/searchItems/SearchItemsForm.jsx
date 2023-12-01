import { useForm, Form } from "./Form"
import useAxios from "../../../../utils/useAxios"
import Table from "./Table"
import { useState } from "react"
import UpdateForm from "./ItemDetail"

function SearchItemForm() {
    let fields = ['Item ID', 'Item Name', 'Collection', 'Item Type']
    let formLogic = useForm(fields)
    let axios = useAxios()
    const [selectedRow, setSelectedRow] = useState(null);

    function handleSubmit() {
        let filteredData = {};
        for (let field of fields) {
            if (formLogic.formState[field] !== '') {
                filteredData[field] = formLogic.formState[field]
            }
        }
        axios.get('/api/find_item', filteredData);
    }

    function handleClear() {
        formLogic.handleClear()
        axios.setData(null)
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Find Item</h1>
            <Form formState={formLogic.formState} handleChange={formLogic.handleInputChange} />
            <div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white p-0.5 rounded mr-5 w-32">
                    Find Item
                </button>
                <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-32">
                    Clear All
                </button>
            </div>
            {axios.data && (axios.data.length !== 0 ?
                <Table data={axios.data} updateTable={handleSubmit} setSelectedRow={setSelectedRow} /> :
                <p className='text-rose-500 text-center'>No result</p>)}
            <div>
                {selectedRow && <UpdateForm
                    updateTable={handleSubmit} content={selectedRow} clearSelected={() =>
                        setSelectedRow(null)} />}
            </div>
        </div>
    )
}

export default SearchItemForm;