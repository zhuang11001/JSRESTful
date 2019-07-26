//url接口地址
var commonUrl="http://127.0.0.1:11200";
//插入状态 1:允许请求 2:插入设备大于1 3：无设备插入
var RS_state = 1;
/**
 * 封装ajax 函数
 * @param url  请求地址
 * @param type 请求方法 get||post；默认同步
 * @param dataType 接收数据类型
 * @param async 是否异步 true 异步 || false  同步；默认异步
 * @param data 发送数据
 * @param Callback  回调函数(数据,对象)
 */
function ajax(url, data,callback) {
    var type =  'post';
    var dataType =  'json';
    var async =  true;
    var success =  function (res) {
        callback(res);
    };
    var error = function (res) {
        callback(res);
    };
    if(RS_state==2){
        $.ajax({
            'url': url,
            'data': data,
            'type': type,
            'dataType': dataType,
            'async': async,
            'success': success,
            'error': error,
        });
    }else if(RS_state==1){
        alert("插入的设备大于2，无法请求");
    }else if(RS_state==3){
        alert("无设备插入，无法请求");
    }

}
//3.2.2.1.获取证书列表接口
function RS_GetUserList(callback){
    buffer();
    var url=commonUrl+"/RS_GetUserList";
    var data="";
    ajax(url, data,function(res){
        callback(res);
    });
}


//3.2.2.4.证书口令验证接口
function RS_CertLogin(containerId,password,callback){
    buffer();
    var url=commonUrl+"/RS_CertLogin";
    var data={
        containerId:$("#containerId").val(),
        password:$("#password").val(),
    }
    ajax(url, data,function(res) {
        callback(res);
    });
}
//3.2.2.2.获取数字证书接口
function RS_GetCertBase64String(certType,containerId,callback){
    buffer();
    var url=commonUrl+"/RS_GetCertBase64String";
    var data={
        certType:certType,
        containerId:containerId
    };
    ajax(url, data,function(res) {
        callback(res);
    });
}
//3.2.2.3.获取证书信息接口
function RS_GetCertInfo(certBase64,type,callback){
    buffer();
    var url=commonUrl+"/RS_GetCertInfo";
    var data={
        certBase64:certBase64,
        type:type
    }
    ajax(url, data,function(res) {
        callback(res);
    });
}
//3.2.2.8.获取证书用户标识接口
function RS_KeyGetKeySn(containerId,callback){
    buffer();
    var url=commonUrl+"/RS_KeyGetKeySn";
    var data={
        containerId:containerId
    }
    ajax(url, data,function(res) {
        callback(res);
    });
}
//3.2.2.14.非对称加密接口
function RS_KeyEncryptData(rsKey,certBase64,callback){
    buffer();
    var url=commonUrl+"/RS_KeyEncryptData";
    var data={
        rsKey:rsKey,
        certBase64:certBase64
    }
    ajax(url, data,function(res) {
        callback(res);
    });
}
//3.2.2.15.非对称解密接口
function RS_KeyDecryptData(encRsKey,containerId,callback){
    buffer();
    var url=commonUrl+"/RS_KeyDecryptData";
    var data={
        encRsKey:encRsKey,
        containerId:containerId
    }
    ajax(url, data,function(res) {
        callback(res);
    });
}
//3.2.1.6.对称加密接口
function RS_EncryptFile(souceFilePath,encFilePath,callback){
    buffer();
    var url=commonUrl+"/RS_EncryptFile";
    var data={
        souceFilePath:souceFilePath,
        encFilePath:encFilePath
    }
    ajax(url, data,function(res) {
        callback(res);
    });
}
//3.2.1.7.对称解密接口
function RS_DecryptFile(symKey,encFilePath,dncDirectoryPath,callback){
    buffer();
    var url=commonUrl+"/RS_DecryptFile";
    var data={
        symKey:symKey,
        encFilePath:encFilePath,
        dncDirectoryPath:dncDirectoryPath
    }
    ajax(url, data,function(res) {
        callback(res);
    });
}
//查询key的状态
function buffer() {
    var url=commonUrl+"/buffer";
    $.ajax({
        url: url,
        async:true,
        type: 'get',
        'dataType':"json",
        success: function (res){
            if(res.length==1){
                $(".label-success").show();
                $(".label-danger").hide();
                RS_state = 1;
            }else if(res.length>1){
                $(".label-success").hide();
                $(".label-danger").show();
                $(".label-danger").text("插入的设备数大于1");
                RS_state = 2;
            }else{
                $(".label-success").hide();
                $(".label-danger").show();
                $(".label-danger").text("无设备插入");
                RS_state = 3;
            }

        }
    })
}











