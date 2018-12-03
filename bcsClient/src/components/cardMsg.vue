<template>
  <div>
    <div class="cardmsg-box" :class="{'editClass':!cardDetail.editFlag}">
      <div class="card-img">
        <!-- <img src="../../static/images/card.png" alt=""> -->
        <mt-swipe :auto="0">
          <mt-swipe-item>
            <img :src="'http://s3gw.cmbchina.com/LT20-00-01/'+cardId+'.jpg'" alt="card" @error="defaulterror($event,cardId)">
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="add-pic" @click="addPhoto()">
              <div class="pic-con-box">
                <div class="pic-con"></div>
                <p>添加图片</p>
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <ul class="cardform">
        <li class="card-item cf addtop ">
          <div class="borderwarp cf delborder">
            <span>姓名</span>
            <input :disabled="cardDetail.editFlag" type="text" v-model="userList.custName" placeholder="请输入姓名" @click="wakeKeyBoard($event)"
              maxlength="10" v-if="!cardDetail.editFlag">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.custName | initCom}}</p>
          </div>
        </li>
        <!-- 美化代码后 记得修改手机1 公司1 等标签结构 去空格 -->
        <li class="card-item cf addtop">
          <div class="borderwarp cf">
            <span>手机<span v-if="userList.mobile1!=undefined">1</span></span>
            <input :disabled="cardDetail.editFlag" type="text" v-model="userList.mobile" placeholder="请输入11位手机号码" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.mobile | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf" v-if="userList.mobile1!=undefined">
          <div class="borderwarp cf">
            <span>手机2</span>
            <input :disabled="cardDetail.editFlag" maxlength="11" type="text" v-model="userList.mobile1" placeholder="请输入11位手机号码" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.mobile1 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf">
          <div class="borderwarp cf" v-if="userList.mobile2!=undefined">
            <span>手机3</span>
            <input :disabled="cardDetail.editFlag" type="text" maxlength="11" v-model="userList.mobile2" placeholder="请输入11位手机号码" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.mobile2 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf delborder">
          <div class="borderwarp cf">
            <span>工作电话<span v-if="userList.tel1!=undefined">1</span></span>
            <input :disabled="cardDetail.editFlag" type="text" v-model="userList.tel" placeholder="请输入电话号码" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag" maxlength="25">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.tel | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf delborder" v-if="userList.tel1!=undefined">
          <div class="borderwarp cf">
            <span>工作电话2</span>
            <input :disabled="cardDetail.editFlag" type="text" v-model="userList.tel1" placeholder="请输入电话号码" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag" maxlength="25">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.tel1 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf delborder" v-if="userList.tel2!=undefined">
          <div class="borderwarp cf">
            <span>工作电话3</span>
            <input :disabled="cardDetail.editFlag" type="text" v-model="userList.tel2" placeholder="请输入电话号码" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag" maxlength="25">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.tel2 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf ">
          <div class="borderwarp cf ">
            <span class="user-email">传真<span v-if="userList.fax1!=undefined">1</span></span>
            <input :disabled="cardDetail.editFlag" type="text" v-model="userList.fax" placeholder="请输入传真" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag" maxlength="40">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.fax | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf ">
          <div class="borderwarp cf " v-if="userList.fax1!=undefined">
            <span class="user-email">传真2</span>
            <input :disabled="cardDetail.editFlag" type="text" v-model="userList.fax1" placeholder="请输入传真" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag" maxlength="40">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.fax1 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf ">
          <div class="borderwarp cf " v-if="userList.fax2!=undefined">
            <span class="user-email">传真3</span>
            <input :disabled="cardDetail.editFlag" type="text" v-model="userList.fax2" placeholder="请输入传真" @click="wakeKeyBoard($event)"
              v-if="!cardDetail.editFlag" maxlength="40">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.fax2 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf addtop ">
          <div class="borderwarp cf delborder">
            <span class="user-email">邮箱</span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.email" placeholder="请输入邮箱地址"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.email | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf addtop company">
          <div class="borderwarp cf">
            <span>公司名称<span v-if="userList.compName2!=undefined">1</span></span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.compName1" placeholder="请输入公司名称"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.compName1 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf company" v-if="userList.compName2!=undefined">
          <div class="borderwarp cf">
            <span>公司名称2</span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.compName2" placeholder="请输入公司名称"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.compName2}}</p>
          </div>
        </li>
        <li class="card-item cf company" v-if="userList.compName3!=undefined">
          <div class="borderwarp cf">
            <span>公司名称3</span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.compName3" placeholder="请输入公司名称"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.compName3}}</p>
          </div>
        </li>
        <li class="card-item cf company" v-if="userList.compName4!=undefined">
          <div class="borderwarp cf">
            <span>公司名称4</span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.compName4" placeholder="请输入公司名称"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.compName4}}</p>
          </div>
        </li>
        <li class="card-item cf unit">
          <div class="borderwarp cf">
            <span>部门名称<span v-if="userList.unit2!=undefined">1</span></span>
            <input :disabled="cardDetail.editFlag" type="text" v-if="!cardDetail.editFlag" v-model="userList.unit1" placeholder="请输入部门名称"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.unit1 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf unit" v-if="userList.unit2!=undefined">
          <div class="borderwarp cf">
            <span class="user-job">部门名称2</span>
            <input :disabled="cardDetail.editFlag" type="text" v-if="!cardDetail.editFlag" v-model="userList.unit2" placeholder="请输入部门名称"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.unit2}}</p>
          </div>
        </li>
        <li class="card-item cf unit" v-if="userList.unit3!=undefined">
          <div class="borderwarp">
            <span class="user-job">部门名称3</span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.unit3" placeholder="请输入部门名称"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.unit3}}</p>
          </div>
        </li>
        <li class="card-item cf unit" v-if="userList.unit4!=undefined">
          <div class="borderwarp cf">
            <span class="user-job">部门名称4</span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.unit4" placeholder="请输入部门名称"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.unit4}}</p>
          </div>
        </li>

        <li class="card-item cf addtop ">
          <div class="borderwarp cf delborder">
            <span class="user-job">职务<span v-if="userList.title1!=undefined">1</span></span>
            <input :disabled="cardDetail.editFlag" type="text" v-if="!cardDetail.editFlag" v-model="userList.title" placeholder="请输入职务信息"
              @click="wakeKeyBoard($event)" maxlength="20">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.title | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf addtop " v-if="userList.title1!=undefined">
          <div class="borderwarp cf delborder">
            <span class="user-job">职务2</span>
            <input :disabled="cardDetail.editFlag" type="text" v-if="!cardDetail.editFlag" v-model="userList.title1" placeholder="请输入职务信息"
              @click="wakeKeyBoard($event)" maxlength="20">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.title1 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf addtop " v-if="userList.title2!=undefined">
          <div class="borderwarp cf delborder">
            <span class="user-job">职务3</span>
            <input :disabled="cardDetail.editFlag" type="text" v-if="!cardDetail.editFlag" v-model="userList.title2" placeholder="请输入职务信息"
              @click="wakeKeyBoard($event)" maxlength="20">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.title2 | initCom}}</p>
          </div>
        </li>
        <li class="card-item-address cf  addtop delborder">
          <div class="borderwarp cf ">
            <span class="user-address">公司地址<span v-if="userList.address1!=undefined">1</span></span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.address" placeholder="请输入公司地址"
              @click="wakeKeyBoard($event)" maxlength="100">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.address | initCom}}</p>
          </div>
        </li>
        <li class="card-item-address cf   delborder" v-if="userList.address1!=undefined">
          <div class="borderwarp cf ">
            <span class="user-address">公司地址2</span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.address1" placeholder="请输入公司地址"
              @click="wakeKeyBoard($event)" maxlength="100">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.address1 | initCom}}</p>
          </div>
        </li>
        <li class="card-item-address cf   delborder" v-if="userList.address2!=undefined">
          <div class="borderwarp cf ">
            <span class="user-address">公司地址3</span>
            <input :disabled="cardDetail.editFlag" v-if="!cardDetail.editFlag" type="text" v-model="userList.address2" placeholder="请输入公司地址"
              @click="wakeKeyBoard($event)" maxlength="100">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.address2 | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf addtop ">
          <div class="borderwarp cf delborder">
            <span class="user-email">网址</span>
            <input :disabled="cardDetail.editFlag" type="text" v-if="!cardDetail.editFlag" v-model="userList.url" placeholder="请输入网址信息"
              @click="wakeKeyBoard($event)" maxlength="50">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.url | initCom}}</p>
          </div>
        </li>
        <li class="card-item cf addtop ">
          <div class="borderwarp cf delborder">
            <span class="user-job">备注</span>
            <input :disabled="cardDetail.editFlag" type="text" v-if="!cardDetail.editFlag" v-model="userList.ocrRemark" placeholder="场景记录，如:张三+培训会议"
              @click="wakeKeyBoard($event)" maxlength="100">
            <p v-if="cardDetail.editFlag" class="replaceMsg">{{userList.ocrRemark | initCom}}</p>
          </div>
        </li>
        <li class="submit-data addtop delborder">
          <div class="borderwarp">
            <div class="cf">
              <img src="../../static/images/rili.png" alt="">
              <p>{{userList.ocrTime}}</p>
            </div>
            <div class="cf">
              <img src="../../static/images/point.png" alt="">
              <p>{{userList.ocrLocation}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-btn-box" v-show="cardDetail.editFlag">
      <p class="submit-btn" @click="synthroAddressList()">保存到通讯录</p>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from "mint-ui";
  export default {
    props: ["cardDetail", "camera"],
    data() {
      return {
        userList: [],
        cardId: "",
        userId: "",
        errorImg: 'http://s3gw.cmbchina.com/LT20-00-01/',
        pathName:''
      };
    },
    mounted: function () {
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
              window.sessionStorage.setItem("userId", _this.userId);
            }
          } catch (err) {
            alert("回调错误，原因[" + err.message + "]");
            return;
          }
        }
      };
      MobileJS.getUserInfo(getUseroption);
      this.$nextTick(function () {
        if (this.camera.is_camera == 1) {
          //从摄像头跳转的要保存名片信息     
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
                  _this.pathName=retObj.data.pathName;
                  window.sessionStorage.setItem("userId", _this.userId);
                  _this.savecardmsg();
                }
              } catch (err) {
                alert("回调错误，原因[" + err.message + "]");
                return;
              }
            }
          };
          MobileJS.getUserInfo(getUseroption);
        } else if (this.camera.is_camera == 0) {
          //从列表跳转 直接加载信息
          this.cardId = window.sessionStorage.getItem("cardId");
          this.loadcardmsg();
        }
      });
    },
    methods: {
      changeAreaH: function () {
        var h = $(".text-div").height();
        $(".textarea,.textarea-box").css({
          height: h + "px",
          "min-height": ".4rem"
        });
      },
      synthroAddressList: function () {
        //同步到通讯录
        var option = {
          version: "1",
          callback: "SaveContactCallBack",
          asyncData: "",
          name: "",
          company: "",
          position: "",
          email: "",
          mobile: "",
          tel: ""
        };
        option.name = this.userList.custName;
        option.company = this.userList.compName1;
        option.tel = this.userList.tel;
        option.mobile = this.userList.mobile;
        option.position = this.userList.title;
        option.email = this.userList.email;
        MobileJS.saveContact(option);
        function SaveContactCallBack(option) {
          var retObj = option;
          if (retObj.retCode < 0) {
            alert("错误信息：" + retObj.retMsg);
            return;
          } else {
            return;
          }
        }
      },
      loadcardmsg: function () {
        //获取名片信息
        //名片详情
        var cardId = this.cardId;
        var options = {
          cardId: cardId
        };
        var _this = this;
        this.$axios
          .post("/getCardInfoById.do", options)
          .then(function (response) {
            _this.userList = response.data.cardInfoList;
            var setUserList = JSON.stringify(_this.userList);
            window.localStorage.setItem("userList", setUserList);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      savecardmsg: function () {
        var base = new Base64();
        //保存名片信息
        var _this = this;
        var cardId = this.common.getUrl("taskID"),
          ocrTime = this.common.getUrl("ocrTime"),
          ocrLocation = this.common.getUrl("ocrLocation"),
          ocrRemark = this.common.getUrl("ocrRemark"),
          ocrData = this.common.getUrl("ocrData"),
          token = this.common.getUrl("token"),
          data = this.common.getUrl("data"),
          userId = this.userId,
          pathName = _this.pathName,
          source = this.common.getUrl("source");
        _this.cardId = cardId;
        window.sessionStorage.setItem("cardId", cardId);
          ocrTime = decodeURIComponent(ocrTime);
          ocrLocation = decodeURIComponent(ocrLocation);
          ocrRemark = decodeURIComponent(ocrRemark);
          ocrData = base.encode(decodeURIComponent(ocrData));//先解码 后用base加密
        var options = {
          cardId: cardId,
          ocrTime: ocrTime,
          ocrLocation: ocrLocation,
          ocrRemark: ocrRemark,
          ocrData: ocrData,
          token: token,
          data: data,
          source: source,
          userId: userId,
          pathName: pathName
        };
        this.$axios
          .post("/saveCard.do", options)
          .then(function (response) {
            if (response.data.resCode == 11) {//无权限
              MessageBox({
                title: "温馨提示",
                message: "您暂无权限使用该应用!",
                closeOnClickModal:false
              }).then(action => {
                _this.QuitSys();
              });
            }
            else if (response.data.resCode == 10) {//验签失败
              MessageBox({
                title: "温馨提示",
                message: "验签失败,请重新登录!"
              }).then(action => {
                _this.QuitSys();
              });
            }
            else if (response.data.resCode == 12) {//保存信息失败
              MessageBox({
                title: "温馨提示",
                message: "保存信息失败,请重新扫描!"
              }).then(action => {
                _this.backCardList();
              });
            }
            else if (response.data.resCode == 0) {//0 成功
              _this.loadcardmsg();
            }
          })
          .catch(function (error) {
            alert(response);
          });
      },
      wakeKeyBoard: function (event) {
        var target = event.currentTarget;
        setTimeout(function () {
          target.scrollIntoViewIfNeeded();
        }, 400);
      },
      testPhone() {
        var reg = /^1[0-9]{10}$/;
        if (!reg.test(this.userList.mobile)) {
          MessageBox({
            title: false,
            message: "手机号码必须为11位数字"
          });
          return false;
        }
      },
      QuitSys: function () {//退出应用
        window.sessionStorage.setItem("userId", "0");
        var option = {
          callback: "",
          asyncData: ""
        };
        MobileJS.quitSys(option);
      },
      backCardList: function () {//返回列表页
        //返回列表页    
        window.location.href =
          window.location.protocol + "//" + document.domain + "/bcsClient/index.html#/cardList?data=" +
          this.common.getUrl("data") +
          "&token=" +
          this.common.getUrl("token");
        window.localStorage.setItem("userList", "");
      },
      addPhoto: function () {
        MessageBox({
          title: false,
          message: "后续功能，敬请期待！"
        });
      },
      defaulterror:function(e,id){
        if(e.currentTarget.src.indexOf('png')!=-1){
          e.currentTarget.src=require('../../static/images/card.png');
          return false
        }
        e.currentTarget.src='http://s3gw.cmbchina.com/LT20-00-01/'+id+'.png';
      }
    }
  };
</script>
<style scoped>
  .cardmsg-box {
    position: fixed;
    top: 1.88rem;
    left: 0;
    height: 100%;
    overflow: scroll;
    padding-bottom: 1rem;
    -webkit-overflow-scrolling: touch;
    background-color: #eaeaea
  }

  .card-img {
    width: 7.5rem;
    min-height: 4.28rem;
    font-size: 0.1rem;
    z-index: 2;
    height: 4.28rem;
  }

  .card-img img {
    width: 100%;
  }

  .cardform {
    width: 7.5rem;
    font-size: 0.3rem;
    padding-bottom: 2.34rem;
  }

  .cardform li {
    width: 100%;
    background-color: #fff
  }

  .cardform li input,
  textarea {
    float: right;
    width: 4.6rem;
    outline: none;
    text-align: left;
    border: none;
    background-color: #fff;
    font-size: 0.28rem;
    color: #000
  }

  .replaceMsg {
    float: right;
    width: 4.6rem;
    font-size: .28rem;
    word-break: break-all;
  }

  .cardform li textarea {
    word-break: break-all;
  }

  .card-item-address {
    position: relative;
    z-index: 2;
  }

  .textalign {
    /* text-align: left; */
  }

  .textarea {
    text-align: left;
    font-size: 0.28rem;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .text-div {
    position: absolute;
    top: 0rem;
    left: 0;
    opacity: 0;
    z-index: -1;
    width: 5rem;
    font-size: 0.28rem;
  }

  .cardform .submit-data {
    border-bottom: none;
    font-size: 0.26rem;
    line-height: 0.4rem;
    padding-top: .15rem;
  }

  .submit-btn {
    width: 2.6rem;
    height: 0.6rem;
    background-color: #0092ff;
    font-size: 0.26rem;
    text-align: center;
    line-height: 0.6rem;
    color: #fff;
    margin: 0 auto;
    margin-top: 0.4rem;
    border-radius: 0.12rem;
  }

  .editClass {
    position: absolute;
    top: 0.88rem;
  }

  .submit-data div img {
    float: left;
    width: .4rem;
  }

  .submit-data div p {
    float: left;
    padding-left: .2rem;
    color: rgba(0, 0, 0, 0.8);
    width: 6rem;
  }

  .addtop {
    margin-top: .1rem
  }

  .submit-btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 7.5rem;
    height: 1.4rem;
    background-color: #fff;
    z-index: 10
  }

  .delborder {
    border-bottom: none !important
  }

  .company:last-child {
    border: none
  }

  .borderwarp {
    border-bottom: 1px solid #ededed;
    height: 100%;
    padding: .14rem .15rem;
    width: 7rem;
    margin: 0 auto
  }

  .user-photo {
    width: 4.6rem;
    float: right;
    height: .8rem;
  }

  .add-pic {
    width: 100%;
    height: 100%;
    background-color: #fff
  }

  .pic-con-box {
    height: 2rem;
    width: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -1rem;
    margin-top: -1rem;
    text-align: center;
    color: #515151;
    font-size: .26rem
  }

  .pic-con {
    width: 1rem;
    height: 1rem;
    border: 1px dashed #ccc;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    background: url("../../static/images/addicon.png") no-repeat;
    background-size: 100%;
    margin-bottom: .15rem
  }
</style>