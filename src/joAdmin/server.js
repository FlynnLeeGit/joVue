/** 服务器请求地址 取消注释生效 **/
var serverAddress = '10.18.1.215:8081/service';
// var serverAddress = 'www.joplus.cn/jo-crm/service';
// var serverAddress = 'www.joplus.cn:8088/jo-crm/service';

// 挂载到全局变量
window.server = '//' + serverAddress;
window.wsServer = 'ws://' + serverAddress + '/ws';
