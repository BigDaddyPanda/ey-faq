<template>
  <div v-if="profileReady" class="container">
    <div class="row">
      <div class="col-3">
        <img
          v-if="last_download_url!=''"
          :src="userProfile&&userProfile.photo_link"
          alt="user photo"
          class="rounded-circle"
        >
      </div>
      <div class="col-9 text-left">
        <h3>Edit {{$route.query.username}}'s Profile</h3>
        <h6
          class="text-right"
        >{{roles.filter(e=>e.id==userProfile.roleId).designation}} Since {{new Date(userProfile.createdAt).toDateString()}}</h6>
      </div>
    </div>
    <hr>
    <div class="row">
      <!-- left column -->
      <div class="col-3">
        <div class="text-center">
          <vue-dropzone
            v-on:vdropzone-success="fileAdded"
            v-on:vdropzone-removed-file="fileRemoved"
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
          ></vue-dropzone>
        </div>
        <ul>
          <li v-for="(group,k) in errors.collect()" :key="k">
            <ul>
              <li v-for="(error,s) in group" :key="s">{{ error }}</li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- edit form column -->
      <div class="col-9 text-left">
        <h6>Personal info</h6>

        <form class="form-horizontal row" role="form">
          <div class="form-group col-6 row">
            <label class="col-3 control-label">First name:</label>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                v-model="userProfile.first_name"
                name="first_name"
                v-validate="'required'"
              >
            </div>
          </div>
          <div class="form-group col-6 row">
            <label class="col-3 control-label">Last name:</label>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                v-model="userProfile.last_name"
                name="last_name"
                v-validate="'required'"
              >
            </div>
          </div>
          <div class="form-group col-6 row">
            <label class="col-3 control-label">Email:</label>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                v-model="userProfile.email"
                name="email"
                v-validate="'required|email'"
              >
            </div>
          </div>
          <div class="form-group col-6 row">
            <label class="col-3 control-label">Username:</label>
            <div class="col-8">
              <input
                class="form-control"
                type="text"
                v-model="userProfile.username"
                name="username"
                v-validate="'required'"
              >
            </div>
          </div>
          <div class="form-group col-6 row">
            <label class="col-3 control-label">Password:</label>
            <div class="col-8">
              <input
                class="form-control"
                type="password"
                v-model="userProfile.password"
                name="password"
              >
            </div>
          </div>
          <div class="form-group col-6 row">
            <label class="col-3 control-label">Confirm password:</label>
            <div class="col-8">
              <input
                class="form-control"
                type="password"
                v-model="confirm_password"
                name="Password"
              >
            </div>
          </div>
          <div class="form-group col-6 row">
            <label class="col-3 control-label">Service:</label>
            <div class="col-8">
              <!-- <input class="form-control" type="text" v-model="userProfile.serviceId"  name="serviceId" v-validate="'required'" > -->
              <!-- <select
                class="form-control selectpicker"
                data-style="select-with-transition btn-primary btn-round"
                title="Single Select"
                data-size="7"
              >
                <option class="form-control my-2 py-2" disabled>Choose city</option>
                <option class="form-control my-2 py-2" value="2">Foobar</option>
                <option class="form-control my-2 py-2" value="3">Is great</option>
              </select>-->
              <v-select
                label="designation"
                :reduce="it => it.id"
                v-model="userProfile.serviceId"
                name="serviceId"
                v-validate="'required'"
                :options="services"
              ></v-select>
            </div>
          </div>
          <div class="form-group col-12 text-right row">
            <div class="col-8 row">
              <input @click="sumbit" class="btn btn-primary" value="Validate">
              <!-- <span></span> -->
              <input @click="reset" class="btn btn-default" value="Reset">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRes } from "@/utils";
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["globalData"]),
    services: function() {
      if (this.globalData && this.globalData.services)
        return this.globalData.services;
      return [];
    },
    roles: function() {
      if (this.globalData && this.globalData.services)
        return this.globalData.roles;
      return [];
    }
  },
  mounted() {
    axios
      .get(apiRes("userProfile", `?username=${this.$route.query.username}`))
      .then(res => {
        this.profileReady = true;
        this.userProfile = res.data;
        this.resetObject = Object.assign({}, res.data);
        this.last_download_url = this.userProfile.photo_link;
      });
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      profileReady: false,
      dropzoneOptions: {
        url: "http://127.0.0.1:5000/uploadfile",
        dictDefaultMessage: "Add or Drop your new Photo over here.",
        thumbnailWidth: 150,
        autoProcessQueue: true,
        capture: "image/",
        addRemoveLinks: true,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      userProfile: {},
      confirm_password: "",
      last_upload_del_url: "",
      last_download_url: ""
    };
  },

  methods: {
    validateBeforeSubmit: async function() {
      let result = await this.$validator.validateAll();
      if (result && this.userProfile.password === this.confirm_password) {
        // eslint-disable-next-line
        // alert('Form Submitted!');
        return true;
      }
      return false;
    },
    fileAdded: function(file, res) {
      this.last_download_url = this.userProfile.photo_link;
      // console.log(file.name);
      if (this.last_upload_del_url != "") {
        axios.get(this.last_upload_del_url);
      }
      this.last_upload_del_url = res.del_url;
      this.userProfile.photo_link = res.url;

      // console.log("data url: ", res);
      // console.log("data url: " , JSON.parse(file.xhr.responseText).url);
    },
    fileRemoved: function(file, err, xhr) {
      if (this.last_upload_del_url != "") {
        this.userProfile.photo_link = this.last_download_url;
        axios.get(this.last_upload_del_url);
        this.last_download_url = "";
      }
    },
    sumbit: function() {
      if (this.validateBeforeSubmit()) {
        console.log("this.userProfile", apiRes("user", this.userProfile.id));

        axios
          .put(apiRes("user", this.userProfile.id), {
            ...this.userProfile
          })
          .then(res => alert(JSON.stringify(res)));
      } else {
        alert("Fix your Profile!");
      }
    },
    reset: function() {
      this.userProfile = this.resetObject;
      this.last_download_url = this.userProfile.photo_link;
    }
  }
};
</script>

<style>
</style>
