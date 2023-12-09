import sequelize from './sequelize.js'
// Import models
import * as models from './models.js'

// ... Other imports ...

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Tables have been created');
    } catch (error) {
        console.error('Unable to create tables:', error);
    }
}

syncDatabase();
