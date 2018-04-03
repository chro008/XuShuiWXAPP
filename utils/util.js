'use strict';

var Util = {},
  app = getApp();


var host = "https://www.easytake.top/wxapp/xushui";


/**
 * 发送网络请求的方法
 * url：地址；params：参数
 */
Util.requestJson = function (url, params, callback) {
  var app = getApp();
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'cache-control': 'no-cache',
      'x-request-timestamp': new Date().getTime(),
      "apptoken": app.getAppToken(),
      "appversion": app.getAppVersion(),
      "clientflag": app.getClientflag(),
      "openid": app.getOpenId()
    },
    method: "POST",
    dataType: "json",
    success: function (res) {
      var data = res.data,
        status = data.status;

      if (status && status.code === UNLOGIN) {
        Util.loading(false);
        Util.invalidLoginInfo();
      } else {
        if (callback) {
          callback(data.data, status);
        }
      }
    },
    fail: function (res) {
      Util.loading(false);
      console.log("request fail:", res);
    }
  });
};

//登录信息失效的callback
Util.invalidLoginInfo = function () {
  Util.showMessage({
    title: "登录信息失效", icon: "none", success: function () {
      Util.removeCacheAndJumpToLogin();
    }
  });
};

//删掉本地的token缓存 并且跳转到登录页面
Util.removeCacheAndJumpToLogin = function () {
  Util.removeLocalCache("appInfo", function () {
    wx.reLaunch({
      url: '/pages/login/login',
    });
  });
};

/**
 * 展示/隐藏 loading的方法
 * flag true代表展示，false代表隐藏
 * msg 代表loading时展示的信息
 */
Util.loading = function (flag, msg) {
  wx.hideToast();
  if (flag) {
    var obj = {
      title: msg || "",
      mask: true
    }
    wx.showLoading(obj);
  } else {
    wx.hideLoading();
  }
};

/**
 * 弹出提示信息 obj 是对应接口参数对象 这里只多做了一步隐藏loading
 */
Util.showMessage = function (obj) {
  wx.hideLoading();
  wx.showToast(obj);
}

/**
 * 获取本地缓存，key是缓存的名称，callback是获取成功后的callback
 */
Util.getLocalCache = function (key, callback) {

  wx.getStorage({
    key: key,
    success: function (res) {
      callback(res.data);
    },
    fail: function (res) {
      callback(null);
    }
  });
};

/**
 * 同步获取本地缓存
 */
Util.getLocalCacheSync = function (key, callback) {
  var value = wx.getStorageSync(key);
  if (value) {
    callback(value);
  } else {
    callback(null);
  }
}


/**
 * 设置本地缓存，key是要设置的缓存的名称，val是对应的值，callback是设置成功后的callback
 */
Util.setLocalCache = function (key, val, callback) {
  wx.setStorage({
    key: key,
    data: val,
    success: function (res) {
      if (callback) {
        callback(res);
      }
    }
  });
};

/**
 * 清除本地缓存，key代表清除缓存的名称，callback代表清除成功后的callback
 */
Util.removeLocalCache = function (key, callback) {
  wx.removeStorage({
    key: key,
    success: function (res) {
      if (callback) {
        callback(res);
      }
    },
    fail: function (res) {
      if (callback) {
        callback(res);
      }
    }
  });
};

Util.addDays = function (date, days) {
  var temp = new Date(date);
  temp.setDate(date.getDate() + days)
  return temp;
};

Util.getFormat = function (date) {
  var year = date.getFullYear(),
    month = date.getMonth() + 1,
    date = date.getDate();
  return year + "-" + (month < 10 ? "0" : "") + month + "-" + (date < 10 ? "0" : "") + date;
}

Util.getFormatWithoutYear = function (date) {
  var year = date.getFullYear(),
    month = date.getMonth() + 1,
    date = date.getDate();
  return (month < 10 ? "0" : "") + month + "-" + (date < 10 ? "0" : "") + date;
}


module.exports = Util;