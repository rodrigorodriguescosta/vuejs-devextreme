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
    props: ['caption', 'value', 'options', 'disabled', 'width', 'canEdit'],
    data() {
      return {
        instance: {}
      }
    },
    mounted: function () {
      let self = this
      this.instance = this.jQuery(this.$el).find('#field').dxSelectBox({
        displayExpr: 'text',
        valueExpr: 'value',
        disabled: self.disabled,
        items: self.options,
        value: self.value,
        width: self.width,
        acceptCustomValue: this.canEdit === true,
        readOnly: false,
        onValueChanged: function (e) {
          self.$emit('input', e.value)
        }
      })
    },
    watch: {
      value: function (val) {
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
