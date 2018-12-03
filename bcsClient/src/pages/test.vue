    <template>
  <div>
    <input type="text" name="USER_AGE" id="USER_AGE"   class="input"  placeholder="请填写你的出生日期" @click="alert(1)"/>
    <!-- <div class="clear h10"></div> -->
  </div>
</template>
 
 
 <script>
export default {
  data() {
    return {
      mydate: ""
    };
  },
  mounted: function() {
    var currYear = new Date().getFullYear();
    var opt = {};
    opt.date = { preset: "date" };
    opt.datetime = { preset: "datetime" };
    opt.time = { preset: "time" };
    opt.default = {
      theme: "android-ics light", //皮肤样式
      display: "modal", //显示方式
      mode: "scroller", //日期选择模式
      dateFormat: "yyyy-mm-dd",
      showNow: true,
      nowText: "今天",
      startYear: currYear - 50, //开始年份
      endYear: currYear + 10 //结束年份
    };

    $("#USER_AGE").mobiscroll($.extend(opt["date"], opt["default"]));
  },
  methods: {

  },
  watch: {
    mydate(val, oldval) {
      console.log(val)
    }
  }
};
</script>

<style>
#USER_AGE {
  font-size: 0.2rem;
}
</style>
