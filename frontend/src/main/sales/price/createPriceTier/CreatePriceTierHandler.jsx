// This file is the handler for createPriceTier

import PriceTierForm from "./PriceTierForm"
function TierPriceChange() {
    let fields = [
        {
            Name: 'Item ID',
        },
        {
            Name: 'Item Name'
        },
        {
            Name: 'Collection'
        },
        {
            Name: 'Item Type'
        }
    ]

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold mb-4">Create Price Tier</h1>
            <h1 className="text-lg font-semibold mb-4">Step 1: Select items to set a price tier</h1>
            <PriceTierForm
                fields={fields}
                url={'/api/find_item'}
                tablename={'Prices'}
                tableKey={['Product ID', 'Price Tier']} />
        </div>
    )
}
export default TierPriceChange