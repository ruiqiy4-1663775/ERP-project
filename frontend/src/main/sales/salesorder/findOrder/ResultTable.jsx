// This file is the search result table of findOrder
import { format } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';
import { FormHeader } from '../../../../components/Components';
import { useEffect, useState } from 'react';
// data: search result, array of objects
function ResultTable({ data, get }) {
    const [trigger, setTrigger] = useState({})
    const headers = ['Order Number', 'Order Time', 'Order Status', 'Employee ID', 'Customer ID',
        'Customer Name']
    const navigate = useNavigate()

    useEffect(() => {
        async function ok() {
            await get('/api/find_order')
        }
        ok()
    }, [get, trigger])

    async function select(row) {
        navigate(`/sales/sales_order/${row['Order Number']}`)
    }

    return (
        <div className="overflow-auto w-full max-h-96 space-y-4">
            <div className="flex justify-between">
                <FormHeader>List of Orders</FormHeader>
                <div className="flex">
                    <svg onClick={() => { setTrigger({}) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-8 h-8 text-lime-400 hover:text-lime-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
            </div>
            <div className="border border-gray-400 my-2" />
            <div className="table min-w-full inline-block m-auto">
                <div className="table-header-group">
                    <div className="table-row">
                        {headers.map((header, index) =>
                            <div key={index} className="table-cell text-center p-1 bg-indigo-200 whitespace-nowrap">
                                {header}
                            </div>
                        )}
                    </div>
                </div>
                <div className="table-row-group">
                    {data?.map((row, rowIndex) => (
                        <div
                            className={`table-row hover:bg-sky-200`}
                            key={rowIndex}
                            onClick={() => select(row)}
                        >
                            {headers.map((key, cellIndex) =>
                                <div className="table-cell p-0.5 text-center whitespace-nowrap" key={cellIndex}>
                                    {key === 'Order Time' ? format(new Date(row[key]),
                                        'yyyy-MM-dd HH:mm:ss') : row[key]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ResultTable;

