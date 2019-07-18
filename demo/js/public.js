function copy(e){
    //获取input对象
    var obj = document.getElementById(e.id);
    console.log(obj)
    //选择当前对象
    obj.select();
    try{
        //进行复制到剪切板
        if(document.execCommand("Copy","true",null)){
            //如果复制成功
            alert("复制成功！");
        }else{
            //如果复制失败
            alert("复制失败！");
        }
    }catch(err){
        //如果报错
        alert("复制错误！")
    }
}

//3.2.1.1.参数配置接口
function ConfigParameters(){
    //var url=commonUrl+"/RS_ConfigParameters";
    //var data={
    //    cmd:$("#cmd").val(),
    //    val:$("#val").val()
    //}
    //var res = ajax(url, data);
    //console.log(res);
    $.ajax({
        url:commonUrl+"/RS_ConfigParameters",
        type:"post",
        data:{
            cmd:$("#cmd").val(),
            val:$("#val").val(),
        },
        success:function(res){
//                document.getElementById("ConfigParametersData").value = res.data;
//                var msg=JSON.parse(res,null,3);
//                document.getElementById("ConfigParametersTxt").innerHTML = res;
            alert(res);
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.1.2.获取配置参数接口
function GetParameters(){
    $.ajax({
        url:commonUrl+"/RS_GetParameters",
        type:"post",
        data:{
            cmd:$("#get-cmd").val(),
        },
        success:function(res){
            alert(res);
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.1.4.生成二维码图片接口
function RCode(){
    $.ajax({
        url:commonUrl+"/RS_GreateQRCode",
        type:"post",
        data:{
            qrcode:$("img-content").val(),
            path:$("img-path").val()
        },
        success:function(res){
            alert(res);
            console.log(res);
        },
        error:function(res){
            alert("RCode Not Implmented!")
        }
    });
}
//3.2.1.5.获取流水号接口
function Transid(){
    $.ajax({
        url:commonUrl+"/RS_GetTransid",
        type:"post",
        data:{
            joinCode:$("Numbering").val(),
        },
        success:function(res){
            alert(res);
            console.log(res);
        },
        error:function(res){
            alert("Transid Not Implmented!")
        }
    });
}
//3.2.2.1.获取证书列表接口
function GetUserList(){
    $.ajax({
        url:commonUrl+"/RS_GetUserList",
        type:"post",
//            contentType: 'application/json',
//            dataType:"jsonp",  //数据格式设置为jsonp
        data:{
        },
        success:function(res){
            var msg = JSON.parse(res);
            console.log(res);
            console.log(msg);
            var i = msg.data.userlist.indexOf("||");
            var j = msg.data.userlist.slice(i+2);
            console.log(j);
            document.getElementById("GetUserListData").value = j;
            document.getElementById("GetUserListTxt").innerHTML = res;
            document.getElementById("containerId3").value = j;
            document.getElementById("containerId").value = j;
            document.getElementById("containerId2").value = j;
            document.getElementById("containerId4").value = j;
            document.getElementById("containerId5").value = j;
            document.getElementById("containerId6").value = j;
            document.getElementById("containerId7").value = j;
            document.getElementById("KeycontainerId").value = j;
            document.getElementById("P7containerId").value = j;
            document.getElementById("SncontainerId").value = j;
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.2.获取数字证书接口
function GetCertBase64String(){
    $.ajax({
        url:commonUrl+"/RS_GetCertBase64String",
        type:"post",
        data:{
            certType:$("#certType").val(),
            containerId:$("#containerId3").val()
        },
        success:function(res){
            var msg=JSON.parse(res);
            console.log(msg.data.certBase64);
            document.getElementById("GetCertBase64StringTxt").innerHTML = res;
            document.getElementById("GetCertBase64StringData").value = msg.data.certBase64;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.3.获取证书信息接口
function GetCertInfo(){
    $.ajax({
        url:commonUrl+"/RS_GetCertInfo",
        type:"post",
        data:{
            certBase64:$("#certBase64").val(),
            type:$("#type").val(),
        },
        success:function(res){
            var msg=JSON.parse(res);
            document.getElementById("GetCertInfoTxt").innerHTML = res;
            document.getElementById("GetCertInfoData").value = msg.data.info;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.4.证书口令验证接口
function CertLogin(){
    $.ajax({
        url:commonUrl+"/RS_CertLogin",
        type:"post",
        data:{
            containerId:$("#containerId").val(),
            password:$("#password").val(),
        },
        success:function(res){
            var msg=JSON.parse(res);
            document.getElementById("CertLoginTxt").innerHTML = res;
            document.getElementById("CertLoginData").value = msg.data.containerId;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.5.获取密码重试剩余次数接口
function GetPinRetryCount(){
    $.ajax({
        url:commonUrl+"/RS_GetPinRetryCount",
        type:"post",
        data:{
            containerId:$("#containerId2").val()
        },
        success:function(res){
            var msg=JSON.parse(res);
            document.getElementById("GetPinRetryCountTxt").innerHTML = res;
            document.getElementById("GetPinRetryCountData").value = msg.data.retryCount;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.6.修改证书口令接口
function changePwd(){
    $.ajax({
        url:commonUrl+"/RS_ChangePassWd",
        type:"post",
        data:{
            containerId:$("#containerId4").val(),
            oldCode:$("#oldCode").val(),
            newCode:$("#newCode").val()
        },
        success:function(res){
//                var msg=JSON.parse(res);
//                document.getElementById("changePwdTxt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.7.验证证书有效性接口
function VerifyIdentity(){
    alert("该接口暂不支持")
    //$.ajax({
    //    url:commonUrl+"/RS_VerifyIdentity",
    //    type:"post",
    //    data:{
    //        certBase64:$("#certBase").val(),
    //        authNoL:$("#authNoL").val()
    //    },
    //    success:function(res){
    //        var msg=JSON.parse(res);
    //        document.getElementById("VerifyIdentityTxt").innerHTML = res;
    //        console.log(res);
    //    },
    //    error:function(res){
    //        console.log(res);
    //    }
    //});
}


//3.2.2.8.获取证书用户标识接口
function KeyGetKeySn(){
    $.ajax({
        url:commonUrl+"/RS_KeyGetKeySn",
        type:"post",
        data:{
            containerId:$("#SncontainerId").val()
        },
        success:function(res){
            var msg=JSON.parse(res);
            console.log(msg);
            document.getElementById("KeyGetKeySnTxt").innerHTML = res;
            document.getElementById("KeyGetKeySnData").value = msg.data.keySn;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}

//3.2.1.6.对称加密接口
function EncryptFile(){
    $.ajax({
        url:commonUrl+"/RS_EncryptFile",
        type:"post",
        data:{
            souceFilePath:$("#surEncryption").val(),
            encFilePath:$("#encryption").val()
        },
        success:function(res){
            var msg = JSON.parse(res);
            document.getElementById("EncryptFileTxt").innerHTML = res;
            document.getElementById("EncryptFileData").value = msg.data.symKey;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.1.7.对称解密接口
function DevryptFile(){
    $.ajax({
        url:commonUrl+"/RS_DecryptFile",
        type:"post",
        data:{
            symKey:$("#symmetricKey").val(),
            encFilePath:$("#encryption2").val(),
            dncDirectoryPath:$("#decryptedFiles").val()
        },
        success:function(res){

            document.getElementById("DevryptFileTxt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.14.非对称加密接口
function KeyEncryptData(){
    $.ajax({
        url:commonUrl+"/RS_KeyEncryptData",
        type:"post",
        data:{
            rsKey:$("#rsKey").val(),
            certBase64:$("#KeycertBase64").val()
        },
        success:function(res){

            var msg = JSON.parse(res);
            document.getElementById("KeyEncryptDataData").value = msg.data.encRsKey;
            document.getElementById("KeyEncryptDataTxt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.15.非对称解密接口
function KeyDecryptData(){
    $.ajax({
        url:commonUrl+"/RS_KeyDecryptData",
        type:"post",
        data:{
            encRsKey:$("#encRsKey").val(),
            containerId:$("#containerId6").val(),
        },
        success:function(res){

            document.getElementById("KeyDecryptDataTxt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.16.数字信封加密接口
function KeyEncryptByDigitalEnvelope(){
    $.ajax({
        url:commonUrl+"/RS_KeyEncryptByDigitalEnvelope",
        type:"post",
        data:{
            souceFilePath:$("#souceFilePath").val(),
            encFilePath:$("#encFilePath").val(),
            certBase64:$("#certBase2").val()
        },
        success:function(res){

            document.getElementById("KeyEncryptTxt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.17.数字信封解密接口
function KeyDecryptByDigitalEnvelope(){
    $.ajax({
        url:commonUrl+"/RS_KeyDecryptByDigitalEnvelope",
        type:"post",
        data:{
            containerId:$("#containerId7").val(),
            encFilePath:$("#encFilePath2").val(),
            dncDirectory:$("#dncDirectory").val(),
            encRsKeyPath:$("#encRsKeyPath").val()
        },
        success:function(res){

            document.getElementById("KeyDecryptByDigitalTxt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}


//3.2.2.9.P1签名接口（域签）
function KeyDigitalSignByP1(){
    $.ajax({
        url:commonUrl+"/RS_KeyDigitalSignByP1",
        type:"post",
        data:{
            asn1Msg:$("#asn1Msg").val(),
            containerId:$("#containerId5").val()
        },
        success:function(res){

            document.getElementById("KeyDigitalSignByP1Txt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.10.P1验签接口（域签）
function VerifyDigitalSignByP1(){
    $.ajax({
        url:commonUrl+"/RS_VerifyDigitalSignByP1",
        type:"post",
        data:{
            certBase64:$("#VerifycertBase64").val(),
            asn1Msg:$("#asn1Msg2").val(),
            signdMsg:$("#signdMsg").val(),
        },
        success:function(res){

            document.getElementById("VerifyDigitalSignByP1Txt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.11.P1签名接口
function KeySignByP1(){
    $.ajax({
        url:commonUrl+"/RS_KeySignByP1",
        type:"post",
        data:{
            msg:$("#msg").val(),
            containerId:$("#KeycontainerId").val(),
        },
        success:function(res){
            var msg=JSON.parse(res);
            document.getElementById("KeySignByP1Txt").innerHTML = res;
            document.getElementById("KeySignByP1Data").value = msg.data.signdMsg;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.12.P1验签接口
function VerifySignByP1(){
    $.ajax({
        url:commonUrl+"/RS_VerifySignByP1 ",
        type:"post",
        data:{
            certBase64:$("#SigncertBase").val(),
            msg:$("#asn1Msg3").val(),
            signdMsg:$("#signdMsg2").val(),
        },
        success:function(res){

            document.getElementById("VerifySignByP1Txt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.2.13.P7签名接口
function KeySignByP7(){
    $.ajax({
        url:commonUrl+"/RS_KeySignByP7",
        type:"post",
        data:{
            msg:$("#msg2").val(),
            flag:$("#flag").val(),
            containerId:$("#P7containerId").val(),
        },
        success:function(res){
            var msg=JSON.parse(res);
            document.getElementById("KeySignByP7Txt").innerHTML = res;
            document.getElementById("KeySignByP7Data").value = msg.data.signdMsg;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}
//3.2.1.3.P7验签接口
function VerifySignByP7(){
    $.ajax({
        url:commonUrl+"/RS_VerifySignByP7",
        type:"post",
        data:{
            msg:$("#signed").val(),
            signdMsg:$("#sign").val(),
            flag:$("#Identification").val()
        },
        success:function(res){

            document.getElementById("VerifySignByP7Txt").innerHTML = res;
            console.log(res);
        },
        error:function(res){
            console.log(res);
        }
    });
}