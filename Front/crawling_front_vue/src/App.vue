<template>
  <div id="crawlingApp">
    <component :is="layout">
      <router-view :key="reloadRouterView"/>
    </component>
  </div>
</template>
<script>
  import Vue from 'vue'
  import HomeLayout from "./layout/HomeLayout";
  import NoLayout from "./layout/NoLayout"
  export default {
    name: 'App',
    components: {
      HomeLayout,NoLayout
    },
    data() {
      return {
        reloadRouterView: 0,
      }
    },
    computed: {
      layout() {
        return (this.$route.meta.layout || 'No') + 'Layout'
      },
    },
    methods: {
      routerPush(path) {
        this.$router.push(path);
        this.reloadRouterView++;
      },
    },
    async created() {
      const vm = this;
      Vue.prototype.$forceRouterPush = (path) => vm.routerPush(path)
    },
    destroyed() {
    }
  }
</script>
