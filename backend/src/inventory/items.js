import { connection } from '../data_access_layer/dbconfig.js'
import { addWhereClause, addSetClause } from '../service/utils.js'

export async function findItem(filters) {
    let sql = `
        SELECT item_id as "Item ID", item_name as "Item Name", collection as "Collection",
        item_description as "Item Description", item_type as "Item Type", unit as "Unit"
        FROM Items `
    const Map = {'Item ID': 'item_id', 'Item Name': 'item_name', 'Collection': 
        'collection', 'Item Type': 'item_type'}
    if (Object.keys(filters).length !== 0) {
        sql = addWhereClause(sql, filters, Map)
    }
    let [result] = await connection.execute(sql)
    return result
}

export async function updateItem(itemId, newValues) {
    const Map = {'Item ID': 'item_id', 'Item Name': 'item_name', 'Collection': 
        'collection', 'Item Type': 'item_type', 'Item Description': 'item_description',
        'Unit': 'unit'}
    let sql = 'UPDATE Items '
    sql = addSetClause(sql, newValues, Map)
    sql = sql + ` WHERE item_id = '${itemId}'`
    await connection.execute(sql);
}