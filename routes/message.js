/**
 * Created by shilina on 2017/10/28.
 */

var express = require('express');
var router = express.Router();

router.post('/sendMsg',function (req,res) {
    alert(1);
    res.sendfile('./views/error.html');
});