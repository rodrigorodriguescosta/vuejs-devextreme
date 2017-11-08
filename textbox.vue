<template>
  <div :style="stylelookup">
    <span class="f-field-label">{{caption}}</span>
    <div>
      <div id="field" ref="input" :style="stylelookup"></div>
      <!--<button v-if="buttonClick" @click="buttonClick" :style="stylelookup"> dddBotaddo </button>-->
      <f-button v-if="buttonClick" @click="buttonClick" :style="stylelookup" icon="search"
                :disabled="disabled"></f-button>
    </div>
  </div>

</template>

<script>
  import base from './base.vue'

  export default {
    extends: base,
    props: ['caption', 'value', 'disabled', 'buttonClick'],
    mounted: function () {
      let self = this
      this.jQuery(this.$el).find('#field').dxTextBox({
        value: this.value,
        disabled: self.disabled,
        onValueChanged: function (e) {
          self.$emit('input', e.value)
          self.isDirty = e.value !== ''
        },
        onKeyUp: function (obj) {
          if (obj.jQueryEvent.type === 'keyup') {
            self.$emit('keyup', obj.jQueryEvent)
          }
        }
      })
    },
    computed: {
      stylelookup: function () {
        if (this.buttonClick) {
          return 'float : left'
        }
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
      }
    }
  }
</script>


<style scoped>
  input:disabled {
    background: #686868;
  }
</style>
