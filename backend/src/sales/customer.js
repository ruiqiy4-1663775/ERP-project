import { connection } from '../data_access_layer/dbconfig.js'
import mysql from 'mysql2'

async function findCustomer(filter) {
    const Map = {
        'Customer ID': 'customer_id', 'Customer Name': 'customer_name',
        'Phone Number': 'phone', 'Email Address': 'email', 'Price Tier': 'price_tier'
    }
    let sql = `
        SELECT customer_id AS "Customer ID", customer_name AS "Customer Name", phone as "Phone Number",
        email as "Email Address", price_tier as "Price Tier", address as "Address" FROM Customers `
    sql = addFilter(sql, filter, Map)
    let [result] = await connection.execute(sql)
    return result
}

async function updateCustomer(customerId, newValues) {
    const Map = {
        'Customer ID': 'customer_id', 'Customer Name': 'customer_name',
        'Phone Number': 'phone', 'Email Address': 'email', 'Price Tier': 'price_tier',
        Address: 'address'
    }
    let setClause = []
    let inserts = []
    for (let field in newValues) {
        setClause.push(`${Map[field]} = ?`)
        inserts.push(newValues[field])
    }
    let sql = `
         UPDATE Customers SET `
    sql = sql + setClause.join(', ')
    sql = mysql.format(sql, inserts)
    sql = sql + ` WHERE customer_id = '${customerId}'`
    await connection.execute(sql);
}

export async function autoCompleteCustomer(customerName) {
    const [rows] = await connection.execute(
        'SELECT * FROM Customers WHERE customer_name LIKE ? LIMIT 10',
        [`${customerName}%`]
    );
    // const suggestions = rows.map(row => row.customer_name + 'ID: ' + row.customer_id);
    // console.log(rows)
    return rows
}

// applies filter to the sql statement (WHERE clause)
// revised version that takes a MAP
function addFilter(sql, filters, MAP) {
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

export default {
    findCustomer,
    updateCustomer
}