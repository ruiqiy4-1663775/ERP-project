import { useForm, Form } from "./Form"
import useAxios from "../../../hooks/useAxios"
import Table from "./Table"
import { useState } from "react"
import UpdateForm from "./ItemDetail"
import { useEffect } from "react"
import Container from "../../../components/Container"

function SearchItemForm() {
    let fields = ['Item ID', 'Item Name', 'Collection']
    let formLogic = useForm(fields)
    let axios = useAxios()
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([])

    useEffect(() => {
        const get = async () => {
            let response = await axios.get('/api/find_item', {});
            setData(response)
        }
        get()
        // eslint-disable-next-line
    }, [])
    async function handleSubmit() {
        let filteredData = {};
        for (let field of fields) {
            if (formLogic.formState[field] !== '') {
                filteredData[field] = formLogic.formState[field]
            }
        }
        let response = await axios.get('/api/find_item', filteredData);
        setData(response)
    }

    async function handleClear() {
        formLogic.handleClear()
        let response = await axios.get('/api/find_item', {});
        setData(response)
    }

    return (
        <Container width={'w-[95%]'}>
        <div className="w-full space-y-4">
            <Form formState={formLogic.formState} handleChange={formLogic.handleInputChange} />
            <div>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white p-0.5 rounded mr-5 w-32">
                    Search
                </button>
                <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-700 text-white p-0.5 rounded w-32">
                    Clear All
                </button>
            </div>
            {data && (data.length !== 0 ?
                <Table data={data} updateTable={handleSubmit} setSelectedRow={setSelectedRow} /> :
                <p className='text-rose-500 text-center'>No result</p>)}
            <div>
                {selectedRow && <UpdateForm
                    updateTable={handleSubmit} content={selectedRow} clearSelected={() =>
                        setSelectedRow(null)} />}
            </div>
        </div>
        </Container>
    )
}

export default SearchItemForm;