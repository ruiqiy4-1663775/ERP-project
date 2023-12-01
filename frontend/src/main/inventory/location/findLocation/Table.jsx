import { useState } from "react";
import UpdateForm from "./UpdateForm";
import { format } from 'date-fns-tz';

function Table({ data, updateTable}) {
    const [selectedRow, setSelectedRow] = useState(null);
    const headers = [...new Set(data.flatMap(Object.keys))];

    return (
<>
    {selectedRow ? <UpdateForm 
        updateTable={updateTable} content={selectedRow} clearSelected={() => setSelectedRow(null)} />:
        (
            <div className="overflow-x-auto w-full max-h-96">
                <div className="table min-w-full inline-block m-auto">
                    <div className="table-header-group">
                        <div className="table-row">
                            {headers.map((header, index) =>
                                <div className="table-cell text-center px-4 py-1 bg-indigo-200 
                                min-w-max whitespace-nowrap" key={index}>{header}</div>
                            )}
                        </div>
                    </div>
                    <div className="table-row-group">
                        {data.map((row, rowIndex) => (
                            <div
                                className={`table-row ${rowIndex % 2 === 0 ? 'bg-purple-100 hover:bg-purple-200'
                                    : 'bg-sky-100 hover:bg-sky-200'}`}
                                key={rowIndex}
                                onClick={() => setSelectedRow(row)}
                            >
                                {headers.map((key, cellIndex) =>
                                    <div className="table-cell py-0.5 text-center select-none 
                                    whitespace-nowrap px-1" key={cellIndex}> { key === 'Created Time' 
                                    || key === 'Last Update Time' ? 
                                    format(new Date(row[key]), 'yyyy-MM-dd HH:mm:ss') : row[key]} </div>
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

