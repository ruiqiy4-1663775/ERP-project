import { connection } from '../data_access_layer/dbconfig.js'
import mysql from 'mysql2'
// Location ID, Location Name, Address
async function addLocation(info) {
    let sql = `
        INSERT INTO Locations(location_id, location_name, address) VALUES (?, ?, ?)`
    await connection.execute(sql, [info['Location ID'], info['Location Name'], info['Address']])
}

async function findLocation(filters) {
    let sql = `
        SELECT location_id as "Location ID", location_name as "Location Name", address as Address
        FROM Locations `
    let clause = []
    let inserts = []
    const Map = {'Location ID': 'location_id', 'Location Name': 'location_name'}
    for (let field in filters) {
        clause.push(`${Map[field]} = ?`)
        inserts.push(filters[field])
    }
    if (clause.length != 0) {
        sql = sql + ' WHERE ' + clause.join(' AND ')
    }
    sql = mysql.format(sql, [inserts])
    let [result] = await connection.execute(sql)
    return result
}

async function updateLocation(locationId, newValues) {
    const Map = {'Location ID': 'location_id', 'Location Name': 'location_name', 
        'Address': 'address'}
    let setClause = []
    let inserts = []
    for (let field in newValues) {
        setClause.push(`${Map[field]} = ?`)
        inserts.push(newValues[field])
    }
    let sql = `
            UPDATE Locations SET `
    sql = sql + setClause.join(', ')
    sql = mysql.format(sql, [inserts])
    sql = sql + ` WHERE location_id = '${locationId}'`
    await connection.execute(sql);
}

async function deleteLocation(locationId) {
    let sql = `
        DELETE FROM Locations WHERE location_id = '${locationId}'`
    await connection.execute(sql)
}

export default {
    addLocation,
    findLocation,
    updateLocation,
    deleteLocation
}