<template>
  <div style="height: 100%">
    <dx-data-grid
      :dataSource="data"
      :height="height"
      :keyExpr="keyField"
      :showBorders="true"
      :showRowLines="true"
      :showColumnLines="true"
      :rowAlternationEnabled="rowAlternationEnabled"
      :selection="{mode: selectionType}"
      :editing="editableInternal"
      :allowColumnReordering="allowColumnReordering"
      :allowColumnResizing="allowColumnResizing"
      :columnAutoWidth="columnAutoWidth"
      :scrolling="{mode: 'infinite'}"
      :columns="computedColumns"
      @rowClick="onRowClick"
      @cellPrepared="celprepared"
      @selectionChanged="selectionChanged">

    </dx-data-grid>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {DxDataGrid} from 'devextreme-vue'

  Vue.component('dx-data-grid', DxDataGrid)

  export default {
    props: {
      data: {
        type: Array,
        required: false,
        default: function () {
          return []
        }
      },
      height: {
        default: '100%'
      },
      keyField: {
        default: 'id'
      },
      columns: {
        type: Array,
        required: false
      },
      filterRow: {
        default: true
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
      keyboradNavigator: {
        default: true
      },
      rowAlternationEnabled: {
        default: true
      },
      editable: {
        default: false
      },
      allowGroup: {
        default: false
      },
      showColumnMenu: {
        default: false
      },
      sortable: {
        default: true
      },
      scrollable: {
        default: true
      },
      selectionType: {
        default: 'single'
        // default: function () {
        //   return {mode: 'multiple'}
        // }
      },
      gridOptions: {
        type: Object,
        default: null
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
    computed: {
      id: function () {
        return Math.random().toString(36).substring(7)
      },
      editableInternal() {
        if (this.editable)
          return {mode: 'batch', allowUpdating: true}
        else
          return {}
      },
      computedColumns: function () {
        let columns = []
        for (let i in this.columns) {
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
    mounted() {
    },
    methods: {
      celprepared(options) {
        let fieldData = options.value
        // if (fieldData && fieldData.value) {
        if (this.styleCell && options.data && options.cellElement) {
          let style = this.styleCell(options.column.dataField, options.data)
          if (style) {
            if (typeof(style) === 'string') {
              options.cellElement.innerHTML = style
            }
            else
              Object.assign(options.cellElement.style, style)
          }
        }
      },
      selectionChanged(selectedItems) {
        this.selectedRows = selectedItems.selectedRowsData
        this.$emit('change', this.selectedRows)
      },
      onRowClick: function (e) {
        if (this.clickTimer && this.lastRowCLickedId === e.rowIndex) {
          clearTimeout(this.clickTimer)
          this.clickTimer = null
          this.lastRowCLickedId = e.rowIndex
          this.$emit('dblClick')
        } else {
          this.clickTimer = setTimeout(() => {
            this.clickTimer = null
          }, 350)
        }

        this.$emit('rowClick')
        this.lastRowCLickedId = e.rowIndex
      },
      setColRowIndex: function () {
        // let self = this
        // $(this.grid.tbody).on("click", "td", function (e) {
        //   let row = $(this).closest("tr");
        //   let rowIdx = $("tr", grid.tbody).index(row);
        //   let colIdx = $("td", row).index(this);
        //   self.currentRow.rowIndex = rowIdx
        //   self.currentRow.colIndex = colIdx
        // })
      },
      resize() {

      },
      scrollToLastRow() {
        var grid = $('#' + this.id).data('kendoGrid')
        var content = grid.content;
        content.scrollTop(content[0].scrollHeight);
        // var tr = grid.table.find("tr:last")
        // var offs = tr.position().top - tr.parent().position().top;
        // grid.content.scrollTop(offs);
      },
      onColumnReoder(event) {
        this.$emit('columnReorder', event)
      },
      onColumnResize(event) {
        this.$emit('columnResize', event)
      },
      onSort(event) {
        this.$emit('sort', event)
      },
      onSave(event) {

        let obj = {
          data: JSON.parse(JSON.stringify(this.data)),
          currentRow: this.currentRow,
          changed: event.values
        }
        Object.assign(obj.data[this.currentRow.rowIndex], event.values)
        // let key = Object.keys(event.values)[0]
        // obj.data[this.currentRow.rowIndex][key] = event.values[key]
        this.$emit('save', obj)
      },
      navigate: function (e) {
      },
      select() {
        this.$refs.grid.$el.focus()
      },
      // keydown(e) {
      //   var arrows = [38, 40]
      //   if (arrows.indexOf(e.keyCode) >= 0) {
      //     setTimeout(function () {
      //       data.select($('#grid_active_cell').closest('tr'))
      //     }, 1)
      //   }
      // }
    },
    data() {
      return {
        selectedRows: [{id: 1}],
        clickTimer: 0,
        lastRowCLickedId: {},
        currentRow: {
          rowIndex: 0,
          colIndex: 0,
          item: null
        },
        jQueryGridElement: null
      }
    },

  }

</script>
