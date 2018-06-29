<template>
  <div class="f-input">
    <span class="f-field-label">{{caption}}</span>
    <dx-number-box
      ref="instance"
      :min="min"
      :max="max"
      :value="value"
      :inputAttr="{'style': this.inputStyleInterno}"
      :format="calcFormat"
      @keyUp="keyup"
      @valueChanged="input($event.value)"
      valueChangeEvent="input"
    />
  </div>


</template>

<script>
  import Vue from 'vue'
  import base from './base.vue'
  import {DxNumberBox} from 'devextreme-vue'

  Vue.component('dx-number-box', DxNumberBox)
  export default {
    extends: base,
    props: {
      caption: {
        type: String,
        default: ''
      },
      value: {
        type: [Number],
        default: null
      },
      showSpinButton: {
        type: Boolean,
        default: false
      },
      showClearButton: {
        type: Boolean,
        default: false
      },
      min: {
        type: Number,
        default: -9999999
      },
      inputStyle: {},
      max: {
        type: Number,
        default: 9999999
      },
      disabled: {
        type: Boolean,
        default: false
      },
      valueChangeEvent: {
        type: String,
        value: 'change'
      },
      prefix: {
        default: 'R$'
      },
      suffix: {
        default: ''
      },
      decimals: {
        type: [Number, String],
        default: 2
      },
      width: {
        default: '150px'
      },
    },
    mounted: function () {
      let self = this
      // this.instance = this.jQuery(this.$el).find('#field').dxNumberBox({
      //   value: self.value,
      //   showSpinButtons: self.showSpinButton,
      //   showClearButton: self.showClearButton,
      //   valueChangeEvent: 'keyup',
      //   format: this.calcFormat,
      //   min: self.min,
      //   max: self.max,
      //   width: self.width,
      //   disabled: self.disabled,
      //   inputAttr:  { 'style':  this.inputStyleInterno},
      //   onValueChanged: function (e) {
      //     self.compValue = e.value
      //     self.$emit('input', e.value)
      //   },
      //   onKeyUp: function (obj) {
      //     self.parseJQueryEvent(obj.jQueryEvent)
      //   },
      //   onFocusIn: function (obj) {
      //     self.parseJQueryEvent(obj.jQueryEvent)
      //   }
      // })
    },
    methods: {
      focus() {
        this.instance.focus()
        // this.jQuery(this.$el).find('#field').dxTextBox('instance').focus()
      },
      input(value) {
        this.$emit('input', parseFloat(value))
      },
      keyup($event) {
        this.$emit('keyup', $event)
      }
    },
    computed: {
      calcFormat() {
        let formato = ''

        if (this.prefix && !this.suffix)
          formato = this.prefix

        if (this.decimals) {
          formato += ' #,##0.' + '0'.repeat(this.decimals)
        }

        if (this.suffix) {
          formato += ' ' + `'${this.suffix}'`
        }

        return formato
      },
      inputStyleInterno: function () {
        let style = {}

        if (this.width) {
          style.width = this.width
        }
        style = Object.assign({}, this.inputStyle, style)
        return this.styleObjToString(style)
        return style
      }
    },
    watch: {
      // value: function (val) {
      //   if (val === self.compValue) return
      //   this.jQuery(this.$el).find('#field').dxNumberBox({
      //     value: val
      //   })
      // },
      // disabled: function (val) {
      //   this.jQuery(this.$el).find('#field').dxNumberBox({
      //     disabled: val
      //   })
      // },
      inputSytle: function (value) {
        this.instance.dxNumberBox('css', value)
//         .css({
//     'border': '1px solid red',
//     'border-radius': '5px',
//     'width': 'calc(100% - 27px)'
// })
      }
    }
  }
</script>
