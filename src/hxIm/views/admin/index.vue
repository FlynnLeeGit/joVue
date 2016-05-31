<template>
  <aside class='z-depth-2'>
    <md-btn theme='green block' size='lg' icon='chat'>会话</md-btn>
    <md-flat-btn @click='goLogin' icon='not_interested' theme='green block' size='lg'>退出</md-flat-btn>
  </aside>
  <article>
    <router-view></router-view>
  </article>
</template>
<script>
import mdBtn from '../../components/mdBtn'
import mdFlatBtn from '../../components/mdFlatBtn'
export default {
  name: 'admin-wrap',
  components: {
    mdBtn,
    mdFlatBtn
  },
  methods: {
    goLogin() {
      this.$router.go({
        name: 'userLogin'
      })
    }
  },
  route: {
    activate({
      to,
      next,
      redirect
    }) {
      log(to)
      if (!to.auth) {
        next()
      } else {
        redirect('/userLogin')
      }
    }
  },
  ready() {

  }
};
</script>
<style>
aside {
  flex: 0 0 180px;
}

article {
  padding: 5px;
  flex: 1;
  display: flex;
  overflow-y: auto;
}
</style>
