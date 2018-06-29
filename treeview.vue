<template>
  <div>
    <div id="treeview"></div>
  </div>
</template>

<script>
  import base from './base.vue'

  export default {
    extends: base,
    props: {
      checked: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default: []
      },
      searchValue: {
        type: String,
        value: ''
      },
      width: {
        type: [String, Number],
        default: 320
      }
    },
    mounted: function () {
      let self = this
      this.jQuery = require('jquery')
      let items = JSON.stringify(this.value)
      items = JSON.parse(items)
      this.convertItemsToReative(items)
      self.$emit('input', items)

      this.jQuery(this.$el).find('#treeview').dxTreeView({
        items: this.value,
        width: self.width,
        showCheckBoxesMode: self.checked ? 'normal' : 'none',
        disabled: self.disabled,
        onItemSelectionChanged: function (e) {
          let item = e.node
          if (self.checked) {
            if (self.isProduct(item)) {
              self.processProduct(self.jQuery.extend({
                parent: item.parent.text
              }, item))
            } else {
              self.jQuery.each(item.items, function (index, product) {
                self.processProduct(self.jQuery.extend({
                  parent: item.text
                }, product))
              })
            }

            self.$emit('onItemChange', self.checkedItems)
          } else {
            self.$emit('onItemChange', item)
          }
        },
        onItemClick: function (e) {
          self.$emit('onItemClick', e.itemData)
        },
        itemTemplate: function (data) {
          return '<div>' + data.text + '</div>'
        }
      })
    },
    methods: {
      isProduct (data) {
        return !data.items.length
      },
      convertItemsToReative (items) {
        items.forEach((item) => {
          if (!item.hasOwnProperty('selected')) {
            item.selected = false
          }

          if (!item.hasOwnProperty('expanded')) {
            item.expanded = false
          }

          if (item.items) {
            this.convertItemsToReative(item.items)
          }
        })
      },
      processProduct (product) {
        let itemIndex = -1

        self.jQuery.each(this.checkedItems, function (index, item) {
          if (item.key === product.key) {
            itemIndex = index
            return false
          }
        })

        if (product.selected && itemIndex === -1) {
          this.checkedItems.push(product)
        } else if (!product.selected) {
          this.checkedItems.splice(itemIndex, 1)
        }
      }

    },
    data () {
      return {
        checkedItems: []
      }
    },
    watch: {
      value: function (val) {
        this.jQuery(this.$el).find('#treeview').dxTreeView({
          items: val
        })
      },
      disabled: function (val) {
        this.jQuery(this.$el).find('#treeview').dxTreeView({
          disabled: val
        })
      },
      searchValue: function (val) {
        this.jQuery(this.$el).find('#treeview').dxTreeView({
          searchValue: val
        })
      },
      checked: function (val) {
        this.jQuery(this.$el).find('#treeview').dxTreeView({
          showCheckBoxesMode: val ? 'normal' : 'none'
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
