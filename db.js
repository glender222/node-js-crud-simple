const mysql= require('mysql2')

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234567',
    database : 'bdnode2',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});


connection.connect((err)=>{
    if (err) {
        console.log("error de conexion: ", err.message);
    } else {
        console.log("conexion exitosa...");
    }
}

)

module.exports = connection;