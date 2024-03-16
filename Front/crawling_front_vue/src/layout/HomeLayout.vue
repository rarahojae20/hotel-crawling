<template>
  <div id="homeView">
    <Header/>
    <el-container>
      <el-main id="homeMain">
        <slot/>
      </el-main>
    </el-container>
    <Footer/>
  </div>
</template>
<script>
  import Header from "../layout/Header";
  import Footer from "../layout/Section10.vue";
  export default {
    components: {
      Header,Footer
    },
    computed: {

    },
    data: () => ({

    }),
    watch: {
      '$route.path'(v) {
        this.path = v.split('/')[1]
      }
    },
    methods: {
      routerPush({url, func}) {
        const vm = this;
        if (url) {
          vm.$router.push(url)
        } else {
          vm[func]()
        }
      },

    },
  }
</script>
