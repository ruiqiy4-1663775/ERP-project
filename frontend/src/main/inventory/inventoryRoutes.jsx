import Inventory from "./Inventory"
import Items from "./items/Items"
import Purchase from "./purchase/PurchaseHandler"
import Supplier from "./supplier/SupplierHandler"
import Stock from "./stock/Stock"
import Location from "./location/Location"
import PurchseOrderDetail from './purchase/purchaseOrderDetail/PurchaseOrderDetail'

export const inventoryRoutes = {
    path: "inventory",
    element: <Inventory />,
    children: [
        {
            path: "items",
            element: <Items />
        },
        {
            path: 'purchase',
            element: <Purchase />
        },
        {
            path: 'purchaseOrderDetail',
            element: <PurchseOrderDetail/>
            
        },
        {
            path: 'supplier',
            element: <Supplier />
        }, 
        {
            path: 'stock',
            element: <Stock />
        },
        {
            path: 'location',
            element: <Location />
        }
    ]
}