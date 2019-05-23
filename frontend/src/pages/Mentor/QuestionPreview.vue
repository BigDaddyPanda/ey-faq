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
                @click="questionDelete"
                class="btn btn-danger btn-sm outline"
              >{{editingMode == "preview"?'Delete':'RollBack'}}</button>
              <button
                @click="questionModify"
                class="btn btn-primary btn-sm outline"
              >{{editingMode == "preview"?'Modify':'Apply'}}</button>
            </div>
          </div>
        </div>
        <div v-if="loadingState=='success'">
          <card type="blog" :plain="activeTab!='Overview'" class="pt-0">
            <h3 class="py-0 my-0 text-left">Overview</h3>
            <div class="card-body" style="padding-top: 0px;margin-top: -2rem;">
              <h6 class="category text-warning text-right">
                <n-button type="primary">
                  <i class="now-ui-icons business_bulb-63"></i>
                  {{question_data.tag}}
                </n-button>
              </h6>
              <!--  -->
              <fg-input
                v-if="editingMode=='modify'"
                label="Subject"
                v-model="question_data.title"
                name="title"
                v-validate="'required'"
                required
                placeholder="Your question ..."
              ></fg-input>

              <h5 v-else class="card-title text-left text-primary">{{question_data.title}}</h5>
              <!--  -->
              <fg-input
                v-if="editingMode=='modify'"
                label="Description"
                v-model="question_data.description"
                name="description"
                v-validate="'required'"
                required
                placeholder="Small description of the issue ..."
              ></fg-input>

              <p v-else class="card-description text-muted text-left">{{question_data.description}}</p>

              <v-select
                v-if="editingMode=='modify'"
                label="designation"
                :reduce="it => it.id"
                v-model="question_data.serviceId"
                name="serviceId"
                v-validate="'required'"
                :options="globalData.services"
              ></v-select>
              <badge v-else type="primary">#{{question_data.service.designation}}</badge>
              <!-- <div class="card-footer text-left"></div> -->
              <hr>
              <h5 class="py-0 my-0 text-left">Question</h5>
              <textarea
                v-if="editingMode=='modify'"
                class="form-control rounded-0"
                v-model="question_data.content"
                required
                name="content"
                v-validate="'required'"
              ></textarea>
              <p v-else class="card-description text-left">{{question_data.content}}</p>

              <ul>
                <li v-for="(att,k) in question_data.attachements" :key="k">
                  <a :href="`${att.link}`" target="_blank">attachement#{{att.id}}</a>
                  <!-- sss -->
                  <span v-if="editingMode=='modify'" class="text-right">
                    <n-button type="success" icon @click="deleteAttachement(k)" round size="sm">
                      <i class="now-ui-icons ui-1_simple-remove"></i>
                    </n-button>
                  </span>
                </li>
              </ul>
            </div>
            <div class="card-footer text-right">
              <div v-if="question_data.edited" class="text-success col-xs-2 my-0">
                Edited By:
                <span class="text-success">{{question_data.editor}}</span>
              </div>
              <div class="col-xs-2 my-0">
                Posted By:
                <span class="text-success">{{question_data.user.username}}</span>
              </div>
            </div>
          </card>
          <h2 class="text-left">Answer(s)</h2>
          <div v-if="isauthed">
            <card type="blog" ref="Answer" id="Answer">
              <div class="card-body py-0">
                <div class="row py-0">
                  <span class="col-8 align-self-center">Your Answer:</span>
                </div>
                <div class="card-description text-left">
                  <!-- <fg-input v-model="myanswer"/> -->
                  <textarea
                    class="form-control rounded-0"
                    v-model="myanswer"
                    required
                    name="content"
                    v-validate="'required'"
                    :rows="4"
                  ></textarea>
                </div>
                <div class="card-description text-right">
                  <n-button @click="submitAnswer">Submit</n-button>
                </div>
              </div>
            </card>
          </div>
          <div v-if="!question_answers.length">No Answers Yet! Be the first.</div>
          <div v-else>
            <div v-for="(answer,k) in question_answers" :key="k">
              <card type="blog" ref="Answer" id="Answer">
                <div class="card-body py-0">
                  <div class="row py-0">
                    <span class="col-8 align-self-center">
                      <i v-if="answer.is_best" class="text-primary now-ui-icons objects_key-25"></i>
                      user #{{answer.userId}} said:
                    </span>
                    <span class="col-4 ml-auto text-right" v-if="question_data.tag=='pending'">
                      <n-button
                        type="success"
                        icon
                        v-if="my_admin||my_publisher"
                        @click="successRate(answer.id)"
                        round
                        size="sm"
                      >
                        <i class="now-ui-icons ui-2_like"></i>
                      </n-button>
                      <n-button
                        style="transform: scale(-1, -1);"
                        type="danger"
                        class="pl-auto"
                        icon
                        round
                        v-if="my_admin||my_publisher||isauthed&&isauthed.id==answer.userId"
                        @click="dangerRate(answer.id)"
                        size="sm"
                      >
                        <i class="now-ui-icons ui-2_like"></i>
                      </n-button>
                    </span>
                  </div>
                  <p v-html="answer.content.replace('\n','<br/>')"></p>
                </div>
              </card>
            </div>
          </div>
        </div>
        <div v-else-if="loadingState=='loading'">
          <h1>Loading Question Data</h1>
        </div>
        <div v-else>
          <h1>:( Whoops no Question could be loaded</h1>
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
        Are you sure you want to permanently Delete this Question?
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
export default {
  computed: {
    ...mapState(["account"]),
    ...mapState(["globalData"]),
    my_admin: function() {
      if (this.account && this.account.status && this.account.status.loggedIn)
        if (this.account.user.user.role.designation == "admin")
          return this.account.user.user;
      return null;
    },
    my_publisher: function() {
      if (
        this.my_admin ||
        (this.question_data &&
          this.account &&
          this.account.user &&
          this.account.user.user &&
          this.account.user.user.id == this.question_data.user.id)
      )
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
        .delete(apiRes("attachement", this.question_data.attachements[k].id))
        .then(e => {
          this.question_data.attachements.splice(k, 1);
        });
    },
    toggleModal(tfadlek = "nfadlek") {
      if (tfadlek == "nfadlek") {
        this.modal_show = !this.modal_show;
      } else {
        this.modal_show = false;
        console.log("this.deletereason", this.deletereason, this.account.user);

        axios
          .put(apiRes("delquestion", this.question_data.id), {
            deletereason: this.deletereason,
            admin: this.account.user
          })
          .then(e => this.$router.push("/user/my_questions"));
      }
    },
    questionDelete() {
      if (this.editingMode == "preview") {
        // delete
        this.toggleModal();
        return;
      } else {
        // rollback
        this.question_data = Object.assign({}, this.rollBack_question_data);
      }
      this.editingMode = this.editingMode == "preview" ? "modify" : "preview";
    },
    questionModify() {
      if (this.editingMode == "preview") {
        // alternate to modification so just pass
      } else {
        // apply modifications
        axios.put(apiRes("question", this.question_data.id), {
          title: this.question_data.title,
          description: this.question_data.description,
          serviceId: this.question_data.serviceId,
          content: this.question_data.content,
          // updates: this.question_data,
          editor: this.account.user,
          modificationtext:
            "Have a look at your Question, I have already applied Changes!"
        });
      }
      this.editingMode = this.editingMode == "preview" ? "modify" : "preview";
    },
    submitAnswer() {
      if (this.myanswer.length) {
        axios
          .post(apiRes("answer"), {
            content: this.myanswer,
            questionId: this.question_data.id,
            userId: this.account.user.user.id
          })
          .then(r => window.location.reload());
      }
    },
    successRate(idAns) {
      axios
        .put(apiRes("answer", idAns), {
          responsible: this.account.user.user
        })
        .then(r => window.location.reload());
    },
    dangerRate(idAns) {
      axios
        .delete(apiRes("answer", idAns), {
          responsible: this.account.user.user
        })
        .then(r => window.location.reload());
    }
  },
  data() {
    return {
      editingMode: "preview", //preview,modify
      rollBack_question_data: null,
      myanswer: "",
      deletereason: "",
      activeTab: "Overview",
      loadingState: "loading",
      question_data: null,
      question_answers: null,
      modal_show: false
    };
  },
  mounted() {
    let { question_id } = this.$route.params;
    this.loadingState = "loading";
    axios
      .get(apiRes("question", question_id))
      .then(resp => {
        this.question_data = resp.data;
        this.rollBack_question_data = Object.assign({}, resp.data);
        this.question_answers = this.question_data.answers;
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
