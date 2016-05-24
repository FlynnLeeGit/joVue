const openWin = (url, option) =>{
    let width = option.width || 100 // 宽
    let height = option.height || 100 // 高
    let left = option.left || 0  // 左距离
    let top = option.top || 0 // 顶距离
    let msg = option.msg || ''  // 传递信息
    let closeAfter=option.closeAfter // 几毫秒后关闭
    if (option.right !== undefined) {
        left = window.screen.width - width - option.right
    }
    if (option.bottom !== undefined) {
        top = window.screen.height - height - option.bottom
    }
    const w = window.open(`${url}?msg=${msg}`, 'newWindow', `toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no,width=${width},height=${height},left=${left},top=${top}`)
    if(closeAfter && w){
    	setTimeout(()=>{
    		w.close()
    	},closeAfter)
    }
}
export default openWin
