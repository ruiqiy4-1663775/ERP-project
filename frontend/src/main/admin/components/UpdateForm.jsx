
import { useState, useContext } from "react";
import { ModalContext } from "../../../utils/ModalContext";
import useAxios from "../../../utils/useAxios";
import Container from "../../../components/Container";

function UpdateForm({tablename, content, clearSelected, updateTable, changeableFields, tableKey }) {
    const [currentState, setCurrentState] = useState(content);
    const axios = useAxios();
    const {openModal} = useContext(ModalContext)
    const conditions ={}
    
    function handleChange(e) {
        setCurrentState({
            ...currentState,
            [e.target.name]: e.target.value,
        });
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
            conditions[tableKey] = content[tableKey]
            await axios.updateData(`/api/update`, {tablename, conditions, newvalues: changedFields}, 'Update is successful!')
            updateTable()
            clearSelected()
        } else {
            openModal(new Error('No change has been detected'))
        }
    }

    async function handleDelete() {
        await axios.updateData('/api/delete_user', {username: content['username']}, 'sucessfully deleted User');
        updateTable()
        clearSelected()
    }

    function getInputType(key) {
        const field = changeableFields.find((field) => field.databaseName === key);
        return (field && field.type) ? field.type : 'text'; // Default to 'text' if no match is found
    }

    function contains(key) {
        for (let field of changeableFields) {
            if (field.databaseName === key) {
                return true
            }
        }
        return false
    }

    return (
        <div className="fixed pt-10 inset-0 z-20 bg-black/40 flex flex-col">
            <Container width={'w-[85%]'}>
        <div className="space-y-2">
            <svg onClick={clearSelected} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <h1 className="font-semibold text-xl text-sky-400">Detail Info Card</h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 container md:gap-x-10 md:gap-y-1">
                {Object.keys(currentState).map((key, index) =>
                    <div className="flex flex-col" key={index}>
                        <label className="font-medium"> {key} </label>
                        <input
                            type={getInputType(key)}
                            name={key}
                            readOnly = {!contains(key)}
                            value={currentState[key]}
                            onChange={handleChange}
                            className={'border border-gray-300 p-0.5 rounded' + (!contains(key) && 'bg-gray-500 text-red-500 cursor-not-allowed')}
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