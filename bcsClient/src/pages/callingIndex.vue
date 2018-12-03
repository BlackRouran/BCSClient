<template>
  <div>
    <div class="app-hrader cf">
      <div class="back-btn cf" @click="backCardList()">
        <img src="../../static/images/back_icon.png" alt="back-btn">
        <p>返回</p>
      </div>
      <div class="appp-title">{{title}}</div>
      <div class="camera" v-if="cardDetail.editFlag&&tabindex==1" @click="editCard()" v-show="title=='名片信息'">编辑</div>
      <div class="camera" v-if="!cardDetail.editFlag&&tabindex==1" @click="update()">保存</div>
    </div>
    <div class="nav-bar-box" v-show="cardDetail.editFlag">
      <ul class="cf">
        <li class="nav-bar1" @click="choseTab(1,'名片信息')" :class="{select:tabChoseFlag==1}">
          <img src="../../static/images/card_icon.png" v-if="tabChoseFlag!=1" alt="card">
          <img src="../../static/images/card_icon_chose.png" v-if="tabChoseFlag==1" alt="cardchose">
          <p>名片信息</p>
        </li>
        <li class="nav-bar2" @click="choseTab(2,'个人信息')" :class="{select:tabChoseFlag==2}">
          <img src="../../static/images/person_icon.png" v-if="tabChoseFlag!=2" alt="person_icon">
          <img src="../../static/images/person_icon_chose.png" v-if="tabChoseFlag==2" alt="person_icon">
          <p>个人</p>
        </li>
        <li class="nav-bar3" @click="choseTab(3,'对公信息')" :class="{select:tabChoseFlag==3}">
          <img src="../../static/images/compony_icon.png" v-if="tabChoseFlag!=3" alt="compony_icon">
          <img src="../../static/images/compony_icon_chose.png" v-if="tabChoseFlag==3" alt="compony_icon">
          <p>公司</p>
        </li>
      </ul>
    </div>
    <div  class="componentsWarp">
      <cardmsg v-if="tabindex==1" v-bind:cardDetail="cardDetail" v-bind:camera="camera" ref="cardmessage"></cardmsg>
      <person v-if="tabindex==2" v-bind:cardDetail="cardDetail"></person>
      <compony v-if="tabindex==3" v-bind:cardDetail="cardDetail"></compony>
    </div>
  </div>
</template>
<script>
  import cardmsg from "../components/cardMsg.vue";
  import compony from "../components/compony.vue";
  import person from "../components/person.vue";
  import { MessageBox } from "mint-ui";
  export default {
    components: {
      cardmsg,
      compony,
      person
    },
    data() {
      return {
        tabindex: 0,
        tabChoseFlag: 1,
        title: "名片信息",
        cardDetail: {
          cardId: 0,
          source: 0,
          custName: 0,
          compName: 0,
          tel: 0,
          editFlag: true
        },
        camera: {
          is_camera: 0
        },
        phoneReg: /^1[0-9]{10}$/,
        oldComPutedName: "",
      };
    },
    mounted: function () {
      this.tabindex = 1;
      var base = new Base64(); 
      this.$nextTick(function () {
        var params = this.$route.params;       
        if (params.source) {
          //如果source存在 证明是从list列表页跳过来的
          this.cardDetail.cardId = params.cardId;
          this.cardDetail.source = params.source; //从list页面去source 1 cardmsg直接加载
          this.cardDetail.custName = params.custName;
          this.cardDetail.compName = params.compName;
          this.cardDetail.tel = params.tel;
          this.camera.is_camera = 0; //0 从列表页跳转
        } else {
          this.camera.is_camera = 1; //1从相机跳转  从url 里面获取后续参数      
          var UrlcardDetail = JSON.parse(
            decodeURIComponent(this.common.getUrl("ocrData"))
          );        
          this.cardDetail.cardId = this.common.getUrl("taskID");
          this.cardDetail.custName = UrlcardDetail.formatted_name[0].item;
          this.cardDetail.compName = UrlcardDetail.organization[0].item.name;
          this.cardDetail.tel = UrlcardDetail.telephone[0].item.number;
        }
      });
    },
    methods: {
      choseTab: function (index, title) {
        this.tabindex = index;
        this.tabChoseFlag = index;
        this.title = title;
        this.camera.is_camera = 0;
      },
      backCardList: function () {
        //返回列表页    
        window.location.href =
          window.location.protocol + "//" + document.domain + "/bcsClient/index.html#/cardList?data=" +
          this.common.getUrl("data") +
          "&token=" +
          this.common.getUrl("token");
        window.localStorage.setItem("userList", "");
      },
      editCard: function () {
        this.title = "名片编辑";
        this.cardDetail.editFlag = false;

      },
      update: function () {
        var base = new Base64();
        var userList = base.encode(JSON.stringify(this.$refs.cardmessage.userList));
        var _this = this;
        var options = {
          cardList: userList
        };
        if (this.$refs.cardmessage.userList.custName.length == 0) {
          MessageBox({
            title: "温馨提示",
            message: "客户姓名不能为空"
          });
          return false;
        }
        if (!this.$refs.cardmessage.userList.mobile) {
          MessageBox({
            title: "温馨提示",
            message: "手机号码不能为空"
          });
          return false;
        }

        if (!this.phoneReg.test(this.$refs.cardmessage.userList.mobile)) {
          MessageBox({
            title: "温馨提示",
            message: "手机号码必须为11位数字"
          });
          return false;
        }
        if (this.$refs.cardmessage.userList.compName1.length == 0) {
          MessageBox({
            title: "温馨提示",
            message: "公司姓名1不能为空"
          });
          return false;
        }
        MessageBox({
          showCancelButton: true,
          title: "温馨提示",
          message: "确认提交"
        }).then(action => {
          if (action == "confirm") {
            this.$axios
              .post("/updateCardInfo.do", options)
              .then(function (response) {
                if (response.data.resCode == 1) {
                  _this.cardDetail.editFlag = true;
                  _this.title = "名片信息";
                  window.localStorage.setItem("userList", base.decode(userList));
                }
              })
              .catch(function (error) {
                alert("服務器繁忙！");
              });
          }
        });
      },
      slideLeft: function () {
        this.tabindex += 1;
        this.tabindex=(this.tabindex>=3) ? 3 : this.tabindex;      
        if (this.tabindex == 1) {
          this.choseTab(1,'名片信息');
        } else if (this.tabindex == 2) {
          this.choseTab(2, '个人信息');
        } else if (this.tabindex == 3) {
          this.choseTab(3, '对公信息');
        }
      },
      slideRight:function () {
        this.tabindex =  this.tabindex-1;
        this.tabindex=(this.tabindex<1) ?1 : this.tabindex;
        if (this.tabindex == 1) {
          this.choseTab(1,'名片信息');
        } else if (this.tabindex == 2) {
          this.choseTab(2, '个人信息');
        } else if (this.tabindex == 3) {
          this.choseTab(3, '对公信息');
        }
      }
    }
  };
</script>
<style scoped>
  .app-hrader {
    width: 7.5rem;
    height: 0.88rem;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 0.3rem;
    padding: 0 0.15rem;
    z-index: 3;
    background-color: #fff;
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
    line-height: 0.88rem;
    color: #197dff;
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

  .nav-bar-box {
    width: 7.5rem;
    position: fixed;
    top: 0.88rem;
    left: 0;
    background-color: #fafafa;
    padding-bottom: 0.12rem;
  }

  .nav-bar-box ul {
    width: 6rem;
    margin: 0 auto;
    font-size: 0.22rem;
    text-align: center;
    color: #8a8a8a;
  }

  .nav-bar-box ul li {
    width: 2rem;
    float: left;
    text-align: center;
  }

  .nav-bar-box ul li img {
    width: 0.6rem;
  }

  .select {
    color: #0076ff;
  }

  .componentsWarp{width: 7.5rem;min-height: 10rem;}
</style>