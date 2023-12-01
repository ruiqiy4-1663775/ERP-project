// This table shows the result of products that are selected to set price tier
function Table({ data }) {
    const headers = [...new Set(data.flatMap(Object.keys))];
    return (
        <>
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
                                className={`table-row ${rowIndex % 2 === 0 ? 'bg-purple-100' : 'bg-sky-100'}`}
                                key={rowIndex}
                            >
                                {headers.map((key, cellIndex) =>
                                    <div className="table-cell py-0.5 text-center" key={cellIndex}> {row[key]} </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Table;

