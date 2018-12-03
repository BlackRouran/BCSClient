<template>
  <div>
    <div class="inline-box-top">
      <div class="row1 cf">
        <img src="../../static/images/per_icon1.png" height="30" width="33">
        <span>归属网点</span>
        <span>{{custTopMsg.point|initCom}}</span>
      </div>
      <div class="row2 cf">
        <img src="../../static/images/per_icon2.png" height="26" width="22">
        <span>客户经理</span>
        <span @click="JumpCUtDetail()" :class="{'custCHangecolor':custTopMsg.YSTID.length>0}"> <span v-if="custTopMsg.YSTID.length>0" style="float: none">{{custTopMsg.YSTID}}/</span>{{custTopMsg.custName|initCom}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'custTopMsg'
    ],
    mounted: function () {
      this.$nextTick(function () {

      })
    },
    data() {
      return {
        fg:"/"
      }
    },
    methods: {
      JumpCUtDetail:function() {
        var Id=this.custTopMsg.YSTID;
        var option = {
          version: "1",
          callback: function (param) {
            try {
              var retObj = param;
              if (retObj.retCode < 0) {
                alert("错误信息：" + retObj.retMsg);
                return;
              } else {
               
              }
            } catch (err) {
              alert("回调错误，原因[" + err.message + "]");
              return;
            }
          },
          asyncData: "",
          id: Id
        };
        if(this.custTopMsg.YSTID.length){
          MobileJS.showContactsUserInfo(option);
        }
       
      }
    }
  }

</script>
<style scoped>
  .title {
    font-size: .34rem;
    font-weight: bold;
    padding: .4rem 0;
    display: inline-block;
    width: 7.2rem;
    margin: 0 auto;
    display: block;
  }

  .inline-box-top {
    font-size: .28rem;
    width: 7.2rem;
    margin: 0 auto;
  }

  .inline-box-top .row1 {
    border-bottom: .02rem solid #ededed
  }

  .row1 img {
    width: .5rem;
    height: .42rem
  }

  .row2 img {
    width: .36rem;
    height: .42rem;
    margin-left: .08rem
  }

  .row3 img {
    width: .36rem;
    height: .42rem;
    margin-left: .08rem
  }

  .inline-box-top img,
  .inline-box-top span {
    float: left;
  }

  .inline-box-top div {
    width: 7rem;
    margin: 0 auto;
    padding: .2rem .2rem
  }

  .row1 span:nth-child(2) {
    margin-left: .28rem
  }

  .row1 span:nth-child(3) {
    padding-left: .5rem;
    float: right;
    max-width: 4.4rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .row2 span:nth-child(2) {
    margin-left: .28rem;
  }

  .row2 span:nth-child(3) {
    float: right;
    padding-left: .5rem;
    max-width: 4.4rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .row3 span:nth-child(2) {
    margin-left: .28rem
  }

  .row3 span:nth-child(3) {
    float: right;
    padding-left: 1rem
  }
  .custCHangecolor{color: #0076ff}
</style>