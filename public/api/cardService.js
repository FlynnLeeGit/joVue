import { joFetch } from 'jo'
const cardServer = `${window.server}/card`
const cardService = {
  /** [getTemplates 获取所有模板] */
  getTemplates() {
    return joFetch.get(`${cardServer}/all/template`)
      .then(res => res.list)
  },
  /** [deleteTemplate 删除特定模板] */
  deleteTemplate(templateId) {
    return joFetch.post(`${cardServer}/delete/${templateId}/template`)
  },
  /** [insertTemplate 新建支付模板] */
  insertTemplate(templateJson) {
    return joFetch.post(`${cardServer}/template`, { template: JSON.stringify(templateJson) })
  },
  /** [updateTemplate 更新支付模板] */
  updateTemplate(templateJson) {
    return joFetch.post(`${cardServer}/update/template`, { template: JSON.stringify(templateJson) })
  },

  /**======*/
  /** [getSerInfos 新建卡片模板从服务中拉取选项] */
  getSerInfos() {
    return joFetch.post(`${cardServer}/ser/select`)
      .then(res => res.list)
  },
  /** [createCard 生成支付卡片] */
  createCard(cardJson) {
    return joFetch.post(`${cardServer}/tocard`, { card: JSON.stringify(cardJson) })
  }
}
export default cardService
