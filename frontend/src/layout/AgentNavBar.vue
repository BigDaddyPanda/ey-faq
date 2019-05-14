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
    <!-- <template>
    </template>-->
    <router-link v-popover:popover1 class="navbar-brand" to="/fa_questions">{{ connected_user }}</router-link>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/fa_questions/">
          <i class="now-ui-icons travel_info"></i>
          <p>F.A.Q</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/questions">
          <i class="now-ui-icons shopping_tag-content"></i>
          <p>My Tickets</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/fa_questions/new-question">
          <i class="now-ui-icons ui-1_send"></i>
          <p>Submit a Request</p>
        </router-link>
      </li>
      <li v-if="!user_info" class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/auth">
          <i class="now-ui-icons users_circle-08"></i>
          <p>Login</p>
        </router-link>
      </li>
      <drop-down
        v-else
        tag="li"
        icon="now-ui-icons users_circle-08"
        class="nav-item"
        :title="user_info.username"
      >
        <router-link class="dropdown-item" to="/fa_questions">Account</router-link>
        <router-link class="dropdown-item" to="/fa_questions">Report a Bug</router-link>
        <router-link class="dropdown-item" to="/fa_questions">Logout</router-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
/* eslint-disable */
import { DropDown, NavbarToggleButton, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
import { mapState } from "vuex";
export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number
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
    user_info() {
      if (this.account.user && this.account.user.user.first_name)
        return this.account.user.user;
      return false;
    },
    connected_user() {
      console.log("connected_user(", this.account.user);

      if (this.account.user && this.account.user.user.first_name)
        return `Greetings ${this.account.user.user.first_name}`;
      if (this.account.user && this.account.user.user.username)
        return `Greetings ${this.account.user.user.username}`;
      if (this.account.user && this.account.user.user.email)
        return `Greetings ${this.account.user.user.email}`;
      return "Greetings";
    }
  }
};
</script>

<style scoped></style>
