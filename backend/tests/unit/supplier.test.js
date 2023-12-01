import supplier from '../../src/inventory/supplier.js'
// import app from '../../app.js';
//const supplier = require("../../src/inventory/supplier.js");
test('addSupplier test', async () => {
    const supplierData = {
        supplier_name: 'Test Supplier',
        supplier_address_line1: '123 Test St',
        supplier_address_line2: 'test',
        supplier_city: 'Testville',
        supplier_state: 'TS',
        supplier_zipcode: '',
        supplier_country: 'Testland',
        contact_name: 'Test Contact',
        contact_title: ' ',
        contact_phone: '',
        contact_primary_email: 'test@example.com',
        note: 'Test note',
    };

    const result = await supplier.addSupplier(supplierData);
    const idToFind = result.insertId

    const result2 = await supplier.findSupplierById(idToFind);
    console.log(result2)
    }
);

test('findSupplierByName test', async ()=> {

    const supplierData = {
        'Supplier Name': 'Test Supplier',
    };
    const result = await supplier.findSupplierByName(supplierData)
    console.log(result)
});


test('findSupplierById test', async ()=> {
    const result = await supplier.findSupplierById(1);
    console.log(result)
});


test('findSupplierByName test', async ()=> {

    const supplierData = {
        'Supplier Name': 'Test Supplier',
    };
    const result = await supplier.findSupplierById(supplierData);
    console.log(result)
});

test('updateSupplier test', async ()=> {
    const newValues = {
        'Supplier Zipcode' : 'supplier_zipcodejjj',
        'Supplier Country' : 'supplier_country',
        'Contact Name' : 'contact_name',
        'Contact Title' : 'contact_title',
        'Contact Phone' : 'contact_phone',
        'Contact Primary Email' : 'contact_primary_email',
        'Contact Secondary Email' : 'contact_secondary_email',
        'Note' : 'note'
    }
    const idToFind = 1
    const result = await supplier.updateSupplier(idToFind,newValues);
    console.log(result)
    const result2 = await supplier.findSupplierById(idToFind);
    console.log(result2)
});


test('deleteSupplier test', async ()=> {
    const supplierData = {
        supplier_name: 'Test Supplier',
        supplier_address_line1: '123 Test St',
        supplier_address_line2: 'test',
        supplier_city: 'Testville',
        supplier_state: 'TS',
        supplier_zipcode: '',
        supplier_country: 'Testland',
        contact_name: 'Test Contact',
        contact_title: ' ',
        contact_phone: '',
        contact_primary_email: 'test@example.com',
        note: 'Test note',
    };

    const result = await supplier.addSupplier(supplierData);
    const idToDelete = result.insertId;
    console.log(idToDelete)

    console.log(await supplier.findSupplierById(idToDelete));
    await supplier.deleteSupplier(idToDelete);
    console.log(await supplier.findSupplierById(idToDelete));
    }
);

