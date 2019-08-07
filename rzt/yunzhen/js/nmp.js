/**
 * websocket对象 创建对象
 */
function WS(url, callback) {
	this.ws = null;
	this.wsurl = url;
	this.lockReconnect = false;
	this.timeout = 60000;
	this.timeoutObj = null;
	this.initialization = function() {
		this.connection();
		this.heartStart();
	};
	this.connection = function() {
		var _self = this;
		_self.ws = new WebSocket(this.wsurl);
		_self.ws.open = function() {
			_self.heartStart();
		};
		_self.ws.onmessage = function(evt) {
			callback(evt.data);
			_self.heartReset();
		};
		_self.ws.onerror = function() {
			_self.reconnection();
		};
		_self.ws.onclose = function(evt) {
			_self.reconnection();
		};
	};

	this.reconnection = function() {
		var _self = this;
		if (_self.lockReconnect)
			return;
		_self.lockReconnect = true;
		setTimeout(function() {
			_self.connection();
			_self.lockReconnect = false;
		}, 2000);
	};

	this.close = function() {
		this.ws.close();
	};

	this.sendMessage = function(msg, to) {
		var message = {};
		message.mag = msg;
		message.to = to;
		_self.ws.send(JSON.stringify(message));
	};

	this.heartReset = function() {
		var _self = this;
		clearTimeout(_self.timeoutObj);
		_self.heartStart();
	};

	this.heartStart = function() {
		var _self = this;
		_self.timeoutObj = setInterval(function() {
			var message = {};
			message.mag = "HeartBeat";
			message.to = "SERVICE";
			_self.ws.send(JSON.stringify(message));
		}, _self.timeout)
	}
}