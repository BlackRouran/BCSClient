<template>
  <div class="warp">
    <div class="app-hrader cf">
      <div class="back-btn cf" @click="QuitSys()">
        <img src="../../static/images/back_icon.png" alt="back-btn">
        <p>返回</p>
      </div>
              <img src="data:image/png;base64,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" alt="">

      <div class="appp-title">名片夹</div>
      <div class="camera" @click="jumpScan()">
        <img src="../../static/images/camera_icon.png" alt="camera">
      </div>
      <div class="header">
        <div class="header-con cf">
          <img src="../../static/images/secrch-btn.png" alt="search" class="search-icon">
          <input type="text" class="search-text" placeholder="输入号码/姓名/公司搜索" v-model="searchText">
          <img src="../../static/images/delete-btn.png" alt="delate" @click="delText()" class="search-delate" v-show="delateBtnFlag">
        </div>
      </div>
    </div>
    <div class="con" :class="{'delScroll':handelFlag}">
      <ul class="card-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
        <li class="cf" :id="'Item'+index" @click="jumpIndex(item)" v-for="(item,index)  in  cardList">
          <div class="list-warp" :class="{'del-btn':item.delFlag}">
            <div class="card-icon">
              <!-- <img :src="'http://s3gw.cmbchina.com/LT20-00-01/'+item.cardId+'.jpg'" alt="card" @error="defaulterror($event,item.cardId)"> -->
            </div>
            <div class="user-msg">
              <p class="user-name cf">
                <span>{{item.custName}}</span>
                <span>{{item.ocrTime |initDate}}</span>
              </p>
              <p class="user-job">{{item.title|inittitle}}</p>
              <p class="user-compony cf">
                <span>{{item.compName1}}</span>
                <span @click.stop="handelMore(item,index)">
                  <img src="../../static/images/handle_more.png" alt="" class="hander-more">
                </span>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="no-msg" v-show="nomsgFlag">
        <img src="../../static/images/nomsg.png" alt="">
        <p>暂无搜索结果~~</p>
      </div>
    </div>
    <div class="delWarp" @click="closeHandel()">
      <ul class="handerBox">
        <li class="hander-user-name cf" @click="closeHandel()">
          <p>客户:{{delEl.custName}} </p>
          <img src="../../static/images/handle_down.png" alt="" class="handle-down">
        </li>
        <li class="del-item cf" @click.stop="delItem()">
          <img src="../../static/images/handle_del.png" alt="" class="hander-log">
          <p class="hander-text">删除</p>
        </li>
        <li class="del-item cf" @click="chosephone()">
          <img src="../../static/images/handle_phone.png" alt="" class="hander-log">
          <p class="hander-text">拨打电话</p>
        </li>
        <li class="del-item cf" @click="shareZH()">
          <img src="../../static/images/handle_share.png" alt="" class="hander-log">
          <p class="hander-text">分享</p>
        </li>
        <li class="del-item cf" @click="notOpen()">
          <img src="../../static/images/handle_group.png" alt="" class="hander-log">
          <p class="hander-text">添加到分组</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from "mint-ui";
  import { Swipe, SwipeItem } from "mint-ui";
  const delay = (function () {
    let timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  export default {
    data() {
      return {
        errorImg: "",
        delateBtnFlag: false,
        searchText: "",
        allLoaded: false,
        cardList: [],
        userId: "",
        pathName: "",
        delId: "",
        delIndex: "",
        delEl: "",
        nomsgFlag: false,
        handelTouchFlag: true,
        handelFlag: false//操作弹框
      };
    },
    watch: {
      searchText() {
        delay(() => {
          this.searchList();
        }, 400);
      }
    },
    mounted: function () {
      document.body.addEventListener('touchmove', this.handelTouch, true);
      this.$nextTick(function () {
        var userId = window.sessionStorage.getItem("userId");
        // this.userId = userId;//测试代码
        // this.getCardList();//测试代码  
        if (userId == null || userId.length <= 1) {//第一次進入
          this.getPathName();
        } else {
          this.getUserId();
        }
        $('.con').height(($('body').height() - $('.app-hrader').height()) + "px");
        $('.delWarp').height($('body').height() + "px");

      });
    },
    computed: {
      resultList: function () {

      }
    },
    methods: {
      handelTouch: function (e) {
        if (!this.handelTouchFlag) {
          e.preventDefault()
        }
      },
      searchList: function () {
        this.searchText.length == 0
          ? (this.delateBtnFlag = false)
          : (this.delateBtnFlag = true);
        var _this = this;
        var userId = this.userId,
          queryIndex = this.searchText;
        var options = {
          queryIndex: queryIndex,
          userId: userId
        };
        this.$axios
          .post("/queryCardList.do", options)
          .then(function (response) {
            if (response.data.resCode == 1) {
              _this.cardList = response.data.cardInfo;
              _this.nomsgFlag = false;
            } else if (response.data.resCode == 2) {
              _this.cardList = [];
              _this.nomsgFlag = true;
            } else {
              _this.cardList = [];
              MessageBox({
                title: "温馨提示",
                message: "请求超时，请稍后再试!"
              });
            }
          })
          .catch(function (error) {

          });
      },
      delText: function () {
        //清空搜索框
        this.searchText = "";
      },
      jumpIndex: function (item) {
        window.sessionStorage.setItem("cardId", item.cardId);
        //跳转资料主页
        var cardId = item.cardId,
          source = 1,
          custName = item.custName,
          tel = item.mobile,
          compName = item.compName;
        this.$router.push({
          name: "cardIndex",
          params: {
            cardId: cardId,
            custName: custName,
            compName: compName,
            source: source,
            tel: tel
          }
        });
      },
      jumpScan: function () {
        //跳转扫描页
        this.FaceRecognition();
      },
      loadMore: function () {
        // alert("触底")
      },
      sendToken: function () {
        //发送token 和data
        var _this = this;
        var token = this.common.getUrl("token"),
          logindata = this.common.getUrl("data");
        var options = {
          token: token,
          data: logindata,
          pathName: _this.pathName
        };
        this.$axios
          .post("/login.do", options)
          .then(function (response) {
            if (response.data.resCode == 11) {//无权限
              MessageBox({
                title: "温馨提示",
                message: "您暂无权限使用该应用!",
                closeOnClickModal: false
              }).then(action => {
                _this.QuitSys();
              });
            }
            else if (response.data.resCode == 0) {//成功
              _this.userId = response.data.userId;
              _this.getCardList();
            }
            else if (response.data.resCode == 10) {//验签失败
              MessageBox({
                title: "温馨提示",
                message: "验签失败,请重新登录!"
              }).then(action => {
                _this.QuitSys();
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      FaceRecognition: function () {
        var _this = this;
        //人脸识别参数
        var option = {
          asyncData: "",
          callback: function (param) {
            try {
              var retObj = param;
              if (retObj.retCode < 0) {
                alert("错误信息：" + retObj.retMsg);
                return;
              } else {
                //名片识别结果图片通过以下结构可以获取返回信息
                //retObj.data.taskID
                var cardId = retObj.data.taskID,
                  ocrTime = retObj.data.ocrTime,
                  ocrLocation = retObj.data.ocrLocation,
                  ocrRemark = retObj.data.ocrRemark,
                  ocrData = retObj.data.ocrData;
                ocrData = encodeURIComponent(JSON.stringify(ocrData));
                window.location.href =
                  window.location.protocol + "//" + document.domain + "/bcsClient/index.html#/cardIndex?taskID=" +
                  cardId +
                  "&ocrTime=" +
                  ocrTime +
                  "&ocrLocation=" +
                  ocrLocation +
                  "&ocrRemark=" +
                  ocrRemark +
                  "&ocrData=" +
                  ocrData +
                  "&source=" +
                  1;
              }
            } catch (err) {
              alert("回调错误，原因[" + err.message + "]");
              return;
            }
          }
        };
        MobileJS.bizCardRecognition(option);
      },
      QuitSys: function () {
        window.sessionStorage.setItem("userId", "0");
        var option = {
          callback: "",
          asyncData: ""
        };
        MobileJS.quitSys(option);
      },
      getCardList: function () {
        var _this = this;
        var userId = this.userId;
        var options = {
          userId: userId
        };
        this.$axios
          .post("/getCardByUserId.do", options)
          .then(function (response) {
            if (response.data.resCode == 1) {
              _this.cardList = response.data.cardInfoList;
            } else {

            }
          })
          .catch(function (error) {
            alert("服務器繁忙！");
          });
      },
      slideLeft: function (event, index) {
        var el = event.currentTarget;
        $(el).find('.list-warp').addClass('del-btn');
        $(el).siblings().find('.list-warp').removeClass('del-btn')
      },
      slideRight: function (event, item) {
        this.$set(item, "delFlag", false);
        var el = event.currentTarget;
        $(el).find('.list-warp').removeClass('del-btn')
      },
      delItem: function () {
        //删除
        var _this = this;
        this.delId = this.delEl.cardId;
        var index = this.delIndex;
        var el = "#Item" + index;
        // $(el).remove();
        var options = {
          cardId: _this.delId
        };
        MessageBox({
          showCancelButton: true,
          title: "温馨提示",
          message: "是否删除该名片"
        }).then(action => {
          if (action == "confirm") {
            this.$axios
              .post("/deleteCardInfo.do", options)
              .then(function (response) {
                if (response.data.resCode == 1) {
                  var el = "#Item" + index;
                  $(el).remove();
                  _this.closeHandel();
                } else {
                  alert("删除失败");
                }
              })
              .catch(function (error) {
                alert("服務器繁忙！");
              });
          }
        });
      },
      getUserId: function () {
        var _this = this;
        var getUseroption = {
          version: "1",
          asyncData: "",
          callback: function (param) {
            try {
              var retObj = param;
              if (retObj.retCode < 0) {
                alert("错误信息：" + retObj.retMsg);
                return;
              } else {
                _this.userId = retObj.data.ystId;
                _this.getCardList();
              }
            } catch (err) {
              alert("回调错误，原因[" + err.message + "]");
              return;
            }
          }
        };
        MobileJS.getUserInfo(getUseroption);
      },
      getPathName: function () {
        var _this = this;
        var getUseroption = {
          version: "1",
          asyncData: "",
          callback: function (param) {
            try {
              var retObj = param;
              // alert(JSON.stringify(retObj));
              if (retObj.retCode < 0) {
                alert("错误信息：" + retObj.retMsg);
                return;
              } else {
                _this.pathName = retObj.data.pathName;
                _this.sendToken();
              }
            } catch (err) {
              alert("回调错误，原因[" + err.message + "]");
              return;
            }
          }
        };
        MobileJS.getUserInfo(getUseroption);
      },
      handelMore: function (item, index) {
        this.delEl = item;
        this.delIndex = index;
        $('body').addClass('delScroll');
        $('html').addClass('delScroll');
        this.handelFlag = false;
        $('.delWarp').addClass('showwarp').animate({
          'background-color': 'rgba(0,0,0,.2)'
        }, 400);
        $('.handerBox').animate({
          'bottom': '0px'
        }, 300, 'linear')
      },
      closeHandel: function () {
        $('body').removeClass('delScroll');
        $('html').removeClass('delScroll');
        this.handelTouchFlag = true;
        $('.delWarp').animate({
          'background-color': 'rgba(0,0,0,0)'
        }, 300, function () {
          $('.delWarp').removeClass('showwarp')
        });
        $('.handerBox').animate({
          'bottom': '-5rem'
        }, 10, 'linear')
      },
      notOpen: function () {
        MessageBox({
          title: "温馨提示",
          message: "后续功能,敬请期待!"
        })
      },
      shareZH: function () {
        var option = {
          asyncData: "",
          title: "测试",
          image: "",
          subject: "测试摘要",
          callback: function (prama) {//分享Url到招乎回调函数
            try {
              var retObj = prama;
              if (retObj.retCode < 0) {
                alert("错误信息：" + retObj.retMsg);
                return;
              } else {
                alert('分享成功!')
              }
            } catch (err) {
              alert("回调错误，原因[" + err.message + "]");
              return;
            }
          },
          url: 'http://www.baidu.com'
        }
        MobileJS.shareUrlToZH(option);
      },
      chosephone: function () {
        var _this=this;
        var option = {
          asyncData: "",
          version: "1",
          callback: function (prama) {//通讯录 导入
            try {
              var retObj = prama;
              if (retObj.retCode < 0) {
                alert("错误信息：" + retObj.retMsg);
                return;
              } else {
                // alert(JSON.stringify(retObj.data));
                var options = {
                  name: retObj.data.name,
                  phone: retObj.data.phone,
                  userId:_this.userId
                };
                _this.$axios
                  .post("/savePhoneContact.do", options)
                  .then(function (response) {
                    if (response.data.resCode == 1) {//保存成功
                      MessageBox({
                        title: "温馨提示",
                        message: "保存成功!"
                      })
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            } catch (err) {
              alert("回调错误，原因[" + err.message + "]");
              return;
            }
          }
        }
        MobileJS.phoneSelector(option);
      },
      defaulterror: function (e, id) {
        if (e.currentTarget.src.indexOf('png') != -1) {
          e.currentTarget.src = require('../../static/images/card.png');
          return false
        }
        e.currentTarget.src = 'http://s3gw.cmbchina.com/LT20-00-01/' + id + '.png';
      }
    }
  };
</script>
<style scoped>
  .app-hrader {
    width: 7.5rem;
    /* height: 0.88rem; */
    position: fixed;
    top: 0;
    left: 0;
    font-size: 0.3rem;
    /* padding: 0 0.15rem; */
    background-color: #fff;
    z-index: 4;
  }

  .warp {
    position: relative;
  }

  .app-hrader div {
    width: 60%;
    float: left;
  }

  .app-hrader div:nth-child(1) {
    width: 20%;
    color: #197dff;
    line-height: 0.88rem;
  }

  .app-hrader div:nth-child(2) {
    text-align: center;
    line-height: 0.88rem;
  }

  .app-hrader div:nth-child(3) {
    width: 20%;
    text-align: right;
    height: 100%;
    padding-right: .15rem
  }

  .back-btn {
    padding-left: .15rem
  }

  .back-btn img {
    width: 0.32rem;
    float: left;
    padding-top: 0.27rem;
  }

  .back-btn p {
    float: left;
    padding-left: 0.1rem;
  }

  .camera img {
    width: 0.46rem;
    margin-top: 0.2rem;
  }

  .app-hrader .header {
    width: 7.5rem;
    font-size: 0.26rem;
    background-color: #d9d9d9;
    padding: 0.12rem 0;
    z-index: 3;
  }

  .app-hrader .header-con {
    background-color: #fff;
    position: relative;
    width: 7.2rem !important;
    margin: 0 auto;
    border-radius: 0.12rem;
    margin-left: .15rem
  }

  .app-hrader .search {
    width: 7.2rem;
    margin-left: 0;
    font-size: 0.28rem;
  }

  .app-hrader .search-icon {
    width: 0.4rem;
    position: absolute;
    top: 0.1rem;
    left: 0.1rem;
  }

  .app-hrader .search-text {
    width: 6.8rem;
    padding: 0.14rem 0.6rem;
    outline: none;
    border-radius: 0.12rem;
    border: none;
    float: left;
  }

  .app-hrader .search-delate {
    width: 0.4rem;
    position: absolute;
    top: 0.12rem;
    right: 0.4rem;
  }

  .con {
    position: absolute;
    top: 1.68rem;
    left: 0;
    right: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .card-list-box {
    width: 7.5rem;
    font-size: 0.26rem;
  }

  .card-list-box li {
    border-bottom: 1px solid #ccc;
    padding: 0.12rem;
    position: relative;
    height: 1.48rem;
    width: 7.3rem;
    margin-left: .2rem;
    -webkit-transform: translate3d(0, 0, 0);
    overflow: hidden;

  }

  .list-warp {
    width: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    transition: left .3s
  }

  .del-message {
    width: 1.2rem;
    height: 100%;
    background-color: #ff3a31;
    color: #fff;
    text-align: center;
    line-height: 1.48rem;
    font-size: 0.3rem;
    float: left;
  }

  .del-btn {
    left: -1.2rem
  }

  .card-list-box li:last-child {
    border-bottom: none;
  }

  .card-icon,
  .user-msg {
    float: left;
    padding-top: .2rem
  }

  .user-msg p {
    color: #4e4e4e;
    font-size: .26rem;

  }

  .user-msg .user-name {
    color: #000;
    font-size: .3rem;
  }

  .user-name span:nth-child(2) {
    float: right;
    color: #4e4e4e;
    font-size: .26rem;
  }

  .card-icon img {
    width: 1.8rem;
    height: 1.08rem;
    border-radius: 0.1rem;
    display: inline-block
  }

  .user-compony span:nth-child(2) {
    float: right;
    display: inline-block;
    width: 1.5rem;
    text-align: right;
    padding-top: .5rem;
    position: relative;
    top: -.5rem;
  }

  .user-compony span:nth-child(1) {
    display: inline-block;
    width: 3.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-name,
  .user-job {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }


  .user-msg {
    width: 5.7rem;
    padding-left: 0.2rem;
    line-height: 0.38rem;
    padding-right: .4rem;
  }

  .no-msg {
    width: 100%;
    font-size: .3rem;
    text-align: center;
    padding-top: 1rem
  }

  .no-msg p {
    color: #707070
  }

  .no-msg img {
    width: 3rem
  }

  /* 弹出框  */

  .delWarp {
    position: absolute;
    top: 0;
    left: 0;
    width: 7.5rem;
    height: 15rem;
    background-color: rgba(0, 0, 0, 0);
    z-index: 10;
    overflow: hidden;
    display: none
  }

  .handerBox {
    width: 100%;
    position: fixed;
    bottom: -5rem;
    left: 0;
    min-height: 4rem;
    background-color: #fff;
    border-radius: .2rem .2rem 0 0;
    padding: .1rem 0 .1rem .2rem
  }

  .handerBox {
    font-size: .28rem
  }

  .handerBox li {
    width: 100%;
    height: .8rem;
  }

  .handerBox li:first-child {
    border-bottom: 1px solid #dcdcdc
  }

  .handerBox li img {
    float: left;
    width: .5rem;
    margin-top: .14rem
  }

  .handerBox li p {
    float: left;
    margin-left: .2rem;
    height: 100%;
    line-height: .8rem
  }

  .handerBox li .hander-text {
    width: 6.5rem;
    border-bottom: 1px solid #dcdcdc
  }

  .handerBox .hander-user-name p {
    margin-left: 0
  }

  .handerBox li .handle-down {
    float: right;
    margin-right: .2rem;
    width: .42rem;
  }

  /* 弹框动画 */

  .addHA {
    /* transition: all .3s ; */
    /* bottom:0px; */
    /* animation: AddHandel .3s linear;
    animation-fill-mode: forwards;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000; */
  }

  @keyframes AddHandel {
    from {
      bottom: -5rem
    }
    to {
      bottom: 0
    }
  }

  .hander-more {
    width: .4rem;
  }

  .delScroll {
    overflow: hidden;
  }


  .showwarp {
    display: block;
    /* animation: showwarp .3s linear;
    animation-fill-mode: forwards;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000; */
  }

  @keyframes showwarp {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, .1);
    }
  }
</style>