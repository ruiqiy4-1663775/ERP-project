import Sales from "./Sales"
import SalesOrder from "./salesorder/SalesOrder"
import Price from "./price/Price"
import Customoer from "./customer/Customer"

export const salesRoutes = {
    path: "sales",
    element: <Sales />,
    children: [
        {
            path: "sales_order/:orderId?",
            element: <SalesOrder />,
        },
        {
            path: "price_management",
            element: <Price />
        },
        {
            path: "customer/:customerId?",
            element: <Customoer />
        },
    ]
}