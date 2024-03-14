<template>
  <div id="header" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="bxh-logo">
<!--        <img @click="$router.push('/')"-->
<!--            class="cursor-pointer" src="../assets/images/logo.png"/>-->
      </div>
      <div class="header-menu">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            style="height: 72px">
<!--          <el-submenu index="1">-->
<!--            <template class="el-submenu" slot="title">Learn</template>-->
<!--            <el-menu-item index="1-1" @click="$router.push('/mainnet')"-->
<!--                          style="height:100%; width:230px;padding: 20px 24px;display: flex;align-items: center">-->
<!--              <div class="text">-->
<!--                <p>Mainnet</p>-->
<!--              </div>-->
<!--            </el-menu-item>-->
<!--          </el-submenu>-->
          <el-menu-item index="1" @click="$router.push('/developer-portal')">숙소</el-menu-item>
          <el-menu-item index="6" @click="$router.push('/news')">공지사항</el-menu-item>
          <el-menu-item index="6" @click="$router.push('/news')">문의</el-menu-item>
        </el-menu>
      </div>
      <div class="header_icon">
        <i class="el-icon-s-fold" @click="navTrue"/>
        <div class="mobile_m" v-if="nav">
          <div class="nav">
            <i class="el-icon-close" @click="navFalse"></i>
            <ul>
              <li @click="nav2True">Learn</li>
              <li @click="goToRouter('/developer-portal')">Build</li>
              <li @click="goToRouter('/news')">공지사항</li>
            </ul>
          </div>
          <div class="nav2" v-if="nav2">
            <i class="el-icon-close" @click="nav2False"></i>
            <ul>
              <li @click="goToRouter('/mainnet')">Mainnet</li>
              <li @click="goToRouter('/polkadot')">POLKADOT</li>
              <li @click="goToRouter('/polkadot-staking')">POLKADOT Staking</li>
              <li @click="goToRouter('/reward')">Service Contribution Reward</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      isScrolled: false,
      nav:false,
      nav2:false,
    }
  },
  computed: {

  },
  methods: {
    navTrue(){
      this.nav = true;
    },
    navFalse(){
      this.nav = false;
    },
    nav2True(){
      this.nav2 = true;
    },
    nav2False(){
      this.nav2 = false;
    },
    goToRouter(route) {
      this.$router.push(route);
      this.nav = false;
      this.nav2 = false;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
