import express from 'express';
const router = express.Router();
import * as salesOrder from './salesorder/salesorder.js'
import * as customerHandler from './customer.js'
import { connection } from '../data_access_layer/dbconfig.js';
import mysql from 'mysql2';
import * as audit_service from '../service/audit_service.js'
import {updateTable, Upsert, createTier, getCustomerPrice, requestTierChange} from './price.js'
import * as price from './price.js'
import customer from './customer.js';
import salesOrderRouter from './salesorder/router.js'
import shippingRouter from './shipping/router.js'
import returnRouter from './return/returnRouter.js'

router.use(salesOrderRouter)
router.use(shippingRouter)
router.use(returnRouter)

router.post('/add_customer', async (req, res, next) => {
    let parameters = req.body;
    let sql = `INSERT INTO Customers(customer_id, customer_name, phone, email, address, price_tier) VALUES 
        (?, ?, ?, ?, ?, ?)`;
    try {
        sql = mysql.format(sql,[parameters['Customer ID'], parameters['Customer Name'], 
            parameters['Phone Number'], parameters['Email'], parameters['Address'], parameters['Price Tier']] )
        console.log(sql)
        await connection.execute(sql)
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
        let result = await customerHandler.autoCompleteCustomer(req.query.query)
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
// submits a request of changing customer's price tier
// req.body needs to have Customer ID, Current Tier, New Tier, Request Description
router.post('/request_change_customer_tier', async (req, res, next) => {
    try {
        let initiator = req.user.username
        let result = await requestTierChange(req.body['Customer ID'], req.body['Current Tier'], req.body['New Tier'],
            initiator, req.body['Request Description'])
        res.send(result)
    } catch (err) {
        next(err)
    }
})
// req.query is a filter
router.get('/find_price', async (req, res, next) => {
    try {
        let result = await price.findPrice(req.query)
        res.send(result)
    } catch(err) {
        next(err)
    }
})
// req.body.newValues needs to have productId, price, priceTier
// It creates or update the given price record
router.post('/update_price', async (req, res, next) => {
    try {
        await updateTable(req.body.newValues)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})
// req.body.list should contain a list of product keys
// req.body['Unit Price'] should be the price
// req.body['Price Tier'] should be the tier name
router.post('/update_price_list', async (req, res, next) => {
    audit_service.updatePriceTier(req.user.username, req.body.list, req.body['Price Tier'], req.body['Unit Price'])
    try {
        await Upsert(req.body.list, req.body['Unit Price'], req.body['Price Tier'] )
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})
// needs to have priceTier
router.post('/delete_tier', async (req, res, next) => {
    let tier = req.body.priceTier 
    try {
        await price.deleteTier(tier)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

router.get('/get_priceTier_list', async (req, res, next) => {
    try {
        let result = await price.getPriceTierList()
        res.send(result)
    } catch(err) {
        next(err)
    }
})

router.post('/create_tier_from_base', async (req, res, next) => {
    let baseTier = req.body['Base Tier']
    let newTier = req.body['Price Tier']
    let list = req.body.list
    try {
        await createTier(list, newTier, baseTier)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})


export default router
