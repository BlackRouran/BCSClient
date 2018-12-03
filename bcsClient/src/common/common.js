export default {
  getUrl: function(name) { //解析url
    var obj = {};
    var url_0=window.location.href;
    var url;
       if(url_0.indexOf('?')!=-1){
         url = url_0.split('?')[1].split('&');
       }else{
         console.log('url没有使用?传参');
         return false
       }   
    var nameList = [];
    url.forEach(function(item) {
      let tempArr = item.split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
      nameList.push(key);
    })
    if (nameList.indexOf(name) == -1) {
      console.log('url没传' + name);
      return 0
    } else {
      return obj[name]
    }
  },
  getCookie:function(cookie_name){   //获取cookie
    var name = cookie_name + "=";
    if(!document.cookie){
      return false;
    };
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      };
      if (c.indexOf(name) != -1) {
        return c.substring(name.length, c.length)
      };
    }
    return "";
  },
  setCookie:function(cookie_name,value,expiredays){  //设置cookie
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)  //设置cookie的过期时间
    document.cookie=cookie_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";path=/;expires="+exdate.toGMTString())
  },
  clearCookie:function(name){  //清除cookie
    this.setCookie(name, "", -1);  
  },
  goback:function(){//历史记录
     history.back();
  },
  convertName(list){
    list.isCreditCard=(list.isCreditCard=="Y") ? "是" : "否";//信用卡
    list.isLoan=(list.isLoan=="Y") ? "是" : "否";//贷款
    if(list.rskLvlCd =="A1"){//风险
      list.rskLvlCd="稳健型"
    }
    else if(list.rskLvlCd =="A2"){
      list.rskLvlCd="稳健型"
    }
    else if(list.rskLvlCd =="A3"){
      list.rskLvlCd="平衡型"
    }
    else if(list.rskLvlCd =="A4"){
      list.rskLvlCd="激进型"
    }
    else if(list.rskLvlCd =="A5"){
      list.rskLvlCd="激进型"
    }
    if(list.userInfoList.cardGrdCd=="000"){//持卡类型
      list.userInfoList.cardGrdCd="无等级";
    }else if(list.userInfoList.cardGrdCd=="010"){
      list.userInfoList.cardGrdCd="普卡";
    }else if(list.userInfoList.cardGrdCd=="020"){
      list.userInfoList.cardGrdCd="金卡";
    }else if(list.userInfoList.cardGrdCd=="040"){
      list.userInfoList.cardGrdCd="金葵花及以上";
    }else if(list.userInfoList.cardGrdCd=="060"){
      list.userInfoList.cardGrdCd="金葵花及以上";
    }else if(list.userInfoList.cardGrdCd=="080"){
      list.userInfoList.cardGrdCd="金葵花及以上";
    }
    list.userInfoList.empInd=(list.userInfoList.empInd=="Y") ? "行员" : "非行员";
    return list
  }
}
