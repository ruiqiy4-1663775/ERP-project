import Sequelize from 'sequelize';

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    logging: false,
    dialect: 'mysql',
});

export default sequelize;

