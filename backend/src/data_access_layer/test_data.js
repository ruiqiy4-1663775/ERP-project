import 'dotenv/config'
import { Item } from "./models.js";
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

async function insert() {
    try {
        await addItems()
        console.log('successfully insert test data')
        sequelize.close()
    } catch (err) {
        console.log('Unsuccessful', err)
    }
}
insert()