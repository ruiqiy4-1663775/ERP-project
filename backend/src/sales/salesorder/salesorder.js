import mysql from 'mysql2';
import { connection } from '../../data_access_layer/dbconfig.js';
import * as returns from '../return/return.js'
import * as shipping from '../shipping/shipping.js'

export async function findOrder(filter) {
    let FIND_ORDER = `
        SELECT 
        T0.order_id AS "Order Number", 
        order_timestamp AS "Order Time", 
        order_status AS "Order Status",
        employee_id AS "Employee ID", 
        T0.customer_id AS "Customer ID", 
        customer_name AS "Customer Name",
        phone AS Phone, 
        email AS Email, 
        address AS Address
        FROM Orders T0 
        INNER JOIN Customers T1 ON T0.customer_id = T1.customer_id `
    let MAP = {
        'Customer Name': 'T1.customer_name',
        'Phone Number': 'phone', 'Email Address': 'email', 'Order Number': 'T0.order_id',
        'Customer ID': 'T0.customer_id', 'Employee ID': 'employee_id', 'Order Status': 'order_status'
    }
    if (Object.keys(filter) != 0) {
        let whereClause = []
        for (let field in filter) {
            if (field == 'startDate') {
                whereClause.push(`DATE(order_timestamp) >= '${filter[field]}'`)
            } else if (field == 'endDate') {
                whereClause.push(`DATE(order_timestamp) <= '${filter[field]}'`)
            } else {
                whereClause.push(`${MAP[field]} = '${filter[field]}'`)
            }
        }
        FIND_ORDER += ' WHERE ' + whereClause.join(' AND ');
    }
    const [result] = await connection.execute(FIND_ORDER)
    return result;
}

export async function getDetail(orderId) {
    let getProduct = `
        SELECT order_id AS "Order Number", item_id AS "Item ID", price AS "Unit Price", quantity AS Quantity
        FROM OrderItems WHERE order_id = ?`
    let getReturns = `
        SELECT item_id AS "Item ID", quantity AS Quantity, return_status AS "Return Status"
        FROM Returns
        WHERE order_id = ?`
    let result = {}
    let [items] = await connection.execute(getProduct, [orderId])
    let [returns] = await connection.execute(getReturns, [orderId])
    let shippingInfo = await shipping.getShipping(orderId)
    result.itemList = items
    result.returnList = returns
    result.shipmentList = shippingInfo
    return result
}

export async function getOrderItems(orderId) {
    let getItems = `
        SELECT order_id AS "Order Number", item_id AS "Item ID", price AS "Unit Price", quantity AS Quantity
        FROM OrderItems WHERE order_id = ?`
    let [items] = await connection.execute(getItems, [orderId])
    return items
}

export async function deleteOrder(orderId) {
    let deleteOrderProduct = `DELETE FROM OrderItems WHERE order_id = '${orderId}'`
    let sql = `DELETE FROM Orders WHERE order_id = '${orderId}'`
    let deleteReturn = 'DELETE FROM Returns WHERE order_id = \'' + orderId + '\''
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await conn.execute(deleteOrderProduct)
        await conn.execute(deleteReturn)
        await conn.execute(sql)
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export async function updateOrder(orderId, customerId, newValues, deleteReturnList, deleteItemList,
    addReturnList, addItemList) {
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await updateTable(orderId, newValues, conn)
        await returns.deleteReturn(orderId, deleteReturnList, conn)
        await returns.initiateReturn(orderId, addReturnList, conn)
        await deleteOrderItem(orderId, deleteItemList, conn)
        await insertProducts(orderId, addItemList, customerId, conn)
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

async function updateTable(orderId, newValues, conn) {
    if (Object.keys(newValues).length !== 0) {
        const MAP = { 'Employee ID': 'employee_id', 'Order Status': 'order_status' }
        let setClause = Object.keys(newValues).map((key) => `${MAP[key]} = ?`).join(', ');
        let query = `UPDATE Orders SET ${setClause} WHERE order_id = '${orderId}'`;
        let values = [...Object.values(newValues)];
        let sql = mysql.format(query, values);
        await conn.execute(sql)
    }
}

export async function updateTableV2(orderId, newValues) {
    if (Object.keys(newValues).length !== 0) {
        const MAP = { 'Employee ID': 'employee_id', 'Order Status': 'order_status' }
        let setClause = Object.keys(newValues).map((key) => `${MAP[key]} = ?`).join(', ');
        let query = `UPDATE Orders SET ${setClause} WHERE order_id = '${orderId}'`;
        let values = [...Object.values(newValues)];
        let sql = mysql.format(query, values);
        await connection.execute(sql)
    }
}

export async function addOrder(formState, productList) {
    let sql = "INSERT INTO Orders(customer_id, employee_id," +
        " order_status) VALUES (?, ?, 'pending')"
    let sqlLastInsertedId = "SELECT LAST_INSERT_ID() as order_number";
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await conn.execute(mysql.format(sql, [formState['Customer ID'],
        formState['Employee ID']]));
        let [rows] = await conn.execute(sqlLastInsertedId);
        let orderNumber = rows[0].order_number;
        await insertNewOrderProducts(orderNumber, formState['Customer ID'], 
            productList, conn)
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export async function updateOrderItems(orderId, deleteItemList, addItemList) {
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await deleteOrderItem(orderId, deleteItemList, conn)
        await insertProducts(orderId, addItemList, conn)
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

async function deleteOrderItem(orderId, deleteItemList, conn) {
    if (deleteItemList.length !== 0) {
        const placeholders = deleteItemList.map(() => '?').join(',');
        let sql = `
        DELETE FROM OrderItems 
        WHERE order_id = ? AND item_id IN (${placeholders})
    `
        const itemIds = deleteItemList.map(obj => obj['Item ID']);
        await conn.execute(sql, [orderId, ...itemIds]);
    }
}

// insert the items into OrderItems table
// item needs to contain productId, quantity, customerId
async function insertNewOrderProducts(orderId, customerId, itemList, conn) {
    if (itemList.length !== 0) {
        // get price tier
        let getPriceTier = 'SELECT price_tier FROM Customers WHERE customer_id = ?'
        getPriceTier = mysql.format(getPriceTier, [customerId])
        const [result] = await conn.execute(getPriceTier)
        const priceTier = result[0].price_tier
        for (let item of itemList) {
            let sql = `
            INSERT INTO OrderItems (order_id, item_id, price, quantity)
            VALUES
            ('${orderId}', '${item['Item ID']}', (SELECT price
            FROM Prices
            WHERE item_id = '${item['Item ID']}' AND price_tier = '${priceTier}'), '${item.Quantity}');
            `
            let [result] = await conn.execute(sql)
        }
    }
}

// insert the items into OrderItems table
// The order must exist already
// item needs to contain productId, quantity
async function insertProducts(orderId, itemList, conn) {
    if (itemList.length !== 0) {
        let orders = await findOrder({'Order Number': orderId})
        let customerId = orders[0]['Customer ID']
        // get price tier
        let getPriceTier = 'SELECT price_tier FROM Customers WHERE customer_id = ?'
        getPriceTier = mysql.format(getPriceTier, [customerId])
        const [result] = await conn.execute(getPriceTier)
        const priceTier = result[0].price_tier
        for (let item of itemList) {
            let sql = `
            INSERT INTO OrderItems (order_id, item_id, price, quantity)
            VALUES
            ('${orderId}', '${item['Item ID']}', (SELECT price
            FROM Prices
            WHERE item_id = '${item['Item ID']}' AND price_tier = '${priceTier}'), '${item.Quantity}');
            `
            let [result] = await conn.execute(sql)
        }
    }
}

export async function getItemList() {
    let sql = `
        SELECT DISTINCT item_id FROM Items`
    let [result] = await connection.execute(sql)
    return result
}
