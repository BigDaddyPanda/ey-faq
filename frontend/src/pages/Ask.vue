<template>
  <div>
    <div class="section">
      <div class="container text-center">
        <div class="row text-center justify-content-md-center">
          <div class="col-md-12 col-lg-12 text-center">
            <h2 class="title text-center">{{header_title}}</h2>
            <h5 class="description"></h5>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  computed:{
    header_title(){
      console.log(this.$route.params);
      
      return this.$route.params.questID|| "Ask your Questions"
    }
  }
};
</script>

<style>
</style>
