// 
import Container from "../../../components/Container"
import PurchaseOrder from "./AddPurchaseOrder"
import FindPurchaseOrder from "./findPurchase/FindPurchaseOrder"
import { useState } from "react"
import { FormHeader } from "../../../components/Components"

function Purchase() {
    const [openCreate, setOpenCreate] = useState(false)

    return (
        <div>
            <Container width={"w-[95%] mb-10"}>
                <FormHeader>Purchase Order</FormHeader>
                <div className="border border-gray-400 my-2" />

                <button onClick={() => setOpenCreate(!openCreate)} className='bg-blue-500 hover:bg-blue-700 text-white p-0.5 px-3 rounded mr-5'>
                    Add Purchase Order
                </button>
            </Container>
            {openCreate &&
                <div onClick={() => setOpenCreate(false)} className="fixed pt-10 inset-0 z-20 bg-black/40 flex flex-col">
                    <div onClick={(e) => { e.stopPropagation() }} className="w-[85%] mx-auto">
                        <Container width={"bg-white"}>
                            <PurchaseOrder close={() => setOpenCreate(false)} />
                        </Container>
                    </div>
                </div>
            }
            <Container width={"w-[95%]"}>
                <FindPurchaseOrder />
            </Container>
        </div>
    )
}

export default Purchase