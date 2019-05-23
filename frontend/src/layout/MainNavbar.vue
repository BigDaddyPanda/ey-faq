<template>
  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <!-- <navbar
    position="fixed"
    type="primary"   
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
    >-->
    <!-- <template slot-scope="{ toggle, isToggled }"> -->
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">{{helloworld}}</router-link>
      <router-link v-popover:popover1 class="badge" to="/fa_question">Top Questions</router-link>&nbsp;
      <router-link v-popover:popover1 class="badge" to="/fa_post">Top Articles</router-link>
    </template>
    <template slot="navbar-menu">
      <!-- <li class="nav-item"></li> -->
      <!-- <li class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/fa_question/">
          <i class="now-ui-icons travel_info"></i>
          <p>Support</p>
        </router-link>
      </li>

      -->
      <template v-if="myauth">
        <li class="nav-item">
          <router-link v-popover:popover1 class="nav-link" to="/user/edit_question">
            <i class="now-ui-icons travel_info"></i>
            <p>Ask A question</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-popover:popover1 class="nav-link" to="/user/my_questions">
            <i class="now-ui-icons travel_info"></i>
            <p>View questions</p>
          </router-link>
        </li>
      </template>
      <li v-else class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/auth">
          <i class="now-ui-icons users_circle-08"></i>
          <p>Authentificate</p>
        </router-link>
      </li>
      <li v-if="iamadmin">
        <router-link v-popover:popover1 class="nav-link" to="/admin/edit_post">
          <i class="now-ui-icons travel_info"></i>
          <p>Publish A Post</p>
        </router-link>
      </li>
      <li v-if="iamadmin">
        <drop-down tag="li" class="nav-item" title="Management" icon="now-ui-icons travel_info">
          <router-link class="text-primary nav-link" to="/admin/manage_user">
            <p>Manage Users</p>
          </router-link>
          <router-link class="text-primary nav-link" to="/admin/manage_post">
            <p>Manage Posts</p>
          </router-link>
          <router-link class="text-primary nav-link" to="/admin/manage_question">
            <p>Manage Questions</p>
          </router-link>
          <router-link class="text-primary nav-link" to="/admin/manage_service">
            <p>Manage Services</p>
          </router-link>
          <!-- <router-link class="text-primary nav-link" to="/admin/manage_role">
            <p>Manage Roles</p>
          </router-link> -->
        </drop-down>
      </li>
      <li v-if="myauth">
        <drop-down tag="li" class="nav-item" title="Profile" icon="now-ui-icons travel_info">
          <router-link :to="`/user/profile?username=${myauth.username}`">
            <n-button type="link" class="text-primary nav-link">
              <p>Settings</p>
            </n-button>
            <!-- <p>Sign-out</p> -->
          </router-link>
          <n-button type="link" @click="logout" class="text-primary nav-link">
            <p>Sign-out</p>
          </n-button>
        </drop-down>
      </li>
      <template v-else>
        <li class="nav-item">
          <a
            class="nav-link"
            rel="tooltip"
            title="Follow us on Twitter"
            data-placement="bottom"
            href="https://twitter.com/"
            target="_blank"
          >
            <i class="fab fa-twitter"></i>
            <p class="d-lg-none d-xl-none">Twitter</p>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            rel="tooltip"
            title="Like us on Facebook"
            data-placement="bottom"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <i class="fab fa-linkedin"></i>
            <p class="d-lg-none d-xl-none">Linkedin</p>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            rel="tooltip"
            title="Follow us on Instagram"
            data-placement="bottom"
            href="https://www.instagram.com/"
            target="_blank"
          >
            <i class="fab fa-youtube"></i>
            <p class="d-lg-none d-xl-none">Instagram</p>
          </a>
        </li>
      </template>
    </template>
  </navbar>
</template>

<script>
/* eslint-disable */
import { DropDown, NavbarToggleButton, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
import { mapState, mapActions } from "vuex";
export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  methods: {
    ...mapActions("account", ["logout"])
    // logout
  },
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  },
  computed: {
    ...mapState(["account"]),
    iamadmin: function() {
      if (this.account.user && this.account.user.user)
        return this.account.user.user.role.designation == "admin";
      return false;
    },
    myauth: function() {
      if (this.account.user && this.account.user.user)
        return this.account.user.user;
      return false;
    },
    helloworld: function() {
      if (this.account.user.user) {
        let user = this.account.user.user;
        // if (user.first_name) return "Hello " + user.first_name;
        // if (user.last_name) return "Hello " + user.last_name;
        // if (user.username) return "Hello " + user.username;
        return "Hello " + user.first_name || user.last_name || user.username;
      } else return "Welcome to EY mentor";
    }
  }
};
</script>

<style scoped></style>
