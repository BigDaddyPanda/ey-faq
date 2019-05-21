<template>
  <div>
    <div class="section">
      <div class="container text-center">
        <div class="row text-center justify-content-md-center">
          <div class="col-md-12 col-lg-12 text-center">
            <h2 class="title text-center">{{header_title}}</h2>
            <h5 class="description"></h5>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import { mapState } from 'vuex';
export default {
  
  computed:{
    ...mapState(["account"]),
    iamadmin: function() {
      if (this.account.user && this.account.user.user)
        return this.account.user.user.role.designation == "admin";
      return false;
    },
    myauth: function() {
      if (this.account.user && this.account.user.user)
        return this.account.user.user;
      return false;
    },
    header_title(){
      return _.startCase(this.$route.path.split('/').pop())
    }
  }
};
</script>

<style>
</style>
