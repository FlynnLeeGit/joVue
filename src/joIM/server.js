/** 服务器请求地址 取消注释生效 **/
var serverAddress = ''
  // serverAddress = '10.18.1.182:8081/service'
  // serverAddress = 'www.joplus.cn/jo-crm/service';
  // serverAddress = 'www.joplus.cn:8088/jo-crm/service';
serverAddress = 'crm.joplus.cn/jo-crm/service'

// 挂载到全局变量
window.server = '//' + serverAddress;
window.log = console.log.bind(console)
  // window.wsServer = 'ws://' + serverAddress + '/ws';
