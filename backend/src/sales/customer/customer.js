import { connection } from '../../data_access_layer/dbconfig.js'
import mysql from 'mysql2'
import { Customer } from '../../data_access_layer/models.js'

export async function addCustomer(data) {
    const map = {
        'Customer Name': 'customer_name',
        'Phone Number': 'phoneNumber', 'Email Address': 'email', 'Price Tier': 'price_tier',
        'Street Address': 'street_address', 'City': 'city', 'State': 'state', 'Zip Code': 'zipcode',
        'Country': 'country'
    }
    let object = {}
    for (let key in data) {
        object[map[key]] = data[key]
    }
    let response = await Customer.create(object)
    console.log(response)
    return response
}

export async function findCustomer(filter) {
    const Map = {
        'Customer ID': 'id', 'Customer Name': 'customer_name',
        'Phone Number': 'phoneNumber', 'Email Address': 'email', 'Price Tier': 'price_tier'
    }
    let where = {}
    for (let key in filter) {
        where[Map[key]] = filter[key]
    }
    console.log(where)
    let response = await Customer.findAll({
        where: where
    })
    console.log(response)
    return response
}

export async function updateCustomer(customerId, newValues) {
    console.log(newValues)
    let response = await Customer.update(newValues, {where: {id: customerId}})
    console.log(response)
    return response
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
