// This component put the data in table format. Data needs to be array of objects.
// keys is an array of keys that are displayed in table cols. 
// If keys are not give, then display all keys.

import { useState } from "react";
import UpdateForm from "./UpdateForm";


function Table({ data, keys, tablename, updateTable, changeableFields, tableKey}) {
    const [selectedRow, setSelectedRow] = useState(null);
    const headers = keys || [...new Set(data.flatMap(Object.keys))];

    return (
        <div>
            {selectedRow && <UpdateForm 
                updateTable={updateTable} 
                tablename={tablename}  tableKey={tableKey}
                content={selectedRow} clearSelected={() => setSelectedRow(null)} changeableFields={changeableFields} ></UpdateForm>}
                
                    <div className="overflow-x-auto w-full max-h-96">
                        <div className="table min-w-full inline-block m-auto">

                            <div className="table-header-group">
                                <div className="table-row">
                                    {headers.map((header, index) =>
                                        <div className="table-cell text-center px-4 py-1 bg-indigo-200 min-w-max" key={index}>{header}</div>
                                    )}
                                </div>
                            </div>
                            <div className="table-row-group">
                                {data.map((row, rowIndex) => (
                                    <div
                                        className={`table-row ${rowIndex % 2 === 0 ? `bg-purple-100 
                                            hover:bg-purple-200` : 'bg-sky-100 hover:bg-sky-200'}`}
                                        key={rowIndex}
                                        onClick={() => setSelectedRow(row)}
                                    >
                                        {headers.map((key, cellIndex) =>
                                            <div className="table-cell py-0.5 text-center select-none" key={cellIndex}> {row[key]} </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            
        </div>
    )
}

export default Table;

