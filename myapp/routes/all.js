var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
var URL = require('url');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/RS_GreateQRCode', function(req, res, next) {

    var params = req.body;

    var data = "http://15110398.s21i.faiusr.com/2/ABUIABACGAAgoaOI0gUo2OS59AQwyBM4nQ0!400x400.jpg";
    var msg=params.name;
    var code="0000";
    var response = {code:code,msg:msg,data:data};
    res.send(JSON.stringify(response));

});
//3.2.2.6.修改证书口令接口
router.get('/RS_ChangePassWd', function(req, res, next) {
    //var params = URL.parse(req.url, true).query;
    //var user = {};
    //user.u = params.username
    var data = 0;
    var msg="执行成功";
    var code="0000";
    var response = {code:code,msg:msg,data:data};
    res.send(response);

});

router.get('/users', function(req, res, next) {
    res.send('respond with a resource2');
});

app.use('/', router)

module.exports = app;