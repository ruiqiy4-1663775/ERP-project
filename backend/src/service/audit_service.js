import { connection } from '../data_access_layer/dbconfig.js';
import mysql from 'mysql2';

export function updateDetail(username, tableName, filters, newValues) {
    let detail = 'where '
    detail = detail + Object.keys(filters).map((key) => `${key} = ${filters[key]}`).join(' AND ')
    detail = detail + ', new values: '
    detail = detail + Object.keys(newValues).map((key) => `(${key} = ${newValues[key]})`).join(' AND ')
    let auditSql = mysql.format(`INSERT INTO Audition(username, activity, target, detail) VALUES ('${username}',
     'update', '${tableName}', ?)`, detail)
    connection.execute(auditSql)
    // console.log(auditSql)
}

export function updatePriceTier(username, list, tier, price) {
    let sql = `INSERT INTO Audition(username, activity, target, detail) VALUES ('${username}',
    'update', 'Price Tier', 'update products [${list}] to have tier = ${tier} and price = ${price}') `
    connection.execute(sql)
    // console.log(sql)
}

export function find_products_audit(username, filters) {
    let whereClauses = [];
    for (let field in filters) {
        whereClauses.push(`${field} = ${filters[field]}`);
    }
    let detail = ''
    if (whereClauses.length != 0) {
        detail = 'Filters: ' + whereClauses.join(' AND ')
    } else {
        detail = 'All Products'
    }
    let sql = `INSERT INTO Audition(username, activity, target, detail) VALUES 
        ('${username}', 'view', 'Products', '${detail}' )`
    connection.execute(sql)
}

