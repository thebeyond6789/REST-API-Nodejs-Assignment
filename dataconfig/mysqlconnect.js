const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "national",
});
db.connect(()=>{console.log("Da ket noi thanh cong database!")})
module.exports = db;