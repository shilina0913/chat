var express = require('express');
var router = express.Router();
var mysql=require('../db.js');
var bodyParser = require('body-parser');
var moment=require('moment');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* 聊天记录 */
router.get('/list', function(req, res) {
    var sql="select message.info,message.img,user_info.nickname,message.create_date"
        +" from message join user_info on message.user_id=user_info.id and user_info.is_valid=1"
        +" where message.room_id=1 and message.is_valid=1 order by message.create_date";
    mysql.query(sql,function (rows) {
        console.log(rows);
        res.render("chat",{rows:rows});
    })
});

/*聊天记录发送*/
router.post('/sendMsg', urlencodedParser,function (req,res) {
    console.log(req.body.msg);
    var now=moment().format('YYYY-MM-DD HH:mm:ss');
    var sql="insert into message(info,user_id,room_id,create_date,is_valid) values('"+req.body.msg
        +"',1,1,'"+now+"',1)";
    mysql.query(sql,function (err) {
        if(err){
            console.log(err);
        }
    })
    res.redirect("/chat/list");
});

module.exports = router;