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
import AdminIndex from './pages/Admin/Index.vue';
import ManageArticles from './pages/Admin/ManageArticles.vue';
import ManageRequests from './pages/Admin/ManageRequests.vue';
import ManageUsers from './pages/Admin/ManageUsers.vue';
// import ReportABug from './pages/Admin/ReportABug.vue';

//  Ask
// import AskIndex from './pages/Ask/Index.vue';
import AskQuestion from './pages/Ask/AskQuestion.vue';
import MyRequest from './pages/Ask/MyRequest.vue';
import Support from './pages/Ask/Support.vue';
import QuestionPage from './pages/Ask/QuestionPage.vue';

//  Auth
import Login from './pages/Auth/Login.vue';


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
      components: {
        default: Auth,
        header: MainNavbar,
        footer: MainFooter
      },
      children: [{
        path: "",
        component: Login
      }],
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
      children: [{
          path: "",
          name: 'admin-index',
          component: AdminIndex
        },
        {
          path: "articles",
          component: ManageArticles
        },
        {
          path: "requests",
          component: ManageRequests
        },
        {
          path: "users",
          component: ManageUsers
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