// This is the handler of detailForm
// a page showing order detail after user clicks/select one of the rows in result table
import { useState, createContext } from "react";
import ItemList from "../itemSection/ItemList";
import ReturnHandler from "../returnSection/ReturnHandler";
import OrderBasics from "./OrderBasics";
import Container from "../../../../components/Container";
import Shipping from "../shipping/Shipping";
import { useParams } from "react-router-dom";
// todo: add create invoice function
// todo: send invoice to the email of the customer or a mannually added email address
export const OrderDetailContext = createContext();

function OrderDetailForm({ close }) {
    let { orderId } = useParams();
    const [trigger, setTrigger] = useState({}) // use the refresh order
    function refresh() {
        setTrigger({})
    }
    return (
        <div className="absolute inset-0 bg-slate-100 py-8 overflow-auto">
        <Container width={"w-[95%]"}>
            <div className="flex justify-between">
                <h1 className="font-semibold text-xl">Sales Order: {orderId}</h1>
                <div className="flex">
                    <svg onClick={() => { setTrigger({}) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-8 h-8 text-lime-400 hover:text-lime-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-300 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <OrderDetailContext.Provider value={{ orderId, trigger, refresh }} >
                <OrderBasics orderId={orderId} trigger={trigger} refresh={() => setTrigger({})} />
                <div className="border border-gray-400 my-2" />
                <ItemList trigger={trigger} orderId={orderId} refresh={() => setTrigger({})} />
                <div className="border border-gray-400 my-2" />
                <ReturnHandler refresh={() => setTrigger({})} trigger={trigger} orderId={orderId} />
                <div className="border border-gray-400 my-2" />
                <Shipping orderNumber={orderId} trigger={trigger} refresh={() => setTrigger({})} />
            </OrderDetailContext.Provider>
        </Container>
        </div>
    )
}

export default OrderDetailForm;