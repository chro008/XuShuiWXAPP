// pages/login/login.js
var Util = require('../../utils/util.js'),
  owcode = require('../../utils/ow_code.js'),
  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thisobj = this;
    Util.getLocalCacheSync("appInfo", function (data) {
      if (data && data.apptoken) {
        app.setAppToken(data.apptoken);

        Util.showMessage({ title: "跳转中..." });
        wx.switchTab({
          url: '/pages/customview/customview'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    owcode.countView(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 登陆按钮点击事件
   */
  loginSubmit: function (e) {
    var thisobj = this,
      formData = e.detail.value;
    if (this.checkValidFormData(formData)) {
      Util.loading(true, "登陆中");
      Util.requestJson(Util.loginUrl, formData, function (data, status) {
        Util.loading(false);
        if (status && status.code === Util.GetLoginSucceedCode()) {
          thisobj.loginSucceed(data);
        } else {
          Util.showMessage({ title: (status ? status.msg || "登录失败" : "登录失败"), icon: "none" });
        }
      });
    }
  },

  loginSucceed: function (data) {
    app.setAppToken(data.apptoken);
    Util.showMessage({
      title: "登陆成功", icon: "success", success: function () {
        Util.setLocalCache("appInfo", { apptoken: app.getAppToken() });
        wx.switchTab({
          url: '../customview/customview',
        });
      }
    });
  },

  /**
   * 检验表单输入合法性
   */
  checkValidFormData: function (formData) {
    if (formData.membername === '') {
      Util.showMessage({ title: "会员名不能为空", icon: "none" });
      return false;
    }
    if (formData.username === '') {
      Util.showMessage({ title: "用户名不能为空", icon: "none" });
      return false;
    }
    if (formData.password === '') {
      Util.showMessage({ title: "密码不能为空", icon: "none" });
      return false;
    }
    return true;
  }

});