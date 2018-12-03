<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function(){
    return{
      ystID:'',
      time:'',
      osVersion:'',
      pubVersion:'',
      platform:'',
      sapID:'',
      orgID:'',
      pathID:'',
      deviceID:'',
      orgName:'',
      pathName:'',
      name:''
    }
  },
  created:function(){
    //获取传入参数data、token
    var logData = {
      data:this.$route.query.data,
      token:this.$route.query.token
    };
    //getCoreMsg、errHandler
    //this.login(this.getCoreMsg,this.errHandler,logData);
  },
  methods:{
    //handler、errHandler
    login:function(handler,errHandler,logData){
      this.ystID = '';
      this.time = '';
      this.osVersion = '';
      this.pubVersion = '';
      this.platform = '';
      this.sapID = '';
      this.orgID = '';
      this.pathID = '';
      this.deviceID = '';
      this.orgName = '';
      this.pathName = '';
      this.name = '';

      window.localStorage.setItem('ystID','');
      window.localStorage.setItem('time','');
      window.localStorage.setItem('osVersion','');
      window.localStorage.setItem('pubVersion','');
      window.localStorage.setItem('platform','');
      window.localStorage.setItem('sapID','');
      window.localStorage.setItem('orgID','');
      window.localStorage.setItem('pathID','');
      window.localStorage.setItem('deviceID','');
      window.localStorage.setItem('orgName','');
      window.localStorage.setItem('pathName','');
      window.localStorage.setItem('name','');

      this.$axios.post('/login.do',logData)
      .then(function(response){
          handler(response.data);
      })
      .catch(function(error){
        errHandler(error);
      });
    },
      errHandler: function (error) {
                this.$message({
                    message: "服务器访问异常:" + error,
                    type: 'error'
                });
            }
        },
  }
</script>

<style>
#app {
  font-family:  "Arial","Microsoft YaHei";
}
</style>
