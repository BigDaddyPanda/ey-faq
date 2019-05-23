<template>
  <div class="justify-content-md-center">
    <div class="row justify-content-md-center">
      <div class="col-xs-10 col-md-10" ref="Overview" id="Overview">
        <div class="card" v-if="my_publisher||my_admin">
          <div class="row">
            <div v-if="my_publisher" class="col ml-2 align-self-center">Modify Your Question</div>
            <div v-else class="col ml-2 align-self-center">Modify This Question</div>
            <div class="col-md-4 text-right mr-2">
              <button
                @click="postDelete"
                class="btn btn-danger btn-sm outline"
              >{{editingMode == "preview"?'Delete':'RollBack'}}</button>
              <button
                @click="postModify"
                class="btn btn-primary btn-sm outline"
              >{{editingMode == "preview"?'Modify':'Apply'}}</button>
            </div>
          </div>
        </div>
        <div v-if="loadingState=='success'">
          <card type="blog">
            <div class="card-header">
              <fg-input
                v-if="editingMode=='modify'"
                label="Subject"
                v-model="post_data.title"
                name="title"
                v-validate="'required'"
                required
                placeholder="Your post ..."
              ></fg-input>
              <h4 v-else>{{post_data.title}}</h4>
              <fg-input
                v-if="editingMode=='modify'"
                label="Description"
                v-model="post_data.description"
                name="description"
                v-validate="'required'"
                required
                placeholder="Small description of the issue ..."
              ></fg-input>
              <h6 v-else>{{post_data.description}}</h6>
              <v-select
                v-if="editingMode=='modify'"
                label="designation"
                :reduce="it => it.id"
                v-model="post_data.serviceId"
                name="serviceId"
                v-validate="'required'"
                :options="globalData.services"
              ></v-select>
              <badge v-else type="primary">#{{post_data.service.designation}}</badge>
            </div>
            <div 
            class="mx-1"
              v-if="editingMode=='modify'">
            <ckeditor
              @ready="onReady"
              :editor="editor"
              v-model="post_data.content"
              :config="editorConfig"
            ></ckeditor>
            </div>
            <div v-else v-html="post_data.content">{{post_data.content}}</div>
            <div class="card-footer text-right">
              <div v-if="post_data.edited" class="text-success col-xs-2 my-0">
                Edited By:
                <span class="text-success">{{post_data.editedBy}}</span>
              </div>
              <div class="col-xs-2 my-0">
                Posted By:
                <span class="text-success">{{post_data.user.username}}</span>
              </div>
            </div>
          </card>
          <h2 class="text-left">Comment(s)</h2>
          <div>
            <card type="blog" ref="Comment" id="Comment">
              <div class="card-body py-0">
                <div class="row py-0">
                  <span class="col-8 align-self-center">Your Comment:</span>
                </div>
                <div class="card-description text-left">
                  <textarea
                    class="form-control rounded-0"
                    v-model="mycomment"
                    required
                    name="content"
                    v-validate="'required'"
                    :rows="4"
                  ></textarea>
                </div>
                <div class="card-description text-right">
                  <n-button @click="submitComment">Submit</n-button>
                </div>
              </div>
            </card>
          </div>
          <div v-if="!post_comments.length">No Comments Yet! Be the first.</div>
          <div v-else>
            <div v-for="(comment,k) in post_comments" :key="k">
              <card type="blog" ref="Comment" id="Comment">
                <div class="card-body py-0">
                  <div class="row py-0">
                    <span class="col-8 align-self-center">user #{{comment.userId}} said:</span>
                    <span class="col-4 ml-auto text-right">
                      <!-- <n-button
                        type="success"
                        icon
                        v-if="my_admin||my_publisher"
                        @click="successRate(comment.id)"
                        round
                        size="sm"
                      >
                        <i class="now-ui-icons ui-2_like"></i>
                      </n-button>-->
                      <n-button
                        style="transform: scale(-1, -1);"
                        type="danger"
                        class="pl-auto"
                        icon
                        round
                        v-if="my_admin||my_publisher||isauthed&&isauthed.id==comment.userId"
                        @click="dangerRate(comment.id)"
                        size="sm"
                      >
                        <i class="now-ui-icons ui-2_like"></i>
                      </n-button>
                    </span>
                  </div>
                  <p v-html="comment.content.replace('\n','<br/>')"></p>
                </div>
              </card>
            </div>
          </div>
        </div>
        <div v-else-if="loadingState=='loading'">
          <h1>Loading Post Data</h1>
        </div>
        <div v-else>
          <h1>:( Whoops no Post could be loaded</h1>
        </div>
      </div>
    </div>
    <modal
      :show.sync="modal_show"
      class="modal-primary"
      :show-close="false"
      header-classes="justify-content-center"
      type="mini"
    >
      <div slot="header" class="modal-profile d-flex justify-content-center align-items-center">
        <i class="now-ui-icons design_scissors"></i>
      </div>
      <p>
        Are you sure you want to permanently Delete this Post?
        <br>
        Tell us why: {{ errors.first('delete reason') }}
      </p>
      <textarea
        class="form-control rounded-0"
        v-model="deletereason"
        required
        name="delete reason"
        v-validate="'required'"
        placeholder="reason for deletion"
        :rows="4"
      ></textarea>
      <template slot="footer">
        <n-button type="neutral" link @click="toggleModal">Nevermind</n-button>
        <n-button
          type="danger"
          link
          @click.native="deletereason!=''?toggleModal('mechni nfadlek'):null"
        >Yes I am Sure</n-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { apiRes } from "@/utils";
import axios from "axios";
import { mapState } from "vuex";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { MyCustomUploadAdapterPlugin } from "@/plugins/MyUploader.js";

export default {
  computed: {
    ...mapState(["globalData"]),
    ...mapState(["account"]),
    my_admin: function() {
      if (this.account && this.account.status && this.account.status.loggedIn)
        if (this.account.user.user.role.designation == "admin")
          return this.account.user.user;
      return null;
    },
    my_publisher: function() {
      if (this.my_admin && this.post_data)
        if (this.my_admin.id == this.post_data.user.id)
          return this.account.user.user;
      return null;
    },
    isauthed: function() {
      return this.account && this.account.user && this.account.user.user;
    }
  },
  methods: {
    deleteAttachement(k) {
      axios
        .delete(apiRes("attachement", this.post_data.attachements[k].id))
        .then(e => {
          this.post_data.attachements.splice(k, 1);
        });
    },
    toggleModal(tfadlek = "nfadlek") {
      if (tfadlek == "nfadlek") {
        this.modal_show = !this.modal_show;
      } else {
        this.modal_show = false;
        console.log("this.deletereason", this.deletereason, this.account.user);

        axios
          .put(apiRes("delpost", this.post_data.id), {
            deletereason: this.deletereason,
            admin: this.account.user
          })
          .then(e => this.$router.push("/user/my_posts"));
      }
    },
    postDelete() {
      if (this.editingMode == "preview") {
        // delete
        this.toggleModal();
        return;
      } else {
        // rollback
        this.post_data = Object.assign({}, this.rollBack_post_data);
      }
      this.editingMode = this.editingMode == "preview" ? "modify" : "preview";
    },
    postModify() {
      if (this.editingMode == "preview") {
        // alternate to modification so just pass
      } else {
        // apply modifications
        axios.put(apiRes("post", this.post_data.id), {
          title: this.post_data.title,
          description: this.post_data.description,
          serviceId: this.post_data.serviceId,
          content: this.post_data.content,
          // updates: this.post_data,
          editor: this.account.user,
          modificationtext:
            "Have a look at your Post, I have already applied Changes!"
        });
      }
      this.editingMode = this.editingMode == "preview" ? "modify" : "preview";
    },
    submitComment() {
      if (this.mycomment.length) {
        axios
          .post(apiRes("comment"), {
            content: this.mycomment,
            postId: this.post_data.id,
            userId: this.account.user.user.id
          })
          .then(r => window.location.reload());
      }
    },
    successRate(idAns) {
      axios
        .put(apiRes("comment", idAns), {
          responsible: this.account.user.user
        })
        .then(r => window.location.reload());
    },
    dangerRate(idAns) {
      axios
        .post(apiRes("delcomment", idAns), {
          responsible: this.account.user.user
        })
        .then(r => window.location.reload());
    },
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    }
  },
  data() {
    return {
      editingMode: "preview", //preview,modify
      rollBack_post_data: null,
      mycomment: "",
      deletereason: "",
      activeTab: "Overview",
      loadingState: "loading",
      post_data: null,
      post_comments: null,
      modal_show: false,
      editor: DecoupledEditor,
      editorConfig: {
        // The configuration of the editor.
        height: 3000,
        extraPlugins: [MyCustomUploadAdapterPlugin]
      }
    };
  },
  mounted() {
    let { post_id } = this.$route.params;
    this.loadingState = "loading";
    axios
      .get(apiRes("post", post_id))
      .then(resp => {
        this.post_data = resp.data;
        this.rollBack_post_data = Object.assign({}, resp.data);
        this.post_comments = this.post_data.comments;
        this.loadingState = "success";
      })
      .catch(err => {
        this.loadingState = "failure";
      });
  }
};
</script>

<style>
</style>
