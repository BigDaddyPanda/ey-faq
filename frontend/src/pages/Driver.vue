<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax class="page-header-image" style="background-image:url('img/ey/ey as bg.png')"></parallax>
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/ey/ey icon.png" alt>
          <h1 class="h1-seo">EY Mentor</h1>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>

          <div class="text-center offset-md-2 col-md-12 col-lg-8">
            <router-link
              to="/auth"
              class="btn btn-primary btn-lg btn-round"
              role="button"
            >Join the EY Community</router-link>
            <router-link
              to="/fa_questions"
              class="btn btn-secondary btn-lg btn-round"
              role="button"
            >Dive through the FAQ</router-link>
          </div>
          <!-- <div class="display-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Vero magnam commodi nesciunt adipisci eveniet sed veniam natus soluta
            culpa in ut quasi quae, ducimus illo pariatur tempora a! Non, iusto!
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  bodyClass: "index-page"
};
</script>
<style></style>
