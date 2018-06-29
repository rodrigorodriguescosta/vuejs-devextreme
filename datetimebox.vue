<template>
  <div>
    <span class="f-field-label">{{caption}}</span>
    <div id="field" ref="input"></div>
  </div>


</template>

<script>
  import base from './base.vue'

  require('devextreme/ui/date_box')
  //  import moment from 'momment'
  let moment = require('moment')

  export default {
    extends: base,
    props: {
      caption: {
        type: String,
        default: ''
      },
      value: {
        type: [Date, String],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      inputFormat: {
        type: String,
        default: 'DD/MM/YYYY HH:mm:ss'
      },
      displayFormat: {
        type: String,
        default: 'dd/MM/yyyy HH:mm:ss'
      }
    },
    mounted: function () {
      let self = this
      this.moment = moment
      this.jQuery(this.$el).find('#field').dxDateBox({
        // value: this.parseDateTime(this.value),
        type: 'datetime',
        width: '150px',
        displayFormat: 'dd/MM/yyyy HH:mm:ss',
        disabled: self.disabled,
        onValueChanged: function (e) {
          self.compValue = e.value
          self.$emit('input', e.value)
        }
      })
    },
    methods: {
      parseDateTime(val) {
        if (val instanceof Date && val.getTime() === this.value.getTime()) {
          return val
        }

        if (val && this.inputFormat) {
          if (String(val).length >= 26)
            val = this.moment(val).toDate()
          else
            val = this.moment(val, this.inputFormat).toDate()
        }
        return val
      }
    },
    watch: {
      value: function (val) {
        val = this.parseDateTime(val)
        this.jQuery(this.$el).find('#field').dxDateBox({
          displayFormat: this.displayFormat,
          value: val
        })

      },
      disabled: function (val) {
        this.jQuery(this.$el).find('#field').dxDateBox({
          disabled: val
        })
      }
    }
  }
</script>
