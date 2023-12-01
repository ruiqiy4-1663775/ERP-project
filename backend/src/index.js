import express from 'express';
const router = express.Router();
import { updateTable } from './data_access_layer/data_access.js';
import { connection } from './data_access_layer/dbconfig.js';
import { authenticateToken } from './authentication/auth.js';
import salesRouter from './sales/router.js'
import adminRouter from './admin/router.js'
import inventoryRouter from './inventory/router.js'
import * as audit from './service/audit_service.js';

// check a valid token. if not: error 403
router.use(authenticateToken);
router.use(salesRouter)
router.use(adminRouter)
router.use(inventoryRouter)
// pass authenticateToken middleware
router.post('/verify', (req, res) => {
    res.send('verify success');
})

router.post('/update', async (req, res, next) => {
    let sql = updateTable(req.body.tablename, req.body.conditions, req.body.newvalues)
    audit.updateDetail(req.user.username, req.body.tablename, req.body.conditions, req.body.newvalues)
    try {
        await connection.execute(sql)
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
})

// module.exports = router;
export default router