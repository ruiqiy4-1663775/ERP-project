import { useState } from "react"

function useForm(fields) {
    const [formState, setFormState] = useState(initial());
    const [errors, setErrors] = useState({});

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
        setErrors({})
    };

    const validateForm = () => {
        let newErrors = {};
        for (let field of fields) {
            if (formState[field].trim() === '') {
                newErrors[field] = `* ${field} is required.`;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { formState, setFormState, handleInputChange, handleClear, validateForm, errors };
}

export default useForm