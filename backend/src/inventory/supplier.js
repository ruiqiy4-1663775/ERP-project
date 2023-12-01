import { connection } from '../data_access_layer/dbconfig.js'
import mysql from 'mysql2'
import { addWhereClause, addSetClause } from '../service/utils.js'
import mysqlv2 from "mysql2/promise";

// *Vendor Name       *Contact
// *Address           *Phone
// Apt/Units #        *Primary Email
// *City              Secondary Email
// *State             Note
// zipcode
// *Country
async function addSupplier(info) {
    const keyMap = {
        "Address line 1": "supplier_address_line1",
        "Address line 2": "supplier_address_line2",
        "City": "supplier_city",
        "Contact Name": "contact_name",
        "Contact Phone": "contact_phone",
        "Contact Primary Email": "contact_primary_email",
        "Contact Secondary Email": "contact_secondary_email",
        "Contact Title": "contact_title",
        "Country": "supplier_country",
        "Note": "note",
        "State": "supplier_state",
        "Supplier Name": "supplier_name",
        "Zip": "supplier_zipcode"
    };

    const supplierInfo = Object.keys(info).reduce((newObj, key) => {
        const newKey = keyMap[key] || key;
        newObj[newKey] = info[key];
        return newObj;
    }, {});
    const requiredParams = ['supplier_name',
        'supplier_address_line1',
        'supplier_city', 'supplier_state',
        'supplier_zipcode', 'supplier_country', 'contact_primary_email'];

    for (const param of requiredParams) {
        if (supplierInfo[param] === undefined) {
            throw new Error(`Missing required parameter: ${param}`);
        }
    }

    let inserts = [
        supplierInfo['supplier_name'] ?? null,
        supplierInfo['supplier_address_line1'] ?? null,
        supplierInfo['supplier_address_line2'] ?? null,
        supplierInfo['supplier_city'] ?? null,
        supplierInfo['supplier_state'] ?? null,
        supplierInfo['supplier_zipcode'] ?? null,
        supplierInfo['supplier_country'] ?? null,
        supplierInfo['contact_name'] ?? null,
        supplierInfo['contact_title'] ?? null,
        supplierInfo['contact_phone'] ?? null,
        supplierInfo['contact_primary_email'] ?? null,
        supplierInfo['contact_secondary_email'] ?? null,
        supplierInfo['note'] ?? null
    ];

    let supplierSql = `INSERT INTO Suppliers (
      supplier_name, supplier_address_line1, supplier_address_line2, supplier_city,
      supplier_state, supplier_zipcode, supplier_country, contact_name, contact_title,
      contact_phone, contact_primary_email, contact_secondary_email, note
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    supplierSql = mysqlv2.format(supplierSql, inserts);

    let [result] = await connection.execute(supplierSql);

    return result
}

async function findSupplier(filter) {
    const Map = { 'Supplier ID': 'supplier_id', 'Supplier Name': 'supplier_name' }
    let sql = `
        SELECT supplier_id as "Supplier ID", supplier_name as "Supplier Name", contact_info as
        "Contact Info", supplier_type as "Supplier Type" FROM Suppliers `
    sql = addWhereClause(sql, filter, Map)
    let [result] = await connection.execute(sql)
    return result
}

async function findSupplierByName(filter) {
    const Map = { 'Supplier Name': 'supplier_name' }
    let sql = `
        SELECT * FROM Suppliers`
    sql = addWhereClause(sql, filter, Map)
    let [result] = await connection.execute(sql)
    return result
}


async function findSupplierById(supplierId) {
    let sql = `
        SELECT * FROM Suppliers where supplier_id = '${supplierId}'`
    let [result] = await connection.execute(sql)
    return result
}


async function updateSupplier(supplierId, newValues) {
    const Map = {
        'Supplier ID': 'supplier_id',
        'Supplier Name': 'supplier_name',
        'Supplier Address Line1': 'supplier_address_line1',
        'Supplier Address Line2': 'supplier_address_line2',
        'Supplier City': 'supplier_city',
        'Supplier State': 'supplier_state',
        'Supplier Zipcode': 'supplier_zipcode',
        'Supplier Country': 'supplier_country',
        'Contact Name': 'contact_name',
        'Contact Title': 'contact_title',
        'Contact Phone': 'contact_phone',
        'Contact Primary Email': 'contact_primary_email',
        'Contact Secondary Email': 'contact_secondary_email',
        'Note': 'note'
    }

    let sql = `
            UPDATE Suppliers `
    sql = addSetClause(sql, newValues, Map)
    sql = sql + ` WHERE supplier_id = '${supplierId}'`
    //console.log(sql)
    let [result] = await connection.execute(sql);
    console.log(result);
}

async function deleteSupplier(supplierId) {
    let sql = `
        DELETE FROM Suppliers WHERE supplier_id = '${supplierId}'`
    const result = await connection.execute(sql)
    return result
}

export default {
    addSupplier,
    findSupplier,
    updateSupplier,
    deleteSupplier,
    findSupplierByName,
    findSupplierById,
}
