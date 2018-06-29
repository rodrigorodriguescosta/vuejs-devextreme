<template>
  <div>
    <div id="grid"></div>
  </div>

</template>

<script>
  import base from './base.vue'

  export default {
    extends: base,
    props: {
      data: {
        type: Array,
        required: false,
        default: function () {
          return []
        }
      },
      columns: {
        type: Array,
        required: true
      },
      filterRow: {
        default: true
      },
      selecionSingle: {
        default: false
      },
      allowColumnReordering: {
        default: true
      },
      allowColumnResizing: {
        default: true
      },
      columnAutoWidth: {
        default: true
      },
      editable: {
        default: false
      },
      rowAlternationEnabled: {
        default: true
      },
      styleCell: {
        type: Function,
        default: null
      },
      styleRow: {
        type: Function,
        default: null
      }
    },
    mounted: function () {
      let self = this
      let clickTimer, lastRowCLickedId
      this.grid_element = this.jQuery(this.$el).find('#grid')
      this.grid_element.dxDataGrid({
        height: '100%',
        // filterRow: {
        //   visible: this.filterRow
        // },
        columns: this.generateColumns(this.columns),
        showColumnLines: true,
        showRowLines: false,
        allowColumnReordering: this.allowColumnReordering,
        allowColumnResizing: this.allowColumnResizing,
        columnAutoWidth: this.columnAutoWidth,
        rowAlternationEnabled: this.rowAlternationEnabled,
        editing: this.editable ? {mode: 'batch', allowUpdating: true} : {},
        paging: {
          pageSize: 0
        },
        selection: {
          mode: (this.selecionSingle ? 'single' : 'multiple')
        },
        pager: {
          allowedPageSizes: false, // pode ser [5, 8, 15, 30],
          showInfo: false,
          showNavigationButtons: false,
          showPageSizeSelector: true,
          visible: false
        },
        // editing: {
        //   editEnabled: false,
        //   editMode: 'row',
        //   removeEnabled: true
        // },
        onRowClick: function (e) {
          if (self.clickTimer && self.lastRowCLickedId === e.rowIndex) {
            clearTimeout(self.clickTimer)
            self.clickTimer = null
            self.lastRowCLickedId = e.rowIndex
            self.$emit('dblClick')
          } else {
            self.clickTimer = setTimeout(() => {
              self.clickTimer = null
            }, 350)
          }

          self.$emit('rowClick')
          self.lastRowCLickedId = e.rowIndex

          // if (clickTimer && lastRowCLickedId === e.rowIndex) {
          //   clearTimeout(clickTimer)
          //   clickTimer = null
          //   lastRowCLickedId = e.rowIndex
          //   self.$emit('onRowDblClick')
          // } else {
          //   clickTimer = setTimeout(function () {
          //     self.$emit('onRowClick')
          //   }, 250)
          // }
          //
          // lastRowCLickedId = e.rowIndex
        },
        onCellPrepared(options) {
          let fieldData = options.value
          // if (fieldData && fieldData.value) {
          if (self.styleCell && options.data && options.cellElement) {
            let style = self.styleCell(options.column.dataField, options.data)
            if (style) {
              if (typeof(style) === 'string') {
                options.cellElement[0].innerHTML = style
              }
              else
                Object.assign(options.cellElement[0].style, style)
            }
          }
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
        onSelectionChanged: function (selectedItems) {
          // self.$emit('rowSelected', e.selectedRowsData)
          // self.$emit('change', this.selectedRows)
          self.selectedRows = selectedItems.selectedRowsData
          self.$emit('change', self.selectedRows)
        }
      }).dxDataGrid('instance')

      this.grid_element.dxDataGrid({dataSource: self.data})
    },
    methods: {
      resize() {

      },
      generateColumns(columnsProps) {
        let columns = []
        for (let i in columnsProps) {
          let col = this.columns[i]

          let coluna = {
            dataField: col.field,
            caption: col.title,
            visible: col.visible,
            allowSorting: col.allowSorting || true,
            allowFiltering: col.allowFiltering || false,
            allowGrouping: col.allowGrouping || false,
            allowReordering: col.allowReordering || true,
            format: col.format,
            width: col.width || ''
          }
          if (col.type === 'currency') {
            // coluna.format = 'currency'
            coluna.format = "R$ #,##0.00"
            if (col.decimals > 2)
              coluna.format = "R$ #,##0." + '0'.repeat(col.decimals)

            coluna.editorOptions = {
              format: "R$ #,##0.##"
            }
          }
          else if (col.type === 'number') {
            coluna.format = {
              type: 'decimal',
              // precision: col.precision || 2,
            }
          }
          columns.push(coluna)
        }

        return columns
      }
    },
    created() {
      let self = this
      self.$on('rowSelected', function (value) {
        self.selectedRows = value
      })
    },
    computed: {
      computedColumns: function () {

        return columns
      }
    },
    watch: {
      data: function (value) {
        this.grid_element.dxDataGrid({dataSource: value})
      },
      columns: function (columnsProps) {
        let columns = this.generateColumns(columnsProps)
        this.grid_element.dxDataGrid({columns: columns})

      },
      editable: function (value) {
        if (value)
          this.grid_element.dxDataGrid({editing: {mode: 'batch', allowUpdating: true}})
        else
          this.grid_element.dxDataGrid({editing: {}})
      }
    },
    data() {
      return {
        clickTimer: 0,
        lastRowCLickedId: {},
        currentRow: {
          rowIndex: 0,
          colIndex: 0,
          item: null
        },
        selectedRows: []
      }
    }
  }
</script>


<style>
  .dx-command-select {
    width: 25px !important;
    min-width: 25px !important;
  }
</style>
