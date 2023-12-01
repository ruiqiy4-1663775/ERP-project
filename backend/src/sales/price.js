import mysql from 'mysql2'
import { connection } from '../data_access_layer/dbconfig.js'
import { addWhereClause } from '../service/utils.js'

const MAP = {
    'Product ID': 'T0.product_id',
    'Price Tier': 'T0.price_tier',
    'Unit Price': 'price',
    'Product Name': 'product_name',
    'Collection': 'collection',
    'Customer ID': 'customer_id',
    'Customer Name': 'customer_name',
    'Phone Number': 'phone',
    'Email Address': 'email',
}

// find price records from the Prices table
// If a record does not exist, then null is filled
export async function findPrice(filters) {
    const MAP = {
        'Price Tier': 'T2.price_tier',
        'Unit Price': 'price',
        'Item ID': 'T1.item_id',
        'Collection': 'collection',
    }
    const FIND_PRICE = `
    SELECT 
    T1.item_id AS "Item ID", 
    item_name AS "Item Name", 
    collection AS "Collection", 
    price AS "Unit Price", 
    T2.price_tier AS "Price Tier" 
    FROM Items T1
    CROSS JOIN (SELECT price_tier FROM PriceTiers) T2
    LEFT JOIN Prices T0 ON T0.item_id = T1.item_id AND T0.price_tier = T2.price_tier
    `
    let sql = addWhereClause(FIND_PRICE, filters, MAP) + 'ORDER BY T2.price_tier ASC, collection ASC';
    const [result] = await connection.execute(sql)
    return result
}
// display the price info for a given customer. 
// The function returns an array
export async function getCustomerPrice(filters) {
    const GET_PRICE = `
        SELECT customer_id AS 'Customer ID', customer_name AS 'Customer Name', phone as Phone, 
        email as Email, address as Address, 
        T0.price_tier as 'Price Tier', product_id as 'Product ID', price as Price 
        FROM Customers T0 INNER JOIN Prices T1 ON T0.price_tier = T1.price_tier
    `
    let sql = addFilter(GET_PRICE, filters)
    // console.log(sql)
    const [result] = await connection.execute(sql)
    // console.log(result)
    return result;
}
// This function initiate a price tier change request
export async function requestTierChange(customerId, olderTier, newTier, initiator, requestDescription) {
    let sql = `INSERT INTO CustomerTierRequests(customer_id, initiator, request_description, old_tier, new_tier, request_status)
        VALUES (?, ?, ?, ?, ?, 'pending')`
    sql = mysql.format(sql, [customerId, initiator, requestDescription, olderTier, newTier])
    console.log(`\nThis is requestTierChange\n`)
    console.log('Here is the sql\n  ', sql)
    const [result] = await connection.execute(sql)
    console.log(result)
    return result
}

// newValues has productId, price, priceTier
export async function updateTable(newValues) {
    let query = `
        INSERT INTO Prices(item_id, price, price_tier)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        price = VALUES(price)`;
    let sql = mysql.format(query, [newValues.itemId, newValues.price, newValues.priceTier]);
    await connection.execute(sql)
}

// This function applies filter to the sql statement (WHERE clause)
export function addFilter(sql, filters) {
    let inserts = [];
    if (Object.keys(filters).length > 0) {
        let whereClauses = [];
        for (let field in filters) {
            whereClauses.push(`${MAP[field]} = ?`);
            inserts.push(filters[field]);
        }
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }
    sql = mysql.format(sql, inserts);
    return sql;
}

export async function Upsert(list, price, price_tier) {
    const INSERT_UPDATE = `
    INSERT INTO Prices (item_id, price, price_tier)
    VALUES ?
    ON DUPLICATE KEY UPDATE
    price = VALUES(price)
  `;
    let result = []
    for (let id of list) {
        result.push([id, price, price_tier])
    }
    let sql = mysql.format(INSERT_UPDATE, [result])
    let sql2 = `
    INSERT IGNORE INTO PriceTiers VALUES ('${price_tier}')`
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await conn.execute(sql2)
        await conn.execute(sql)
        await conn.commit()
    } catch(err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export async function createTier(list, newTier, baseTier) {
    const productIds = list.map(id => `'${id}'`).join(',');
    let sql = `
        INSERT IGNORE INTO PriceTiers VALUES ('${newTier}')`
    const INSERT_UPDATE = `
        INSERT INTO Prices (item_id, price, price_tier)
        SELECT item_id, price, '${newTier}'
        FROM Prices
        WHERE price_tier = '${baseTier}' AND item_id IN (${productIds})
        ON DUPLICATE KEY UPDATE
        price = VALUES(price)
    `;
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await conn.execute(sql)
        await conn.execute(INSERT_UPDATE)
        await conn.commit()
    } catch(err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export async function deleteTier(priceTier) {
    let sql = `
        DELETE FROM Prices WHERE price_tier = ?`
    let sql2 = `
        DELETE FROM PriceTiers WHERE price_tier = ?`
    let conn = await connection.getConnection()
    await conn.beginTransaction()
    try {
        await conn.execute(sql, [priceTier])
        await conn.execute(sql2, [priceTier])
        await conn.commit()
    } catch(err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export async function getPriceTierList() {
    let sql = `
        SELECT DISTINCT price_tier AS "Price Tier" FROM PriceTiers`
    let [result] = await connection.execute(sql)
    return result
}