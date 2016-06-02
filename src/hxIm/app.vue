<template>
  <div>
    <nav>
      <div :class="['nav-wrapper','z-depth-3',mainColor,]">
        <a v-link="{path:'/'}" class="brand-logo center">环信即时通讯客户端</a>
      </div>
    </nav>
    <div class="load-panel" v-if='showLoading'>
      {{showLoading}}
      <md-loading size='lg' theme='green'></md-loading>
    </div>
    <main>
      <router-view></router-view>
    </main>
    <footer :class="['page-footer','lighten-1',mainColor]">
      <div :class="['footer-copyright',mainColor]">
        <div class="container">
          © 2016 Copyright JO IM Client
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import mdLoading from './components/mdLoading'
export default {
  components: {
    mdLoading
  },
  data() {
    return {
      mainColor: 'teal',
      showLoading: false,
    }
  }
}
</script>
<style>
html,
body,
#app {
  min-width: 1024px;
  min-height: 600px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}


/*导航与底部 定高*/

nav,
footer {
  flex: 0 1 auto;
}


/*主体区域 自适应flex*/

main {
  flex: 1;
  display: flex;
}

footer.page-footer {
  margin-top: 0;
  padding-top: 0;
}

.block {
  width: 100%;
}

.load-panel {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
