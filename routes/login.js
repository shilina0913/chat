/**
 * Created by shilina on 2017/10/30.
 */
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var bcrypt=require("bcryptjs");
var mysql=require('../db.js');
var router = express.Router();

router.post("",urlencodedParser,function(req,res){
    var nickname=req.body.nickname;
    var password=req.body.password;
    if(undefined==nickname||undefined==password){
        res.send("请输出登录账号以及密码");
    }
    var sql="select * from user_info where nickname='"+nickname+"' and is_valid=1";
    console.log(sql);
    mysql.query(sql,function (rows) {
        console.log(rows)
        if(undefined!=rows){
            if(rows.length>=1){
                //密码用bcrypt加密
                if(bcrypt.compareSync(password, rows[0].PASSWORD)){
                    res.redirect("/chat/list");
                }
            }else{
                res.send("无该用户信息");
            }
        }else{
            res.send("无该用户信息");
        }
    })
});
module.exports = router;