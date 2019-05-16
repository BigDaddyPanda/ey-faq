<template>
  <div class="justify-content-md-center">
    <div class="row justify-content-md-center">
      <div class="col-xs-10 col-md-10" ref="Overview" id="Overview">
        <div class="card" v-if="my_publisher||my_admin">
          <div class="row" v-if="my_publisher">
            <div class="col ml-2 align-self-center">Modify Your Post</div>
            <div class="col-md-4 text-right mr-2">
              <button class="btn btn-danger btn-sm outline">Delete</button>
              <button class="btn btn-primary btn-sm">Modify</button>
            </div>
          </div>
          <div class="row" v-else-if="my_admin">
            <div class="col ml-2 align-self-center">Modify This Post</div>
            <div class="col-md-4 text-right mr-2">
              <button class="btn btn-danger btn-sm outline">Delete</button>
              <button class="btn btn-primary btn-sm">Modify</button>
            </div>
          </div>
        </div>
        <div v-if="loadingState=='success'">
          <card type="blog" >
            <div class="card-header">
              <h4>{{post_data.title}}</h4>
              <h6>{{post_data.description}}</h6>
            </div>
            <div v-html="post_data.content">{{post_data.content}}</div>
          </card>
          <h2 class="text-left">Comment(s)</h2>
          <div>
            <card type="blog" ref="Comment" id="Comment">
              <div class="card-body py-0">
                <div class="row py-0">
                  <span class="col-8 align-self-center">Your Comment:</span>
                </div>
                <div class="card-description text-left">
                  <fg-input v-model="mycomment"/>
                </div>
                <div class="card-description text-right">
                  <n-button>Submit</n-button>
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
                  <p class="card-description text-left">{{comment.content}}</p>
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
  "comments": [
    {
      "id": 3,
      "content": "Optio repellat nesciunt voluptas quo fuga provident qui esse.",
      "edited": null,
      "editedBy": null,
      "createdAt": "2019-05-15T22:44:40.000Z",
      "updatedAt": "2019-05-15T22:44:40.000Z",
      "userId": 1,
      "postId": 1
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
// comments

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
      if (this.my_admin && this.post_data)
        if (this.my_admin.id == this.post_data.user.id)
          return this.account.user.user;
      return null;
    }
  },
  data() {
    return {
      mycomment: "",
      activeTab: "Overview",
      loadingState: "loading",
      post_data: null,
      post_comments: null
    };
  },
  mounted() {
    let { post_id } = this.$route.params;
    this.loadingState = "loading";
    axios
      .get(apiRes("post", post_id))
      .then(resp => {
        this.post_data = resp.data;
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
