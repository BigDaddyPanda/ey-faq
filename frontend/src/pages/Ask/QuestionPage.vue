<template>
  <div class="justify-content-md-center">
    <div class="row justify-content-md-center">
      <!-- <div class="col-xs-12 col-md-2">
        <tabs type="primary" vertical class="row" v-model="activeTab">
          <n-button href="#" v-scroll-to="'#Overview'" @click="activeTab='Overview'" block>
            <tab-pane label="Overview">
              <span slot="label">
                <i class="now-ui-icons education_paper"></i>
              </span>
            </tab-pane> 
            Overview
          </n-button>
          <n-button href="#" v-scroll-to="'#Answer'" @click="activeTab='Answer'" block>
            <tab-pane label="Answer" v-scroll-to="'#Answer'">
              <span slot="label">
                <i class="now-ui-icons objects_key-25"></i>
              </span>
            </tab-pane> 
            Answer
          </n-button>
        </tabs>
      </div> -->
      <div class="col-xs-10 col-md-10" ref="Overview" id="Overview">
        <card type="blog" :plain="activeTab!='Overview'" class="pt-0">
          <h2 class="py-0 my-0 text-left">Overview </h2>
          <div class="card-body" style="padding-top: 0px;margin-top: -2rem;">
            <h6 class="category text-warning text-right">
              <n-button type="primary" icon round>
                <i class="now-ui-icons business_bulb-63"></i>
              </n-button>Pending
            </h6>
            <h5
              class="card-title text-left text-primary"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h5>
            <p class="card-description text-left">
              Magnam fugit enim officia fugiat sunt, consequatur vel corrupti, saepe nam neque nesciunt tenetur ipsum perferendis aliquam veritatis inventore magni molestiae nisi!
              <a
                href="#"
                class="text-success"
              >read more.</a>
            </p>
          </div>
          <div class="card-footer text-left">
            <badge href="#" type="primary">Service #</badge>
            <badge href="#" type="primary">Service #</badge>
            <badge href="#" type="primary">Service #</badge>
          </div>
          <div class="card-footer text-right">
            <div class="col-xs-2 my-0">
              <el-popover
                ref="popovertrigger"
                trigger="click"
                popper-class="popover popover-primary"
                placement="top"
              >
                <h3 class="popover-header">Nickole Kurtz</h3>
                <div class="popover-body">Lorem ipsum dolor sit.</div>
              </el-popover>Posted By:
              <img
                v-popover:popovertrigger
                v-lazy="'img/julie.jpg'"
                alt="Circle Image"
                class="rounded-circle"
                style="width:2.5rem"
              >
            </div>
          </div>
        </card>
        <card type="blog" :plain="activeTab!='Answer'" ref="Answer" id="Answer">
          <h2 class="py-0 my-0 text-left">Answer</h2>
          <div class="card-body" style="padding-top: 0px;margin-top: -2rem;">
            <h6 class="category text-success text-right">
              <n-button type="success" icon round>
                <i class="now-ui-icons ui-2_like"></i>
              </n-button>
              <n-button style="transform: scale(-1, -1);" type="danger" class="pl-auto" icon round>
                <i class="now-ui-icons ui-2_like"></i>
              </n-button>
            </h6>
            <p class="card-description text-left">
              Magnam fugit enim officia fugiat sunt, consequatur vel corrupti, saepe nam neque nesciunt tenetur ipsum perferendis aliquam veritatis inventore magni molestiae nisi!
              <a
                href="#"
                class="text-success"
              >read more.</a>
            </p>
          </div>
          <div class="card-footer text-right">
            <div class="col-xs-2 my-0">
              <el-popover
                ref="popovertrigger"
                trigger="click"
                popper-class="popover popover-primary"
                placement="top"
              >
                <h3 class="popover-header">Nickole Kurtz</h3>
                <div class="popover-body">Lorem ipsum dolor sit.</div>
              </el-popover>Answered By:
              <img
                v-popover:popovertrigger
                v-lazy="'img/julie.jpg'"
                alt="Circle Image"
                class="rounded-circle"
                style="width:2.5rem"
              >
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "Overview"
    };
  }
};
</script>

<style>
</style>
