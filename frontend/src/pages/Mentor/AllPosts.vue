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
            placeholder="Title"
          >
          <button class="ui primary button" @click="doFilter">Go</button>
          <button class="ui button" @click="resetFilter">Reset</button>
        </div>
      </div>
      <button class="ui button ml-auto" @click="add_new_modal">Add New Post</button>
    </div>
    <vuetable
      ref="vuetable"
      api-url="http://127.0.0.1:5000/api/post?attributes=id,title,description"
      :fields="fields"
      :append-params="moreParams"
      :multi-sort="true"
      pagination-path
      @vuetable:pagination-data="onPaginationData"
      :sort-order="sortOrder"
    >
      <template slot="postlink" scope="props">
        <li class="list-group-item">
          <router-link :to="`/posts/${props.rowData.id}`">{{props.rowData.title}}</router-link>
          <footer class="blockquote-footer">
            Overview:
            <cite title="Source Title">{{props.rowData.description}}</cite>
          </footer>
        </li>
      </template>
    </vuetable>
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
      <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
    <modal :show.sync="dele_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up text-danger">Delete Service</h4>
      <h3 class="text-danger">Warning!</h3>
      <h4>You are about to delete a whole Service! Every related user, post, post will be set to Default ones!</h4>
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
          field: "title",
          direction: "des"
        }
      ],
      fields: [
        {
          name: "__slot:postlink",
          title: "Posts",
          titleClass: "center aligned",
          dataClass: "text-left aligned",
          props: ["id"]
        }
      ]
    };
  },
  methods: {
    getFullFocus(id) {
      if (id == "") this.full_focus_data = {};
      else {
        axios
          .get(apiRes("service", id))
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
          .post(apiRes("service", ""), {
            designation: this.focus_data.designation
          })
          .then(resp => {
            this.hide_modal();
            nextTick(() => this.$refs.vuetable.refresh());
          });
      } else {
        if (act == "edit") {
          axios
            .put(apiRes("service", this.focus_data.id), {
              designation: this.focus_data.designation
            })
            .then(resp => {
              this.hide_modal();
              nextTick(() => this.$refs.vuetable.refresh());
            });
        } else {
          axios.delete(apiRes("service", this.focus_data.id)).then(resp => {
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