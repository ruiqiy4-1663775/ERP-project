// This is the handler of sales order section
import Container from "../../../components/Container";
import FindOrderForm from "./findOrder/FindOrderFormHandler";
import SalesOrderForm from "./addOrder/AddOrderFormHandler";
import DetailForm from './detailForm/DetailForm'
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultTable from "./findOrder/ResultTable";
import useAxios from "../../../utils/useAxios";
import { FormHeader } from "../../../components/Components";

function SalesOrder() {
    const [openCreate, setOpenCreate] = useState(false)
    let { orderId } = useParams()
    let navigate = useNavigate()
    const { data, get } = useAxios()
    return (
        <div className="relative">
            <Container width={"w-[95%] mb-10"}>
                <FormHeader>Orders</FormHeader>
                <div className="border border-gray-400 my-2" />

                <button onClick={() => setOpenCreate(!openCreate)} className='bg-blue-500 hover:bg-blue-700 text-white p-0.5 px-3 rounded mr-5'>
                    Create New Order
                </button>
            </Container>
            {orderId &&
                <DetailForm orderId={orderId} close={() => navigate('/sales/sales_order')} />
            }
            {openCreate &&
                <div onClick={() => setOpenCreate(false)} className="fixed pt-10 inset-0 z-20 bg-black/40 flex flex-col">
                    <div onClick={(e) => { e.stopPropagation() }} className="w-[85%] mx-auto">
                        <Container width={"bg-white"}>
                            <SalesOrderForm close={() => setOpenCreate(false)}></SalesOrderForm>
                        </Container>
                    </div>
                </div>
            }
            <Container width={"w-[95%] mb-10"}>
                <FindOrderForm get={get}></FindOrderForm>
            </Container>
            <Container width={"w-[95%]"}>
                <ResultTable data={data} get={get} />
            </Container>
        </div>
    )
}
export default SalesOrder;