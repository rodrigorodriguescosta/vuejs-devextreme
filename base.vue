<template>

</template>
<script>
  import $ from 'jquery'
  import 'devextreme/dist/css/dx.common.css'
  import 'devextreme/dist/css/dx.light.compact.css'

  require('./localization')
  require('devextreme/dist/js/dx.all')

  DevExpress.config({
    rtlEnabled: false,
    forceIsoDateParsing: false,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    defaultCurrency: 'BRL'
  })


  export default {
    data: function () {
      return {
        jQuery: $
      }
    },
    methods: {
      parseJQueryEvent(jQueryEvent) {
        let emitEvent = jQueryEvent.type
        this.$emit(emitEvent, jQueryEvent)
      },
      styleObjToString(style) {
        let stilostring = ''

        for (let i in style) {
          stilostring += i.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase() + ':' + style[i] + ';'
        }
        return stilostring
      }
    }
  }
</script>


<style>
  .f-field-label {
    font-size: 12px;
  }
</style>
