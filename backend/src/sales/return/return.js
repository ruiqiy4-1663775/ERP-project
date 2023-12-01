import mysql from 'mysql2';
import { connection } from '../../data_access_layer/dbconfig.js';

export async function updateReturnItems(orderId, deleteReturnList, addReturnList) {
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await deleteReturn(orderId, deleteReturnList, conn)
        await initiateReturn(orderId, addReturnList, conn)
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

async function initiateReturn(orderId, returnList, conn) {
    if (returnList.length !== 0) {
    const INSERT_RETURN = `
        INSERT INTO Returns (order_id, item_id, quantity, return_status, reason)
        VALUES ?
        ON DUPLICATE KEY UPDATE
        quantity = VALUES(quantity),
        reason = VALUES(reason),
        received_time = CASE 
        WHEN VALUES(return_status) = 'received' AND return_status != VALUES(return_status) THEN CURRENT_TIMESTAMP
        ELSE received_time
        END,
        return_status = VALUES(return_status)
    `
        let values = []
        for (let item of returnList) {
            values.push([orderId, item['Item ID'], item['Quantity'], item['Return Status'], item['Reason']])
        }
        let sql = mysql.format(INSERT_RETURN, [values])
        await conn.execute(sql)
    }
}

async function deleteReturn(orderId, deleteReturnList, conn) {
    if (deleteReturnList.length !== 0) {
        // Generate placeholders based on the length of deleteReturnList
        const placeholders = deleteReturnList.map(() => '?').join(',');

        // Create SQL query string with IN clause
        const sql = `
      DELETE FROM Returns
      WHERE order_id = ? AND item_id IN (${placeholders})
    `;

        // Extract item_id from each object in deleteReturnList
        const itemIds = deleteReturnList.map(obj => obj['Item ID']);

        // Execute the query
        await conn.execute(sql, [orderId, ...itemIds]);
    }
}

export async function findReturn(orderId) {
    let getReturns = `
        SELECT item_id AS "Item ID", quantity AS Quantity, return_status AS "Return Status", reason AS "Reason",
        initiate_time AS "Initiate Time", received_time AS "Received Time", refund_time AS "Refund Time"
        FROM Returns
        WHERE order_id = ?`
    let [returnList] = await connection.execute(getReturns, [orderId])
    return returnList
}
