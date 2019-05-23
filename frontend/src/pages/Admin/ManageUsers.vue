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
            placeholder="designation..."
          >
          <button class="ui primary button" @click="doFilter">Go</button>
          <button class="ui button" @click="resetFilter">Reset</button>
        </div>
      </div>
      <button class="ui button ml-auto" @click="add_new_modal">Add New User</button>
    </div>
    <vuetable
      ref="vuetable"
      api-url="http://127.0.0.1:5000/api/user?attributes=id,first_name,last_name,photo_link,email,username"
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
          <!-- <button
            class="ui basic button"
            @click="onAction('edit-item', props.rowData, props.rowIndex)"
          >
            <i class="edit icon"></i>
          </button>-->
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
    <modal :show.sync="view_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">User #{{full_focus_data.id}}</h4>
      <div class="modal-body">
        <p class="display-5">first_name: {{full_focus_data.first_name}}</p>
        <p class="display-5">last_name: {{full_focus_data.last_name}}</p>
        <p class="display-5">
          Photo
          <img :src="full_focus_data.photo_link" alt="Profile">
        </p>
        <p class="display-5">email: {{full_focus_data.email}}</p>
        <p class="display-5">username: {{full_focus_data.username}}</p>
      </div>
      <template slot="footer">
        <n-button type="danger" @click.native="hide_modal()">Close</n-button>
      </template>
    </modal>
    <modal :show.sync="edit_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Modify User</h4>
      <fg-input
        class="col-12"
        label="User Designation"
        placeholder
        :value="focus_data.designation"
        v-model="focus_data.designation"
        type="text"
      ></fg-input>

      <template slot="footer">
        <n-button type="danger" @click.native="hide_modal()">Close</n-button>
        <n-button @click="submit_action('edit')">Confirm</n-button>
      </template>
    </modal>
    <!-- <modal :show.sync="create_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Create User</h4>
      <fg-input
        class="col-12"
        label="User Designation"
        placeholder
        :value="focus_data.designation"
        v-model="focus_data.designation"
        type="text"
      ></fg-input>

      <template slot="footer">
        <n-button type="danger" @click.native="add_new_modal()">Close</n-button>
        <n-button @click="submit_action('create')">Confirm</n-button>
      </template>
    </modal>-->
    <modal :show.sync="dele_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up text-danger">Delete User</h4>
      <h3 class="text-danger">Warning!</h3>
      <h4>You are about to delete a User!</h4>
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
import axios from "axios";
import { apiRes } from "@/utils";
// import router from "@/router";

export default {
  mounted() {
    axios.get(apiRes("roles", "")).then(resp => {
      this.roles = resp.data.reduce((q, p) => {
        q.push(p.designation);
        return q;
      }, []);
    });
  },
  data() {
    return {
      roles: [],
      create_modal: false,
      focus_data: {},
      full_focus_data: {},
      edit_modal: false,
      view_modal: false,
      dele_modal: false,
      filterText: "",
      moreParams: {},
      sortOrder: [
        {
          field: "email",
          direction: "des"
        }
      ],
      fields: [
        { name: "id", sortField: "id" },
        { name: "first_name", sortField: "first_name" },
        { name: "last_name", sortField: "last_name" },
        { name: "photo_link", sortField: "photo_link" },
        { name: "email", sortField: "email" },
        { name: "username", sortField: "username" },
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
    getFullFocus(id) {
      if (id == "") this.full_focus_data = {};
      else {
        axios
          .get(apiRes("user", id))
          .then(response => {
            this.full_focus_data = response.data;
          })
          .catch(error => {
            this.full_focus_data = {};
          });
      }
    },
    allcap(value) {
      return value.toUpperCase();
    },
    add_new_modal() {
      this.create_modal = !this.create_modal;
    },
    onAction(action, data, index) {
      this.focus_data = data;
      switch (action) {
        case "delete-item":
          this.edit_modal = false;
          this.view_modal = false;
          this.dele_modal = true;
          break;
        case "view-item":
          this.edit_modal = false;
          this.view_modal = true;
          this.dele_modal = false;
          this.getFullFocus(data.id);
          break;
        default:
          this.edit_modal = true;
          this.view_modal = false;
          this.dele_modal = false;
          break;
      }
    },
    submit_action(act) {
      if (act == "create") {
        axios
          .post(apiRes("user", ""), {
            designation: this.focus_data.designation
          })
          .then(resp => {
            this.hide_modal();
            nextTick(() => this.$refs.vuetable.refresh());
          });
      } else {
        if (act == "edit") {
          axios
            .put(apiRes("user", this.focus_data.id), {
              designation: this.focus_data.designation
            })
            .then(resp => {
              this.hide_modal();
              nextTick(() => this.$refs.vuetable.refresh());
            });
        } else {
          axios.delete(apiRes("user", this.focus_data.id)).then(resp => {
            this.hide_modal();
            nextTick(() => this.$refs.vuetable.refresh());
          });
        }
      }
    },
    hide_modal() {
      this.focus_data = {};
      this.edit_modal = false;
      this.view_modal = false;
      this.dele_modal = false;
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