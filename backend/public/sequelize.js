//file di configurazione per sequelize
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite', 
});

export { sequelize };
