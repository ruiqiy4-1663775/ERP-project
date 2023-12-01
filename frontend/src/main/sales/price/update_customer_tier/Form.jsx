// This file is the search form of the customer

function Form({ formState, handleChange }) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 container md:gap-x-10 md:gap-y-4">
            {Object.keys(formState).map((field, index) =>
                <div className="flex flex-col" key={index}>
                    <label className="font-semibold"> {field} </label>
                    <input
                        type="text"
                        name={field}
                        value={formState[field]}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded"
                    />
                </div>
            )}
        </div>
    )
}

export default Form;