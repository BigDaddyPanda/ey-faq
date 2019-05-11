<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th
            v-for="column in columns"
            :class="column.className"
            :style="column.style"
            :key="column.name"
          >{{startCase(column.name)}}</th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in columns" :class="column.className" :key="index">
            <a href="#" v-if="column.isLink">{{itemValue(item, column.name)}}</a>
            <span v-else-if="column.name.toLowerCase()=='status'"><badge href="#" type="primary">{{itemValue(item, column.name)}} </badge></span>
            <span v-else>{{itemValue(item, column.name)}}</span>
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
import _ from "lodash";
export default {
  name: "base-table",
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns"
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data"
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type"
    },
    theadClasses: {
      type: String,
      default: "",
      description: "<thead> css classes"
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes"
    }
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    startCase(item) {
      return _.startCase(item);
    }
  }
};
</script>
<style>
</style>
