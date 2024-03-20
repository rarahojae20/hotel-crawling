<template>
  <el-dialog  id="search_dialog" :visible="visible" @close="closeDialog">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="가장저렴한 곳!" name="first">
          <div class="text">
            <p>{{dialogData.hotelSitesInfo.cheaperHotel.cheaperSite}} 여기서</p>
            <p>단돈!! {{dialogData.hotelSitesInfo.cheaperHotel.cheaperPrice}}원에 모신다네요</p>
          </div>
        <button>지금 바로 예매하기</button>
      </el-tab-pane>
      <el-tab-pane label="요기요" name="second">
        <div class="information">
          <p>호텔이름:{{dialogData.hotelSitesInfo.yeogi.hotelName}}</p>
          <p>호텔가격:{{dialogData.hotelSitesInfo.yeogi.price}}원</p>
          <button @click="open2">지금 바로 예매하기</button>
        </div>
        <div class="history">

        </div>
      </el-tab-pane>
      <el-tab-pane label="아고다" name="third">
        <div class="information">
          <p>호텔이름:{{dialogData.hotelSitesInfo.agoda.hotelName}}</p>
          <p>호텔가격:{{dialogData.hotelSitesInfo.agoda.price}}원</p>
          <button @click="open3">지금 바로 예매하기</button>
        </div>
        <div class="history">

        </div>
      </el-tab-pane>
      <el-tab-pane label="호재" name="fourth">
        <img src="../../assets/images/raraimg.jpeg" style="width: 100%">
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">닫기</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      dialogData: { // 상위 컴포넌트에서 전달된 데이터를 받는 props
        type: Object, // 전달되는 데이터의 타입에 따라 설정할 수 있습니다.
        default: null, // 기본값은 null로 설정합니다.
      },
      visible: { // 다이얼로그의 가시성 상태를 받는 props
        type: Boolean, // Boolean 타입으로 설정합니다.
        default: false, // 기본값은 false로 설정합니다.
      },
    },
    data(){
      return{
        activeName: 'first'
      }
    },
    methods: {
      open2(){
        const url = this.dialogData.hotelSitesInfo.yeogi.hotelUrl;
        if (url) {
          window.open(url, '_blank');
        } else {
          console.error('URL이 유효하지 않습니다.');
        }
      },
      open3(){
        const url = this.dialogData.hotelSitesInfo.agoda.hotelUrl;
        if (url) {
          window.open(url, '_blank');
        } else {
          console.error('URL이 유효하지 않습니다.');
        }
      },
      closeDialog() {
        // 다이얼로그를 닫을 때 호출되는 메서드
        this.$emit('closeDialog'); // closeDialog 이벤트를 상위 컴포넌트로 전달합니다.
      },
    },
  };
</script>
