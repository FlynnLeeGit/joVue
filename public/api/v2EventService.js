import { joFetch } from 'jo'
const v2EventServer = `${window.config.server}/v2/event`
export default {
  insertEvent(eventJson) {
      return joFetch.post(`${v2EventServer}/insert`, { event: JSON.stringify(eventJson) })
    },
    getEvents() {
      return joFetch.post(`${v2EventServer}/selectList`)
        .then(res => res.list)
    },
    getLongTimeStock(eventId) {
      return joFetch.post(`${v2EventServer}/selectLongTimeStock`, { eventId })
        .then(res => res.stock)
    },
    getOneEvent(eventId) {
      return joFetch.post(`${v2EventServer}/selectOne`, { eventId })
        .then(res => res.event)
    },
    updateEvent(eventJson) {
      return joFetch.post(`${v2EventServer}/updateEvent`, { event: JSON.stringify(eventJson) })
    }
}
