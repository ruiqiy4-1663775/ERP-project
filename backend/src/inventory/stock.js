import { connection } from '../data_access_layer/dbconfig.js'

async function getStock() {
    let sql = `
        SELECT * FROM Inventory`
    let [result] = await connection.execute(sql)
    return result
}

export default {
    getStock
}