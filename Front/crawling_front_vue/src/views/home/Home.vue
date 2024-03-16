<template>
  <div id="homeView">
    <Header/>
    <Section1/>

  </div>
</template>

<script>
  import Header from "../../layout/Header";
  import Section1 from "../../components/rending/Section1";

  export default {

    name: "Home",
    data: () => ({
      isTop: true,
    }),
    components: {
      Header,
      Section1,
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    }
  }
</script>
