import 'dotenv/config'
import { Item, Supplier } from "./models.js";
import sequelize from './sequelize.js';

const addItems = async () => {
    for (let i = 1; i <= 10; i++) {
        await Item.create({
            item_name: `Test Item ${i}`,
            item_description: `Description for item ${i}`,
            collection: `Collection ${i}`,
            image_key: `image${i}.jpg`,
            property1: `Property1-${i}`,
            property2: `Property2-${i}`,
            property3: `Property3-${i}`,
            property4: `Property4-${i}`,
            property5: `Property5-${i}`
        });
    }
};

const addTestSuppliers = async () => {
    const suppliers = [];

    for (let i = 1; i <= 10; i++) {
        suppliers.push({
            supplier_name: `Test Supplier ${i}`,
            supplier_address_line1: `123 Main St #${i}`,
            supplier_address_line2: `Suite ${i}`,
            supplier_city: 'Test City',
            supplier_state: 'Test State',
            supplier_zipcode: '12345',
            supplier_country: 'Test Country',
            contact_name: `Contact Name ${i}`,
            contact_title: `Title ${i}`,
            contact_phone: `123-456-7890`,
            contact_primary_email: `contact${i}@supplier.com`,
            contact_secondary_email: `contact_secondary${i}@supplier.com`,
            note: `This is a note for Test Supplier ${i}`
        });
    }
    await Supplier.bulkCreate(suppliers); // Bulk create suppliers
    console.log('Test suppliers added successfully.');
 
};

async function insert() {
    try {
        await addItems()
        await addTestSuppliers()
        console.log('successfully insert test data')
        sequelize.close()
    } catch (err) {
        console.log('Unsuccessful', err)
    }
}
insert()