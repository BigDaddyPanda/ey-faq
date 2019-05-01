<template>
  <navbar
    class="mt-0"
    :type="'primary'"
    :transparent="false"
    menu-classes="ml-auto"
    position="relative"
  >
    <p class="navbar-brand" href="#">Welcome back, Admin</p>
    <template slot="navbar-menu">
      <li class="nav-item">
        <a class="nav-link" href="#pablo">
          <i class="now-ui-icons objects_globe"></i>
          <p>Discover</p>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#pablo">
          <i class="now-ui-icons users_circle-08"></i>
          <p>Profile</p>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#pablo">
          <i class="now-ui-icons ui-1_settings-gear-63"></i>
          <p>Settings</p>
        </a>
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
