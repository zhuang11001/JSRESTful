var pathName = window.document.location.pathname;
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var path = window.location.host;
// document.write(
// 	"<script type='text/javascript' src='https://webchat.7moor.com/javascripts/7moorInit.js?accessId=321066d0-948f-11e8-ae85-f7c4a95d6890&autoShow=true&language=ZHCN' async='async'></script>"
// );
//在change事件发生时读取所选择的文件
/*上传照片*/
var fileReader; //
var fileName;
var fileSelect = $(".phoneBox");
var capture = $("#uploadImg");
var thisPhoneBox;
var that;
fileSelect.click(function() { //在点击a标签时，触发capture的点击
	that = $(this);
	if (that.attr('upload') == 0) {
		return
	};
	if (capture) {
		capture.click();
	}
})
var fileURI, formData, fileName, file;
$("#uploadImg").change(function() { //change事件发生时，读取文件
	fileReader = new FileReader();
	if (typeof fileReader == 'undefine') {
		tip("您的浏览器不支持fileReader！");
	}
	file = $(this)[0].files[0]; //获取用户所选的文件
	if (file) {
		fileReader.onload = function() { //显示用户所选的缩略图          
			that.children("img").remove();
			that.children("input").remove();
			// returnBase64(this.result);
			dealImage(this.result, 800, returnBase64, file.type);
		}
		fileReader.readAsDataURL(file); //获取api异步读取的文件数据
		formData = new FormData();
		formData.append("file", file);
	}
})
//压缩base64方法
function dealImage(base64, w, callback, type) {
	var newImage = new Image();
	var quality = 0.6; //压缩系数0-1之间
	newImage.src = base64;
	newImage.setAttribute("crossOrigin", 'Anonymous'); //url为外域时需要
	var imgWidth, imgHeight;
	newImage.onload = function() {
		imgWidth = this.width;
		imgHeight = this.height;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		if (Math.max(imgWidth, imgHeight) > w) {
			if (imgWidth > imgHeight) {
				canvas.width = w;
				canvas.height = w * imgHeight / imgWidth;
			} else {
				canvas.height = w;
				canvas.width = w * imgWidth / imgHeight;
			}
		} else {
			canvas.width = imgWidth;
			canvas.height = imgHeight;
			quality = 0.6;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
		var base64 = canvas.toDataURL(type, quality); //压缩语句
		// 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
		// while (base64.length / 1024 > 150) {
		// 	quality -= 0.01;
		// 	base64 = canvas.toDataURL("image/jpeg", quality);
		// }
		// 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
		// while (base64.length / 1024 < 50) {
		// 	quality += 0.001;
		// 	base64 = canvas.toDataURL("image/jpeg", quality);
		// }
		callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
	}
}

//使用压缩
function returnBase64(base64) {
	var string;
	string = '<img src="' + base64 + '" alt="">' +
		'<input type="text" style="display:none" name="' +
		that.attr("type") + '" placeholder="" value="' + base64 + '">';
	that.append(string);
	return base64
}
//获取URL传输参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	}
	return null;
}
// 设置cookies
function setCookie(name, value) {
	var exp = new Date();
	exp.setTime(exp.getTime() + 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
//读取cookies 
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if (arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}
// 清楚所有cookies
function clearCookie() {
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;) {
			document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString(); //清除当前域名下的,例如：m.kevis.com
			document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
			document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
		}
	}
}
// 字段类型判断
function checkoutState(name, val) {
	var result;
	if (name == "opnState") {
		switch (val) {
			case "01":
				result = "续存"
				break;
			case "02":
				result = "吊销"
				break;
			case "03":
				result = "筹建"
				break;
			case "04":
				result = "注销"
				break;
			case "05":
				result = "其它"
				break;
			default:
				result = "";
		}
	}
	if (name == "regNoType") {
		switch (val) {
			case "01":
				result = "统一社会信用代码/工商注册号"
				break;
			case "02":
				result = "机关和事业单位登记号"
				break;
			case "03":
				result = "社会团体登记号"
				break;
			case "04":
				result = "民国非企业单位登记号"
				break;
			case "05":
				result = "基金会登记号"
				break;
			case "06":
				result = "宗教活动场所登记号"
				break;
			case "07":
				result = "其它"
				break;
			default:
				result = "";
		}
	}
	if (name == "accoType") {
		switch (val) {
			case "01":
				result = "基本存款账户"
				break;
			case "02":
				result = "一般存款账户"
				break;
			case "03":
				result = "专用存款账户"
				break;
			default:
				result = "";
		}
	}
	if (name == "status") {
		switch (val) {
			case "-1":
				result = "审核退回"
				break;
			case "0":
				result = "草稿"
				break;
			case "10":
				result = "待审核"
				break;
			case "11":
				result = "审核中"
				break;
			case "15":
				result = "待复核"
				break;
			case "16":
				result = "复核中"
				break;
			case "20":
				result = "审核通过，待结论"
				break;
			case "99":
				result = "审核完结"
				break;
			default:
				result = "";
		}
	}
	return result;
}
// 获取表单数据
function getFromData(id) {
	if (id == undefined) {
		id = "form"
	}
	console.log(id);
	var data = {};
	var t = $(id).serializeArray();
	$.each(t, function() {
		data[name = this.name] = this.value;
	});
	return data;
}
//选中按钮可点 
$('#checkBox').change(function() {
	if ($('#checkBox').prop("checked")) {
		$('#submit').removeAttr("disabled");
	} else {
		$('#submit').attr('disabled', "true");
	}
});
// 同意自动勾选
$('#myModal').on('hidden.bs.modal', function() {
	$("#checkBox").prop("checked", "checked");
	$('#submit').removeAttr("disabled");
});
// 获取流程状态
function getProcessStatus() {
	$.ajax({
		url: "getProcessStatus",
		type: 'POST',
		success: function(result) {
			if ("0000" == result.code) {
				setTimeout(function() {
					if (result.data == "4") {
						window.location.href = "toMainPage";
					} else if (result.data == "3") {
						window.location.href = "openPage?url=commons/paymentOfAnOrder?url=1&type=0";
					}
				}, 1000)
			} else {}
		},
		error: function() {
			$.closeProgressBar(function() {
				$.shotTotal("服务器错误！", "error");
			});
		}
	});
}
