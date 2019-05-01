<template>
  <navbar
    class="mt-0"
    :type="'primary'"
    :transparent="false"
    menu-classes="ml-auto"
    position="relative"
  >
    <router-link v-popover:popover1 class="navbar-brand" to="/">EY Mentor</router-link>
    <p class="navbar-brand" href="#">Welcome back, Admin</p>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/articles">
          <i class="now-ui-icons objects_globe"></i>
          <p>Manage Articles</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/requests">
          <i class="now-ui-icons ui-1_settings-gear-63"></i>
          <p>Manage Requests</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/users">
          <i class="now-ui-icons users_circle-08"></i>
          <p>Manage Users</p>
        </router-link>
      </li>
    </template>
  </navbar>
</template>

<script>
/* eslint-disable */
import { DropDown, NavbarToggleButton, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
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
  }
};
</script>

<style scoped></style>
