const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/storage.db'
})

const employeeTable = db.define('Employee_Table',{
    jobTitle : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false
    },
    phoneNumber : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    },
    resAdd : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    }
});

const employeeAttendance = db.define('Employee_Attendance',{
    empId : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false,
        primaryKey: true
    },
    entryDate : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false,
        primaryKey: true
    },
    entryTime : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    exitTime : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    }
});

const salaryEmployee = db.define('Salary_Employee',{
    jobTitle : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
        primaryKey: true
    },
    salaryPm : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique: false
    },
    monthlyHours : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false
    }
}); 

const menu = db.define('Menu',{
    itemName : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false
    },
    itemType:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:false
    },
    itemPrice : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false
    }
});

const order = db.define('Order',{
    orderId : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey: true,
        autoIncrement : true
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    paymentAmount : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    orderData : {
        type : Sequelize.JSON,
        allowNull : false,
    }
});

const reservationInfo = db.define('Reservation_Info',{
    tableId : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false
    },
    entryDate:{
        type:Sequelize.DATEONLY,
        allowNull: false
    },
    startTime : {
        type : Sequelize.TIME,
        allowNull : false,
        unique : false,
        primaryKey: true
    },
    endTime : {
        type : Sequelize.TIME,
        allowNull : false,
        unique : false,
    },
    members:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const tableInfo = db.define('Table_Info',{
    tableId : {
        type : Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    members : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    cost:{
        type:Sequelize.INTEGER,
        allowNull: false,
    }
});

const paymentInfo = db.define('Payment_Info',{
    orderId : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique: true
    },
    paymentDate : {
        type : Sequelize.JSON,
        allowNull : false,
        unique : false
    },
    paymentAmount : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false
    },
    orderData : {
        type : Sequelize.JSON,
        allowNull : false,
        unique : false
    }
});



db.sync().then(()=>{
    console.log('Cart Database Ready!!');
});

module.exports = {
    db,
    employeeTable,
    employeeAttendance,
    salaryEmployee,
    order,
    menu,
    paymentInfo,
    reservationInfo,
    tableInfo
}
