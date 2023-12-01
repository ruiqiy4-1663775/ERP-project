// This version of useForm takes an initial state.
import { useState } from "react"

function useForm(initialState) {
    const [formState, setFormState] = useState(initialState);

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleClear = () => {
        setFormState(initialState);
    };

    return { formState, handleInputChange, handleClear };
}

export default useForm