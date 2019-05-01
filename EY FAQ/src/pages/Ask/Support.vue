<template>
  <div class="justify-content-md-center">
    <div class="row">
      <div class="col-sm-12 col-lg-12 text-center">
        <fg-input
          placeholder="Search Here ..."
          v-on:click="toggle_search"
          v-model="search_query"
          addon-left-icon="now-ui-icons ui-1_zoom-bold"
        ></fg-input>
      </div>

      <div v-if="search_area" class="col-sm-12 col-lg-12 text-center">{{search_query}}</div>
    </div>
    <div class="row justify-content-md-center">
      <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
      <div class="row">
        <div class="col-6">
          <blockquote>
            <card class="card-nav-tabs" header-classes="card-header-success">
              <blockquote class="blockquote blockquote-primary mb-0">
                <p>Categorie</p>
                <a href="#" class>Filter by this Categorie</a>
              </blockquote>
            </card>
          </blockquote>
        </div>
        <div class="col-6">
          <blockquote>
            <card class="card-nav-tabs" header-classes="card-header-success">
              <blockquote class="blockquote blockquote-primary mb-0">
                <p>Categorie</p>
                <a href="#" class>Filter by this Categorie</a>
              </blockquote>
            </card>
          </blockquote>
        </div>
        <div class="col-6">
          <blockquote>
            <card class="card-nav-tabs" header-classes="card-header-success">
              <blockquote class="blockquote blockquote-primary mb-0">
                <p>Categorie</p>
                <a href="#" class>Filter by this Categorie</a>
              </blockquote>
            </card>
          </blockquote>
        </div>
        <div class="col-6">
          <blockquote>
            <card class="card-nav-tabs" header-classes="card-header-success">
              <blockquote class="blockquote blockquote-primary mb-0">
                <p>Categorie</p>
                <a href="#" class>Filter by this Categorie</a>
              </blockquote>
            </card>
          </blockquote>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <card>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
        <card>
          <ul slot="raw-content" class="list-group list-group-flush text-left">
            <li class="list-group-item">
              <router-link
                to="/ask/question/1"
              >12 Lorem ipsum dolor sit amet consectetur adipisicing elit.</router-link>
              <footer class="blockquote-footer">
                Someone famous in
                <cite title="Source Title">Source Title</cite>
              </footer>
            </li>
            <li class="list-group-item">
              <router-link
                to="/ask/question/1"
              >Molestiae pariatur accusamus fuga, officiis in neque iure.</router-link>
              <footer class="blockquote-footer">
                Someone famous in
                <cite title="Source Title">Source Title</cite>
              </footer>
            </li>
            <li class="list-group-item">
              <router-link
                to="/ask/question/1"
              >Quas id adipisci dolore perferendis harum quia porro nam? Voluptatum debitis illo tempore harum!</router-link>
              <footer class="blockquote-footer">
                Someone famous in
                <cite title="Source Title">Source Title</cite>
              </footer>
            </li>
          </ul>
        </card>
        <router-link to="/ask/my-request">View all</router-link>
      </card>
      <card>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
        <card>
          <ul slot="raw-content" class="list-group list-group-flush text-left">
            <li class="list-group-item">
              <router-link
                to="/ask/question/1"
              >12 Lorem ipsum dolor sit amet consectetur adipisicing elit.</router-link>
              <footer class="blockquote-footer">
                Someone famous in
                <cite title="Source Title">Source Title</cite>
              </footer>
            </li>
            <li class="list-group-item">
              <router-link
                to="/ask/question/1"
              >Molestiae pariatur accusamus fuga, officiis in neque iure.</router-link>
              <footer class="blockquote-footer">
                Someone famous in
                <cite title="Source Title">Source Title</cite>
              </footer>
            </li>
            <li class="list-group-item">
              <router-link
                to="/ask/question/1"
              >Quas id adipisci dolore perferendis harum quia porro nam? Voluptatum debitis illo tempore harum!</router-link>
              <footer class="blockquote-footer">
                Someone famous in
                <cite title="Source Title">Source Title</cite>
              </footer>
            </li>
          </ul>
        </card>
        <router-link to="/ask/my-request">View all</router-link>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_area: false,
      search_query: ""
    };
  },
  methods: {
    toggle_search() {
      this.search_area = !this.search_area;
    }
  }
};
</script>

<style>
</style>
