<template>
  <div>
    <div id="menu"></div>
  </div>


</template>

<script>
  import Vue from 'vue'
  import base from './base.vue'
  import Demo from './menu_demo.vue'

  Vue.component('f-menu-demo', Demo)
  export default {
    extends: base,
    props: {
      value: {
        type: Array,
        required: true,
        default: []
      },
      hideOnMouseLeave: {
        type: Boolean,
        default: true
      }
    },
    mounted: function () {
      let self = this
      this.jQuery(this.$el).find('#menu').dxMenu({
        dataSource: self.value,
        hideSubmenuOnMouseLeave: true,
        displayExpr: 'name',
        showFirstSubmenuMode: {
          name: 'onHover',
          delay: {show: 0, hide: 500}
        },
        onItemClick: function (data) {
          self.$emit('onClick', data.itemData)
        }
      }).dxMenu('instance')
    },
    watch: {
      value: function (val) {
        this.jQuery(this.$el).find('#menu').dxMenu({
          dataSource: val
        })
      }
    }
  }
</script>


<style scoped>
</style>
