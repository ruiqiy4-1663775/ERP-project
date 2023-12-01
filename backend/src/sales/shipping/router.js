import express from 'express';
const router = express.Router();
import * as shipping from './shipping.js'

router.post('/create_shipping', async (req, res, next) => {
    let params = req.body
    try {
        await shipping.createShipping(params['Order Number'], params['Carrier'],
            params['Tracking Number'], params['Estimated Delivery'])
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

// Get the list of shipping
router.get('/get_shipping', async(req, res, next) => {
    let orderNumber = req.query.orderId
    try {
        let result = await shipping.getShipping(orderNumber)
        res.send(result)
    } catch(err) {
        next(err)
    }
})
// get the shipment detail
router.get('/get_shipment', async(req, res, next) => {
    let shippingId = req.query['Shipping ID']
    try {
        let result = await shipping.getShipment(shippingId)
        res.send(result)
    } catch(err) {
        next(err)
    }
})
// update shipment detail
// has shippingId and newValues
router.post('/update_shipment', async (req, res, next) => {
    let params = req.body
    try {
        await shipping.updateShipment(params.shippingId, params.newValues)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})
// get shipping items
// has shippingId
router.get('/get_shipping_items', async(req, res, next) => {
    let shippingId = req.query.shippingId
    try {
        let result = await shipping.getShippingItems(shippingId)
        res.send(result)
    } catch(err) {
        next(err)
    }
})

router.post('/update_shipping_items', async (req, res, next) => {
    let shippingId = req.body.shippingId
    let deleteShippingItemList = req.body.deleteShippingItemList
    let addShippingItemList = req.body.addShippingItemList
    try {
        await shipping.updateShippingItems(shippingId, deleteShippingItemList, addShippingItemList)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})



export default router