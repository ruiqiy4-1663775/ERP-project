import { format } from 'date-fns-tz';
import { useState, useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import { ModalContext } from '../../../../utils/ModalContext';
import { FormLabel } from '../../../../components/Components';
import Container from '../../../../components/Container';

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
        await axios.updateData('/api/delete_item', { itemId: content['Item ID'] },
            'sucessfully deleted Item');
        updateTable()
        clearSelected()
    }

    async function handleUpdate() {
        const changedFields = Object.keys(currentState).reduce((acc, key) => {
            if (currentState[key] !== content[key]) {
                acc[key] = currentState[key]; // if the field has changed, add it to the changedFields object
            }
            return acc;
        }, {});
        // Only make the update request if at least one field has changed
        if (Object.keys(changedFields).length > 0) {
            // console.log(changedFields)
            await axios.updateData(`/api/update_item`, {
                itemId: content['Item ID'],
                newValues: changedFields
            }, 'Update is successful!')
            updateTable()
            clearSelected()
        } else {
            openModal(new Error('No change has been detected'))
        }
    }

    return (
        <div className="fixed pt-10 inset-0 z-20 bg-black/40 flex flex-col">
            <Container width={'w-[85%]'}>
                <div className="bg-white w-full max-h-[70%] px-5 rounded-lg space-y-2">
                    <svg onClick={clearSelected} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-6 h-6 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <h1 className="font-semibold text-xl text-sky-400">Item Detail</h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 container md:gap-x-10 md:gap-y-2">
                        {Object.keys(currentState).map((key, index) =>
                            <div className="flex flex-col" key={index}>
                                <FormLabel> {key} </FormLabel>
                                <input
                                    type='text'
                                    name={key}
                                    value={key === 'Created Time' || key === 'Last Update Time' ?
                                        format(new Date(currentState[key]), 'yyyy-MM-dd HH:mm:ss') :
                                        currentState[key]}
                                    onChange={handleChange}
                                    className={'border border-gray-300 p-0.5 rounded'}
                                />
                            </div>
                        )}
                    </div>
                    <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white py-0.5 px-3 mr-2 rounded">
                        Update
                    </button>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white py-0.5 px-3 rounded">
                        Delete
                    </button>
                </div>
            </Container>
        </div>
    )
}

export default UpdateForm;