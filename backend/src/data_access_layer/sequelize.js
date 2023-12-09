import Sequelize from 'sequelize';
import { app } from '../../app.js';
// Option 3: Passing parameters separately (other dialects)
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
});

export default sequelize;

