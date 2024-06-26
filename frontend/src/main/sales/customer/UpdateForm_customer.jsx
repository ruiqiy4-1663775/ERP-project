import { useState, useContext } from "react";
import { ModalContext } from "../../../utils/ModalContext";
import useAxios from "../../../utils/useAxios";
import Container from "../../../components/Container";
import format from "date-fns-tz/format";

function UpdateForm({ content, clearSelected, updateTable }) {
    const map = {
        'Customer ID': 'id', 'Customer Name': 'customer_name',
        'Phone Number': 'phoneNumber', 'Email Address': 'email', 'Price Tier': 'price_tier',
        'Street Address': 'street_address', 'City': 'city', 'State': 'state', 'Zip Code': 'zipcode',
        'Country': 'country'
    }
    const [currentState, setCurrentState] = useState(content);
    const axios = useAxios();
    const { openModal } = useContext(ModalContext)
    function findKeyByValue(obj, targetValue) {
        for (const [key, value] of Object.entries(obj)) {
            if (value === targetValue) {
                return key;
            }
        }
        return targetValue; // or undefined, or any other handling as required
    }
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
            console.log(content)
            await axios.updateData(`/api/update_customer`, {
                customerId: content["id"],
                newvalues: changedFields
            }, 'Update is successful!')
            updateTable()
            clearSelected()
        } else {
            openModal(new Error('No change has been detected'))
        }
    }

    function renderInput(key, row) {
        if (key === 'createdAt' || key === 'updatedAt') {
            return (
                <p className="border border-gray-300 p-0.5 rounded">
                    {format(new Date(row[key]), 'yyyy-MM-dd HH:mm:ss')}
                </p>
            )
        }
        return (
            <input
                type='text'
                name={key}
                value={currentState[key]}
                onChange={handleChange}
                className={'border border-gray-300 p-0.5 rounded '}
            />
        )
    }

    return (
        <div className="fixed pt-10 inset-0 z-20 bg-black/40 flex flex-col">
            <Container width={'w-[85%]'}>
                <div className="bg-white w-full rounded-lg space-y-2">
                    <svg onClick={clearSelected} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-6 h-6 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <h1 className="font-semibold text-xl text-sky-400">Customer</h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 container md:gap-x-10 md:gap-y-2">
                        {Object.keys(currentState).map((key, index) =>
                            <div className="flex flex-col" key={index}>
                                <label className="font-medium"> {findKeyByValue(map, key)} </label>
                                {renderInput(key, currentState)}
                            </div>
                        )}
                    </div>
                    <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white p-0.5 mr-2 rounded">
                        Update
                    </button>
                </div>
            </Container>
        </div>
    )
}

export default UpdateForm;