import 'dotenv/config'
import sequelize from './sequelize.js'
import './models.js'
import sequelize from './sequelize.js';

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Tables have been created');
        sequelize.close()
    } catch (error) {
        console.error('Unable to create tables:', error);
    }
}

syncDatabase();
