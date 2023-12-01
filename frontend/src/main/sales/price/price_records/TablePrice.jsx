// This is the result table of the price records

import { useState } from "react";
import UpdateForm from "./UpdateFormPrice";

function Table({ data, updateTable}) {
    const [selectedRow, setSelectedRow] = useState(null);
    const headers = [...new Set(data.flatMap(Object.keys))];

    return (
        <>
            {selectedRow ? <UpdateForm 
                updateTable={updateTable} 
                content={selectedRow} clearSelected={() => setSelectedRow(null)} />:
                (
                    <div className="overflow-auto w-full max-h-96">
                        <div className="table min-w-full inline-block m-auto">
                            <div className="table-header-group">
                                <div className="table-row">
                                    {headers.map((header, index) =>
                                        <div className="table-cell text-center px-4 py-1 bg-indigo-200" key={index}>{header || header}</div>
                                    )}
                                </div>
                            </div>
                            <div className="table-row-group">
                                {data.map((row, rowIndex) => (
                                    <div
                                        className={`table-row ${rowIndex % 2 === 0 ? 
                                            'bg-purple-100 hover:bg-purple-200' : 'bg-sky-100 hover:bg-sky-200'}`}
                                        key={rowIndex}
                                        onClick={() => setSelectedRow(row)}
                                    >
                                        {headers.map((key, cellIndex) =>
                                            <div className="table-cell py-0.5 text-center select-none whitespace-nowrap" key={cellIndex}> {row[key]?row[key]:'Not Set'} </div>
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

