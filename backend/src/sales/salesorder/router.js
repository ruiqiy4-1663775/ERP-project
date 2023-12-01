import express from 'express';
const router = express.Router();
import * as salesOrder from './salesorder.js'

// has orderId, customerId, newvalues, deleteReturnList, deleteItemList, addReturnList, addItemList
router.post('/update_salesorder', async (req, res, next) => {
    try {
        await salesOrder.updateOrder(req.body.orderId, req.body.customerId, req.body.newvalues, 
            req.body.deleteReturnList, req.body.deleteItemList, req.body.addReturnList, 
            req.body.addItemList)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

// has orderId, customerId, newValues, deleteReturnList, deleteItemList, addReturnList, addItemList
router.post('/update_salesorderv2', async (req, res, next) => {
    try {
        await salesOrder.updateTableV2(req.body.orderId, req.body.newValues)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})


// req.body needs to have itemList, formState
router.post('/add_order', async (req, res, next) => {
    let parameters = req.body;
    // let customer_sql = `SELECT * FROM Customers T0 INNER JOIN Prices T1 ON T0.price_tier = 
    //     T1.price_tier WHERE customer_id = ? AND product_id = ?`
    try {
        // const [rows] = await connection.execute(mysql.format(customer_sql, [parameters.customerId, parameters.product_id]));
        // let email = rows[0].email
        await salesOrder.addOrder(parameters.formState, parameters.itemList)
        res.sendStatus(200)
        // console.log(Number(parameters.quantity)*Number(rows[0].price))
        // console.log(Number(parameters.quantity), Number(rows[0].price))
        // mailOrderConfirmation({
        //     orderNumber: parameters.order_id,
        //     date: Date(),
        //     items: [
        //         { name: parameters.product_id, quantity: parameters.quantity, price: rows[0].price },
        //     ],
        //     total: Number(parameters.quantity)*Number(rows[0].price),
        // }, email)
    } catch(error) {
        next(error)
    }
})
// pre: a filter object sent from client
router.get('/find_order', async (req, res, next) => {
    try {
        let result = await salesOrder.findOrder(req.query)
        res.send(result)
    } catch(err) {
        next(err)
    }
})

// needs to have orderId
router.post('/delete_order', async (req, res, next) => {
    try {
        await salesOrder.deleteOrder(req.body.orderId)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

// pre:req.body.orderId
// response has itemList and returnList, and each one is an array
router.get('/get_order_detail', async (req, res, next) => {
    let orderId = req.query.orderId
    try {
        let result = await salesOrder.getDetail(orderId)
        res.send(result)
    } catch(err) {
        next(err)
    }
})

router.get('/get_order_items', async (req, res, next) => {
    let orderId = req.query.orderId
    try {
        let result = await salesOrder.getOrderItems(orderId)
        res.send(result)
    } catch(err) {
        next(err)
    }
})

// has orderId, deleteItemList, addItemList
router.post('/update_order_items', async (req, res, next) => {
    try {
        await salesOrder.updateOrderItems(req.body.orderId,
            req.body.deleteItemList,
            req.body.addItemList)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

router.get('/get_item_list', async (req, res, next) => {
    try {
        let result = await salesOrder.getItemList()
        res.send(result)
    } catch (err) {
        next(err)
    }
})


export default router