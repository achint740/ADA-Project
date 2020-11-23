const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/storage_customers.db'
});

const customer = db.define('customer',{
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    currentCartItems : {
        type : Sequelize.JSON,
        allowNull : true,
        unique : false
    }
});

db.sync().then(()=>{
    console.log("DataBase Ready!");
})

module.exports = {
    customer
}