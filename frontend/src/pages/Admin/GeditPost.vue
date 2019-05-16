<template>
  <div class="justify-content-md-center">
    <!-- 

    -->
    <div class="row justify-content-md-center">
      <div class="col-sm-12 col-lg-10 text-left">
        <fg-input label="title" v-model="title" required placeholder="Your question ..."></fg-input>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-sm-12 col-lg-10 text-left">
        <fg-input
          label="description"
          v-model="description"
          required
          placeholder="Your question ..."
        ></fg-input>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="form-group col-sm-12 col-lg-10 text-left">
        <label class="control-label">Your question may concern which service *</label>
        <div class="offset-md-1">
          <n-radio
            v-for="(s,k) in services"
            :key="k"
            inline
            v-model="serviceId"
            :label="`${s.id}`"
          >{{s.designation}}</n-radio>
        </div>
      </div>
    </div>
    <n-button type="primary" @click.native="modal_handler = true">Preview Post</n-button>
    <ckeditor
      :alignement="['left', 'right', 'center' ,'justify']"
      :editor="editor"
      v-model="content"
      :config="editorConfig"
    ></ckeditor>

    <modal :show.sync="modal_handler" headerClasses="justify-content-center">
      <h5>{{title}}</h5>
      <h5>{{description}}</h5>
      <div class="text-center" v-html="content"></div>
      <template slot="footer">
        <n-button type="error" @click.native="modal_handler = false">Close</n-button>
        <n-button type="success" @click.native="confirm">Confirm</n-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { apiRes } from "@/utils";
import axios from "axios";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MyCustomUploadAdapterPlugin } from "@/plugins/MyUploader.js";
// console.log("Hello");
// MyCustomUploadAdapterPlugin(ClassicEditor);
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

  data() {
    return {
      title: "",
      description: "",
      serviceId: "",
      modal_handler: false,
      content: "<p>Content of the Post.</p>",
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        height: 3000,
        extraPlugins: [MyCustomUploadAdapterPlugin]
      }
    };
  },
  methods: {
    confirm: function() {
      axios
        .post(apiRes("question"), {
          title: this.title,
          description: this.description,
          content: this.content,
          serviceId: Number(this.serviceId) || 1,
          userId: this.myuser.user.id
        })
        .then(res => {
          console.log(res);
          this.modal_handler = false;
        });
    }
  }
};
</script>
