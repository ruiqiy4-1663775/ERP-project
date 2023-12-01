import { format } from 'date-fns-tz';
import { useState, useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import { ModalContext } from '../../../../utils/ModalContext';



function UpdateForm({ content, clearSelected, updateTable }) {
    const [currentState, setCurrentState] = useState(content);
    const axios = useAxios();
    const { openModal } = useContext(ModalContext)
    function handleChange(e) {
        setCurrentState({
            ...currentState,
            [e.target.name]: e.target.value,
        });
    }

    async function handleDelete() {
        await axios.updateData('/api/delete_purchase_order', { purchaseId: content['Purchase ID'] },
            'sucessfully deleted Purchase Order');
        updateTable()
        clearSelected()
    }

    async function handleReceive() {
        if (content['Purchase Status'] === 'received') {
            openModal(new Error('The order has been received'))
        } else {
            await axios.post('/api/receive_purchase', { purchaseId: content['Purchase ID'] }, `Successfully
            added stock`)
            updateTable()
            clearSelected()
        }
    }

    return (
        <div className="bg-white w-full max-h-[70%] px-5 rounded-lg space-y-2">
            <svg onClick={clearSelected} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <h1 className="font-semibold text-xl text-sky-400">Detail Info Card</h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 container md:gap-x-10 md:gap-y-2">
                {Object.keys(currentState).map((key, index) =>
                    <div className="flex flex-col" key={index}>
                        <label className="font-semibold"> {key} </label>
                        <input
                            type='text'
                            name={key}
                            readOnly={true}
                            value={key === 'Created Time' || key === 'Last Update Time' ?
                                format(new Date(currentState[key]), 'yyyy-MM-dd HH:mm:ss') :
                                currentState[key]}
                            onChange={handleChange}
                            className={'border border-gray-300 p-1 rounded bg-gray-500/30 cursor-not-allowed'}
                        />
                    </div>
                )}
            </div>
            <button onClick={handleReceive} className="bg-green-500 hover:bg-green-700 text-white p-1 mr-2 rounded">
                Receive Order
            </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white p-1 rounded">
                Delete
            </button>
        </div>
    )
}

export default UpdateForm;