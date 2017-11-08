<template>
  <div>
    <div id="button"></div>
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
      }
    },
    mounted: function () {
      let self = this
      this.jQuery(this.$el).find('#button').dxButton({
        text: self.caption,
        type: 'default',
        icon: self.icon,
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
