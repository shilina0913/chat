/**
 * Created by shilina on 2017/10/28.
 */
var mysql=require("mysql");

var db={};

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234567890',
    database:'node'
});

connection.connect(function (err) {
    if(err){
        console.log(err);
        return;
    }
});

db.query=function sqlback(sqllan,fn) {
    var sql=sqllan;
    if(!sql) return;
    connection.query(sql,function (err,rows,field) {
        if(err){
            console.log(err);
            return;
        }
        fn(rows);
    })
};





module.exports=db;