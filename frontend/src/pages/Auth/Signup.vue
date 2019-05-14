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
            <!-- <div class="social-line">
              <a class="btn btn-neutral btn-facebook btn-icon btn-round">
                <i class="fab fa-facebook-square"></i>
              </a>
              <a class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="btn btn-neutral btn-google btn-icon btn-round">
                <i class="fab fa-google-plus"></i>
              </a>
            </div>-->
          </template>
          <template>
            <fg-input
              v-model="Email"
              placeholder="Email"
              addon-left-icon="now-ui-icons ui-1_email-85"
            ></fg-input>
            <fg-input
              v-model="Username"
              placeholder="Username"
              addon-left-icon="now-ui-icons ui-1_email-85"
            ></fg-input>
            <fg-input
              v-model="Password"
              type="password"
              placeholder="Password"
              addon-left-icon="now-ui-icons text_caps-small"
            ></fg-input>
            <fg-input
              v-model="C_Password"
              type="password"
              placeholder="Confirm Password"
              addon-left-icon="now-ui-icons text_caps-small"
            ></fg-input>
          </template>
          <div class="text-danger text-left">
            <ul v-html="az">{{az}}</ul>
          </div>
          <div class="card-footer text-center">
            <n-button type="neutral" @click="submit_form()" round size="lg">Sign-up</n-button>
            <br>
            <router-link :to="{name:'login-view'}">
              <n-button type="neutral" round size="xs" link>Already have an account?</n-button>
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
  data() {
    return {
      Username: "",
      Password: "",
      C_Password: "",
      Email: "",
      az: ""
    };
  },
  methods: {
    ...mapActions("account", ["register"]),
    errormessage() {
      let usernameRegex = /^[a-z0-9\_]+$/i;
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
      let x = "";
      // return this.C_Password == this.Password ? "has-danger" : "has-success";
      if (!this.Username.match(usernameRegex))
        x +=
          "<li>UserName: Only AlphaNumeric characters with Underscores allowed</li>";
      if (!this.Email.match(emailRegex))
        x += "<li>Your Email does not respect standard Email Form!</li>";
      if (this.Password.length <= 6)
        x += " <li>Password Length Should be more than 6 characters!</li>";
      if (this.Password != this.C_Password)
        x += "<li>Password does not match!</li>";
      return x;
    },
    submit_form() {
      this.az = this.errormessage();
      // console.log("submit",this.az);
      
      if (this.az == "") {
        let user = {
          username: this.Username,
          password: this.Password,
          email: this.Email
        };
        this.register(user);
      }
    }
  },
  computed: {
    ...mapState("account", ["status"])
  }
};
</script>

<style>
</style>
