//url接口地址
var commonUrl="http://127.0.0.1:11200";

if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    document.writeln("<OBJECT classid=\"CLSID:01419D2B-9ED5-4FB7-803F-27CC07F35384\" id=Object1  style=\"display: none\" codebase=FJCA_FUN_GT.ocx>");
    document.writeln("</OBJECT>");
}
var successlMsg={
    "code":"0000",
    "data":{},
    "msg":"successful"
};

var failMsg={
    "code":"9999",
    "data":{},
    "msg":"unsuccessful"
};
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
    var queryResult=queryFJCA();
    if(queryResult==false){
        var url=commonUrl+"/RS_GetUserList";
        var data="";
        var result;
        ajax(url,data,false,function(res){
            result = res;
        });
    }else if(queryResult==true){
        successlMsg.data={};
        successlMsg.data.userlist = "fjca||fjca_Container";
        return successlMsg;
    }
    return result;
}
//证书口令验证接口
function RS_CertLogin(containerId,password){
    var queryResult=queryFJCA();
    if(queryResult==false){
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
    }else if(queryResult==true){
        var msg = document.getElementById("Object1").FJCA_OpenKeyWithPsw(password);
        if(msg==true){
            successlMsg.data={};
            successlMsg.data.containerId = "fjca_Container";
            return successlMsg;
        }else{
            failMsg.data={};
            failMsg.data.containerId = "";
            return failMsg;
        }
    }
}
//获取数字证书接口
function RS_GetCertBase64String(certType,containerId){
    var queryResult=queryFJCA();
    if(queryResult==false){
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
    }else{
        var msg = document.getElementById("Object1").FJCA_ExportUserCert(certType);
        if(msg){
            successlMsg.data={};
            successlMsg.data.certBase64 = msg;
            return successlMsg;
        }
    }

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
    var queryResult=queryFJCA();
    if(queryResult==false){
        var url=commonUrl+"/RS_KeyGetKeySn";
        var data={
            containerId:containerId
        };
        var result;
        ajax(url, data,false,function(res) {
            result = res;
        });
        return result;
    }else{
        var cert = document.getElementById("Object1").FJCA_ExportUserCert(1);
        var msg = document.getElementById("Object1").GetCertUID(cert);
        if(msg){
            successlMsg.data={};
            successlMsg.data.encRsKey = msg;
            return successlMsg;
        }else{
            failMsg.data={};
            failMsg.data.containerId = "";
            return failMsg;
        }
    }

}

//非对称加密接口
function RS_KeyEncryptData(rsKey,certBase64){
    var queryResult=queryFJCA();
    if(queryResult==false){
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
    }else{
        var msg = document.getElementById("Object1").FJCA_EncryptByPubkey(certBase64,rsKey);
        if(msg){
            successlMsg.data={};
            successlMsg.data.encRsKey = msg;
            return successlMsg;
        }else{
            failMsg.data={};
            failMsg.data.containerId = "";
            return failMsg;
        }
    }
}
//.非对称解密接口
function RS_KeyDecryptData(encRsKey,containerId){
    var queryResult=queryFJCA();
    if(queryResult==false){
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
    }else{
        var msg = document.getElementById("Object1").FJCA_DecryptDataByPrivateKey(encRsKey);
        if(msg){
            successlMsg.data={};
            successlMsg.data.rsKey = msg;
            return successlMsg;
        }
    }

}
//获取密码重试剩余次数接口
function RS_GetPinRetryCount(containerId){
    var queryResult=queryFJCA();
    if(queryResult==false){
        var url=commonUrl+"/RS_GetPinRetryCount";
        var data={
            containerId:containerId,
        };
        var result;
        ajax(url, data,false,function(res) {
            result = res;
        });
        return result;
    }else{
        failMsg.data={};
        failMsg.data.containerId = "";
        return failMsg;
    }

}
//查询多key的状态
function buffer(callback) {
    var url=commonUrl+"/buffer";
    var data="";
    ajax(url, data,true,function(res) {
        callback(res);
    });
}
//查询是否是福建ca
function queryFJCA(){
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        var result = document.getElementById("Object1").FJCA_IsUsbKeyConnected();
        return result;
    }else{
        return false;
    }

}

