// export const API_ENDPOINT = "http://localhost:8080";
// export const API_ENDPOINT = ""
export const API_ENDPOINT = "http://192.168.1.82:8080"
export const LOCAL_STORAGE_KEY = "ERP";
export const ADMIN_CONTROL = ['admin'];
export const TIMEOUT = 2000; // For axios request
// This is the style for react select
// todo: style this one better
export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: '#D1D5DB', // border-gray-300
        height: '30px',
        minHeight: '0px',
        borderRadius: '0.25rem', // rounded
        boxShadow: state.isFocused ? '0 0 0 1px #D1D5DB' : null, // Focus border
        '&:hover': {
            borderColor: '#D1D5DB' // border-gray-300 on hover
        },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        position: 'relative',
        top: '30%',
        transform: 'translateY(-50%)', // This will also help in vertically centering the text
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        // padding: '0px', // Remove padding
        position: 'relative',
        top: '40%',
        transform: 'translateY(-50%)', // This will also help in vertically centering the text
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        position: 'relative',
        top: '20%',
        transform: 'translateY(-50%)'// Vertically center the separator
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#D1D5DB' : state.isFocused ? '#E5E7EB' : 'transparent', // gray-300 for selected, gray-200 for focused
        color: '#1F2937', // gray-800
        padding: '0.2rem 1rem', // Vertical padding of p-1 and horizontal padding for better appearance
        cursor: 'pointer'
    }),
    // Add more styles or override existing ones as needed
};