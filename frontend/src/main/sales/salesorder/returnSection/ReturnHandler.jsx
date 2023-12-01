// This is the page after user clicks initiate return in findOrder
// This file is called inside DetailForm
import { useState, useEffect, useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import AddItem from './AddItem'
import { format } from 'date-fns-tz';
import { ModalContext } from "../../../../utils/ModalContext";
// todo: add a subtotal
// todo: later can add a link to click and route to designated return route
function ReturnHandler({ orderId, trigger, refresh }) {
    const { get, post } = useAxios()
    const [returnList, setReturnList] = useState(null)
    const [originReturnList, setOriginReturnList] = useState()
    const [open, setOpen] = useState(false)
    const headers = ['Item ID', 'Quantity', 'Return Status', 'Reason', 'Initiate Time', 'Received Time',
        'Refund Time']
    const { openModal } = useContext(ModalContext)

    useEffect(() => {
        async function ok() {
            let result = await get('/api/get_return', { orderId })
            setOriginReturnList(result)
            setReturnList(result)
        }
        ok()
    }, [orderId, get, trigger, setReturnList])

    const compareArrays = (arr1, arr2) => {
        const arr1Unique = arr1.filter(obj1 => !arr2.some(obj2 => obj1['Item ID'] === obj2['Item ID']));
        const arr2Unique = arr2.filter(obj1 => !arr1.some(obj2 => obj1['Item ID'] === obj2['Item ID']
            && obj1['Quantity'] === obj2['Quantity'] && obj1['Return Status'] === obj2['Return Status']
            && obj1['Reason'] === obj2['Reason']));
        return [arr1Unique, arr2Unique];
    };

    async function handleUpdate() {
        let [deleteReturnList, addReturnList] = compareArrays(originReturnList, returnList)
        console.log(deleteReturnList)
        console.log(addReturnList)
        if (deleteReturnList.length !== 0 || addReturnList.length !== 0) {
            await post('/api/update_return_items', {
                orderId,
                deleteReturnList,
                addReturnList,
            }, 'Update Success')
        } else {
            openModal(new Error('No change is detected'))
        }
        refresh()
    }

    // This function removes the row from the returnProductList
    function remove(row) {
        let newList = []
        for (let roww of returnList) {
            if (roww['Item ID'] !== row['Item ID']) {
                newList.push(roww)
            }
        }
        setReturnList(newList)
    }

    function renderCell(row, label) {
        if ((label === 'Initiate Time' || label === 'Received Time' || label === 'Refund Time') && row[label]) {
            return format(new Date(row[label]), 'yyyy-MM-dd HH:mm:ss')
        } else if (label === 'Return Status') {
            let statusValues = ['Pending', 'Received', 'Refunded']
            let statueOptions = statusValues.map((value, index) =>
                <option key={index}>{value}</option>)
            return (
                <select
                    value={row[label]}
                    className={`rounded`}
                    onChange={(e) => handleOnchange(e, row)}
                >
                    {statueOptions}
                </select>
            )
        }
        else {
            return row[label]
        }
    }

    function handleOnchange(e, row) {
        let itemId = row['Item ID']
        let value = e.target.value;
        const updatedArray = returnList.map((item) => {
            if (item['Item ID'] === itemId) {
                return { ...item, 'Return Status': value };
            }
            return item;
        });
        setReturnList(updatedArray)
    }

    return (
        <>
            {returnList &&
                <div>
                    <div className="flex justify-between">
                        <h1 className="font-semibold text-lg text-violet-400">Return</h1>
                        <div>
                            <button onClick={handleUpdate} className="bg-blue-400 hover:bg-blue-500 
                            text-white px-1 mr-2
                        rounded-lg">
                                Update
                            </button>
                            <button
                                onClick={() => { setOpen(!open) }}
                                className="rounded-lg bg-sky-400 hover:bg-sky-500 px-1 text-white">
                                Add Items
                            </button>
                        </div>
                    </div>
                    {open && <AddItem itemList={returnList} setItemList={setReturnList} />}
                    <div className="overflow-x-auto w-full">
                        <div className="table min-w-full">
                            <div className="table-header-group bg-indigo-200">
                                <div className="table-row">
                                    {headers.map((label, index) =>
                                        <div key={index} className="table-cell text-center  p-1 whitespace-nowrap">
                                            {label}
                                        </div>)}
                                    <div className="table-cell text-center  p-1 whitespace-nowrap">
                                        Delete
                                    </div>
                                </div>
                            </div>
                            <div className="table-row-group">
                                {[...returnList].map((row, rowIndex) => (
                                    <div
                                        className={`table-row ${rowIndex % 2 === 0 ? 'bg-purple-100' : 'bg-sky-100'}`}
                                        key={rowIndex}
                                    >
                                        {headers.map((label, index) =>
                                            <div key={index} className="table-cell p-0.5 text-center whitespace-nowrap">
                                                {renderCell(row, label)}
                                            </div>
                                        )}
                                        <div className="table-cell align-bottom p-0.5 text-center whitespace-nowrap">
                                            <div className="flex justify-center">
                                                <svg
                                                    onClick={() => remove(row)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-red-300 hover:fill-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }</>
    )
}

export default ReturnHandler