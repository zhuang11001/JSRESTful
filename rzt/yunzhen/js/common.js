/**
 * 
 */
$.extend({
	/**
	 * 显示进度条
	 */
	showProgressBar:function(message){
		var html = new Array();
		html.push('<div class="modal fade" id="_progressBar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
		html.push('<div class="modal-dialog" style="top:50%;margin-top:-50px;">');
		html.push('<div class="modal-content" style="width:400px;left:50%;margin-left:-200px;">');
		html.push('<div class="modal-body">');
		html.push('<div id="modal_message" style="text-align: center">');
		html.push('<h6>');
		html.push(message);
		html.push('</h6>');
		html.push('</div>');
		html.push('<div class="progress progress-striped active" style="height:8px;">');
		html.push('<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">');
		html.push('<span class="sr-only">100% 完成</span>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		$(document.body).append(html.join(''));
		$("#_progressBar").modal("show");
	},
	
	/**
	 * 关闭进度条
	 */
	closeProgressBar:function(callback){
		$('#_progressBar').modal('hide');
		$('#_progressBar').on('hidden.bs.modal', function() {
			if(callback){
				callback();
			}			
            $('#_progressBar').remove();
		});
	},
	
	/**
	 * 弹出自动关闭的消息提示框
	 */
	shotTotal:function(message,type,callback){
		var html = new Array();
		html.push('<div class="modal fade" id="_shotTotal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
		html.push('<div class="modal-dialog" style="top:50%;margin-top:-50px;">');
		html.push('<div class="modal-content" style="width: 250px; left: 50%; margin-left: -125px;">');
		html.push('<div class="modal-body" style="padding-left: 20px; padding-right: 20px;">');
		if(type){
			switch(type){
			  case'success':{
				  html.push('<i class="fa fa-check-circle fa-2x" style="color: green;"></i>');
			  }break;
			  case'error':{
				  html.push('<i class="fa fa-times-circle fa-2x" style="color: red;"></i>');
			  }break;
			  case'warning':{
				  html.push('<i class="fa fa-warning fa-2x" style="color: red;"></i>');
			  }break;
			}
		}else{
			html.push('<i class="fa fa-check-circle fa-2x" style="color: green;"></i>');
		}
		html.push('<strong style="margin-left: 15px;position: relative;top: -5px;">');
		html.push(message);
		html.push('</strong>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		if($("#_shotTotal")){
			$("#_shotTotal").remove();
		}
		$(document.body).append(html.join(''));
		$("#_shotTotal").modal("show");
		setTimeout(function(){
			$("#_shotTotal").modal("hide");
			if(callback){
				$('#_shotTotal').on('hidden.bs.modal', function() {
					callback();
                    $("#_shotTotal").remove();
				});
			}else{
				$('#_shotTotal').on('hidden.bs.modal', function() {
                    $("#_shotTotal").remove();
				});
			}
		},'1500');
	},
	
	/**
	 * 显示输入对话框
	 * @returns
	 */
	showInputBox:function(title,leableText,defaultValue,callback,placeholder){
		var html = new Array();
		html.push('<div class="modal fade" id="_inputBox" tabindex="-1" role="dialog" aria-labelledby="_inputBox" aria-hidden="true">');
		html.push('<div class="modal-dialog" style="top:50%;margin-top:-120px;">');
		html.push('<div class="modal-content">');
		html.push('<div class="modal-header">');
		html.push('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>');
		html.push('<h4 class="modal-title" id="myModalLabel">');
		html.push(title);
		html.push('</h4>');
		html.push('</div>');
		html.push('<div class="modal-body">');
		html.push('<form class="form-horizontal" role="form">');
		html.push('<div class="form-group">');
		html.push('<div class="col-sm-2">');
		html.push('<label for="firstname" class="control-label">');
		html.push(leableText);
		html.push('</label>');
		html.push('</div>');
		html.push('<div class="col-sm-10">');
		html.push('<input type="text" class="form-control" id="_input" value="');
		html.push(defaultValue)
		html.push('" placeholder="');
		html.push(placeholder);
		html.push('">');
		html.push('</div>');
		html.push('</div>');
		html.push('</form>');
		html.push('</div>');
		html.push('<div class="modal-footer">');
		html.push('<button type="button" class="btn btn-primary">确认</button>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		$(document.body).append(html.join(''));
		$("#_inputBox").modal("show");
		$("#_inputBox").find(".btn").bind("click",function(){
			var data = $("#_input").val();
			$("#_inputBox").modal("hide");
			$('#_inputBox').on('hidden.bs.modal', function() {				
				$("#_inputBox").remove();
			});
			callback(data);
		});
		
		$("#_inputBox").find(".close").bind("click",function(){
			$("#_inputBox").modal("hide");
			$('#_inputBox').on('hidden.bs.modal', function() {				
				$("#_inputBox").remove();
			});
		});
	},
	
	/**
	 * 关闭输入对话框
	 */
	closeInputBox:function(callback){
		$("#_inputBox").modal("hide");
		$('#_inputBox').on('hidden.bs.modal', function() {				
			$("#_inputBox").remove();
			if(callback){
				callback();
			}			
		});
	},
	
	
	/**
	 * {
	 *   bottom:['','']
	 *   action:
	 * }
	 */
	showFirmBox:function(json){
		if($("#_firmModel")){
			$("#_firmModel").remove();
		}
		var html = new Array();
		html.push('<div class="modal fade" id="_firmModel" tabindex="-1" role="dialog" aria-labelledby="_firmModel" aria-hidden="true">');
		html.push('<div class="modal-dialog" style="top:50%;margin-top:-');
		html.push(parseInt(json.height/2));
		html.push('px;">');
		html.push('<div class="modal-content" style="width:');
		html.push(json.width);
		html.push('px;left:50%;margin-left:-');
		html.push(parseInt(json.width/2));
		html.push('px;">');
		html.push('<div class="modal-header">');
		html.push('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>');
		html.push('<h4 class="modal-title" id="myModalLabel">');
		html.push(json.title);
		html.push('</h4>');
		html.push('</div>');
		html.push('<div class="modal-body" style="text-align:center;">');
		html.push(json.content);
		html.push('</div>');
		html.push('<div class="modal-footer">');
		if("none" != json.type){
			html.push('<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>');
			html.push('<button type="button" name="confirm" class="btn btn-primary">确定</button>');
		}
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		html.push('</div>');
		$(document.body).append(html.join(''));
		if(json.before){
			json.before();
		}
		$("#_firmModel").modal("show");
		$("#_firmModel").find("button[name='confirm']").unbind("click");
		$("#_firmModel").find("button[name='confirm']").click(function(){
			if(json.confirm){
				$("#_firmModel").modal("hide");
				$('#_firmModel').on('hidden.bs.modal', function() {	
					$("#_firmModel").remove();
					json.confirm();
				});	
			}
		});
		
	}
	
	
	
	
});