// This file is the overlay that pops up when user clicks add products button in ProductList
import { useContext, useState } from "react"
import { ModalContext } from "../../../../utils/ModalContext";

function AddProduct({ itemList, setItemList }) {
    const [itemId, setItemId] = useState('')
    const [quantity, setQuantity] = useState('')
    const {openModal} = useContext(ModalContext)

    async function addProduct() {
        if (itemId !== '' && quantity !== '') {
            // Check if an item with the same Item ID already exists in itemList
            const itemExists = itemList.some(item => item["Item ID"] === itemId);
            if (!itemExists) {
                setItemId('');
                setItemList([...itemList, { "Item ID": itemId, 'Quantity': quantity }]);
            } else {
                openModal(new Error("An item with the same Item ID already exists."))
            }
        }
    }

    return (
        <div className="w-full">
            <div className="bg-white m-auto grid grid-cols-2 gap-x-2">
                <div className="flex flex-col">
                    <label className="font-semibold"> Item ID </label>
                    <input
                        type={"text"}
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        className="border border-gray-300 p-0.5 rounded"
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
                    <button onClick={addProduct} className="bg-sky-400 hover:bg-sky-500
                            rounded px-4 text-white">Add
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AddProduct