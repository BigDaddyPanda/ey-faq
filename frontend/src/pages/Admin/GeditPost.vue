<template>
  <div>
    <ckeditor
      :alignement="['left', 'right', 'center' ,'justify']"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>

    <n-button type="primary" @click.native="modal_handler = true">Preview Modal</n-button>
    <modal :show.sync="modal_handler" headerClasses="justify-content-center">
      <div class="text-center" v-html="editorData"></div>
      <template slot="footer">
        <n-button type="success" @click.native="modal_handler = false">Close</n-button>
      </template>
    </modal>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MyCustomUploadAdapterPlugin } from "@/plugins/MyUploader.js";
// console.log("Hello");
// MyCustomUploadAdapterPlugin(ClassicEditor);

export default {
  name: "app",
  data() {
    return {
      modal_handler: false,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
        height: 3000,
        extraPlugins: [MyCustomUploadAdapterPlugin]
      }
    };
  }
};
</script>
