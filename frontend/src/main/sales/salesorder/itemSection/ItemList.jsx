// This file is the list of products in the detail order form which shows the given order details
import { useState, useEffect, useContext } from "react";
import AddProduct from "./AddItem";
import useAxios from '../../../../utils/useAxios';
import { ModalContext } from "../../../../utils/ModalContext";
// todo: add a subtotal section
function ItemList({ orderId, trigger, refresh }) {
    const [open, setOpen] = useState(false) // control the opening of addProduct overlay
    // this function deletes a product from the given order
    const [originItemList, setOriginItemList] = useState()
    const [itemList, setItemList] = useState(null)
    const { get, post } = useAxios()
    const { openModal } = useContext(ModalContext)

    useEffect(() => {
        async function ok() {
            let result = await get('/api/get_order_items', { orderId })
            // console.log(result)
            setItemList(result)
            setOriginItemList(result)
        }
        ok()
    }, [orderId, get, setItemList, trigger])

    async function handleDelete(row) {
        let newList = []
        for (let cur of itemList) {
            if (cur['Item ID'] !== row['Item ID']) {
                newList.push(cur)
            }
        }
        setItemList(newList)
    }

    async function handleUpdate() {
        let [deleteItemList, addItemList] = compareArrays(originItemList, itemList)
        if (deleteItemList.length !== 0 || addItemList.length !== 0) {
            await post('/api/update_order_items', {
                orderId,
                deleteItemList,
                addItemList,
            }, 'Update Success')
        } else {
            openModal(new Error('No change is detected'))
        }
        refresh()
    }

    const compareArrays = (arr1, arr2) => {
        const arr1Unique = arr1.filter(obj1 => !arr2.some(obj2 => obj1['Item ID'] === obj2['Item ID']
            && obj1['Quantity'] === obj2['Quantity']));
        const arr2Unique = arr2.filter(obj1 => !arr1.some(obj2 => obj1['Item ID'] === obj2['Item ID']
            && obj1['Quantity'] === obj2['Quantity']));
        return [arr1Unique, arr2Unique];
    };

    return (
        <>
            {itemList &&
                <div className="w-full">
                    <div className="flex justify-between">
                        <h1 className="font-semibold text-lg text-violet-400">Item list</h1>
                        <div>
                            <button onClick={handleUpdate} className="bg-blue-400 hover:bg-blue-500 text-white px-1 rounded mr-2">
                                Update
                            </button>
                            <button
                                onClick={() => { setOpen(!open) }}
                                className="rounded-lg bg-sky-400 hover:bg-sky-500 px-1 text-white">
                                Add Items
                            </button>
                        </div>
                    </div>
                    {open && <AddProduct itemList={itemList} setItemList={setItemList} />}
                    <div className="table min-w-full inline-block m-auto">
                        <div className="table-header-group bg-indigo-200">
                            <div className="table-row">
                                <div className="table-cell text-center  p-1 whitespace-nowrap">
                                    Item ID
                                </div>
                                <div className="table-cell text-center p-1 whitespace-nowrap">
                                    Unit Price
                                </div>
                                <div className="table-cell text-center  p-1 whitespace-nowrap">
                                    Quantity
                                </div>
                                <div className="table-cell text-center  p-1 whitespace-nowrap">
                                    Delete
                                </div>
                            </div>
                        </div>
                        <div className="table-row-group">
                            {itemList.map((row, rowIndex) => (
                                <div
                                    className={`border border-yellow-800 table-row items-end ${rowIndex % 2 === 0 ? 'bg-purple-100' : 'bg-sky-100'}`}
                                    key={rowIndex}
                                >
                                    <div className="table-cell p-0.5 text-center whitespace-nowrap">
                                        {row['Item ID']}
                                    </div>
                                    <div className="table-cell p-0.5 text-center whitespace-nowrap">
                                        {row['Unit Price']}
                                    </div>
                                    <div className="table-cell p-0.5 text-center whitespace-nowrap">
                                        {row['Quantity']}
                                    </div>
                                    <div className="table-cell p-0.5 align-bottom">
                                        <div className="flex justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                stroke="currentColor" className="w-6 h-6 fill-red-300 hover:fill-red-500"
                                                onClick={() => handleDelete(row)}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 
                                0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 
                                0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 
                                1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ItemList