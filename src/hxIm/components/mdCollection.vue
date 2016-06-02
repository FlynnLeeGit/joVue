<template>
  <li :class="collectionCls">
    <!-- 头像 -->
    <img v-if='avatar' :src="avatar" alt="avatar" class="circle">
    <!-- 左边图标 -->
    <i v-if='icon' :class="iconCls">{{icon}}</i>
    <!-- 内容 -->
    <span class="title">{{title}}</span>
    <slot name='primary'></slot>
    <!-- 右侧文字或者图标 -->
    <a href="javascript:;" class="secondary-content">
      <slot name='secondary'></slot>
    </a>
  </li>
</template>
<script>
import cx from 'classnames'
export default {
  name: 'component_name',
  props: {
    avatar: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'title Here'
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    collectionCls() {
      return cx(['collection-item', this.isAvatarList ? 'avatar' : '', this.active ? 'active' : ''])
    },
    iconCls() {
      return cx(['material-icons', 'circle', this.iconColor])
    },
    isAvatarList() {
      return this.avatar || this.icon
    }
  }
};
</script>
<style>
.collection .collection-item {
  cursor: pointer;
}

.collection .collection-item.avatar {
  min-height: 64px !important;
}

.secondary-content {
  top: 8px !important;
  right: 8px !important;
}
</style>
