//url接口地址
var commonUrl="http://127.0.0.1:11200";
/**
 * 封装ajax 函数
 * @param url  请求地址
 * @param type 请求方法 get||post；
 * @param dataType 接收数据类型
 * @param async 是否异步 true 异步 || false  同步；默认异步
 * @param data 发送数据
 * @param Callback  回调函数(数据,对象)
 */
function ajax(url, data,async,callback) {
    var type =  'post';
    var dataType =  'json';
    var success =  function (res) {
        callback(res);
    };
    var error = function (res) {
        callback(res);
    };
    $.ajax({
        'url': url,
        'data': data,
        'type': type,
        'dataType': dataType,
        'async': async,
        'success': success,
        'error': error,
    });
}
//获取证书列表接口
function RS_GetUserList(){
    var url=commonUrl+"/RS_GetUserList";
    var data="";
    var result;
    ajax(url,data,false,function(res){
        result = res;
    });
    return result;
}
//证书口令验证接口
function RS_CertLogin(containerId,password){
    var url=commonUrl+"/RS_CertLogin";
    var data={
        containerId:containerId,
        password:password,
    }
    var result;
    ajax(url,data,false,function(res) {
        result = res;
    });
    return result;
}
//获取数字证书接口
function RS_GetCertBase64String(certType,containerId){
    var url=commonUrl+"/RS_GetCertBase64String";
    var data={
        certType:certType,
        containerId:containerId
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//.获取证书信息接口
function RS_GetCertInfo(certBase64,type){
    var url=commonUrl+"/RS_GetCertInfo";
    var data={
        certBase64:certBase64,
        type:type
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取证书用户标识接口
function RS_KeyGetKeySn(containerId){
    var url=commonUrl+"/RS_KeyGetKeySn";
    var data={
        containerId:containerId
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}

//非对称加密接口
function RS_KeyEncryptData(rsKey,certBase64){
    var url=commonUrl+"/RS_KeyEncryptData";
    var data={
        rsKey:rsKey,
        certBase64:certBase64
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//.非对称解密接口
function RS_KeyDecryptData(encRsKey,containerId){
    var url=commonUrl+"/RS_KeyDecryptData";
    var data={
        encRsKey:encRsKey,
        containerId:containerId
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//获取密码重试剩余次数接口
function RS_GetPinRetryCount(containerId){
    var url=commonUrl+"/RS_GetPinRetryCount";
    var data={
        containerId:containerId,
    };
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
}
//查询多key的状态
function buffer(callback) {
    var url=commonUrl+"/buffer";
    var data="";
    ajax(url, data,true,function(res) {
        callback(res);
    });
}
