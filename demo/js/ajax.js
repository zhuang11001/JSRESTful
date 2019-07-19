// ajax封装
function ajax(url, data,callback) {
    var type =  'post';//请求类型
    var dataType =  'json';//接收数据类型
    var async =  true;//异步请求
    var alone =  false;//独立提交（一次有效的提交）
    var cache = false;//浏览器历史缓存
    var result;
    var success =  function (res) {
        console.log(res);
        callback(res);
        //result=res;
    };
    var error = function (res) {
        //result=res.responseText;
        callback(res.responseText);
        console.log(res.responseText);
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
    //return result
}