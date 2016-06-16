import { joFetch } from 'jo'
const v2EventServer = `${window.config.server}/v2/event`
export default {
  insertEvent(eventJson) {
      return joFetch.post(`${v2EventServer}/insert`, { event: JSON.stringify(eventJson) })
    },
    getEvents() {
      return joFetch.post(`${v2EventServer}/selectList`)
        .then(res => res.list)
    }
}
