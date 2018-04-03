//app.js
var Util = require("utils/util.js");

App({
  onLaunch: function () {
    var thisobj = this;

    Util.getLocalCacheSync("openIdInfo", function (data) {
      if (data && data.openid) {
        thisobj.setOpenId(data.openid);
      } else {
        Util.removeLocalCache("openIdInfo");
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              Util.requestJson(Util.openidUrl, { code: res.code }, function (res) {
                if (res.openid) {
                  var obj = {};
                  obj.openid = res.openid;
                  obj.time = +new Date();
                  Util.setLocalCache("openIdInfo", obj);
                  thisobj.setOpenId(res.openid);
                } else {
                  console.log('request for openid error');
                }
              });
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      }
    });
  },
  globalData: {
    clientflag: null,
    appversion: 'wxa-1.0.0',
    openid: null
  },
  getAppVersion: function () {
    return this.globalData.appversion;
  },
  getClientflag: function () {
    return this.globalData.clientflag;
  },
  setClientflag: function (clientflag) {
    this.globalData.clientflag = clientflag;
  },
  getOpenId() {
    return this.globalData.openid;
  },
  setOpenId(openid) {
    this.globalData.openid = openid;
  }
});