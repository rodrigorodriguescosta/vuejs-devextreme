<template>
  <div class="f-input">
    <span class="f-field-label">{{caption}}</span>
    <div>
      <dx-text-box
        ref="textbox"
        :value="value"
        :disabled="disabled"
        :width="width"
        :validator="dxValidator"
        @valueChanged="$emit('input', $event.value)"
        @keyup="keyup"
        valueChangeEvent="input"/>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import base from './base.vue'
  import {DxTextBox} from 'devextreme-vue'

  Vue.component('dx-text-box', DxTextBox)
  export default {
    extends: base,
    props: ['caption', 'value', 'disabled', 'buttonClick', 'valueChangeEvent', 'validations', 'width'],
    mounted: function () {
      // console.log(this.$refs.textbox)
      // let self = this
      // this.instance = this.jQuery(this.$el).find('#field').dxTextBox({
      //   value: this.value,
      //   disabled: self.disabled,
      //   width: '100%',
      //   valueChangeEvent: self.valueChangeEvent || 'keyup', // "keyup", "blur", "change" and "focusout" events
      //   onValueChanged: function (e) {
      //     self.$emit('input', e.value)
      //     self.isDirty = e.value !== ''
      //   },
      //   onKeyUp: function (obj) {
      //     self.parseJQueryEvent(obj.jQueryEvent)
      //   },
      //   onFocusIn: function (obj) {
      //     self.parseJQueryEvent(obj.jQueryEvent)
      //   }
      // })
      //
      // if (this.validations) {
      // this.$refs.textbox.instance.dxValidator({
      //   validationRules: this.validations
      // })
      // }
    },
    data() {
      return {
        dxValidator: [{
          type: "required",
          message: "Name is required"
        }, {
          type: "pattern",
          pattern: /^[^0-9]+$/,
          message: "Do not use digits in the Name."
        }, {
          type: "stringLength",
          min: 2,
          message: "Name must have at least 2 symbols"
        }]
      }
    },
    computed: {},
    methods: {
      focus() {
        this.$refs.textbox.instance;
      },
      keyup(){
        console.log('dddddddddd')
      }
    },
  }
</script>


<style scoped>
  input:disabled {
    background: #686868;
  }
</style>
