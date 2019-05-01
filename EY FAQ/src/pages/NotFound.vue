<template>
  <div class="contact-us full-screen text-center">
    <div class="wrapper wrapper-full-page text-center section content">
      <div class=" text-center">
        <div class="container">
          <div class="row text-center">
            <div class="col-md-8 offset-md-2 text-center">
              <h2 class="title text-danger">404 Not Found</h2>
              <h2 class="title">Oops! It seems that this page does not exist.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer ">
      <div class="container">
        <nav class="pull-left">
          <ul>
            <li>
              <router-link :to="{path:'/'}">Home</router-link>
            </li>
            <li>
              <router-link :to="{path:'/login'}">Login</router-link>
            </li>
          </ul>
        </nav>
        <div class="copyright pull-right">
          &copy; {{year}} Ernest & Young Tunisia
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    data(){
        return {
            year: new Date().getFullYear()
        }
    }
};
</script>
