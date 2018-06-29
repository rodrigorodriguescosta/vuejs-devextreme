<template>
  <div>
    <div id="dxCheckBox" class="f-field-label"></div>
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
      value: {
        type: Boolean,
        default: false
      }
    },
    mounted: function () {
      let self = this
      this.jQuery(this.$el).find('#dxCheckBox').dxCheckBox({
        value: self.value,
        text: self.caption,
        disabled: self.disabled,
        onValueChanged: function (e) {
          self.$emit('input', e.value)
        }
      })
    },
    watch: {
      disabled: function (val) {
        this.jQuery(this.$el).find('#dxCheckBox').dxCheckBox({
          disabled: val
        })
      },
      value: function (val) {
        this.jQuery(this.$el).find('#dxCheckBox').dxCheckBox({
          value: val
        })
      }
    }
  }
</script>
