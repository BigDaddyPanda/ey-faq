import Vue from 'vue';
import Router from 'vue-router';

// Horizontal NavBar and Footer
import MainNavbar from './layout/MainNavbar.vue';
import AskNavBar from './layout/AskNavBar.vue';
import MainFooter from './layout/MainFooter.vue';
import AdminNavBar from './layout/AdminNavBar.vue';

// Main Layouts
import Index from './pages/Index.vue';
import Auth from './pages/Auth.vue';
import Ask from './pages/Ask.vue';
import Admin from './pages/Admin.vue';
import NotFound from './pages/NotFound.vue';


// Children
//  Admin
import EditArticle from './pages/Admin/EditArticle.vue';
import ManageArticles from './pages/Admin/ManageArticles.vue';
import ManageRequests from './pages/Admin/ManageRequests.vue';
import ManageUsers from './pages/Admin/ManageUsers.vue';
import ManageRoles from './pages/Admin/ManageRoles.vue';
import ManageServices from './pages/Admin/ManageServices.vue';
// import ReportABug from './pages/Admin/ReportABug.vue';

//  Ask
// import AskIndex from './pages/Ask/Index.vue';
import AskQuestion from './pages/Ask/AskQuestion.vue';
import MyRequest from './pages/Ask/MyRequest.vue';
import Support from './pages/Ask/Support.vue';
import QuestionPage from './pages/Ask/QuestionPage.vue';

//  Auth
import Login from './pages/Auth/Login.vue';
import Signup from './pages/Auth/Signup.vue';
import EditUser from './pages/Auth/EditUser.vue';


Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
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
          backgroundColor: 'black'
        }
      }
    },
    {
      path: '/auth',
      name: 'auth-index',
      redirect: '/auth/login',
      components: {
        default: Auth,
        header: MainNavbar,
        footer: MainFooter
      },
      children: [{
          path: "login",
          name: "login-view",
          component: Login
        },
        {
          path: "signup",
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
          backgroundColor: 'black'
        }
      }
    },
    {
      path: '/ask',
      components: {
        default: Ask,
        header: AskNavBar,
        footer: MainFooter
      },
      children: [{
          path: "",
          name: 'ask-index',
          component: Support
        },
        {
          path: "new-question",
          component: AskQuestion
        },
        {
          path: "my-request",
          component: MyRequest
        },
        {
          path: "question/:questId",
          component: QuestionPage
        },
        {
          path: "question",
          redirect: "new-question"
        },
      ],
      props: {
        header: {
          colorOnScroll: 400
        },
        footer: {
          backgroundColor: 'black'
        }
      }
    },
    {
      path: '/admin',
      components: {
        default: Admin,
        header: AdminNavBar,
        footer: MainFooter
      },
      redirect: "/admin/articles",
      children: [{
          path: "articles",
          name: "manage-articles",
          component: ManageArticles
        },
        {
          path: "articles/:article_id",
          name: "edit-articles",
          component: EditArticle
        },
        {
          path: "requests",
          name: "manage-requests",
          component: ManageRequests
        },
        {
          path: "roles",
          name: "manage-roles",
          component: ManageRoles
        },
        {
          path: "services",
          name: "manage-services",
          component: ManageServices
        },
        {
          path: "users",
          name: "manage-users",
          component: ManageUsers
        }, {
          path: "users/:user_id",
          name: 'admin-index',
          component: EditUser
        }
      ],
      props: {
        header: {
          colorOnScroll: 400
        },
        footer: {
          backgroundColor: 'black'
        }
      }
    },

    {
      path: "*",
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