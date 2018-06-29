<template>
  <div class="f-input">
    <span class="f-field-label">{{caption}}</span>
    <!--<span class="f-field-label"></span>-->
    <div id="field" class="form-control" ref="input"></div>
  </div>

</template>

<script>
  import base from './base.vue'
  let toStyleString = require('to-style').string

  export default {
    extends: base,
    props: ['caption', 'value', 'disabled', 'buttonClick', 'valueChangeEvent', 'validations', 'width', 'size', 'inputStyle'],
    mounted: function () {
      let self = this
      this.instance = this.jQuery(this.$el).find('#field').dxTextBox({
        value: this.value,
        disabled: self.disabled,
        width: self.width || '200px',
        mode: self.type === "password"? 'password' : '',
        valueChangeEvent: self.valueChangeEvent || 'keyup', // "keyup", "blur", "change" and "focusout" events
        // attr:  { 'style':  "text-transform: uppercase"}, //{ 'style':  this.inputStyleInterno},
        // elementAttr: { 'style':  "text-transform: uppercase"},
        inputAttr:  { 'style':  this.inputStyleInterno},
        onValueChanged: function (e) {
          self.$emit('input', e.value)
          self.isDirty = e.value !== ''
        },
        onKeyUp: function (obj) {
          self.parseJQueryEvent(obj.jQueryEvent)
        },
        onFocusIn: function (obj) {
          self.parseJQueryEvent(obj.jQueryEvent)
        }
      })

      if (this.validations) {
        this.instance.dxValidator({
          validationRules: this.validations
        })
      }
    },
    computed: {
      inputStyleInterno: function () {
        let style = {
          textTransform: 'uppercase',
        }
        if (this.type === 'email') {
          style.textTransform = 'lowercase'
        }

        if (this.inputStyle && this.inputStyle.textTransform) {
          style.textTransform = this.inputStyle.textTransform
        }

        if (this.width) {
          style.width = this.width
        }

        style = Object.assign({}, this.inputStyle, style)
        return this.styleObjToString(style)
      },
      classe() {

        let xl = this.size || 4
        let lg = xl - 2
        let md = xl - 3
        let sm = 1

        if (lg <= 0) lg = 1
        if (md <= 0) md = 1

        let col = `col-xl-${xl} col-lg-${lg} col-md-${md} col-sm-${sm}`
        col = String(col)

        let classe = {
          'form-group': true
        }
        classe[col] = true

        return classe
      }
    },
    methods: {
      focus() {
        let self = this
        this.jQuery(this.$el).find('#field').dxTextBox('instance').focus()
        // this.jQuery(this.instance).focus()
      }
    },
    watch: {
      value: function (val) {
        this.jQuery(this.$el).find('#field').dxTextBox({
          value: val
        })
      },
      disabled: function (val) {
        this.jQuery(this.$el).find('#field').dxTextBox({
          disabled: val
        })
      },
      inputstyle: function (value) {

        this.jQuery(this.$el).find('#field').css(value)
//         .css({
//     'border': '1px solid red',
//     'border-radius': '5px',
//     'width': 'calc(100% - 27px)'
// })
      }
    }
  }
</script>


<style scoped>
  input:disabled {
    background: #686868;
  }
</style>
