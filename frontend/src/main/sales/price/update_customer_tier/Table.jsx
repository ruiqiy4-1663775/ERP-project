// This is the result table of the customers

import { useState } from "react";
import UpdateForm from "./UpdateForm_customer_update_tier";

function Table({ data }) {
    const [selected, setSelected] = useState(null); // selected is an array of rows for a given customer
    const headers = ['Price Tier', 'Customer ID', 'Customer Name', 'Address', 'Email', 'Phone']

    return (
        <>
            {selected ? <UpdateForm data={selected} clearSelected={() => setSelected(null)} /> :
                (
                    <div className="overflow-x-auto w-full max-h-96">
                        <div className="table min-w-full inline-block m-auto">

                            <div className="table-header-group">
                                <div className="table-row">
                                    {headers.map((header, index) =>
                                        <div className="table-cell text-center px-4 py-2 bg-indigo-200 min-w-max whitespace-nowrap" key={index}>{header}</div>
                                    )}
                                </div>
                            </div>
                            <div className="table-row-group">
                                {Object.keys(data).map((key1, rowIndex) => (
                                    <div
                                        className={`table-row cursor-zoom-in ${rowIndex % 2 === 0 ? 'bg-purple-100' : 'bg-sky-100'}`}
                                        key={rowIndex}
                                        onClick={() => setSelected(data[key1])}
                                    >
                                        {headers.map((key, cellIndex) =>
                                            <div className="table-cell py-1 px-2 text-center whitespace-nowrap"
                                                key={cellIndex}> {data[key1][0][key]} </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>)
            }
        </>
    )
}

export default Table;

