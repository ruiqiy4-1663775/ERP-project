// This file is the overlay that pops up when user clicks add products
import { useState, useEffect, useContext } from "react"
import useAxios from "../../../../utils/useAxios";
import Select from 'react-select';
import { ModalContext } from "../../../../utils/ModalContext";
import { customStyles } from "../../../../utils/constants";
// productList: current list of products in the order
// setProductList: the function to set the state
function AddProduct({ productList, setProductList }) {
    const {openModal} = useContext(ModalContext)
    const [itemId, setItemId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [itemList, setItemList] = useState()
    const { get } = useAxios()

    useEffect(() => {
        async function fetchData() {
            let list = await get('/api/get_item_list')
            if (Array.isArray(list)) {
                const transformedOptions = list.map(item => ({
                    value: item.item_id,
                    label: item.item_id
                }));
                setItemList(transformedOptions)
            }
        }
        fetchData()
    }, [get])

    function addProduct() {
        if (itemId !== '' && quantity !== '') {
            const existingItem = productList.find(item => item['Item ID'] === itemId);
            if (!existingItem) {
                setProductList([...productList, { 'Item ID': itemId, 'Quantity': quantity }])
                setItemId('')
                // setQuantity('')
            } else {
                openModal(new Error('Item with the same ID already exists'))
            }
        }
    }

    function findValueOption() {
        let result = itemList?.find(option => option.value === itemId)
        if (result) {
            return result
        }
        return { value: '', label: '' }
    }

    return (
        <div className="m-auto grid grid-cols-2 gap-x-2">
            <div className="flex flex-col">
                <label className="font-semibold"> Item ID </label>
                <Select
                    options={itemList}
                    value={
                        findValueOption()
                    }
                    onChange={(selectedOption) => { setItemId(selectedOption ? selectedOption['value'] : '') }}
                    isSearchable={true}
                    placeholder="Select an item"
                    styles={customStyles}
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold"> Quantity </label>
                <input
                    type={"number"}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border border-gray-300 p-0.5 rounded"
                />
            </div>
            <div className="py-3">
                <button onClick={addProduct} className="bg-blue-500 hover:bg-blue-400
                            rounded px-4 text-white">Add item
                </button>
            </div>
        </div>
    )
}
export default AddProduct