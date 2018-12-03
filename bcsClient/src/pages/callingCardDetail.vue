<template>
  <div>
    <div class="app-hrader cf">
      <div class="back-btn cf">
        <p>重新拍摄</p>
      </div>
      <div class="appp-title">名片编辑</div>
    </div>
    <div class="con">
      <div class="card-img">
        <img src="../../static/images/card.png" alt="card">
      </div>
      <ul class="cardform">
        <li class="card-item cf"><span class="user-name">姓名</span>
          <input :disabled="editFlag" type="text" v-model="userList.custName">
        </li>
        <li class="card-item cf"><span class="user-phone">手机号码</span>
          <input :disabled="editFlag" type="text" v-model="userList.tel">
        </li>
        <li class="card-item cf"><span class="user-compony">公司</span>
          <input :disabled="editFlag" type="text" v-model="userList.compName">
        </li>
        <li class="card-item cf"><span class="user-job">职位</span>
          <input :disabled="editFlag" type="text" v-model="userList.job">
        </li>
        <li class="card-item cf"><span class="user-telphone">电话号码</span>
          <input :disabled="editFlag" type="text" v-model="userList.telphone">
        </li>
        <li class="card-item cf"><span class="user-email">邮箱</span>
          <input :disabled="editFlag" type="text" v-model="userList.emali">
        </li>
        <li class="card-item-address cf">
          <div class="text-div">{{userList.address}}</div>
          <div class="textarea-box">
            <span class="user-address">公司地址</span>
            <textarea class="textarea" :disabled="editFlag" v-model="userList.address" @keyup="changeAreaH()"></textarea>
          </div>
        </li>
        <li class="submit-data">
          <p>2018-10-12 13:45</p>
          <p>广东省深圳市福田区会展中心1号馆</p>
        </li>
      </ul>
      <p class="submit-btn" @click="keepBtn()">保存</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userList: {
       
      },
      editFlag: false,
    }
  },
  mounted: function() {
    this.$nextTick(function() {
     this.changeAreaH();
     this.userList=this.$route.params.userMsg;
     console.log(this.userList)
    })
  },
  methods: {
    changeAreaH: function() { //计算地址文本域高度
      var h = $('.text-div').height();
      $('.textarea,.textarea-box').css({ 'height': h + 'px', 'min-height': '1rem' });
    },
    keepBtn: function() {
      this.$router.push({ name: 'cardIndex' });
    }
  }
}

</script>
<style scoped>
.app-hrader {
  width: 7.5rem;
  height: .88rem;
  position: fixed;
  top: 0;
  left: 0;
  font-size: .3rem;
  padding: 0 .15rem;
  z-index: 3;
}

.app-hrader div {
  width: 40%;
  float: left;
}

.app-hrader div:nth-child(1) {
  width: 30%;
  color: #197dff;
  line-height: .88rem
}

.app-hrader div:nth-child(2) {
  text-align: center;
  line-height: .88rem
}

.app-hrader div:nth-child(3) {
  width: 30%;
  text-align: right;
  height: 100%
}

.back-btn img {
  width: .32rem;
  float: left;
  padding-top: .27rem
}

.back-btn p {
  float: left;
  padding-left: .1rem
}

.camera img {
  width: .46rem;
  margin-top: .2rem
}


.con {
  width: 7.5rem;
  position: fixed;
  top: .88rem;
  left: 0;
  overflow-y: scroll;
  height: 12.5rem;
  padding-bottom: 1rem
}

.card-img {
  width: 7.5rem;
  font-size: .1rem;
}

.card-img img {
  width: 100%;
}

.cardform {
  width: 7.2rem;
  margin-left: .15rem;
  font-size: .3rem
}

.cardform li {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: .14rem .26rem
}

.cardform li input,
textarea {
  float: right;
  width: 5rem;
  outline: none;
  text-align: right;
  border: none;
  background-color: #fff;
  font-size: .28rem
}

.card-item-address {
  position: relative;
  z-index: 2;
}

.textalign {
  text-align: left;
}

.textarea {
  text-align: left;
  font-size: .28rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.text-div {
  position: absolute;
  top: 0rem;
  left: 0;
  opacity: 0;
  z-index: -1;
  width: 5rem;
  font-size: .28rem;
}

.cardform .submit-data {
  border-bottom: none;
  font-size: .22rem;
  line-height: .4rem
}

.submit-btn {
  width: 1.6rem;
  height: .6rem;
  background-color: #0092ff;
  font-size: .26rem;
  text-align: center;
  line-height: .6rem;
  color: #fff;
  margin: 0 auto;
  margin-top: .4rem;
  border-radius: .12rem
}

</style>
