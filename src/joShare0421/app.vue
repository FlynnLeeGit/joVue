<template>
    <div class="wrapper tc">
        <h1 class="main-text text-gold">邀请函</h1>
        <h2 id="s1" class="sub-text text-grey">诚邀您一同用餐</h2>
        <h2 id="s2" class="sub-text text-grey">享受JO<sup>+</sup>不等位餐厅美食</h2>
        <div id="i1" class="split-img"></div>
        <p id="k1" class="key text-gold">餐厅</p>
        <p id="d1" class="desc">{{queryObj?queryObj.restName:''}}</p>
        <p id="k2" class="key text-gold">时间</p>
        <p id="d2" class="desc">{{queryObj?queryObj.eatDate:''}}</p>
        <p id="k3" class="key text-gold">地址</p>
        <p id="d3" class="desc">{{queryObj?queryObj.address:''}}</p>
        <div id="i2" class="split-img"></div>
        <button @click='goStore' class="dld bg-gold"><span>下载JO<sup>+</sup>APP</span></button>
    </div>
    <div @click='showTip=false' v-if='showTip' class="overlay">
        <p class="tip text-right">您使用的是苹果腾讯端,请点击上方按钮&#8598;</p>
        <p class="tip text-right">然后点击'在safari中打开'</p>
    </div>
    <div @click='showAndroidTip=false' v-if='showAndroidTip' class="overlay text-center">
        <h6 style='margin-top:200px' class="text-center text-white">Android 版本稍后上线 </h6>
        <h6 class="text-center text-white">敬请期待</h6>
    </div>
</template>
<script>
import './utils/resFont'
import {
    getQuery
} from './utils/jo'


export default {
    data() {
            return {
                queryObj: getQuery() || {},
                showTip: false,
                showAndroidTip: false,
            }
        },
        methods: {
            goStore() {
                let nav = window.navigator.userAgent
                
                if (/Android/i.test(nav)) {
                    this.showAndroidTip = true
                } else if (/iPhone/i.test(nav) && /microMessenger/i.test(nav)) {
                    this.showTip = true
                } else {
                    window.document.location.href = 'https://appsto.re/cn/KlDFab.i'
                }
            }
        }
}
</script>
<style lang='sass'>
@function r($px, $ratio:1) {
    @return #{$px/100*$ratio}rem;
}

* {
    margin: 0;
    padding: 0;
    line-height: 1em;
    /*outline: 1px solid blue;*/
}

html {
    font-size-adjust: 100%;
    height: 100%;
    webkit-font-smoothing: antialiased;
}

body {
    background-image: url('./assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, STHeitiSC-Light, Arial, sans-serif, "san francisco", HelveticaNeue-Light, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "WenQuanYi Micro Hei";
}

a,
img {
    -webkit-touch-callout: none;
    /* 禁止长按链接与图片弹出菜单 */
}

html,
body {
    -webkit-user-select: none;
    /* 禁止选中文本（如无文本选中需求，此为必选项） */
    user-select: none;
}

.wrapper {
    box-sizing: border-box;
    width: r(592);
    height: r(1000);
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: r(-296);
    margin-top: r(-500);
    background-image: url('./assets/white.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .main-text {
        font-size: r(40);
        margin-top: r(36)
    }
    .sub-text {
        font-size: r(32);
        font-weight: normal;
    }
    #s1 {
        margin-top: r(48);
    }
    #s2 {
        margin-top: r(20);
    }
    .split-img {
        width: 105px;
        height: 8px;
        background-image: url('./assets/split.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    #i1 {
        margin: r(56) auto;
    }
    #i2 {
        margin: r(50) auto;
    }
    .key {
        font-size: r(30);
    }
    #k2 {
        margin-top: r(50);
    }
    #k3 {
        margin-top: r(50);
    }
    .desc {
        font-size: r(30);
        width: 14em;
        margin: 0 auto;
        margin-top: r(20);
        font-weight: 400;
        color: #7B7A74;
    }
    #d3 {
        margin-top: r(15);
        line-height: r(42);
    }
    .download {
        width: r(320);
        height: r(64);
        border: 0;
        outline: 0;
        color: #fff;
        font-size: r(30);
        text-decoration: none;
        display: inline-block;
        line-height: r(64);
    }
    .dld {
        width: r(320);
        height: r(64);
        border: 0;
        color: #fff;
        position: absolute;
        bottom: r(59);
        left: 50%;
        font-size: r(30);
        margin-left: r(-160);
        text-decoration: none;
        span {
            position: absolute;
            white-space: nowrap;
            left: 50%;
            top: 18%;
            transform: translateX(-50%);
        }
    }
}

.overlay {
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .tip {
        color: #fff;
        font-size: r(32);
    }
}

.text-right {
    text-align: right;
}
.text-white{
  color: #fff;
}
.text-center{
  text-align: center;
}
.text-gold {
    color: #E0AC54;
}

.bg-gold {
    background-color: #D4AB65;
}

.text-grey {
    color: #464334;
}
</style>
outline:1px solid blue;
