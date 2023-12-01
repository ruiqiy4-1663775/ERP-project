import express from 'express';
const router = express.Router();
import * as returnHandler from './return.js'

// it needs orderId
router.get('/get_return', async (req, res, next) => {
    let orderId = req.query.orderId
    try {
        let result = await returnHandler.findReturn(orderId)
        res.send(result)
    } catch(err) {
        next(err)
    }
})

// has orderId, deleteReturnList, addReturnList
router.post('/update_return_items', async (req, res, next) => {
    try {
        await returnHandler.updateReturnItems(req.body.orderId, 
            req.body.deleteReturnList,
            req.body.addReturnList)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

export default router