<template>
  <div class="justify-content-md-center">
    <div class="row">
      <div class="col-6 text-left">
        <card plane>
          <div class="card-title">
            <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h2>
          </div>
          <div class="card-body">
            <h4>
              Neque, aliquid aspernatur? Praesentium tenetur animi aspernatur delectus,
              Culpa accusantium laborum doloremque distinctio.
              vero alias libero sequi ullam unde sapiente suscipit assumenda.
              Culpa accusantium laborum doloremque distinctio.
            </h4>
            <br>
          </div>
        </card>
        <br>
        <br>
      </div>
      <div class="col-6 d-flex flex-row-reverse">
        <br>
        <br>
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">Sign Up</h3>
            <div class="social-line">
              <!-- <a class="btn btn-neutral btn-facebook btn-icon btn-round">
                <i class="fab fa-facebook-square"></i>
              </a>
              <a class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="btn btn-neutral btn-google btn-icon btn-round">
                <i class="fab fa-google-plus"></i>
              </a>-->
            </div>
          </template>
          <template>
            <fg-input
              v-model="username"
              placeholder="Username"
              addon-left-icon="now-ui-icons ui-1_email-85"
            ></fg-input>
            <fg-input
              v-model="password"
              type="password"
              placeholder="************"
              addon-left-icon="now-ui-icons text_caps-small"
            ></fg-input>
          </template>
          <div class="card-footer text-center">
            <n-button type="neutral" @click="login_handler" round size="lg">Login</n-button>
            <br>
            <router-link :to="{name:'signup-view'}">
              <n-button type="neutral" link round size="xs">Create a new Account!</n-button>
            </router-link>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["account"])
  },
  data() {
    return {
      password: "",
      username: ""
    };
  },
  methods: {
    ...mapActions({
      successAlert: "alert/success"
    }),
    ...mapActions("account", ["login"]),
    login_handler() {
      // console.log(this.password, this.username);
      // console.log(this.account)
      // this.successAlert(`${this.account.user.username}`)
      this.login({ username: this.username, password: this.password });
    }
  }
};
</script>

<style>
</style>
