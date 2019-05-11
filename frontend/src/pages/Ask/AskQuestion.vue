<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-sm-12 col-lg-10 text-left">
        <fg-input
          label="Subject"
          v-model="new_question.subject"
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
          required
          placeholder="Small description of the issue ..."
        ></fg-input>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="form-group col-sm-12 col-lg-10 text-left">
        <label class="control-label">Your question may concern which service *</label>
        <div class="offset-md-1">
          <n-radio v-model="new_question.service" label="1">Service 1</n-radio>
          <n-radio v-model="new_question.service" label="2">Service 2</n-radio>
          <n-radio v-model="new_question.service" label="3">Service 3</n-radio>
          <n-radio v-model="new_question.service" label="4">Service 4</n-radio>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="form-group col-sm-12 col-lg-10 text-left">
        <label class="control-label">Addition Files</label>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="form-group col-sm-12 col-lg-10 text-left">
        <label class="control-label">Do you agree to contribute your question to FAQ *</label>
        <div class="offset-md-1">
          <n-radio v-model="new_question.serve_as_shared" label="1">Yes! You can publish it as FAQ</n-radio> 
          <n-radio v-model="new_question.serve_as_shared" label="2">No! Keep it as a Private issue </n-radio> 
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center ">
      <n-button type="primary" wide class="ml-auto">Submit</n-button>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      new_question: {},
      dropzoneOptions: {
        url: "/file/post",
        dictDefaultMessage:
          "<i class='now-ui-icons arrow justify-content-md-centers-1_cloud-upload-94'></i><br/>Add or Drop useful files over here.",
        thumbnailWidth: 150,
        autoProcessQueue: false,
        capture: "image/",
        addRemoveLinks: true,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      }
    };
  }
};
</script>

<style>
</style>
