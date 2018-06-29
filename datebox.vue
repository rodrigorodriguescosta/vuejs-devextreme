<template>
  <div>
    <span class="f-field-label">{{caption}}</span>
    <div id="field" ref="input"></div>
  </div>


</template>

<script>
  import base from './base.vue'
  import moment from 'moment'

  export default {
    extends: base,
    props: {
      caption: {
        type: String,
        default: ''
      },
      value: {
        type: [String, Date],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      format: {
        type: String,
        default: 'DD/MM/yyyy'
      }
    },
    mounted: function () {
      let self = this
      this.moment = moment
      this.jQuery(this.$el).find('#field').dxDateBox({
        value: self.value,
        type: 'date',
         width: '120px',
        // displayFormat: 'dd/MM/yyyy',
        disabled: self.disabled,
        onValueChanged: function (e) {
          self.compValue = e.value
          self.$emit('input', e.value)
        }
      })
    },
    watch: {
      value: function (val) {
        if (val === this.compValue) return
        if (typeof(val) == 'string') {
          val = this.moment(val, this.format).toDate()
        } else if (!val instanceof Date) {
          return
        }

        this.jQuery(this.$el).find('#field').dxDateBox({
          // value: new Date(2015, 5, 7),
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
