// This is the handler of the products
import Container from "../../../components/Container";
import SearchItemForm from "./SearchItemsForm";
import AddItemsForm from "./AddItemsForm";
import { FormHeader } from "../../../components/Components";
import { useState } from "react";

const Items = () => {
    const [openCreate, setOpenCreate] = useState(false)

    return (
        <div className="w-full pb-10">
            <div className="rounded-lg shadow-md bg-white mb-10 px-10 pt-5 pb-5">
                <FormHeader>Items</FormHeader>
                <div className="border border-gray-400 my-2" />

                <button onClick={() => setOpenCreate(!openCreate)} className='bg-blue-500 hover:bg-blue-700 text-white p-0.5 px-3 rounded mr-5'>
                    Add New Item
                </button>
                </div>
            {openCreate &&
                <div onClick={() => setOpenCreate(false)} className="fixed pt-10 inset-0 z-20 bg-black/40 flex flex-col">
                    <div onClick={(e) => { e.stopPropagation() }} className="w-[85%] mx-auto">
                        <Container width={"bg-white"}>
                            <AddItemsForm close={() => setOpenCreate(false)} />
                        </Container>
                    </div>
                </div>
            }
            <SearchItemForm />

        </div>
    );
};

export default Items;