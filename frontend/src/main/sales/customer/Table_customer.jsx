// This component put the data in table format. Data needs to be array of objects.
// keys is an array of keys that are displayed in table cols. 
// If keys are not give, then display all keys.

import { useState } from "react";
import UpdateForm from "./UpdateForm_customer";
import format from "date-fns-tz/format";

function Table({ data, updateTable }) {
    const [selectedRow, setSelectedRow] = useState(null);
    const map = {
        'Customer ID': 'id', 'Customer Name': 'customer_name',
        'Phone Number': 'phoneNumber', 'Email Address': 'email', 'Price Tier': 'price_tier',
        'Street Address': 'street_address', 'City': 'city', 'State': 'state', 'Zip Code': 'zipcode',
        'Country': 'country'
    }

    function findKeyByValue(obj, targetValue) {
        for (const [key, value] of Object.entries(obj)) {
            if (value === targetValue) {
                return key;
            }
        }
        return targetValue; // or undefined, or any other handling as required
    }

    return (
        <div>
            {selectedRow && <UpdateForm updateTable={updateTable} content={selectedRow}
                clearSelected={() => setSelectedRow(null)} /> }
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {Object.keys(map).map((key, index) =>
                                <th key={index} scope="col" className="px-6 py-3">
                                    {findKeyByValue(map, key)}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr onClick={() => setSelectedRow(row)} key={rowIndex} className="hover:bg-gray-200 odd:bg-white even:bg-gray-50 border-b">
                                {Object.keys(map).map((key, cellIndex) =>
                                    <th key={cellIndex} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {key === 'Created at'
                                            || key === 'Updated at' ?
                                            format(new Date(row[map[key]]), 'yyyy-MM-dd HH:mm:ss') : row[map[key]]}
                                    </th>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default Table;

