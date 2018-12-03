<template>
  <div>
    <div class="person-box" v-show="isbankcust&&showFlag">
      <div class="custName cf">
        <p>{{KHName}}</p>
        <p class="company">
          <span>所属公司：{{KHcom |initCom}}</span>
        </p>
        <div class="user-photo-box"  @click="addPhoto()">
            <img src="../../static/images/userphoto.png" alt="">
            <img src="../../static/images/goright.png" alt="">
        </div> 
      </div>
      <div class="bg"></div>
      <inlineTop v-bind:custTopMsg="custTopMsg"></inlineTop>
      <div class="bg"></div>
      <ul>
        <li class="cf">
          <p>持卡级别</p>
          <p>{{userInfo.cardGrdCd |initCom}}</p>
        </li>
        <li class="cf">
          <p>是否有贷款</p>
          <p>{{custList.isLoan |initCom}}</p>
        </li>
        <li class="cf">
          <p>是否持信用卡</p>
          <p>{{custList.isCreditCard |initCom}}</p>
        </li>
        <li class="cf">
          <p>风险评估</p>
          <p>{{custList.rskLvlCd |initCom}}</p>
        </li>
      </ul>
    </div>
    <div class="bg"></div>
      <div class="more-msg-btn cf">
        <p>更多信息</p>
        <p>敬请期待</p>
      </div>
    <div class="isbankcust" v-show="!isbankcust&&showFlag">
      <img src="../../static/images/nomsg.png" alt="">
      <p>{{showmsg}}</p>
    </div>
    <div class="loading" v-if="loadingFlag">
      <img src="../../static/images/timg.gif" alt="" style="display: block;margin:4rem auto;width:6rem">
    </div>
  </div>
</template>
<script>
  import inlineTop from "../components/inline-box-top.vue";
  import { MessageBox } from "mint-ui";
  export default {
    props: [
      'cardDetail'
    ],
    components: {
      inlineTop
    },
    data() {
      return {
        custList: [],
        custTopMsg: {
          custName: '',
          point: "",
          iscompany: "0", //归属网点
          YSTID:''
        },
        userInfo: [],
        orgName: "",
        pathId: "",
        pathName: "",
        isbankcust: true,
        showFlag: false,
        showmsg: "",
        KHName: "",
        KHcom: "",
        loadingFlag:true
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loadpersonmsg();
      });
    },
    methods: {
      loadpersonmsg: function () {
        var _this = this;
        var list = JSON.parse(window.localStorage.getItem("userList"));
        var pathName = window.localStorage.getItem('pathName');
        this.KHName = list.custName;
        this.KHcom = list.compName1;

        var options = {
          custNm: list.custName,
          mblNbr: list.mobile,
          pathName: pathName,
          cardId: list.cardId
        };
        if (options.mblNbr.length !=11) {
          _this.showFlag = true;
          _this.isbankcust = false;
          _this.showmsg = "请检查手机号码是否正确!";
          return false
        }
        this.$axios
          .post("/getRtlInfo.do", options)
          .then(function (response) {
            _this.showFlag = true;
            var resCode = response.data.resCode;
            if (resCode == 0) {//查询失败
              _this.isbankcust = false;
              _this.showmsg = "查询信息失败,请稍后再试!";
              
            }
            else if (resCode == 1) {//正常返回
              if (response.data.response2.code == "S") {
                _this.custList = _this.common.convertName(response.data.response2.data);
                _this.custTopMsg.custName = _this.custList.userInfoList.blgCMNm;
                _this.custTopMsg.point = _this.custList.userInfoList.blgOrgNm;
                _this.custTopMsg.YSTID = _this.custList.userInfoList.blgCMId;
                // alert('个人信息返回'+_this.custTopMsg.YSTID)
                _this.userInfo = _this.custList.userInfoList;
              }
            } else if (resCode == 2) {//行外客户
              _this.isbankcust = false;
              _this.showmsg = "非我行客户或客户姓名、手机号码有误";
            } else if (resCode == 3) {//行员
              _this.isbankcust = false;
              _this.showmsg = "行员数据不予展示";
            } else if (resCode == 4) {
              _this.isbankcust = false;
              _this.showmsg = "姓名或手机为空，无法查询个人信息!";
            }
            _this.loadingFlag=false;
          })
          .catch(function (error) {
            MessageBox({
              title: "温馨提示",
              message: "服务器繁忙，请稍后再试!"
            });
            _this.loadingFlag=false;
          });
      },
      addPhoto: function () {
        MessageBox({
          title: false,
          message: "后续功能，敬请期待！"
        });
      }
    }
  };
</script>
<style scoped>
  .person-box {
    padding-top: 2rem;
    width: 7.5rem;
    font-size: 0.28rem;
  }

  ul {
    width: 7rem;
    margin: 0 auto;
    padding-top: 0.16rem;
  }

  ul li {
    border-bottom: 1px solid #ededed;
    width: 100%;
    padding: 0.2rem .2rem;
  }

  ul li p:first-child {
    float: left;
    width: 2.4rem;
  }

  ul li p:last-child {
    float: right;
    max-width: 4rem;
  }

  ul li p span {
    font-size: 0.24rem;
    color: #ffb9bb;
  }

  .isbankcust {
    width: 7.5rem;
    padding-top: 50%;
    text-align: center;
    font-size: .3rem;
    color: #707070;
  }
  .isbankcust img{width: 3rem}
  .bg {
    width: 7.5rem;
    height: .1rem;
    background-color: #ededed
  }

  .custName {
    font-size: .32rem;
    height: 1.6rem;
    padding: .2rem 0 0 .45rem;
   width: 100%;
   position: relative;
  }
  .custName p{ width: 5.45rem;}
  .custName .company {
    font-size: .24rem;
    color: #797979;
    padding-top: .24rem;
  }
  .custName .company span:nth-child(1){width: 4.8rem;display: inline-block; overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;} 
  .more-msg-btn{width: 7rem;padding: .2rem .2rem .2rem .2rem;font-size: .28rem;border-bottom: .02rem solid #ededed ;margin: 0 auto}
  .more-msg-btn p:first-child{float: left;}
  .more-msg-btn p:last-child{float: right;}
  .user-photo-box{width: 1.6rem;height: 1rem;position: absolute;top:.4rem;right: 0;}
  .user-photo-box img:first-child{width: .8rem;float: left;}
  .user-photo-box img:last-child{width: .5rem;float: left;margin-top: .16rem;margin-left: .1rem}
</style>