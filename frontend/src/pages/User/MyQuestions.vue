<template>
  <div>
    <v-data-table
      :header-fields="headerFields"
      :sort-field="sortField"
      :sort="sort"
      :data="data || []"
      :is-loading="isLoading"
      not-found-msg="Items not found"
      :css="datatableCss"
      @onUpdate="dtUpdateSort"
      trackBy="id"
    >
      <router-link
        slot="actions"
        slot-scope="props"
        :to="`/questions/${(props.rowData.id)}`"
      >
        <n-button type="primary" icon round size="sm">
          <i class="now-ui-icons ui-1_send"></i>
        </n-button>
      </router-link>

      <Spinner slot="spinner"/>
    </v-data-table>
    <div class="row justify-content-md-center">
      <div class="form-group form-inline col-4">
        <label>Items per page</label>
        <v-select v-model="itemsPerPage" :options="listItemsPerPage"/>
      </div>
      <div class="col-4 text-right">
        <n-pagination
          v-model="currentPage"
          :total="totalItems"
          :perPage="itemsPerPage"
          @input="changePage"
          @updateCurrentPage="updateCurrentPage"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Spinner from "vue-simple-spinner";
// import { v-data-table, ItemsPerPageDropdown, Pagination } from "v-datatable-light";
import _ from "lodash";

const addZero = value => ("0" + value).slice(-2);

const formatDate = value => {
  if (value) {
    const dt = new Date(value);
    return `${addZero(dt.getDate())}/${addZero(
      dt.getMonth() + 1
    )}/${dt.getFullYear()}`;
  }
  return "";
};
import { mapState } from "vuex";
import axios from "axios";
import { apiRes } from "@/utils";

export default {
  mounted() {
    let myuser_email = this.myuser.user.email;
    axios
      .get(apiRes("myquestions", `?user=${myuser_email}`))
      .then(res => res.data)
      .then(res => {
        this.initialData = res;
        this.data = this.initialData.slice(0, 10);

        this.data_loaded = true;
      });
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
    },
    totalItems: function() {
      return this.initialData.length;
    }
  },
  components: {
    Spinner
  },
  data: function() {
    return {
      initialData: [],
      headerFields: [
        // "__slot:checkboxes",
        {
          name: "title",
          label: "Title",
          sortable: true
        },
        {
          name: "description",
          label: "Description",
          sortable: true
        },
        {
          name: "content",
          label: "Content",
          sortable: true
        },
        {
          name: "tag",
          label: "Status",
          sortable: true
        },
        {
          name: "createdAt",
          label: "Created",
          sortable: true,
          format: formatDate
        },
        {
          name: "updatedAt",
          label: "Updated",
          sortable: false,
          format: formatDate
        },
        "__slot:actions"
      ],
      data: [],
      datatableCss: {
        table: "table table-bordered table-hover table-striped table-center",
        th: "header-item",
        thWrapper: "th-wrapper",
        thWrapperCheckboxes: "th-wrapper checkboxes",
        arrowsWrapper: "arrows-wrapper",
        arrowUp: "arrow up",
        arrowDown: "arrow down",
        footer: "footer"
      },
      isLoading: false,
      sort: "asc",
      sortField: "id",
      listItemsPerPage: [5, 10, 20, 50, 100],
      itemsPerPage: 10,
      currentPage: 1
    };
  },
  methods: {
    dtEditClick: props => alert("Click props:" + JSON.stringify(props)),

    dtUpdateSort: function({ sortField, sort }) {
      const sortedData = _.orderBy(this.initialData, [sortField], [sort]);
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      this.data = sortedData.slice(start, end);
      console.log("load data based on new sort", this.currentPage);
    },

    updateItemsPerPage: function(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      if (itemsPerPage >= this.initialData.length) {
        this.data = this.initialData;
      } else {
        this.data = this.initialData.slice(0, itemsPerPage);
      }
      console.log("load data with new items per page number", itemsPerPage);
    },

    changePage: function(currentPage) {
      this.currentPage = currentPage;
      const start = (currentPage - 1) * this.itemsPerPage;
      const end = currentPage * this.itemsPerPage;
      this.data = this.initialData.slice(start, end);
      console.log("load data for the new page", currentPage);
    },

    updateCurrentPage: function(currentPage) {
      this.currentPage = currentPage;
      console.log("update current page without need to load data", currentPage);
    }
  }
};
</script>
