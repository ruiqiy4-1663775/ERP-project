import { Item } from '../data_access_layer/models.js'

export async function createItem(item_name, item_description, collection) {
    let item = await Item.create({
        item_name,
        item_description,
        collection
    })
    return item
}

export async function findItem(filters) {
    let sql = `
        SELECT item_id as "Item ID", item_name as "Item Name", collection as "Collection",
        item_description as "Item Description", item_type as "Item Type", unit as "Unit"
        FROM Items `
    const Map = {'Item ID': 'id', 'Item Name': 'item_name', 'Collection': 
        'collection'}
    let newFilter = {}
    for (let key in filters) {
        newFilter[Map[key]] = filters[key]
    }
    let items = await Item.findAll({where : newFilter})
    return items
}

export async function updateItem(itemId, newValues) {
    console.log('updateItem', newValues, 'itemId:', itemId)
    let resposne = await Item.update(newValues, {where: {id : itemId}})
    console.log('response: ', resposne)
}