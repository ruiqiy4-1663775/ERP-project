import { useState } from "react";
import UpdateForm from "./UpdateForm";
import { format } from 'date-fns-tz';

function Table({ data, updateTable }) {
    const [selectedRow, setSelectedRow] = useState(null);
    const map = {
        "Supplier ID": 'id',
        "Supplier Name": "supplier_name",
        "Contact Name": "contact_name",
        "Contact Phone": "contact_phone",
        "Contact Primary Email": "contact_primary_email",
        "Contact Secondary Email": "contact_secondary_email",
        "Contact Title": "contact_title",
        "Address line 1": "supplier_address_line1",
        "Address line 2": "supplier_address_line2",
        "City": "supplier_city",
        "State": "supplier_state",
        "Zip": "supplier_zipcode",
        "Country": "supplier_country",
        'Note': 'note',
    };
    return (
        <div>
            {selectedRow && <UpdateForm
                updateTable={updateTable} content={selectedRow} clearSelected={() => setSelectedRow(null)} />}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {Object.keys(map).map((key, index) =>
                                <th key={index} scope="col" className="px-6 py-3">
                                    {key}
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

