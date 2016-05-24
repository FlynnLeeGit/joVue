import { joFetch } from 'jo'
const lifeServer = `${window.server}/life`
const lifeService = {
  /** [getAllLifes 获取所有生活商家] */
  getAllLifes() {
    return joFetch.post(`${lifeServer}/select`)
      .then(res => res.list)
  },
  /** [updateLife 更新生活服务] */
  updateLife(lifeJson) {
    return joFetch.post(`${lifeServer}/update`, { life: JSON.stringify(lifeJson) })
  },
  /** [insertLife 插入生活服务] */
  insertLife(lifeJson) {
    return joFetch.post(`${lifeServer}/insert`, { life: JSON.stringify(lifeJson) })
  },
  /** [getOneLife 获取单个服务] */
  getOneLife(lifeId) {
    return joFetch.post(`${lifeServer}/selectOne`, { lifeId })
      .then(res => JSON.parse(res.life))
  }

}
export default lifeService
