<template>
  <div>
    <div id="comp">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import base from './base.vue'

  export default {
    extends: base,
    mounted: function () {
      this.jQuery(this.$el).find('#comp').dxScrollView({
        scrollByContent: true,
        scrollByThumb: true,
        showScrollbar: 'onScroll',
        // onReachBottom: updateBottomContent,
        reachBottomText: 'Updating...'
      }).dxScrollView('instance')
    },
    watch: {
      disabled: function (val) {
        this.jQuery(this.$el).find('#comp').dxScrollView({
          disabled: val
        })
      }
    }
  }
</script>
