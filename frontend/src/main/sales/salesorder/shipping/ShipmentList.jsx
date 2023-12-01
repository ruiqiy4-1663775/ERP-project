import format from "date-fns-tz/format";
import { useState, useEffect } from "react";
import ShipmentDetail from "./ShipmentDetail";
import ShipmentItems from "./ShipmentItems";
// todo: add subtotal
function ShipmentList({ shipmentList }) {
    const headers = [...new Set(shipmentList.flatMap(Object.keys))];
    const [openArrayIds, setOpenArrayIds] = useState(shipmentList.map(() => null))

    useEffect(() => {
        // Update openArrayIds when shipmentList changes
        setOpenArrayIds(shipmentList.map(() => null));
      }, [shipmentList]); // Dependency array
    

    const toggleOpen = (index, shippingId) => {
        const newArray = [...openArrayIds];
        if (newArray[index]) {
            newArray[index] = null
        } else {
            newArray[index] = shippingId;
        }
        setOpenArrayIds(newArray);
    };

    function cellValue(row, field) {
        if (field === 'Estimated Delivery' || field === 'Actual Delivery') {
            if (row[field]){
            return format(new Date(row[field]), 'yyyy-MM-dd HH:mm:ss')
            } else {
                return ''
            }
        } else {
            return row[field]
        }
    }

    return (
        <div className="pt-2">
            <div className="pt-2 overflow-auto w-full max-h-96">
                <div className="table border border-collapse min-w-full inline-block m-auto rounded-lg">
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
                        {shipmentList.map((row, rowIndex) => (
                            <div
                                className={`table-row border hover:bg-sky-100`}
                                key={rowIndex}
                                onClick={() => toggleOpen(rowIndex, row['Shipping ID'])}
                            >
                                {headers.map((key, cellIndex) =>
                                    <div className=" table-cell p-0.5 text-center whitespace-nowrap" key={cellIndex}>
                                        {cellValue(row, key)}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {openArrayIds.map((id, index) => (
                <div key={index}>
                {id && 
                <>
                    <ShipmentDetail shippingId={id} />
                    <ShipmentItems shippingId={id} />
                    </>}
                </div>
            ))}
        </div>
    )
}

export default ShipmentList