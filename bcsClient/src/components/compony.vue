<template>
  <div>
    <div class="compony-box" v-show="showFlag" v-bind:class="{'del-scroll':showWarpFlag}">
      <div class="custName cf">
        <p>{{companyDetail.custNm |initCom}}</p>
        <p class="company">
          <span>行标：</span>
          <span>{{companyDetail.newCmbStdSzNm}}</span>
        </p>
        <div @click="refreshList()" class="choseMore">
          切换公司>
        </div>
      </div>
      <div class="bg"></div>
      <inlineTop v-bind:custTopMsg="custTopMsg"></inlineTop>
      <div class="bg"></div>
      <ul>
        <li class="cf">
          <p>行业类型</p>
          <p>{{companyDetail.entpIdtBlg |initCom}}</p>
        </li>
        <li class="cf">
          <p>公司类型代码</p>
          <p>{{companyDetail.cmpTypCd |initCom}}</p>
        </li>
        <li class="cf">
          <p>公司类型</p>
          <p>{{companyDetail.cmpTypNm |initCom}}</p>
        </li>
        <li class="cf">
          <p>社会信用代码</p>
          <p>{{companyDetail.csldCrdCd |initCom}}</p>
        </li>
        <li class="cf">
          <p>组织机构代码</p>
          <p>{{companyDetail.orgCd |initCom}}</p>
        </li>
        <li class="cf">
          <p>注册编号</p>
          <p>{{companyDetail.regId |initCom}}</p>
        </li>
        <li class="cf">
          <p>注册日期</p>
          <p>{{companyDetail.regDt |initCom}}</p>
        </li>
        <li class="cf">
          <p>注册资金</p>
          <p>{{companyDetail.regCpt |initregCpt}}</p>
        </li>
        <li class="cf">
          <p>注册地</p>
          <p>{{companyDetail.cmpAdrNm |initCom}}</p>
        </li>
        <li class="cf">
          <p>经营范围</p>
          <p>{{companyDetail.oprScpNm |initCom}}</p>
        </li>
      </ul>
      <div class="bg"></div>
      <div class="more-msg-btn cf">
        <p>更多信息</p>
        <p>敬请期待</p>
      </div>
    </div>
    <div class="no-msg" v-show="errorFlag">
      <img src="../../static/images/nomsg.png" alt="">
      <p>{{errorMsg}}</p>
    </div>
    <div class="loading" v-if="loadingFlag">
      <img src="../../static/images/timg.gif" alt="" style="display: block;margin:4rem auto;width:6rem">
    </div>
    <ul class="chose-company-box" v-if="showWarpFlag">
      <p class="title"> 自动匹配以下公司,请选择:</p>
      <div class="chose-con">
        <li v-for="(item,index) in companyList" @click="choseComPMsg(item,index)" class="con-item cf">
          <span class="cname">{{item.custNm}}</span>
          <span class="chose" v-show="item.chosed">
            <img src="../../static/images/com_chosed.png" alt="">
          </span>
        </li>
        <li @click="noCompany()" class="con-item cf">
          <span class="cname">未匹配到正确公司名称</span>
          <span class="chose" v-show="noCompanyChosed">
            <img src="../../static/images/com_chosed.png" alt="">
          </span>
        </li>

      </div>
      <div class="sure-btn cf">
        <p @click="closeWarp()">取消</p>
        <p @click="SureCompany()">确定</p>
      </div>
    </ul>
    <div class="warp" v-if="showWarpFlag"></div>
  </div>
</template>
<script>
  import inlineTop from "../components/inline-box-top.vue";
  import { MessageBox } from "mint-ui";
  export default {
    components: {
      inlineTop
    },
    props: ["cardDetail"],
    data() {
      return {
        companyList: [],
        custTopMsg: {
          custName: "",
          point: "",
          newCmbStdSzNm: "", //归属网点
          iscompany: "1",
          YSTID: ''
        },
        companyDetail: [],
        choseIndex: "",
        showWarpFlag: false,
        is_bank: true,
        showFlag: false,
        userList: [],
        companylist: [],
        errorFlag: false,
        errorMsg: "",
        loadingFlag: true,
        comlength: 0,
        is_code: 0,//是否点击了选择公司
        noCompanyChosed: false//没有匹配到相关公司
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.userList = JSON.parse(window.localStorage.getItem("userList"));
        this.searchCompany();
      });
    },
    methods: {
      searchCompany: function () {//查询公司信息
        var _this = this;
        var list = JSON.parse(window.localStorage.getItem("userList"));
        var options = {
          cardId: list.cardId
        };
        this.$axios
          .post("/queryCrmInfo.do", options)
          .then(function (response) {
            if (response.data.isUsed == 0) {//第一次进来
              _this.loadperdonMsg();
            }
            else {
              _this.showFlag = true;
              _this.showWarpFlag = false;
              _this.loadingFlag = false;
              _this.companyDetail = JSON.parse(response.data.crmCltInfo.cmbDetail);
              _this.custTopMsg.custName = _this.companyDetail.cmInfLst[0].cmNm;
              _this.custTopMsg.point = _this.companyDetail.cmInfLst[0].orgNm; //归属网点
              _this.custTopMsg.newCmbStdSzNm = _this.companyDetail.newCmbStdSzNm;
              _this.custTopMsg.YSTID = _this.companyDetail.cmInfLst[0].cmYstId; //客户经理  YSTid
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      loadperdonMsg: function () {
        var _this = this;
        var list = JSON.parse(window.localStorage.getItem("userList"));
        var options = {
          compName: list.compName1,
          cardId: list.cardId
        };
        this.$axios
          .post("/getCustomerList.do", options)
          .then(function (response) {
            if (response.data.resCode == 0) {
              _this.errorMsg = "未查询到相关公司"
              _this.errorFlag = true;
              _this.loadingFlag = false;
            } else if (response.data.resCode == 4) {
              _this.errorMsg = "公司名称为空,请输入后查询!"
              _this.errorFlag = true;
              _this.loadingFlag = false;
            }
            else {
              if (response.data.infBdyArray.length == 1 && response.data.infBdyArray[0].custNm == options.compName && _this.is_code == 0) {//返回公司列表只有一条 且返回公司完全匹配 且不是点击选择公司弹出
                _this.showWarpFlag = false;
                _this.loadingFlag = false;
                _this.companylist = response.data.infBdyArray[0];
                _this.SureCompany();
                _this.showFlag = true;
              } else {
                _this.showWarpFlag = true;
                _this.companyList = response.data.infBdyArray;
                _this.loadingFlag = false;
                _this.comlength = response.data.infBdyArray.length;
                _this.showFlag = true;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      closeWarp: function () {
        this.showWarpFlag = false;
      },
      choseComPMsg: function (item, index) {
        //选择后的公司信息
        var _this = this;
        this.choseIndex = index;
        this.companylist = item;
        this.noCompanyChosed = false;
        this.companyList.forEach(function (el, index) {
          if (index == _this.choseIndex) {
            _this.$set(el, "chosed", true);
          } else {
            _this.$set(el, "chosed", false);
          }
        });
      },
      noCompany: function () {//未匹配到公司 
        var _this = this;
        this.companyList.forEach(function (el) {
          _this.$set(el, "chosed", false);
        });
        this.noCompanyChosed = true;
      },
      SureCompany: function () {
        if (this.noCompanyChosed) {//点击选择的是 未匹配公司
          this.showWarpFlag = false;
          this.companyDetail = [];
          this.custTopMsg= {
          custName: "",
          point: "",
          newCmbStdSzNm: "", //归属网点
          iscompany: "1",
          YSTID: ''
        };
          return false
        }
        var _this = this;
        var options = {
          custUid: _this.companylist.custUid,
          custId: _this.companylist.custId,
          cardId: _this.userList.cardId
        };
        this.$axios
          .post("/getCustomerDetail.do", options)//公司详情
          .then(function (response) {
            if (response.data.resCode == 1) {
              _this.showWarpFlag = false;
              _this.companyDetail = response.data.detailArray[0];
              if (_this.companyDetail.cmInfLst[0]) {
                _this.custTopMsg.custName = _this.companyDetail.cmInfLst[0].cmNm;
                _this.custTopMsg.point = _this.companyDetail.cmInfLst[0].orgNm; //归属网点
                _this.custTopMsg.YSTID = _this.companyDetail.cmInfLst[0].cmYstId; //客户经理  YSTid
              }
              if (_this.companyDetail.newCmbStdSzNm) {
                _this.custTopMsg.newCmbStdSzNm = _this.companyDetail.newCmbStdSzNm;
              }
              var compDetail = _this.companyDetail;
              var base = new Base64();
              compDetail = base.encode(JSON.stringify(compDetail));
              var options1 = {
                cardId: _this.userList.cardId,
                compDetail: compDetail
              };
              _this.$axios
                .post("/updateCompDetail.do", options1)
                .then(function (response) {
                  _this.loadingFlag = false;
                })
                .catch(function (error) {
                  console.log(error);
                });

            } else {
              if (_this.comlength > 1) {//公司数大于1才能再次选择
                _this.showWarpFlag = false;
                MessageBox({
                  title: "温馨提示",
                  message: "您查询的公司为空,请返回查看!"
                }).then(action => {
                  _this.showWarpFlag = true;
                });
                _this.companyDetail = [];
                _this.custTopMsg = {};
              }
            }
            _this.loadingFlag = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      refreshList: function () {
        this.loadingFlag = true;
        this.showFlag = false;
        this.is_code = 1;
        this.loadperdonMsg();
      }
    }
  };
</script>
<style scoped>
  .compony-box {
    position: fixed;
    top: 2rem;
    left: 0;
    height: 100%;
    overflow: scroll;
    padding-bottom: 2rem;
    font-size: .28rem;
    z-index: 4;
    -webkit-overflow-scrolling: touch
  }

  .not-bank {
    width: 7.5rem;
    padding-top: 50%;
    text-align: center;
    font-size: .3rem;
    color: #ccc
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
  ul li:last-child{border: none}
  ul li p:first-child {
    float: left;

  }

  ul li p:last-child {
    float: right;
    max-width: 4rem;

  }

  ul li p span {
    font-size: 0.24rem;
    color: #ffb9bb;
  }

  .text-item {
    padding: 0.2rem 0 0.2rem 0;
    line-height: 0.42rem;
  }

  .chose-company-box {
    width: 6rem;
    position: fixed;
    height: 5.6rem;
    top: 3.88rem;
    left: 50%;
    margin-left: -3rem;
    border-radius: 0.2rem;
    background-color: #fff;
    text-align: left;
    padding: 0 0.2rem;
    z-index: 16;
    font-size: .28rem
  }

  .chose-company-box .con-item {
    width: 5.8rem;
    margin: 0 auto
  }

  .chose-company-box .title {
    font-size: .32rem
  }

  .chose-company-box {
    padding-top: .2rem;

  }

  .chose-company-box p {
    text-align: center
  }

  .cname {
    width: 4.6rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: .6rem;
    line-height: .6rem;
    float: left;
  }

  .warp {
    position: fixed;
    top: -0.88rem;
    left: 0;
    width: 7.5rem;
    height: 140%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }

  .chose {
    display: inline-block;
    padding-left: .6rem;
    height: .6rem;
    float: right;
    padding-left: .2rem;
    width: .8rem;
  }

  .chose img {
    width: 0.5rem;
  }

  .sure-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    background-color: #fff;
    color: #2674fb;
    border-top: 1px solid #ccc;
    border-radius: 0 0 .2rem .2rem;
  }

  .sure-btn p:nth-child(1) {
    border-right: 1px solid #ccc
  }

  .sure-btn p {
    float: left;
    width: 50%;
  }

  .chose-con {
    height: 4rem;
    position: absolute;
    top: .8rem;
    left: 0;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
  }

  .bg {
    width: 7.5rem;
    height: .1rem;
    background-color: #ededed
  }

  .custName {
    font-size: .32rem;
    height: 1.6rem;
    padding: .2rem 0 0 .45rem;
    position: relative;
  }

  .custName p:nth-child(1) {
    width: 4.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .custName .company {
    font-size: .24rem;
    color: #797979;
    padding-top: .24rem
  }

  .no-msg {
    width: 100%;
    font-size: .3rem;
    text-align: center;
    padding-top: 50%
  }

  .no-msg img {
    width: 3rem;
  }

  .no-msg p {
    color: #707070
  }

  .choseMore {
    position: absolute;
    bottom: .06rem;
    right: .4rem;
    height: 1rem;
    line-height: 1rem;
    padding-left: 1.1rem;
    font-size: .24rem;
    color: #0076ff
  }

  .del-scroll {
    overflow: hidden
  }
  .loading{position: fixed;top: 0;left:0;width: 7.5rem;}
  .more-msg-btn{width: 7rem;padding: .2rem .2rem .2rem .2rem;font-size: .28rem;border-bottom: .02rem solid #ededed ;margin: 0 auto;margin-bottom: 1rem}
  .more-msg-btn p:first-child{float: left;}
  .more-msg-btn p:last-child{float: right;}
</style>