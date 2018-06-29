<template>
  <div>
    <div id="button" class="f-button"></div>
  </div>
</template>

<script>
  import base from './base.vue'

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
      let self = this
      this.jQuery(this.$el).find('#button').dxButton({
        text: self.caption,
        type: self.type,
        icon: self.icon,
        width: self.width,
        disabled: self.disabled,
        onClick: function (e) {
          self.$emit('click', e.value)
        }
      })
    },
    watch: {
      disabled: function (val) {
        this.jQuery(this.$el).find('#button').dxButton({
          disabled: val
        })
      }
    }
  }
</script>

<style scoped>
  .f-button {
    margin: 5px 3px 3px 3px;
  }
</style>
