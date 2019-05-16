<template>
  <div class="justify-content-md-center">
    <div class="h5 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
    <div class="row justify-content-md-center">
      <div class="row">
        <div v-if="services" class="col-12">
          <router-link
            v-for="(it,k) in services"
            :key="k"
            v-popover:popover1
            class="btn btn"
            :to="`/questions?service_id=${it.id}`"
          >{{it.designation}}</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-lg-12 text-center">
        <fg-input
          placeholder="Search Here ..."
          v-on:click="toggle_search"
          v-model="search_query"
          addon-left-icon="now-ui-icons ui-1_zoom-bold"
        ></fg-input>
      </div>
      <div v-if="search_area" class="col-sm-12 col-lg-12 text-center">{{search_query}}</div>
    </div>

    <div class="row justify-content-md-center">
      <card>
        <h3>Most Recent FAQ.</h3>
        <card>
          <ul
            v-if="faquestions!=[]"
            slot="raw-content"
            class="list-group list-group-flush text-left"
          >
            <li v-for="(fa,ind) in faquestions" :key="ind" class="list-group-item">
              <router-link :to="`/questions/${fa.id}`">#{{fa.id}} {{fa.title}}</router-link>
              <footer class="blockquote-footer">{{fa.description}}</footer>
              <footer
                class="blockquote-footer text-right"
              >By {{fa.user.username}}, {{fa.answers.length}} Views</footer>
            </li>
          </ul>
          <div v-else>No data could be fetched!</div>
        </card>
        <router-link to="/questions">View all</router-link>
      </card>
    </div>
  </div>
</template>

<script>
import { apiRes } from "@/utils";
import { mapState } from "vuex";
import Axios from "axios";
export default {
  mounted() {
    Axios.get(apiRes("faquestions"))
      .then(res => res.data)
      .then(res => {
        this.faquestions = res;
      });
  },
  computed: {
    ...mapState(["globalData"]),
    services: function() {
      // console.log(this.globalData);
      if (this.globalData && this.globalData.services)
        return this.globalData.services;
      return false;
    }
  },
  data() {
    return {
      faquestions: [],
      search_area: false,
      search_query: ""
    };
  },
  methods: {
    toggle_search() {
      this.search_area = !this.search_area;
    }
  }
};
</script>

<style>
</style>
