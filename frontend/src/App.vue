<template>
  <div id="app">
    <router-view name="header"/>
    <alert :type="alert.type" style="z-index:1040;top:4rem" dismissible>
      <div class="alert-icon">
        <i class="now-ui-icons ui-2_like"></i>
      </div>
      Hey
      {{alert.message}}
    </alert>
    <div class="wrapper">
      <!-- <div v-if="alert.message" :class="`alert ${alert.type}`">{{ alert.message }}</div> -->

      <router-view/>
    </div>
    <router-view name="footer"/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  },
  mounted() {
    // this.$store.commit("assertLogin");
    this.assertLogin();
  },
  methods: {
    // ...mapActions(),
    ...mapActions({
      clearAlert: "alert/clear"
    }),
    ...mapMutations({ assertLogin: "account/assertLogin" })
  }
};
</script>
