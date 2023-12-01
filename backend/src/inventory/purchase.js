import { connection } from '../data_access_layer/dbconfig.js'
import mysql from 'mysql2'

/*
const orderInfo = {
    'Purchase ID': 'someId',
    'Supplier ID': 'someSupplierId',
    'Location ID': 'someLocationId',
    'Items': [
        {
            'Item ID': 'item1',
            'Unit Price': 10,
            'Quantity': 5
        },
        {
            'Item ID': 'item2',
            'Unit Price': 7,
            'Quantity': 2
        }
    ]
};
*/

async function addPurchaseOrder(orderInfo) {

    // Insert general order information into Purchases table
    let orderSql = `
        INSERT INTO Purchases(purchase_id, supplier_id, location_id) 
        VALUES (?, ?, ?)`;
    // await connection.execute(orderSql, [orderInfo['Purchase ID'], orderInfo['Supplier ID'], orderInfo['Location ID']]);
    let inserts = [orderInfo['Purchase ID'], orderInfo['Supplier ID'], orderInfo['Location ID']];
    orderSql = mysql.format(orderSql, inserts);
    console.log(orderSql);

    // Prepare data for batch insert into PurchaseItems table
    let itemsData = [];
    for (let item of orderInfo['Items']) {
        itemsData.push([orderInfo['Purchase ID'], item['Item ID'], item['Unit Price'], item['Quantity']]);
    }

    // Batch insert items into PurchaseItems table
    let itemSql = `
    INSERT INTO PurchaseItems(purchase_id, item_id, price, quantity, purchase_id) VALUE ?`;
    itemSql = mysql.format(intemSql, itemsData)

    let conn = await connection.getConnection()
    await conn.beginTransaction();
    try {
        await conn.execute(orderSql);
        await conn.execute(itemSql);
        await conn.commit();
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }


}

async function findPurchaseOrder(filters) {
    let sql = `
        SELECT purchase_id AS "Purchase ID",
        supplier_id as "Supplier ID",
        created_at as "Created Time",
        updated_at as "Last Update Time",
        location_id as "Location ID"
        FROM Purchases `
    const MAP = {'Purchase ID': 'purchase_id', 'Supplier ID': 'supplier_id',
    Status: 'purchase_status', 'Product ID': 'product_id'}
    let inserts = [];
    if (Object.keys(filters).length > 0) {
        let whereClauses = [];
        for (let field in filters) {
            if (field == 'startDate') {
                whereClauses.push(`DATE(updated_at) >= ?`);
            } else if (field === 'endDate') {
                whereClauses.push(`DATE(updated_at) <= ?`);
            } else {
                whereClauses.push(`${MAP[field]} = ?`);
            }
            inserts.push(filters[field]);
        }
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }
    sql = mysql.format(sql, inserts);
    let [result] = await connection.execute(sql)
    return result
}

async function deletePuchaseOrder(orderId) {
    let sql = `
        DELETE FROM Purchases WHERE purchase_id = ?`
    await connection.execute(sql, [orderId])
}

// Handle receive logic. Update inventory.
// pre the purchase order must exist
// The order must not be received already
// todo: need to revise
async function receive(purchaseId) {
    let updatePurchase = `
        UPDATE Purchases SET purchase_status = 'received' WHERE purchase_id = ?`
    let updateInventory = `
        INSERT INTO Inventory (product_id, location_id, quantity) 
        SELECT product_id, location_id, quantity
        FROM Purchases
        WHERE purchase_id = ?
        ON DUPLICATE KEY UPDATE Inventory.quantity = Inventory.quantity + VALUES(quantity)
    `
    let conn = await connection.getConnection()
    await conn.beginTransaction();
    try {
        await conn.execute(mysql.format(updatePurchase, [purchaseId]));
        await conn.execute(updateInventory, [purchaseId])
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export default {
    addPurchaseOrder,
    findPurchaseOrder,
    deletePuchaseOrder,
    receive
}
