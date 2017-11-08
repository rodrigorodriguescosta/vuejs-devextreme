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
    props: ['caption', 'value', 'options', 'disabled', 'width'],
    mounted: function () {
      let self = this
      this.jQuery(this.$el).find('#field').dxSelectBox({
        displayExpr: 'text',
        valueExpr: 'value',
        disabled: self.disabled,
        items: self.options,
        width: self.width,
        readOnly: false,
        onValueChanged: function (e) {
          self.compValue = e.value
          self.$emit('input', e.value)
        }
      })
    },
    watch: {
      value: function (val) {
        if (val === self.compValue) return
        this.jQuery(this.$el).find('#field').dxSelectBox({
          value: val
        })
      },
      options: function (val) {
        this.jQuery(this.$el).find('#field').dxSelectBox({
          items: val
        })
      },
      width: function (val) {
        this.jQuery(this.$el).find('#field').dxSelectBox({
          width: val
        })
      },
      disabled: function (val) {
        this.jQuery(this.$el).find('#field').dxSelectBox({
          disabled: val
        })
      }
    }
  }
</script>
