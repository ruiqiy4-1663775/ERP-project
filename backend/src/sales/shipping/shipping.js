import { connection } from '../../data_access_layer/dbconfig.js';
import { addSetClause } from '../../service/utils.js';
import mysql from 'mysql2'

export async function createShipping(orderId, carrier, trackingNumber, estimateTime) {
    let sql = 
        'INSERT INTO Shippings(order_id, shipping_status, carrier, tracking_number, ' +
        'estimated_delivery)' +
        ' VALUES(?, \'pending\', ?, ?, ?)'
    await connection.execute(sql, [orderId, carrier, trackingNumber, estimateTime])
    
}

// get the list of shipping
export async function getShipping(orderNumber) {
    let sql = `
        SELECT shipping_id as "Shipping ID",
        shipping_status as "Shipping Status",
        carrier as Carrier,
        tracking_number as "Tracking Number",
        estimated_delivery as "Estimated Delivery",
        actual_delivery as "Actual Delivery"
        FROM Shippings 
        WHERE order_id = '${orderNumber}'`
    let [result] = await connection.execute(sql)
    return result
}
// get the specific shipping info
export async function getShipment(shippingId) {
    let sql = `
        SELECT shipping_id as "Shipping ID",
        shipping_status as "Shipping Status",
        carrier as Carrier,
        tracking_number as "Tracking Number",
        estimated_delivery as "Estimated Delivery",
        actual_delivery as "Actual Delivery"
        FROM Shippings 
        WHERE shipping_id = ${shippingId}`
    let [shipmentInfo] = await connection.execute(sql)
    return shipmentInfo
}

export async function getShippingItems(shippingId) {
    let getShipItems = `
    SELECT item_id AS "Item ID",
    quantity AS Quantity
    FROM ShippingItems
    WHERE shipping_id = ${shippingId}`
    let [shippingItemList] = await connection.execute(getShipItems)
    return shippingItemList
}

export async function updateShipment(shippingId, newValues) {
    let updateSql = 'UPDATE Shippings '
    const Map = {'Shipping Status': 'shipping_status', 
        Carrier: 'carrier', 'Tracking Number': 'tracking_number', 'Estimated Delivery':
        'estimated_delivery', 'Actual Delivery': 'actual_delivery'}
    updateSql = addSetClause(updateSql, newValues, Map)
    updateSql += ' WHERE shipping_id = ' + shippingId
    await connection.execute(updateSql)
}

export async function updateShippingItems(shippingId, deleteShippingItemList, addShippingItemList) {
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await deleteShippingItem(shippingId, deleteShippingItemList, conn)
        await addShippingItem(shippingId, addShippingItemList, conn)
        await conn.commit()
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

async function addShippingItem(shippingId, addShippingItemList, conn) {
    if (addShippingItemList.length !== 0) {
        let sql = `
            INSERT INTO ShippingItems (shipping_id, item_id, quantity)
            VALUES ?`
        let values = addShippingItemList.map((item) => [shippingId, item['Item ID'], item['Quantity']])
        sql = mysql.format(sql, [values])
        await conn.execute(sql)
    }
}

async function deleteShippingItem(shippingId, deleteShippingItemList, conn) {
    if (deleteShippingItemList.length !== 0) {
        let sql = `
            DELETE FROM ShippingItems WHERE shipping_id = '${shippingId}' AND item_id in (?)`
        let ids = deleteShippingItemList.map((item) => item['Item ID'])
        sql = mysql.format(sql, [ids])
        await conn.execute(sql)
    }
}