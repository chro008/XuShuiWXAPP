// pages/my/my.js
var Util = require('../../utils/util.js'),
  owcode = require('../../utils/ow_code.js');
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

  onTabItemTap: function () {
    owcode.countEvent("mine", "time=" + (new Date()).getTime() + "&login=ok");
  },

  /**
   * 注销的点击事件
   */
  logOut: function () {
    Util.loading(true, "注销中");
    Util.requestJson(Util.logoutUrl, {}, function (data, status) {
      Util.loading(false);
      Util.removeCacheAndJumpToLogin();
    });
  }

});