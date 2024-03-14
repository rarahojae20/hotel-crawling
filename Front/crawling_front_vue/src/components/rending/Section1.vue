<template>
  <section id="section1">
    <div class="bg-video">
      <div class="bg-video">
        <video ref="bgVideo" class="bg-video__content" :src="videoSource" autoplay muted></video>
      </div>
    </div>
    <div class="s1_container">
      <p class="p2">국내부터 해외까지</p>
      <p class="p2">숙박비굔 저기어때</p>
      <div class="input">
          <div class="table_list">
            <button>국내숙소</button>
            <button @click="unready">해외숙소</button>
          </div>
          <el-form :model="formData" label-position="top">
            <el-form-item>
              <el-input v-model="formData.hotelName" placeholder="숙소를 검색해보세요."></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="formData.startDate" type="date" placeholder="언제가서"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formData.endDate" type="date" placeholder="언제올래"></el-date-picker>
            </el-form-item>
              <el-button type="primary" @click="search">Search</el-button>
          </el-form>
        </div>
    </div>
    <div id="section2">
      <div class="s2_container">
        <div class="text_box">
          <p class="p1">알뜰한 숙박의 정석</p>
          <p class="p2">
            저기어때는 온라인 여행 플랫폼으로써 저기어때 앱 및 웹사이트를 통해 전 세계 사람들에게 가치 있고 즐거운 여행 경험을 제공하고자 노력하고 있습니다.
            저기어때의 사명은 합리적인 요금의 호텔, 항공편, 액티비티 및 전 과정에 걸친 간편한 예약 경험을 제공함으로써 모든 사람들이 여행자가 될 수 있도록 돕는 것입니다.
            2005년 설립된 이래로 저기어때는 쉽고 편한 여행 검색 및 예약을 제공하기 위해 최선을 다하고 있습니다.
            오늘날 저기어때는 수백만 명의 등록 고객을 보유한 아시아 최고의 트래블테크 기업으로써, 31개 국가 및 지역에서 다양한 문화적 배경을 가진 6,600명 이상의 직원들과 함께 연중무휴 24시간 고객 서비스를 제공하고 있습니다.
          </p>
          <button @click="$router.push('/')">자세히보기
            <i class="el-icon-right"/>
          </button>
        </div>
      </div>
    </div>
    <div id="section3">
      <div class="s2_container">
        <div class="text_box">
          <p class="p1">방문자 수</p>
          <p class="p2">
            Agoda.com은 유럽연합 디지털 서비스법(DSA)을 준수하며 이러한 의무에 따른 Agoda.com의 유럽 연합 내 월 평균 서비스 수신자*는 4,500만 명 이하로 추정됩니다(2023년 2월 1일 ~ 2023년 7월 31일 기준).

            이는 추정치일 뿐이며 현재 Agoda.com에서 사용할 수 있는 데이터 및 DSA의 제한된 지침을 기반으로 합니다. 이 추정치는 DSA에 따라 게시되어야 하며 다른 용도로 사용되어서는 안 됩니다. DSA에 정의된 월 평균 서비스 수신자를 추정하는 데 사용되는 방법론은 주요 판단 및 설계 입력이 필요하고 데이터 및 기타 제한 사항의 적용을 받으며, 본질적으로 통계적 차이 및 불확실성의 영향을 받습니다. 이 추정치는 Agoda.com의 처리 방법 개선 및 유럽연합 집행위원회가 발표한 방법론에 따라 상향 또는 하향 수정될 수 있습니다.

            Agoda.com의 비즈니스와 관련될 수 있는 수치들은 당사 웹사이트를 참조해 주시기 바랍니다.

            * DSA에 따른 '서비스 수신자'는 '중개 서비스를 사용하는 모든 자연인 또는 법인으로, 특히 정보를 검색하고 해당 정보를 이용하는 것을 목적으로 하는 자'로 정의됩니다. 이는 해당 사용자가 거래를 하지 않은 경우에도 Agoda.com 서비스에 의해 정보를 열람한 사용자를 계산해야 합니다.
          </p>
          <button @click="$router.push('/')">자세히보기
            <i class="el-icon-right"/>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    name: "Section1",
    data: () => ({
      formData: {
        hotelName: '',
        startDate: '',
        endDate: ''
      },
      videoSource: require('../../../../../sitedata/video/home_s1_video1.mp4'),
      lastScrollPosition: 0,
    }),
    computed: {
    },
    methods: {
      unready(){
        this.$alert('준비중입니다.', '알림',{
          confirmButtonText: '확인'
        })
      },
      async search() {
        const {hotelName, startDate, endDate} = this.formData;
        const hotelSite = "yeogi,agoda"; // 호텔 사이트 정보

        try {
          const response = await fetch(
              `http://localhost:3000/v1/hotel/${hotelSite}?hotelName=${hotelName}&startDate=${startDate}&endDate=${endDate}`,
              {
                method: 'GET'
              });

          const data = await response.json();
          console.log(data); // 백엔드에서 받은 데이터 출력
          // 받은 데이터를 화면에 표시하거나 필요한 작업 수행
        } catch (error) {
          console.error('데이터 가져오기 실패:', error);
          // 오류 처리
        }
      },
      handleScroll() {
        const vm = this
        const section3 = document.getElementById('section3');
        const section3Position = section3.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (section3Position < windowHeight) {
          if (vm.videoSource !== require('../../../../../sitedata/video/home_s1_video2.mp4')) {
            // 비디오 변경
            vm.videoSource = require('../../../../../sitedata/video/home_s1_video2.mp4');
            // 이전 재생 위치로 설정
            vm.$refs.bgVideo.currentTime = vm.lastScrollPosition;
          }
        } else {
          if (vm.videoSource !== require('../../../../../sitedata/video/home_s1_video1.mp4')) {
            // 비디오 변경
            vm.videoSource = require('../../../../../sitedata/video/home_s1_video1.mp4');
            // 이전 재생 위치 저장
            vm.lastScrollPosition = vm.$refs.bgVideo.currentTime;
          }
        }
      },
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  };
</script>

