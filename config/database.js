import sequelize from "sequelize";

const db = new sequelize('upload_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;