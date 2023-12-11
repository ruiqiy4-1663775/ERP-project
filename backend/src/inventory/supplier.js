import { Supplier } from '../data_access_layer/models.js'

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
    'Note': 'note',
    "State": "supplier_state",
    "Supplier Name": "supplier_name",
    "Zip": "supplier_zipcode"
};

export async function addSupplier(info) {

    const supplierInfo = Object.keys(info).reduce((newObj, key) => {
        const newKey = keyMap[key] || key;
        newObj[newKey] = info[key];
        return newObj;
    }, {});
    let newSupplier = await Supplier.create(
        supplierInfo
    )
    return newSupplier
}

export async function findSupplier(filter) {
    let records = []
    if (filter['Supplier ID']) {
        records = await Supplier.findAll({where:{id: filter['Supplier ID']}})
    } else if (filter['Supplier Name']) {
        records = await Supplier.findAll({
            where: {
                supplier_name: filter['Supplier Name'],
            }
        })
    } else {
        records = await Supplier.findAll()
    }
    return records
}

export async function updateSupplier(supplierId, newValues) {
    if (!supplierId) {
        throw new Error('Supplier ID is not give')
    }
    const supplierInfo = Object.keys(newValues).reduce((newObj, key) => {
        const newKey = keyMap[key] || key;
        newObj[newKey] = newValues[key];
        return newObj;
    }, {});
    let res = await Supplier.update(
        supplierInfo, {
            where: {id:supplierId}
        }
    )
    console.log(res)
}

export async function deleteSupplier(supplierId) {
    let supplier = await Supplier.findByPk(supplierId)
    if(supplier) {
        let response = await supplier.destroy()
        return response
    }
}


