// This is the form to submit a request of customer's price tier change

import useAxios from "../../../../utils/useAxios";
import { useState, useContext } from "react";
import { ModalContext } from "../../../../utils/ModalContext";

function RequestForm({ data, clearSelected }) {
    const { openModal } = useContext(ModalContext)
    const [newTier, setNewTier] = useState('')
    const [description, setDescription] = useState('')
    const axios = useAxios();
    const fields = ['Product ID', 'Price']

    async function handleUpdate() {
        if (newTier === '' || description === '') {
            openModal(null, 'Provide values for New Tier and Description')
        } else {
            await axios.updateData('/api/request_change_customer_tier', {'New Tier': newTier, 
                'Request Description': description, 'Current Tier': data[0]['Price Tier'], 'Customer ID':
                data[0]['Customer ID']}, 'Request for updating price tier has been submitted')
            clearSelected()
        }
    }

    return (
        <div className="bg-white w-full px-5 rounded-lg space-y-2">
            <svg onClick={clearSelected} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <h1 className="font-semibold text-xl text-sky-400">Customer Info</h1>
            <p>
                <label className="font-semibold"> Customer ID:</label>
                <span
                    className='p-1 rounded'
                > {data[0]['Customer ID']} </span>
            </p>
            <p>
                <label className="font-semibold"> Customer Name:</label>
                <span
                    className='p-1 rounded'
                > {data[0]['Customer Name']} </span>
            </p>
            <p>
                <label className="font-semibold"> Current Tier:</label>
                <span
                    className='p-1 rounded'
                > {data[0]['Price Tier']} </span>
            </p>
            <p>
                <label className="font-semibold"> New Tier:</label>
                <input
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value)}
                    className='border border-gray-300 px-1 rounded text-green-500'
                />
            </p>
            <p className="flex">
                <label className="font-semibold"> Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='border border-gray-300 px-1 rounded text-green-500 resize-none h-20'
                />
            </p>
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-1 mr-2 rounded hover:bg-blue-800">
                Request Price Change
            </button>
            <h1 className="font-semibold text-xl text-sky-400">Current Pricing Info</h1>
            <div className=" grid grid-cols-1 container md:gap-y-2 max-h-96 overflow-auto overscroll-contain">
                {data.map((row, index) =>
                    <div className="flex" key={index}>
                        {fields.map((key, index) =>
                            <div className={'flex flex-col grow'} key={index}>
                                <label className="font-semibold"> {key} </label>
                                <input
                                    name={key}
                                    readOnly={true}
                                    value={row[key]}
                                    className='border border-gray-300 p-1 rounded  cursor-not-allowed'
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>


        </div>
    )
}

export default RequestForm;