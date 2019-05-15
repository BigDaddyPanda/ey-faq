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
      <router-link v-popover:popover1 class="breadcrumb-item navbar-brand" to="/">EY Mentor</router-link>
      <router-link v-popover:popover1 class="breadcrumb-item" to="/fa_question">Top Questions</router-link>
      <router-link v-popover:popover1 class="breadcrumb-item" to="/fa_post">Top Articles</router-link>
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
      <li v-if="account.user" class="nav-item">
        <router-link v-popover:popover1 class="nav-link" to="/fa_question/">
          <i class="now-ui-icons travel_info"></i>
          <p>Ask A question</p>
        </router-link>
      </li>
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
    ...mapState(["account"])
  }
};
</script>

<style scoped></style>
