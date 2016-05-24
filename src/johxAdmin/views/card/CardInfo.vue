<template>
  <div>
    <div class="col-xs-6" v-for='card in cardList'>
      <button @click='createCard(card)' class="btn btn-block btn-default btn-default">{{card.subject}}</button>
    </div>
    <!-- ***** -->
    <button @click='copykey' class="btn btn-block btn-primary">复制秘钥</button>
    <textarea v-el:cardkey rows="5" v-model='cardkey' class="form-control"></textarea>
    <card-detail v-if="showCardDetail" :show.sync='showCardDetail' :card-data='selectedCard' :card-key.sync='cardkey'></card-detail>
  </div>
</template>
<script>
import {
  joInput
} from 'jo'
import cardDetail from './cardDetail'
import {
  cardService,
  imService
} from 'api'
export default {
  components: {
    cardDetail,
    joInput
  },
  data() {
    return {
      showCardDetail: false,
      cardList: [],
      selectedCard: {},
      cardkey: ''
    }
  },
  methods: {
    createCard(card) {
      this.showCardDetail = true
      this.selectedCard = card
    },
    copykey() {
      this.$els.cardkey.select()
      window.getSelection()
      document.execCommand('copy', 'true')
      this.showAlert('复制成功!可直接黏贴了!')
    },
    showAlert(msg) {
      this.$root.$emit('showAlert', msg)
    },
  },
  asyncData(resolve, reject) {
    cardService.getTemplates().then(cardList => resolve({
      cardList
    }))
    imService.getAccount(this.$route.query.visitorImId)
      .then(({
        accountId,
        mobile,
        isVip
      }) => {
        this.$router.go({
          query: {
            accountId,
            isVip,
            orderPhone: mobile,
          }
        })
      })
  }
}
</script>
<style scoped>
.btn {
  margin: 10px 0;
}
</style>
