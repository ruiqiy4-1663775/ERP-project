import express from 'express'
const router = express.Router();
import * as customer from './customer.js'

router.post('/add_customer', async (req, res, next) => {
    let parameters = req.body;
    try {
        await customer.addCustomer(parameters)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
    
})

// pre: a filter object sent from client
router.get('/find_customer', async (req, res, next) => {
    try {
        let result = await customer.findCustomer(req.query)
        res.send(result)
    } catch(err){
        next(err)
    }
})

router.post('/delete_customer', async (req, res, next) => {
    let sql = `DELETE FROM Customers T0 WHERE customer_id = '${req.body['Customer ID']}'`
    try {
        await connection.execute(sql)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})
// has customerId, newvalues
router.post('/update_customer', async (req, res, next) => {
    try {
        await customer.updateCustomer(req.body.customerId, req.body.newvalues)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

router.get('/autocomplete_customer', async (req, res, next) => {
    try {
        // console.log(req.query.query)
        let result = await customer.autoCompleteCustomer(req.query.query)
        res.send(result)
    } catch(err) {

        next(err)
    }
})
// get the price info for a given customer. 
// pre: req.body needs to be a filter
router.post('/get_customer_price', async (req, res, next) => {
    try {
        let result = await getCustomerPrice(req.body)
        // console.log(result)
        res.send(result)
    } catch (err) {
        next(err)
    }
})
export default router