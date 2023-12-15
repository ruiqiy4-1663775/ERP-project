import { format } from 'date-fns-tz';

function Table({ data, setSelectedRow }) {
    console.log(data)
    const map = {
        'Item ID': 'id',
        'Item Name': 'item_name',
        'Item Description': 'item_description',
        'Collection': 'collection',
        'Custom Propertiy 1': 'property1',
        'Custom Propertiy 2': 'property2',
        'Custom Propertiy 3': 'property3',
        'Custom Propertiy 4': 'property4',
        'Custom Propertiy 5': 'property5',
        'Created at': 'createdAt',
        'Updated at': 'updatedAt'
    }
    return (
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

    )
}

export default Table;

