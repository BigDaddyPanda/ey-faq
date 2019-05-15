<template>
  <div>
    <div v-if="$route.path=='/index'">
      <router-view/>
    </div>
    <div v-else class="section">
      <div class="container text-left">
        <div class="row justify-content-md-left">
          <div class="col-md-12">
            <router-view/>
          </div>
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
