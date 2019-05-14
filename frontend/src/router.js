import Vue from "vue";
import Router from "vue-router";

// Horizontal NavBar and Footer
import MainNavbar from "./layout/MainNavbar.vue";
import AskNavBar from "./layout/AskNavBar.vue";
import MainFooter from "./layout/MainFooter.vue";
import AdminNavBar from "./layout/AdminNavBar.vue";

// Main Layouts
import Index from "./pages/Index.vue";
import Auth from "./pages/Auth.vue";
import Ask from "./pages/Ask.vue";
import Admin from "./pages/Admin.vue";
import NotFound from "./pages/NotFound.vue";


// Children
//  Admin
import EditArticle from "./pages/Admin/EditArticle.vue";
import ManageArticles from "./pages/Admin/ManageArticles.vue";
import ManageRequests from "./pages/Admin/ManageRequests.vue";
import ManageUsers from "./pages/Admin/ManageUsers.vue";
import ManageRoles from "./pages/Admin/ManageRoles.vue";
import ManageServices from "./pages/Admin/ManageServices.vue";
// import ReportABug from "./pages/Admin/ReportABug.vue";

//  Ask
// import AskIndex from "./pages/Ask/Index.vue";
import AskQuestion from "./pages/Ask/AskQuestion.vue";
import MyRequest from "./pages/Ask/MyRequest.vue";
import Support from "./pages/Ask/Support.vue";
import QuestionPage from "./pages/Ask/QuestionPage.vue";

//  Auth
import Login from "./pages/Auth/Login.vue";
import Signup from "./pages/Auth/Signup.vue";
import EditUser from "./pages/Auth/EditUser.vue";
import { store } from "./_vuex/_store";


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      meta: { requiresLogin: false, adminOnly: false },
      name: "index",
      components: {
        default: Index,
        header: MainNavbar,
        footer: MainFooter
      },

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
        default: Auth,
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
      path: "/ask",
      meta: { requiresLogin: false, adminOnly: false },
      components: {
        default: Ask,
        header: AskNavBar,
        footer: MainFooter
      },
      children: [
        {
          path: "",
          meta: { requiresLogin: false, adminOnly: false },
          name: "ask-index",
          component: Support
        },
        {
          path: "new-question",
          meta: { requiresLogin: true, adminOnly: false },
          component: AskQuestion
        },
        {
          path: "my-request",
          meta: { requiresLogin: true, adminOnly: false },
          component: MyRequest
        },
        {
          path: "question/:questId",
          meta: { requiresLogin: false, adminOnly: false },
          component: QuestionPage
        },
        {
          path: "question",
          meta: { requiresLogin: false, adminOnly: false },
          redirect: "new-question"
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
      path: "/admin",
      meta: { requiresLogin: true, adminOnly: true },
      components: {
        default: Admin,
        header: AdminNavBar,
        footer: MainFooter
      },
      redirect: "/admin/articles",
      children: [
        {
          path: "articles",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage-articles",
          component: ManageArticles
        },
        {
          path: "articles/:article_id",
          meta: { requiresLogin: true, adminOnly: true },
          name: "edit-articles",
          component: EditArticle
        },
        {
          path: "requests",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage-requests",
          component: ManageRequests
        },
        {
          path: "roles",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage-roles",
          component: ManageRoles
        },
        {
          path: "services",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage-services",
          component: ManageServices
        },
        {
          path: "users",
          meta: { requiresLogin: true, adminOnly: true },
          name: "manage-users",
          component: ManageUsers
        }, {
          path: "users/:user_id",
          meta: { requiresLogin: true, adminOnly: true },
          name: "admin-index",
          component: EditUser
        }
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
      path: "*",
      meta: { requiresLogin: true, adminOnly: true },
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