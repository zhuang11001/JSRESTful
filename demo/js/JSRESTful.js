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
    "msg":"未知错误"
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
    var state = buffer();
    console.log(state);
    if(state.length==1){
        if(state[0].Description== "FJCA"){
            var queryResult=queryFJCA();
            if(queryResult==false){
                failMsg.data={};
                failMsg.data.userlist = "福建ca请使用IE浏览器";
                return failMsg;
            }else if(queryResult==true){
                successlMsg.data={};
                successlMsg.data.userlist = "fjca||fjca_Container";
                return successlMsg;
            }
        }else{
            var url=commonUrl+"/RS_GetUserList";
            var data="";
            var result;
            ajax(url,data,false,function(res){
                result = res;
            });
            return result;
        }
    }else{
        failMsg.data={};
        failMsg.data.userlist = "没有key插入或者插入的key数量大于1";
        return failMsg;
    }

}
//证书口令验证接口
function RS_CertLogin(containerId,password){
    var state = buffer();
    if(state.length==1){
        if(state[0].Description== "FJCA"){
            var queryResult=queryFJCA();
            if(queryResult==false){
                failMsg.data={};
                failMsg.data.containerId = "福建ca请使用IE浏览器";
                return failMsg;
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
        }else{
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
    }else{
        failMsg.data={};
        failMsg.data.containerId = "没有key插入或者插入的key数量大于1";
        return failMsg;
    }
}
//获取数字证书接口
function RS_GetCertBase64String(certType,containerId){
    var state = buffer();
    if(state.length==1){
        if(state[0].Description== "FJCA"){
            var queryResult=queryFJCA();
            if(queryResult==false){
                failMsg.data={};
                failMsg.data.certBase64 = "福建ca请使用IE浏览器";
                return failMsg;
            }else if(queryResult==true){
                var msg = document.getElementById("Object1").FJCA_ExportUserCert(certType);
                if(msg){
                    successlMsg.data={};
                    successlMsg.data.certBase64 = msg;
                    return successlMsg;
                }else{
                    failMsg.data={};
                    failMsg.data.certBase64 = "";
                    return failMsg;
                }
            }
        }else{
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
    }else{
        failMsg.data={};
        failMsg.data.certBase64 = "没有key插入或者插入的key数量大于1";
        return failMsg;
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
    var state = buffer();
    if(state.length==1){
        if(state[0].Description== "FJCA"){
            var queryResult=queryFJCA();
            if(queryResult==false){
                failMsg.data={};
                failMsg.data.keySn = "福建ca请使用IE浏览器";
                return failMsg;
            }else if(queryResult==true){
                var cert = document.getElementById("Object1").FJCA_ExportUserCert(1);
                var msg = document.getElementById("Object1").GetCertUID(cert);
                if(msg){
                    successlMsg.data={};
                    successlMsg.data.keySn = msg;
                    return successlMsg;
                }else{
                    failMsg.data={};
                    failMsg.data.keySn = "";
                    return failMsg;
                }
            }
        }else{
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
    }else{
        failMsg.data={};
        failMsg.data.keySn = "没有key插入或者插入的key数量大于1";
        return failMsg;
    }
}

//非对称加密接口
function RS_KeyEncryptData(rsKey,certBase64){
    var state = buffer();
    if(state.length==1){
        if(state[0].Description== "FJCA"){
            var queryResult=queryFJCA();
            if(queryResult==false){
                failMsg.data={};
                failMsg.data.encRsKey = "福建ca请使用IE浏览器";
                return failMsg;
            }else if(queryResult==true){
                var msg = document.getElementById("Object1").FJCA_EncryptByPubkey(certBase64,rsKey);
                if(msg){
                    successlMsg.data={};
                    successlMsg.data.encRsKey = msg;
                    return successlMsg;
                }else{
                    failMsg.data={};
                    failMsg.data.encRsKey = "";
                    return failMsg;
                }
            }
        }else{
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
    }else{
        failMsg.data={};
        failMsg.data.encRsKey = "没有key插入或者插入的key数量大于1";
        return failMsg;
    }
}
//.非对称解密接口
function RS_KeyDecryptData(encRsKey,containerId){
    var state = buffer();
    if(state.length==1){
        if(state[0].Description== "FJCA"){
            var queryResult=queryFJCA();
            if(queryResult==false){
                failMsg.data={};
                failMsg.data.rsKey = "福建ca请使用IE浏览器";
                return failMsg;
            }else if(queryResult==true){
                var msg = document.getElementById("Object1").FJCA_DecryptDataByPrivateKey(encRsKey);
                if(msg){
                    successlMsg.data={};
                    successlMsg.data.rsKey = msg;
                    return successlMsg;
                }else{
                    failMsg.data={};
                    failMsg.data.rsKey = "";
                    return failMsg;
                }
            }
        }else{
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
    }else{
        failMsg.data={};
        failMsg.data.rsKey = "没有key插入或者插入的key数量大于1";
        return failMsg;
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
function buffer() {
    var url=commonUrl+"/buffer";
    var data="";
    var result;
    ajax(url, data,false,function(res) {
        result = res;
    });
    return result;
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

