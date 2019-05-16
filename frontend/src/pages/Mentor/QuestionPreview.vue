<template>
  <div class="justify-content-md-center">
    <div class="row justify-content-md-center">
      <div class="col-xs-10 col-md-10" ref="Overview" id="Overview">
        <div class="card" v-if="my_publisher||my_admin">
          <div class="row" v-if="my_publisher">
            <div class="col ml-2 align-self-center">Modify Your Question</div>
            <div class="col-md-4 text-right mr-2">
              <button class="btn btn-danger btn-sm outline">Delete</button>
              <button class="btn btn-primary btn-sm">Modify</button>
            </div>
          </div>
          <div class="row" v-else-if="my_admin">
            <div class="col ml-2 align-self-center">Modify This Question</div>
            <div class="col-md-4 text-right mr-2">
              <button class="btn btn-danger btn-sm outline">Delete</button>
              <button class="btn btn-primary btn-sm">Modify</button>
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
              <h5 class="card-title text-left text-primary">{{question_data.title}}</h5>
              <p class="card-description text-muted text-left">{{question_data.description}}</p>
              <badge type="primary">#{{question_data.service.designation}}</badge>
              <!-- <div class="card-footer text-left"></div> -->
              <hr>
              <h5 class="py-0 my-0 text-left">Question</h5>
              <p class="card-description text-left">{{question_data.content}}</p>
              <ul>
                <li v-for="(att,k) in question_data.attachements" :key="k">
                  <a :href="`${att.link}`" target="_blank">attachement#{{att.id}}</a>
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
          <div>
            <card type="blog" ref="Answer" id="Answer">
              <div class="card-body py-0">
                <div class="row py-0">
                  <span class="col-8 align-self-center">Your Answer:</span>
                </div>
                <div class="card-description text-left">
                  <fg-input v-model="myanswer"/>
                </div>
                <div class="card-description text-right">
                  <n-button>Submit</n-button>
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
                    <span class="col-8 align-self-center">user #{{answer.userId}} said:</span>
                    <span class="col-4 ml-auto text-right">
                      <n-button type="success" icon round size="sm">
                        <i class="now-ui-icons ui-2_like"></i>
                      </n-button>
                      <n-button
                        style="transform: scale(-1, -1);"
                        type="danger"
                        class="pl-auto"
                        icon
                        round
                        size="sm"
                      >
                        <i class="now-ui-icons ui-2_like"></i>
                      </n-button>
                    </span>
                  </div>
                  <p class="card-description text-left">{{answer.content}}</p>
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
  </div>
</template>

<script>
/**
 "id": 1,
  "title": "",
  "description": "Et deleniti dolor omnis earum odio eligendi temporibus.",
  "content": "",
  "visited": 1,
  "edited": null,
  "editedBy": null,
  "createdAt": "2019-05-15T22:44:40.000Z",
  "updatedAt": "2019-05-15T22:44:40.000Z",
  "userId": 6,
  "serviceId": 1,
  "tag":"pending"
  "user": {
    "id": 6,
    "first_name": "Garland",
    "last_name": "O'Kon",
    "email": "Samantha.Konopelski32@gmail.com",
    "username": "Alisa_Will",
    "password": "$2b$12$cE2AWwWhdozjhXRHyCHoTeR2INQtuefCRfHjx68NfSGxXKkuOjPyu",
    "resetPasswordToken": null,
    "resetPasswordExpires": null,
    "createdAt": "2019-05-15T22:44:40.000Z",
    "updatedAt": "2019-05-15T22:44:40.000Z",
    "serviceId": 2,
    "roleId": 2
  },
  "service": {
    "id": 1,
    "designation": "General Information",
    "createdAt": "2019-05-15T22:44:40.000Z",
    "updatedAt": "2019-05-15T22:44:40.000Z"
  },
  "answers": [
    {
      "id": 3,
      "content": "Optio repellat nesciunt voluptas quo fuga provident qui esse.",
      "edited": null,
      "editedBy": null,
      "createdAt": "2019-05-15T22:44:40.000Z",
      "updatedAt": "2019-05-15T22:44:40.000Z",
      "userId": 1,
      "questionId": 1
    }, 
 */

// title
// description
// content
// visited
// edited
// editedBy
// createdAt
// updatedAt
// user
// service
// answers

import { apiRes } from "@/utils";
import axios from "axios";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["account"]),
    my_admin: function() {
      if (this.account && this.account.status && this.account.status.loggedIn)
        if (this.account.user.user.role.designation == "admin")
          return this.account.user.user;
      return null;
    },
    my_publisher: function() {
      if (this.my_admin && this.question_data)
        if (this.my_admin.id == this.question_data.user.id)
          return this.account.user.user;
      return null;
    }
  },
  data() {
    return {
      myanswer: "",
      activeTab: "Overview",
      loadingState: "loading",
      question_data: null,
      question_answers: null
    };
  },
  mounted() {
    let { question_id } = this.$route.params;
    this.loadingState = "loading";
    axios
      .get(apiRes("question", question_id))
      .then(resp => {
        this.question_data = resp.data;
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
