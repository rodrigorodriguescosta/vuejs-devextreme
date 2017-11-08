<template>
  <div>
    <div id="grid" @rowSelected="selectedRows = $event"></div>
  </div>

</template>

<script>
  import base from './base.vue'

  export default {
    extends: base,
    props: {
      data: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      }
    },
    mounted: function () {
      let self = this
      let clickTimer, lastRowCLickedId
      this.grid_element = this.jQuery(this.$el).find('#grid')
      this.grid_element.dxDataGrid({
//        dataSource: self.data,
        height: '100%',
        columns: self.columns,
//        {
//            caption: "Nome",
//            dataField : Name
//            width: 230,
//            fixed: true / false,
//            dataType: "date" number,boolean,string
//            alignment: "right",
//            visible: false
//            calculateCellValue: function(data) {
//                return [data.Title,
//                    data.FirstName, data.LastName]
//                    .join(" ");
//            }
//        }
        filterRow: {
          visible: true
        },
        showColumnLines: true,
        showRowLines: true,
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        rowAlternationEnabled: true,
        paging: {
          pageSize: 0
        },
        selection: {
          mode: 'multiple'
        },
        pager: {
          allowedPageSizes: false, // pode ser [5, 8, 15, 30],
          showInfo: false,
          showNavigationButtons: false,
          showPageSizeSelector: true,
          visible: true
        },
        editing: {
          editEnabled: false,
          editMode: 'row',
          removeEnabled: true
        },
        onRowClick: function (e) {
          if (clickTimer && lastRowCLickedId === e.rowIndex) {
            clearTimeout(clickTimer)
            clickTimer = null
            lastRowCLickedId = e.rowIndex
            self.$emit('onRowDblClick')
          } else {
            clickTimer = setTimeout(function () {
              self.$emit('onRowClick')
            }, 250)
          }

          lastRowCLickedId = e.rowIndex
        },
        onKeyDown: function (e) {
          let selKey = e.component.getSelectedRowKeys()
          if (selKey.length) {
            let currentKey = selKey[0]
            let index = e.component.getRowIndexByKey(currentKey)
            if (e.jQueryEvent.keyCode === 38) {
              index--
              if (index >= 0) {
                e.component.selectRowsByIndexes([index])
                e.jQueryEvent.stopPropagation()
              }
            } else if (e.jQueryEvent.keyCode === 40) {
              index++
              e.component.selectRowsByIndexes([index])
              e.jQueryEvent.stopPropagation()
            }
          }
        },
        showBorders: true,
        onSelectionChanged: function (e) {
          self.$emit('rowSelected', e.selectedRowsData)
        }
      }).dxDataGrid('instance')

      this.grid_element.dxDataGrid({dataSource: self.data})
    },
    created () {
      let self = this
      self.$on('rowSelected', function (value) {
        self.selectedRows = value
      })
    },
    watch: {
      data: function (value) {
        this.grid_element.dxDataGrid({dataSource: value})
      }
    },
    data () {
      return {
        selectedRows: []
      }
    }
  }
</script>
