import Vue from "vue";
import Router from "vue-router";

// Horizontal NavBar and Footer
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

// Public Realm
import Index from "./pages/Index.vue";
import Driver from "./pages/Driver.vue";
import FAQuestions from "./pages/Mentor/FAQuestions.vue";
import FAPost from "./pages/Mentor/FAPosts.vue";
import AllQuestions from "./pages/Mentor/AllQuestions.vue";
import AllPosts from "./pages/Mentor/AllPosts.vue";
import QuestionPreview from "./pages/Mentor/QuestionPreview.vue";
import PostPreview from "./pages/Mentor/PostPreview.vue";
import NotFound from "./pages/NotFound.vue";

//  Authentification
import AuthIndex from "./pages/Index.vue";
import Login from "./pages/Auth/Login.vue";
import Signup from "./pages/Auth/Signup.vue";

// Admin Realm
import ManagePosts from "./pages/Admin/ManagePosts.vue";
import ManageQuestions from "./pages/Admin/ManageQuestions.vue";
import ManageRoles from "./pages/Admin/ManageRoles.vue";
import ManageServices from "./pages/Admin/ManageServices.vue";
import ManageUsers from "./pages/Admin/ManageUsers.vue";
import GeditPost from "./pages/Admin/GeditPost.vue";


// User Realm
import Ask from "./pages/Ask.vue";
import Profile from "./pages/User/Profile.vue";
import GeditQuestion from "./pages/User/GeditQuestion.vue";
import MyQuestions from "./pages/User/MyQuestions.vue";


////////////

import store from "./_vuex/_store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      meta: { requiresLogin: false, adminOnly: false },
      name: "index",
      redirect: "/index",
      components: {
        default: Index,
        header: MainNavbar,
        footer: MainFooter
      },
      children: [
        {
          path: "index",
          meta: { requiresLogin: false, adminOnly: false },
          name: "driver",
          component: Driver
        },
        {
          path: "fa_question",
          meta: { requiresLogin: false, adminOnly: false },
          name: "fa_questionx",
          component: FAQuestions
        },
        {
          path: "fa_post",
          meta: { requiresLogin: false, adminOnly: false },
          name: "fa_postx",
          component: FAPost
        },
        {
          path: "questions",
          meta: { requiresLogin: false, adminOnly: false },
          name: "questions",
          component: AllQuestions
        },
        {
          path: "questions/:question_id",
          meta: { requiresLogin: false, adminOnly: false },
          name: "question",
          component: QuestionPreview
        },
        {
          path: "posts",
          meta: { requiresLogin: false, adminOnly: false },
          name: "posts",
          component: AllPosts
        },
        {
          path: "posts/:post_id",
          meta: { requiresLogin: false, adminOnly: false },
          name: "post",
          component: PostPreview
        },
      ],
      props: {
        header: {
          colorOnScroll: 400
        },
        footer: {
          backgroundColor: "black"
        }
      }
    },

    {
      path: "/auth",
      meta: { requiresLogin: false, adminOnly: false },
      name: "auth-index",
      redirect: "/auth/login",
      components: {
        default: AuthIndex,
        header: MainNavbar,
        footer: MainFooter
      },
      children: [
        {
          path: "login",
          meta: { requiresLogin: false, adminOnly: false },
          name: "login-view",
          component: Login
        },
        {
          path: "signup",
          meta: { requiresLogin: false, adminOnly: false },
          name: "signup-view",
          component: Signup
        },
      ],
      props: {
        header: {
          colorOnScroll: 400,
          transparent: false
        },
        footer: {
          backgroundColor: "black"
        }
      }
    },

    {
      path: "/user",
      meta: { requiresLogin: true, adminOnly: false },
      name: "user_index",
      redirect: "/fa_question",
      components: {
        default: Ask,
        header: MainNavbar,
        footer: MainFooter
      },
      children: [
        {
          path: "profile",
          meta: { requiresLogin: true, adminOnly: false },
          name: "profile",
          component: Profile
        },
        {
          path: "edit_question",
          meta: { requiresLogin: true, adminOnly: false },
          name: "edit_question",
          component: GeditQuestion
        },
        {
          path: "my_questions",
          meta: { requiresLogin: true, adminOnly: false },
          name: "my_questions",
          component: MyQuestions
        },
      ],
      props: {
        header: {
          colorOnScroll: 400,
          transparent: false
        },
        footer: {
          backgroundColor: "black"
        }
      }
    },

    {
      path: "/admin",
      meta: { requiresLogin: true, adminOnly: true },
      name: "admin_index",
      redirect: "/fa_question",
      components: {
        default: Ask,
        header: MainNavbar,
        footer: MainFooter
      },
      children: [
        {
          path: "edit_post",
          meta: { requiresLogin: true, adminOnly: true },
          name: "edit_post",
          component: GeditPost
        },
        {
          path: "manage_question",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage_question",
          component: ManageQuestions
        },
        {
          path: "manage_post",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage_post",
          component: ManagePosts
        },
        {
          path: "manage_user",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage_user",
          component: ManageUsers
        },
        {
          path: "manage_service",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage_service",
          component: ManageServices
        },
        {
          path: "manage_role",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage_role",
          component: ManageRoles
        }
      ],
      props: {
        header: {
          colorOnScroll: 400,
          transparent: true
        },
        footer: {
          backgroundColor: "black"
        }
      }
    },
    {
      path: "*",
      meta: { requiresLogin: false, adminOnly: false },
      component: NotFound
    },
  ],

  scrollBehavior: to => {
    if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
router.beforeEach((to, from, next) => {
  let authed = JSON.parse(localStorage.getItem('user'));
  // console.log("tf",to.matched.some(record => record.meta.requiresLogin) && !authed);
  // store.commit('alert/clear');

  if (to.matched.some(record => record.meta.requiresLogin) && !authed) {
    // You can use store variable here to access globalError or commit mutation 
    store.commit('alert/error', "Registration/Login Required!");
    next("/auth");
  } else {
    if (to.matched.some(record => record.meta.adminOnly) && !authed) {
      store.commit('alert/error', "Only Admins Allowed!");
      next(from.path);
    }
    else
      next();
  }
})
export default router;