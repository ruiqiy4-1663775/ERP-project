import { getItemList } from "./src/sales/salesorder/salesorder.js"
import { autoCompleteCustomer } from "./src/sales/customer.js"
import supplier from './src/inventory/supplier.js'
async function test() {
    let result = await supplier.findSupplier({'Supplier ID':'1'})
    console.log(result)
}
test()



