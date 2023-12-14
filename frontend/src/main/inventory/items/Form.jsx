import { useState } from "react"
import { InputGrid } from "../../../components/Components";

export function useForm(fields) {
    const [formState, setFormState] = useState(initial());
    function initial() {
        let initialState = {}
        for (let field of fields) {
            initialState[field] = '';
        }
        return initialState
    }
    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };
    const handleClear = () => {
        setFormState(initial());
    };
    return { formState, handleInputChange, handleClear };
}

export function Form({ formState, handleChange }) {
    return (
        <InputGrid>
            {Object.keys(formState).map((field, index) =>
                <div className="flex flex-col" key={index}>
                    <label className="font-medium"> {field} </label>
                    <input
                        type="text"
                        name={field}
                        value={formState[field]}
                        onChange={handleChange}
                        className="border border-gray-300 p-0.5 rounded"
                    />
                </div>
            )}
        </InputGrid>
    )
}
