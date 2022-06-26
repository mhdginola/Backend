import sequelize from "sequelize";
import db from "../config/database.js";

const {DataTypes} =sequelize;

const product = db.define('product',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
}, {
    frezeeTableName: true
});

export default product;

(async()=>{
    await db.sync();
})();