// This file is the handler of customer module
import SearchCustomer from "./SearchCustomer";
import Container from "../../../components/Container";
import AddCustomerForm from "./AddCustomerForm"
// import { useParams } from "react-router-dom";
import { useState } from "react";
import { FormHeader } from "../../../components/Components";
function Customoer() {
    const [openCreate, setOpenCreate] = useState(false)

    // let { customerId } = useParams()
    return (
        <div>
            <div className="rounded-lg shadow-md bg-white mb-10 px-10 pt-5 pb-5">
                <FormHeader>Customers</FormHeader>
                <div className="border-t border-gray-400 my-2" />

                <button onClick={() => setOpenCreate(!openCreate)} className='bg-blue-500 hover:bg-blue-700 text-white p-0.5 px-3 rounded mr-5'>
                    Add New Customer
                </button>
            </div>
            {openCreate &&
                <div onClick={() => setOpenCreate(false)} className="fixed pt-10 inset-0 z-20 bg-black/40 flex flex-col overflow-auto">
                    <div onClick={(e) => { e.stopPropagation() }} className="w-[85%] mx-auto">
                        <Container width={"bg-white"}>
                            <AddCustomerForm/>
                        </Container>
                    </div>
                </div>
            }
            <Container width={"w-[95%]"}><SearchCustomer /></Container>
        </div>
    )
}

export default Customoer;