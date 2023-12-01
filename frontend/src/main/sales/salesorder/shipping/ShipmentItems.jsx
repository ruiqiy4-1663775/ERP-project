import { useContext, useEffect, useState } from 'react'
import useAxios from '../../../../utils/useAxios'
import AddItem from '../itemSection/AddItem'
import { OrderDetailContext } from '../detailForm/DetailForm'
import { ModalContext } from '../../../../utils/ModalContext'
function ShipmentItems({ shippingId }) {
    const [shippingItemList, setShippingItemlist] = useState(null)
    const [originShippingItemList, setOriginShippingItemList] = useState(null)
    const [open, setOpen] = useState(false)
    const { get, post } = useAxios()
    const { refresh } = useContext(OrderDetailContext)
    const { openModal } = useContext(ModalContext)
    useEffect(() => {
        async function ok() {
            let data = await get('/api/get_shipping_items', { shippingId })
            setShippingItemlist(data)
            setOriginShippingItemList(data)
        }
        ok()
    }, [get, shippingId])

    async function handleUpdate() {
        let [deleteShippingItemList, addShippingItemList] = compareArrays(originShippingItemList,
            shippingItemList)
        if (deleteShippingItemList.length !== 0 || addShippingItemList.length !== 0) {
            await post('/api/update_shipping_items', {
                shippingId,
                deleteShippingItemList,
                addShippingItemList,
            }, 'Update Success')
            refresh()
        } else {
            openModal(new Error('No change is detected'))
        }
    }

    function handleDelete(row) {
        let newList = []
        for (let cur of shippingItemList) {
            if (cur['Item ID'] !== row['Item ID']) {
                newList.push(cur)
            }
        }
        setShippingItemlist(newList)
    }

    const compareArrays = (arr1, arr2) => {
        const arr1Unique = arr1.filter(obj1 => !arr2.some(obj2 => obj1['Item ID'] === obj2['Item ID']
            && obj1['Quantity'] === obj2['Quantity']));
        const arr2Unique = arr2.filter(obj1 => !arr1.some(obj2 => obj1['Item ID'] === obj2['Item ID']
            && obj1['Quantity'] === obj2['Quantity']));
        return [arr1Unique, arr2Unique];
    };

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h1 className="font-semibold text-lg text-violet-400">Shipping Item list</h1>
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
            {open && <AddItem itemList={shippingItemList} setItemList={setShippingItemlist} />}
            <div className="table min-w-full inline-block m-auto">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="table-cell text-center  p-1 bg-rose-50 whitespace-nowrap">
                            Item ID
                        </div>
                        <div className="table-cell text-center  p-1 bg-rose-50 whitespace-nowrap">
                            Quantity
                        </div>
                        <div className="table-cell text-center  p-1 bg-rose-50 whitespace-nowrap">
                            Tool Box
                        </div>
                    </div>
                </div>
                <div className="table-row-group">
                    {shippingItemList?.map((row, rowIndex) => (
                        <div
                            className={`border border-yellow-800 table-row items-end ${rowIndex % 2 === 0 ? 'bg-purple-100' : 'bg-sky-100'}`}
                            key={rowIndex}
                        >
                            <div className="table-cell p-0.5 text-center whitespace-nowrap">
                                {row['Item ID']}
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
    )
}
export default ShipmentItems