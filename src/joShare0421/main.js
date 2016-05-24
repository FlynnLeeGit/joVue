import Vue from 'vue'
import App from './App'

// 组件引入

Vue.config.debug = true

new Vue({
    el: 'body',
    components: {
        App
    }
})
