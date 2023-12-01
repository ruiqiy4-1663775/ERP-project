// This is the handler of the price section

import Container from "../../../components/Container";
// import UpdateCustomerTier from './update_customer_tier/CustomerPriceTier'
import CreatePriceTier from './createPriceTier/CreatePriceTierHandler'
import PriceChange from './price_records/PriceRecordsHandler'
// todo: need ux redesign here. Need to first see a list of price tier, and after select one of them,
// display the price info of the given price tier.
// todo: need to redesign the create price tier as well.
function Price() {
    return (
        <div className="space-y-10">
            {/* <Container width={"w-[95%]"}>
                <UpdateCustomerTier />
            </Container> */}
            <Container width={"w-[95%]"}>
                <CreatePriceTier />
            </Container>
            <Container width={"w-[95%]"}>
                <PriceChange />
            </Container>
        </div>
    )
}

export default Price;