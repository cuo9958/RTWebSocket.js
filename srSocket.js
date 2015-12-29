//工具
(function () {
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) this.splice(index, 1);
    }
})();
//即时游戏引擎
var RTWebSocket = function (url) {
    var self = this;
    self._eventList = [];
    self._Socket = new window.WebSocket(url) || new window.webkitWebSocket(url) || null;
    if (!self._Socket) {
        throw Error("浏览器不支持WebSocket。请更换google浏览器。");
        return;
    }
    self._Socket.onopen = function () {
        console.log("服务器已连接。");
        self._Socket.onmessage = getCMD;
    }
    self._Socket.onclose = function () {
        console.log("服务器已断开。");
        self.trigger("close");
    }
    self._Socket.onerror = function () {
        console.log("程序出错。");
        self._Socket.close();
    }
    function getCMD(msg) {
        var d = JSON.parse(msg.data);
        if (d.constructor == Array) {
            self.trigger("array", d);
        } else {
            self.trigger(d.e, d);
        }
    }
}
RTWebSocket.prototype.on = function (e, fn) {
    this._eventList[e] = fn;
}
RTWebSocket.prototype.off = function (e) {
    this._eventList.remove(e);
}
RTWebSocket.prototype.trigger = function (e, d) {
    var temp = new Object();
    this._eventList[e].call(temp, d);
}
RTWebSocket.prototype.update = function (type, msg) {
    msg.e = type;
    this._Socket.send(JSON.stringify(msg));
}

