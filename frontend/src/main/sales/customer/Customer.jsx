// This file is the handler of customer module
import SearchCustomer from "./findCustomer/SearchCustomer";
import Container from "../../../components/Container";
import AddCustomerForm from "./addCustomer/AddCustomerForm"
// import { useParams } from "react-router-dom";

function Customoer() {
    // let { customerId } = useParams()
    return (
        <div className="space-y-10">
            <Container width={"w-[95%]"}><AddCustomerForm /></Container>
            <Container width={"w-[95%]"}><SearchCustomer /></Container>
        </div>
    )
}

export default Customoer;