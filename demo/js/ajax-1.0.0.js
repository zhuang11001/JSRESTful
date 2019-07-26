/**
 * 封装简单的ajax 函数
 * @param url  请求地址
 * @param method 请求方法 get||post；默认同步
 * @param async 是否异步 true 异步 || false  同步；默认异步
 * @param data 发送数据,只支持post方式
 * @param Callback  回调函数(数据,对象)
 * @param type  回调数据类型 text
 */
function ajax(url, data, callBack) {
    //设置参数默认值
    method = "post";
    async = true;
    data = data || null;
    callBack = callBack || function () {
            alert("默认回调函数");
        };
    type = "text";

    var xhr = false;
    //初始化XMLHttpRequest 对象
    if (window.XMLHttpRequest) {//Mozilla 浏览器
        xhr = new XMLHttpRequest();
        if (xhr.overrideMimeType) {//设置MiME 类别
            if (type == "text") {
                xhr.overrideMimeType("text/plain");
            } else if (type == "xml") {
                xhr.overrideMimeType("text/xml");
            }
        }
    } else if (window.ActiveXObject) { //IE 浏览器
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
            }
        }
    }

    //异常，创建对象实例失败
    if (!xhr) {
        window.alert("不能创建XMLHttpRequest对象实例.");
        return false;
    }

    xhr.open(method, url, async); //发起请求
    xhr.setRequestHeader("If-Modified-Since", "0"); //每次都是获取最新的内容
    if (method == "POST") { //post
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
    } else {
        xhr.send(null); //get 不能发送数据
    }

    //指定响应处理函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //成功之后调用回调函数
            if (type == "xml") {
                return callBack(xhr.responseXML, xhr);
            } else if (type == "text") {
                return callBack(xhr.responseText, xhr);
            }
        }
    };

}