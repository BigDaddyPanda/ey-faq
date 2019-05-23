<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-sm-12 col-lg-10 text-left">
        <fg-input
          label="Subject"
          v-model="new_question.title"
          name="title"
          v-validate="'required'"
          required
          placeholder="Your question ..."
        ></fg-input>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-sm-12 col-lg-10 text-left">
        <fg-input
          label="Description"
          v-model="new_question.description"
          name="description"
          v-validate="'required'"
          required
          placeholder="Small description of the issue ..."
        ></fg-input>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-sm-12 col-lg-10 text-left">
        <div class="form-group">
          <label for="exampleFormControlTextarea2">Details</label>
          <textarea
            class="form-control rounded-0"
            v-model="new_question.content"
            required
            name="content"
            v-validate="'required'"
            :rows="((new_question.content.match(/\n/g) || []).length+2,3)"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="form-group col-sm-12 col-lg-10 text-left">
        <label class="control-label">Your question may concern which service *</label>
        <div class="offset-md-1">
          <v-select
            label="designation"
            :reduce="it => it.id"
            v-model="new_question.serviceId"
            name="serviceId"
            v-validate="'required'"
            :options="globalData.services"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="form-group col-sm-12 col-lg-10 text-left">
        <label class="control-label">Addition Files</label>
        <vue-dropzone
          v-on:vdropzone-success="fileAdded"
          v-on:vdropzone-removed-file="fileRemoved"
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="form-group col-sm-12 col-lg-10 text-left">
        <label class="control-label">Do you agree to contribute your question to FAQ *</label>
        <div class="offset-md-1">
          <n-radio
            v-model="new_question.ispublic"
            name="ispublic"
            v-validate="'required'"
            :value="false"
            label="false"
          >Yes! You can publish it as FAQ</n-radio>
          <n-radio
            v-model="new_question.ispublic"
            name="ispublic"
            v-validate="'required'"
            :value="true"
            label="true"
          >No! Keep it as a Private issue</n-radio>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <n-button type="primary" @click="sumbit" wide class="ml-auto">Submit</n-button>
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
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      new_question: {
        title: "",
        description: "",
        content: "",
        ispublic: true,
        serviceId: 0,
        attachements: []
      },
      dropzoneOptions: {
        url: "http://127.0.0.1:5000/uploadfile",
        dictDefaultMessage:
          "Add or Drop useful files over here. Accepted Files types: Images, pdf and texts",
        thumbnailWidth: 150,
        autoProcessQueue: true,
        capture: "image/",
        acceptedFiles: "image/*,application/pdf,.txt",
        addRemoveLinks: true,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      }
    };
  },
  methods: {
    validateBeforeSubmit: async function() {
      let result = await this.$validator.validateAll();
      if (result) {
        // eslint-disable-next-line
        // alert('Form Submitted!');
        return true;
      }
      return false;
    },
    fileAdded: function(file, res) {
      // console.log(file.name);
      console.log("data url: ", file, res.url);
      this.new_question.attachements.push({ link: res.url });
      // console.log("data url: " , JSON.parse(file.xhr.responseText).url);
    },
    fileRemoved: function(file, err, xhr) {
      console.log("file rem", file, err, xhr);
    },
    sumbit: function() {
      console.log("this.new_question",this.new_question, this.myuser);

      if (this.validateBeforeSubmit()) {
        axios
          .post(apiRes("question"), {
            new_question: this.new_question,
            user: this.myuser
          })
          .then(res => this.$router.push("/user/my_questions"));
      } else {
        alert("Required inputs are missing!");
      }
    }
  }
};
</script>

<style>
</style>
