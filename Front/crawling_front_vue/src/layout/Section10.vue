<template>
  <section id="section10">
    <div class="s10_container">
      <div class="footer_top">
        <div class="item">
          <div class="title">
            <p>회사</p>
          </div>
          <div class="menu">
            <ul>
              <li @click="$router.push('/')">회사소개</li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <p>서비스</p>
          </div>
          <div class="menu">
            <ul>
              <li @click="$router.push('/')">자주 묻는 질문</li>
              <li @click="$router.push('/')">문의하기</li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <p>공지사항</p>
          </div>
          <div class="menu">
            <ul>
              <li @click="$router.push('/')">공지사항</li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <p>ABOUT</p>
          </div>
          <div class="menu">
            <ul>
              <li @click="goToAbout">About 저기어때</li>
              <li @click="goToBlog">Blog</li>
              <li @click="goToRodmap">Roadmap</li>
              <li @click="goToWhitepaper">Whitepaper</li>
            </ul>
          </div>
        </div>
<!--        <div class="item" style="padding: 0">-->
<!--          <div class="title">-->
<!--            <p>Service</p>-->
<!--          </div>-->
<!--          <div class="menu">-->
<!--            <ul>-->
<!--              <li>DOSI</li>-->
<!--              <li>DOSI Vault</li>-->
<!--              <li>LINE NFT</li>-->
<!--              <li>LINE Blockchain Explorer</li>-->
<!--              <li>LINE Blockchain Scan</li>-->
<!--              <li>LINE Blockchain Developer</li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="footer_bottom">
        <div class="bottom_top">
          <ul class="bottom_top_list">
            <li>
              <button @click="goToPrivacy">Terms of Service</button>
            </li>
            <li>
              <button @click="goToPrivacy">Privacy Policy</button>
            </li>
            <li>
              <button @click="goToWhitepaper">Whitepaper</button>
            </li>
            <li>
              <button @click="goToDocs">저기어때 Docs</button>
            </li>
            <li>
              <button @click="goToFAQ">FAQ</button>
            </li>
          </ul>
          <ul class="bottop_icon">
            <li>
              <img src="../assets/images/icon.png">
            </li>
            <li>
              <img src="../assets/images/icon2.png">
            </li>
            <li>
              <img src="../assets/images/icon3.png">
            </li>
            <li>
              <img src="../assets/images/icon4.png">
            </li>
            <li>
              <img src="../assets/images/icon5.png" style="margin-right: 0">
            </li>
          </ul>
        </div>
        <div class="bottom_bottom">
          <p>@ 저기어때 Foundation. All Rights Reserved.</p>
        </div>
      </div>
    </div>
    <div class="s10_container2">
      <div class="footer_top">
        <ul>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Whitepaper</li>
          <li>저기어때 Docs</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div class="footer_bottom">
        <ul>
          <li>
            <img src="../assets/images/icon.png">
          </li>
          <li>
            <img src="../assets/images/icon2.png">
          </li>
          <li>
            <img src="../assets/images/icon3.png">
          </li>
          <li>
            <img src="../assets/images/icon4.png">
          </li>
          <li>
            <img src="../assets/images/icon5.png">
          </li>
        </ul>
        <p>@저기어때 Foundation. All Rights Reserved.</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Section10",
    methods:{
      goToAbout(){window.open('https://저기어때.network/about/','_blank')},
      goToBlog(){window.open('https://저기어때.network/blog/','_blank')},
      goToRodmap(){window.open('https://저기어때.network/launch-roadmap/','_blank')},
      goToWhitepaper(){window.open('https://저기어때.network/whitepaper/','_blank')},
      goToContact(){window.open('https://저기어때.network/contact/','_blank')},
      goToFAQ(){window.open('https://저기어때.network/faq/','_blank')},
      goToDocs(){window.open('','_blank')},
      goToPrivacy(){window.open('https://저기어때.network/privacy/','_blank')}
    },
  }
</script>
