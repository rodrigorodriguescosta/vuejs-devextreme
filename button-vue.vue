<template>
  <div style="margin: 20px 3px 0 3px; ">
    <dx-button :text="caption"
               :icon="icon"
               :type="type"
               :disabled="disabled"
               @click="$emit('click', $event)"/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import base from './base.vue'
  import {DxButton} from 'devextreme-vue'

  Vue.component('dx-button', DxButton)
  export default {
    extends: base,
    props: {
      caption: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      },
      width: {
        default: 'auto'
      },
      type: {
        default: 'default'
      }
    },
    mounted: function () {
      // let self = this
      // this.jQuery(this.$el).find('#button').dxButton({
      //   text: self.caption,
      //   type: 'default',
      //   icon: self.icon,
      //   width: self.width,
      //   disabled: self.disabled,
      //   onClick: function (e) {
      //     self.$emit('click', e.value)
      //   }
      // })
    },
    // watch: {
    //   disabled: function (val) {
    //     this.jQuery(this.$el).find('#button').dxButton({
    //       disabled: val
    //     })
    //   }
    // }
  }
</script>
