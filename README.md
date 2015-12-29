# RTWebSocket
一个轻量级的websocket库，可以将socket消息转化为事件。

#demo
 >var socket = new RTWebSocket(config.host);
 
 >socket.on("init", socketOpen);
 
 >function socketOpen(){
 
 >  console.log('init事件触发了！');
   
 >}
 
 >var obj={x:100,y200};
 
 >socket.update("init",obj);
