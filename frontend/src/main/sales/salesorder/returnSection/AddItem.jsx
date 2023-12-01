// This file is the overlay that pops up when user clicks add products button in ProductList
import { useContext } from 'react';
import useForm from '../../../../utils/useForm'
import { ModalContext } from '../../../../utils/ModalContext';

function AddReturnItem({ itemList, setItemList }) {
    const fields = ['Item ID', 'Quantity', 'Reason']
    const formHandler = useForm(fields)
    const {openModal} = useContext(ModalContext)
    async function addProduct() {
        if (formHandler.validateForm()) {
            // Check if an item with the same Item ID already exists in itemList
            const itemExists = itemList.some(item => item["Item ID"] === formHandler.formState['Item ID']);
            if (!itemExists) {
                setItemList([...itemList, { "Item ID": formHandler.formState['Item ID'], 'Quantity': 
                    formHandler.formState['Quantity'], 'Return Status': 'Pending',
                    'Reason': formHandler.formState['Reason'] }]);
            } else {
                openModal(new Error('An item with the same Item ID already exists.'))
            }
        }
    }

    function handleOnChange(e) {
        formHandler.handleInputChange(e)
        // console.log(e)
    }

    // function print() {
    //     console.log(formHandler)
    // }

    return (
        <div className="w-full">
            <div className="bg-white m-auto grid grid-cols-2 gap-x-2">
                {Object.keys(formHandler.formState).map((field, index) =>
                    <div key={index} className="flex flex-col">
                        <label className="font-semibold"> {field} </label>
                        <input
                            type={field === 'Quantity' ? 'number' : "text"}
                            name={field}
                            value={formHandler.formState[field]}
                            onChange={handleOnChange}
                            className="border border-gray-300 p-0.5 rounded"
                        />
                    </div>
                )}
            </div>
            <div className="py-3">
                    <button onClick={addProduct} className="bg-sky-400 hover:bg-sky-500
                            rounded px-4 text-white">Add
                    </button>
                </div>
        </div>
    )
}
export default AddReturnItem