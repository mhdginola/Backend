import sequelize from "sequelize";
import db from "../config/database.js";

const {DataTypes} =sequelize;

const product2 = db.define('hrc',{
    name: DataTypes.STRING,
    parent_id: DataTypes.STRING,
}, {
    frezeeTableName: true
});

export default product2;

(async()=>{
    await db.sync();
})();