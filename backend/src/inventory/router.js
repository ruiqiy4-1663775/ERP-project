import express from 'express'
const router = express.Router();
import * as supplier from './supplier.js'
import purchase from './purchase.js'
import stock from './stock.js';
import location from './location.js';
import * as items from './items.js'

router.post('/add_item', async (req, res, next) => {
    try {
        let {item_name, item_description, collection} = req.body;
        console.log('add_item received payload:', req.body)
        await items.createItem(item_name, item_description, collection)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

router.get('/find_item', async (req, res, next) => {
    try {
        let result = await items.findItem(req.query)
        res.send(result)
    } catch (err) {
        next(err)
    }
})
// has itemId and newValues
router.post('/update_item', async (req, res, next) => {
    try {
        await items.updateItem(req.body.itemId, req.body.newValues)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

router.post('/new_supplier', async (req, res, next) => {
    try {
        await supplier.addSupplier(req.body)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// has either Supplier Name or Supplier ID
router.get('/find_supplier', async (req, res, next) => {
    try {
        let result = await supplier.findSupplier(req.query)
        res.send(result)
    } catch (err) {
        next(err)
    }
})
// has supplierId, newValues
router.post('/update_supplier', async (req, res, next) => {
    try {
        await supplier.updateSupplier(req.body.supplierId, req.body.newValues)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})
// supplierId
router.post('/delete_supplier', async (req, res, next) => {
    try {
        await supplier.deleteSupplier(req.body.supplierId)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

// has all the label in the frontend
router.post('/new_purchase_order', async (req, res, next) => {
    try {
        await purchase.addPurchaseOrder(req.body)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

router.get('/find_purchase_order', async (req, res, next) => {
    try {
        let result = await purchase.findPurchaseOrder(req.query)
        res.send(result)
    } catch (err) {
        next(err)
    }
})
// need to have purchaseId
router.post('/delete_purchase_order', async (req, res, next) => {
    try {
        await purchase.deletePuchaseOrder(req.body.purchaseId)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})
// need to have purchaseId
router.post('/receive_purchase', async (req, res, next) => {
    try {
        await purchase.receive(req.body.purchaseId)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/stocks', async (req, res, next) => {
    try {
        let result = await stock.getStock()
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.post('/new_location', async (req, res, next) => {
    try {
        await location.addLocation(req.body)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

router.get('/find_location', async (req, res, next) => {
    try {
        let result = await location.findLocation(req.query)
        res.send(result)
    } catch (err) {
        next(err)
    }
})
// locationId
router.post('/delete_location', async (req, res, next) => {
    try {
        await location.deleteLocation(req.body.locationId)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})
// has locationId and newValues
router.post('/update_location', async (req, res, next) => {
    try {
        await location.updateLocation(req.body.locationId, req.body.newValues)
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

export default router