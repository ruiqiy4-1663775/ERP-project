function Table({ data }) {
    const headers = [...new Set(data.flatMap(Object.keys))];

    return (
        <div className="overflow-x-auto w-full max-h-96">
            <div className="table min-w-full inline-block m-auto">

                <div className="table-header-group">
                    <div className="table-row">
                        {headers.map((header, index) =>
                            <div className="table-cell text-center px-4 p-2 bg-indigo-200 whitespace-nowrap" key={index}>{header}</div>
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
                                <div className="table-cell p-1 text-center whitespace-nowrap" key={cellIndex}>row[key]</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Table;

