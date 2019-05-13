<template>
  <div class="ui container">
    <div class="filter-bar ui basic segment grid">
      <div class="ui form">
        <div class="inline field">
          <label>Search for:</label>
          <input
            type="text"
            v-model="filterText"
            class="three wide column"
            @keyup.enter="doFilter"
            placeholder="name, nickname, or designation"
          >
          <button class="ui primary button" @click="doFilter">Go</button>
          <button class="ui button" @click="resetFilter">Reset</button>
        </div>
      </div>
    </div>
    <vuetable
      ref="vuetable"
      api-url="http://127.0.0.1:5000/api/service?attributes=id,designation"
      :fields="fields"
      :append-params="moreParams"
      :multi-sort="true"
      pagination-path
      @vuetable:pagination-data="onPaginationData"
      :sort-order="sortOrder"
    >
      <template slot="actions" scope="props">
        <div class="custom-actions">
          <button
            class="ui basic button"
            @click="onAction('view-item', props.rowData, props.rowIndex)"
          >
            <i class="zoom icon"></i>
          </button>
          <button
            class="ui basic button"
            @click="onAction('edit-item', props.rowData, props.rowIndex)"
          >
            <i class="edit icon"></i>
          </button>
          <button
            class="ui basic button"
            @click="onAction('delete-item', props.rowData, props.rowIndex)"
          >
            <i class="delete icon"></i>
          </button>
        </div>
      </template>
    </vuetable>
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
      <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
    <modal :show.sync="edit_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Service #{{focus_data.id}}</h4>

      <h5>Designation:</h5>
      <h4>{{focus_data.designation}}</h4>
      <template slot="footer">
        <n-button type="danger" @click.native="view_modal = false">Close</n-button>
      </template>
    </modal>
    <modal :show.sync="view_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Modify Service</h4>
      <fg-input
        class="col-sm-6 col-12"
        label="Password"
        placeholder
        :value="focus_data.id"
        type="text"
      ></fg-input>

      <template slot="footer">
        <n-button type="danger" @click.native="hide_modal()">Close</n-button>
        <n-button @click="submit_action('edit')">Confirm</n-button>
      </template>
    </modal>
    <modal :show.sync="dele_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up text-danger">Delete Service</h4>
      <h3 class="text-danger">Warning!</h3>
      <h4>You are about to delete a whole Service! Every related user, post, question will be set to Default ones!</h4>
      <template slot="footer">
        <n-button type="danger" simple @click.native="hide_modal()">Close</n-button>
        <n-button type="danger" @click="submit_action('delete')">I know what I am doing</n-button>
      </template>
    </modal>
  </div>
</template>

<script>
import accounting from "accounting";
import moment from "moment";
import { nextTick } from "q";
import router from "@/router";

export default {
  data() {
    return {
      focus_data: {},
      edit_modal: false,
      view_modal: false,
      dele_modal: false,
      filterText: "",
      moreParams: {},
      sortOrder: [
        {
          field: "designation",
          direction: "des"
        }
      ],
      fields: [
        { name: "id", sortField: "id" },
        { name: "designation", sortField: "designation" },
        {
          name: "__slot:actions",
          title: "Actions",
          titleClass: "center aligned",
          dataClass: "center aligned"
        }
      ]
    };
  },
  methods: {
    allcap(value) {
      return value.toUpperCase();
    },

    onAction(action, data, index) {
      console.log("slot action: " + action, data.id, index);
      this.focus_data = data;
      switch (action) {
        case "delete-item":
          this.edit_modal = false;
          this.view_modal = false;
          this.dele_modal = true;
          break;

        default:
          this.edit_modal = true;
          this.view_modal = action == "view-modal";
          this.dele_modal = false;
          break;
      }
    },
    hide_modal() {
      this.focus_data = {};
      this.edit_modal = false;
      this.view_modal = false;
      this.dele_modal = false;
    },
    genderLabel(value) {
      return value === "M"
        ? '<span class="badge bg-primary"><i class="large man icon"></i>Male</span>'
        : '<span class="badge bg-primary"><i class="large woman icon"></i>Female</span>';
    },
    formatNumber(value) {
      return accounting.formatNumber(value, 2);
    },
    formatDate(value, fmt = "D MMM YYYY") {
      return value == null ? "" : moment(value, "YYYY-MM-DD").format(fmt);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    doFilter() {
      this.moreParams.filter = this.filterText;
      nextTick(() => this.$refs.vuetable.refresh());
    },
    resetFilter() {
      this.filterText = "";
      delete this.moreParams.filter;
      nextTick(() => this.$refs.vuetable.refresh());
    }
  }
};
</script>