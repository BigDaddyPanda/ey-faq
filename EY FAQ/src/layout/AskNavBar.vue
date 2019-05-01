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
      <router-link v-popover:popover1 class="navbar-brand" to="/">EY Mentor</router-link>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/ask/"> 
          <i class="now-ui-icons travel_info"></i>
          <p>F.A.Q</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/ask/my-request"> 
          <i class="now-ui-icons shopping_tag-content"></i>
          <p>My Tickets</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/ask/new-question"> 
          <i class="now-ui-icons ui-1_send"></i>
          <p>Submit a Request</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/auth"> 
          <i class="now-ui-icons users_circle-08"></i>
          <p>Login</p>
        </router-link>
      </li>
      <!-- <li class="nav-item"/> -->
      <!-- <li class="nav-item"/> -->
      <!-- <li class="nav-item"/> -->
      <!-- <li class="nav-item"/> -->
      <!-- <li class="nav-item"/>  -->
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
