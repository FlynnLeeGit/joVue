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
import {
  conn
} from '../../utils/easeim'
export default {
  name: 'admin-wrap',
  components: {
    mdBtn,
    mdFlatBtn
  },
  data() {
    return {}
  },
  methods: {
    goLogin() {
      conn.close()
      this.$router.go({
        name: 'userLogin'
      })
    }
  },
};
</script>
<style>
aside {
  flex: 0 0 150px;
}

article {
  padding: 5px;
  flex: 1;
  display: flex;
  overflow-y: auto;
}
</style>
