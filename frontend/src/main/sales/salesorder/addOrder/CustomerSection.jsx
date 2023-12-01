import { useState, useEffect, useRef } from 'react';
import useAxios from '../../../../utils/useAxios';

const CustomerSection = ({ setSelectedCustomer, selectedCustomer, error, setError }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const { get } = useAxios()
    const fields = {'Customer ID': 'customer_id', 'Address': 'address', 'Email': 'email', 'Phone': 
        'phone', 'Price Tier': 'price_tier'}
    const selectionMadeRef = useRef(false);
    // const [selectionError, setSelectionError] = useState('')

    useEffect(() => {
        const fetchSuggestions = async () => {
            const data = await get(`/api/autocomplete_customer`, { query });
            console.log(data)
            setSuggestions(data);
        };
        // if (query) {
        if (isFocused) {
            fetchSuggestions();
        }
    }, [query, get, isFocused]);

    useEffect(() => {
        if (selectedCustomer === '') {
            setQuery('')
        }
    }, [selectedCustomer])

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedCustomer(suggestion)
        selectionMadeRef.current = true;
        setQuery(suggestion.customer_name);
        setIsFocused(false)
        // setSelectionError('')
        setSuggestions([]); // Clear the suggestions once an item is clicked
    };
    // todo: in order detail, add a hori bar to collapse and extend each section.
    return (
        <div>
            <h1 className="font-medium text-lg"> Customer Info </h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-2 mb-5">
                <div className="relative">
                    <div className='flex flex-col'>
                        <label className="font-medium"> Customer </label>
                        <input
                            type="text"
                            value={query}
                            onChange={handleChange}
                            onFocus={() => {
                                setIsFocused(true);
                                setSelectedCustomer('')
                                selectionMadeRef.current = false;
                                // setSelectionError('');
                                setError({...error, customer: ''})
                            }}
                            onBlur={() => setTimeout(() => {
                                setIsFocused(false)
                                if (!selectionMadeRef.current){
                                    // setSelectionError('Please select a customer from the list.')
                                    setError({...error, customer: 'Please select a customer from the list.'})
                                } 
                            }, 200)}
                            className="border p-0.5 rounded"
                        />
                        <p className='text-red-500'>{error}</p>
                        {/* <p className='text-red-500'>{selectionError}</p> */}
                    </div>
                    {isFocused && suggestions.length > 0 && (
                        <ul className="absolute w-full bg-white border rounded mt-1">
                            {suggestions?.map((item, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSuggestionClick(item)}
                                >
                                    {item.customer_name + ', ID: ' + item.customer_id}
                                </li>
                            ))}
                        </ul>)}
                </div>
                {Object.keys(fields).map((key, index) => 
                <div key={index} className='flex flex-col'>
                        <label className="font-medium"> {key} </label>
                        <input
                            type="text"
                            readOnly={true}
                            value={selectedCustomer[fields[key]] ? selectedCustomer[fields[key]] : ''}
                            // onChange={handleChange}
                            // onFocus={() => setIsFocused(true)}
                            // onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            className="border p-0.5 rounded bg-gray-500/20 cursor-not-allowed"
                        />
                </div>
                )}
            </div>
        </div>
    );
};

export default CustomerSection;
