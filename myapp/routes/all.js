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

var successMsg={
    "code":"0000",
    "msg":"执行成功",
    "data":"666666"
}
var failMsg={
    "code":"0001",
    "msg":"执行失败",
    "data":"000000"
}
//3.2.1.1.参数配置接口
router.get('/RS_ConfigParameters', function(req, res, next) {
    var params = URL.parse(req.url, true).query;
    if(!params.cmd){
        res.send(failMsg);
    }else if(!params.val){
        res.send(failMsg);
    }else{

        res.send(successMsg);
    }
});

//3.2.1.2.获取配置参数接口
router.post('/RS_GetParameters', function(req, res, next) {
    var params = req.body;
    if(!params.cmd){
        res.send(failMsg);
    }else{

        res.send(successMsg);
    }
});

//3.2.1.4生成二维码图片接口
router.post('/RS_GreateQRCode', function(req, res, next) {
    //var params = req.body;
    successMsg.data="./images/erweima.png"
    res.send(successMsg);
    successMsg.data="666666"
});

//3.2.1.5.获取流水号接口
router.post('/RS_GetTransid', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});
//3.2.2.1.获取证书列表接口
router.get('/RS_GetUserList', function(req, res, next) {

    res.send(successMsg);
});

//3.2.2.2.获取数字证书接口
router.post('/RS_GetCertBase64String', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.3.获取证书信息接口
router.post('/RS_GetCertInfo', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.4.证书口令验证接口
router.post('/RS_CertLogin', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.5.获取密码重试剩余次数接口
router.post('/RS_GetPinRetryCount', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.6.修改证书口令接口
router.get('/RS_ChangePassWd', function(req, res, next) {
    //var params = URL.parse(req.url, true).query;
    //var user = {};
    //user.u = params.username

    res.send(successMsg);
});

//3.2.2.7.验证证书有效性接口
router.post('/RS_VerifyIdentity', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.8.获取证书用户标识接口
router.get('/RS_KeyGetKeySn', function(req, res, next) {

    res.send(successMsg);
});


router.get('/secret', function(req, res, next) {
    res.render('secret');
});

//3.2.1.6.对称加密接口
router.post('/RS_EncryptFile', function(req, res, next) {
    var params = req.body;
    if(!params.souceFilePath){
        res.send(failMsg);
    }else if(!params.encFilePath){
        res.send(failMsg);
    }
    else{

        res.send(successMsg);
    }
});

//3.2.1.7.对称解密接口
router.post('/RS_DevryptFile', function(req, res, next) {
    var params = req.body;
    if(!params.rsKey){
        res.send(failMsg);
    }else if(!params.encFilePath){
        res.send(failMsg);
    }else if(!params.dncDirectoryPath){
        res.send(failMsg);
    }
    else{

        res.send(successMsg);
    }
});

//3.2.2.14.非对称加密接口
router.post('/RS_KeyEncryptData', function(req, res, next) {
    var params = req.body;
    if(!params.rsKey){
        res.send(failMsg);
    }else if(!params.certBase64){
        res.send(failMsg);
    } else{

        res.send(successMsg);
    }
});

//3.2.2.15.非对称解密接口
router.post('/RS_KeyDecryptData', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.16.数字信封加密接口
router.post('/RS_KeyEncryptByDigitalEnvelope', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.17.数字信封解密接口
router.post('/RS_KeyDecryptByDigitalEnvelope', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

router.get('/interface', function(req, res, next) {
    res.render('interface');
});

//3.2.1.3.P7验签接口
router.post('/RS_VerifySignByP7', function(req, res, next) {
    var params = req.body;
    if(!params.msg){
        res.send(failMsg);
    }else if(!params.signdMsg){
        res.send(failMsg);
    }else if(!params.flag){
        res.send(failMsg);
    }
    else{

        res.send(successMsg);
    }
});

//3.2.2.9.P1签名接口（域签）
router.post('/RS_KeyDigitalSignByP1', function(req, res, next) {
    var params = req.body;
    if(!params.asn1Msg){
        res.send(failMsg);
    }else if(!params.containerId){
        res.send(failMsg);
    } else{

        res.send(successMsg);
    }
});

//3.2.2.10.P1验签接口（域签）
router.post('/RS_VerifyDigitalSignByP1', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.11.P1签名接口
router.post('/RS_KeySignByP1', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.12.P1验签接口
router.post('/RS_KeyVerifySignByP1', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

//3.2.2.13.P7签名接口
router.post('/RS_KeySignByP7', function(req, res, next) {
    //var params = req.body;

    res.send(successMsg);
});

app.use('/', router)

module.exports = app;

















