<template>
  <div>
    <span class="f-field-label">{{caption}}</span>
    <div id="field" ref="input"></div>
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
      value: {
        type: String,
        default: ''
      },
      height: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    mounted: function () {
      let self = this
      let height = 200
      if (self.height) {
        height = self.height
      }
      this.jQuery(this.$el).find('#field').dxTextArea({
        value: self.value,
        height: height,
        disabled: self.disabled,
        onValueChanged: function (e) {
          self.compValue = e.value
          self.$emit('input', e.value)
        }
      })
    },
    watch: {
      value: function (val) {
        if (val === self.compValue) return
        this.jQuery(this.$el).find('#field').dxTextArea({
          value: val
        })
      },
      disabled: function (val) {
        this.jQuery(this.$el).find('#field').dxTextArea({
          disabled: val
        })
      },
      height: function (val) {
        this.jQuery(this.$el).find('#field').dxTextArea({
          height: val
        })
      }
    }
  }
</script>
