// this is the handler
import AddShippingForm from './AddShippingForm'
import { useState, useEffect, useContext } from 'react'
import ShipmentList from './ShipmentList'
import useAxios from '../../../../utils/useAxios'
import { OrderDetailContext } from '../detailForm/DetailForm'

function Shipping() {
    // console.log(shipmentList)
    const [openCreateShipment, setOpenCreateShipment] = useState(false)
    const [shipmentList, setShipmentList] = useState(null)
    const { get } = useAxios()
    const {orderId, trigger} = useContext(OrderDetailContext)
    useEffect(() => {
        async function ok() {
            let result = await get('/api/get_shipping', {orderId})
            // console.log(result)
            setShipmentList(result)
        }
        ok()
    }, [orderId, get, trigger])

    return (
        <div className="w-full">
            {shipmentList &&
            <>
            <div className="flex justify-between">
                <h1 className="font-semibold text-lg text-violet-400">Shipping Info</h1>
                <div>
                    <button onClick={() => setOpenCreateShipment(!openCreateShipment)}
                        className="rounded-lg bg-sky-400 hover:bg-sky-500 px-1 text-white">
                        New Shipment
                    </button>
                </div>
            </div>
            {openCreateShipment && <AddShippingForm />}
            <ShipmentList shipmentList={shipmentList} />
            </>
            }
        </div>
    )
}

export default Shipping