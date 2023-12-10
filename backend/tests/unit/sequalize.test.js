import '../../app.js'
// import 'dotenv/config';
import sequelize from '../../src/data_access_layer/sequelize.js'

describe('Database Connection', () => {
    it('should connect to the database successfully', async () => {
        try {
            await sequelize.authenticate();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw new Error('Database connection failed');
        }
    });
});
