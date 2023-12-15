// This file is the search result table of findOrder
import { format } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// data: search result, array of objects
function ResultTable({ data, get }) {
    const headers = ['Order Number', 'Order Time', 'Order Status', 'Employee ID', 'Customer ID',
        'Customer Name']
    const navigate = useNavigate()

    useEffect(() => {
        async function ok() {
            await get('/api/find_order')
        }
        ok()
    }, [get])

    async function select(row) {
        navigate(`/sales/sales_order/${row['Order Number']}`)
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((key, index) =>
                                <th key={index} scope="col" className="px-6 py-3">
                                    {key}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data&&data.map((row, rowIndex) => (
                            <tr onClick={() => select(row)} key={rowIndex} className="hover:bg-gray-200 odd:bg-white even:bg-gray-50 border-b">
                                {headers.map((key, cellIndex) =>
                                    <th key={cellIndex} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {key === 'Created at'
                                            || key === 'Updated at' ?
                                            format(new Date(row[key]), 'yyyy-MM-dd HH:mm:ss') : row[key]}
                                    </th>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}

export default ResultTable;

