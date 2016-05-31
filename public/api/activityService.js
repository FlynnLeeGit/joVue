import { joFetch } from 'jo'
const activityServer = `${window.config.server}/activity`
export default {
  /** [getAllActivity 获取所有宣传活动] */
  getAllActivity() {
      return joFetch.post(`${activityServer}/select`)
        .then(res => res.list)
    },
    /** [getOneActivity 获取单个宣传活动] */
    getOneActivity(activityId) {
      return joFetch.post(`${activityServer}/selectOne`, { activityId })
        .then(res => JSON.parse(res.Activity))
    },
    /** [updateActivity 更新宣传活动] */
    updateActivity(activityJson) {
      return joFetch.post(`${activityServer}/update`, { activity: JSON.stringify(activityJson) })
    },
    /** [insertActivity 插入宣传活动] */
    insertActivity(activityJson) {
      return joFetch.post(`${activityServer}/insert`, { activity: JSON.stringify(activityJson) })
    },
    /** [deleteActivity 删除宣传活动] */
    deleteActivity(activityId) {
      return joFetch.delete(`${activityServer}/delete`, { activityId })
    },
    upActivity(activityId) {
      return joFetch.post(`${activityServer}/up`, { activityId })
    }

}
