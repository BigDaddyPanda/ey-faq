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
            placeholder="title..."
          >
          <button class="ui primary button" @click="doFilter">Go</button>
          <button class="ui button" @click="resetFilter">Reset</button>
        </div>
      </div>
      <!-- <button class="ui button ml-auto" @click="add_new_modal">Add New Question</button> -->
    </div>
    <vuetable
      ref="vuetable"
      api-url="http://127.0.0.1:5000/api/question?attributes=id,title,description,tag,userId,serviceId"
      :fields="fields"
      :append-params="moreParams"
      :multi-sort="true"
      pagination-path
      @vuetable:pagination-data="onPaginationData"
      :sort-order="sortOrder"
    >
      <template slot="actions" scope="props">
        <div class="custom-actions">
          <router-link class="ui basic button" :to="`/questions/${props.rowData.id}`">
            <i class="zoom icon"></i>
          </router-link>
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
      <h4 slot="header" class="title title-up">Modify Question</h4>
      <div>
        Mark as:&nbsp;
        Pending
        <n-radio inline v-model="newTag" label="pending"></n-radio>Solved
        <n-radio inline v-model="newTag" label="solved"></n-radio>Closed
        <n-radio inline v-model="newTag" label="closed"></n-radio>
      </div>
      <hr>
      <div>
        Modify Services:&nbsp;
        <div>
          <n-radio
            v-for="(x,y) in services"
            :key="y"
            inline
            v-model="newService"
            :label="x.id"
          >{{x.designation}}</n-radio>
        </div>
      </div>
      <hr>
      <div class="text-left">
        <div class="form-group">
          <label
            for="exampleFormControlTextarea2"
          >Suggest a Modification, User will be notified for the changes</label>
          <textarea class="form-control rounded-0" v-model="modificationtext" rows="4"></textarea>
        </div>
        <h4>Question Preview</h4>

        <hr>
        <div v-if="full_focus_data&&full_focus_data.title">
          <h4>Title</h4>
          {{full_focus_data.title}}
          <h4>Description</h4>
          {{full_focus_data.description}}
          <h4>Content</h4>
          {{full_focus_data.content}}
        </div>
      </div>
      <template slot="footer">
        <n-button type="danger" @click.native="hide_modal()">Close</n-button>
        <n-button @click="submit_action('edit')">Confirm</n-button>
      </template>
    </modal>
    <!-- <modal :show.sync="create_modal" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Create Question</h4>
      <fg-input
        class="col-12"
        label="Question Designation"
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
      <h4 slot="header" class="title title-up text-danger">Delete Question</h4>
      <h3 class="text-danger">Warning!</h3>
      <h4>You are about to delete a whole Question! Owner user will be Notified ones!</h4>
      <div class="form-group">
        <label
          for="exampleFormControlTextarea2"
        >If you insist, please provide a message to the Owner</label>
        <textarea class="form-control rounded-0" v-model="deletereason"></textarea>
      </div>
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
import { mapState } from "vuex";
// import router from "@/router";

export default {
  mounted() {
    // axios.get(apiRes("roles", "")).then(resp => {
    //   this.roles = resp.data.reduce((q, p) => {
    //     q.push(p.designation);
    //     return q;
    //   }, []);
    // });
  },
  computed: {
    ...mapState(["globalData", "account"]),
    services: function() {
      // console.log(this.globalData);
      if (this.globalData && this.globalData.services)
        return this.globalData.services;
      return false;
    },
    myuser: function() {
      if (this.account.user && this.account.user.user) {
        return this.account.user;
      }
    }
  },
  data() {
    return {
      // roles: [],
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
      modificationtext: "",
      deletereason: "",
      newTag: (this.full_focus_data && this.full_focus_data.tag) || "pending",
      newService: (this.full_focus_data && this.full_focus_data.serviceId) || 1,
      fields: [
        { name: "id", sortField: "id" },
        { name: "title", sortField: "title" },
        { name: "description", sortField: "description" },
        { name: "tag", sortField: "tag" },
        { name: "userId", sortField: "userId" },
        { name: "serviceId", sortField: "serviceId" },
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
          .get(apiRes("question", id))
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
          break;
        default:
          this.edit_modal = true;
          this.view_modal = false;
          this.dele_modal = false;
          this.getFullFocus(data.id);
          break;
      }
    },
    submit_action(act) {
      if (act == "create") {
        alert("Action not implemented");
      } else {
        if (act == "edit") {
          let { modificationtext, newTag, newService } = this;
          axios
            .put(apiRes("question", this.focus_data.id), {
              modificationtext,
              newTag,
              newService,
              editor: this.myuser
            })
            .then(resp => {
              this.hide_modal();
              nextTick(() => this.$refs.vuetable.refresh());
            });
        } else {
          axios.put(apiRes("delquestion", this.focus_data.id), {
            deletereason: this.deletereason,
            target: this.full_focus_data,
            admin: this.myuser
          });
          // .then(resp => {
          //   this.hide_modal();
          //   nextTick(() => this.$refs.vuetable.refresh());
          // });
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