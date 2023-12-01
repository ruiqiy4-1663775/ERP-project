// This component put the data in table format. Data needs to be array of objects.
// keys is an array of keys that are displayed in table cols. 
// If keys are not give, then display all keys.

function Table2({ data, keys }) {
    const headers = keys || [...new Set(data.flatMap(Object.keys))];

    return (
        <>
            <div className="overflow-x-auto w-full max-h-96">
                <div className="table min-w-full inline-block m-auto">

                    <div className="table-header-group">
                        <div className="table-row">
                            {headers.map((header, index) =>
                                <div className="table-cell text-center p-2 bg-indigo-200" key={index}>{header || header}</div>
                            )}
                        </div>
                    </div>
                    <div className="table-row-group">
                        {data.map((row, rowIndex) => (
                            <div
                                className={`table-row ${rowIndex % 2 === 0 ? 'bg-purple-100' : 'bg-sky-100'}`}
                                key={rowIndex}
                            >
                                {headers.map((key, cellIndex) =>
                                    <div className={`table-cell p-1 text-center select-none`} key={cellIndex}> row[key] </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Table2;

