const mysql= require("mysql");

const connection=mysql.createConnection({
    host:"localhost",
    user:"mashiat",
    database:"bike factory database"
})
connection.connect((err)=>{
    if(err){
        console.log("error in connection to database");
    }
    else
    console.log("success in connection to database");
})
var res;


module.exports= connection;
