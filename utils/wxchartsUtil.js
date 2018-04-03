'use strict';


var wxCharts = require('wxcharts.js');

var wxchartsUtil = {};

wxchartsUtil.getCanvasSize = function () {
  return {
    width: wx.getSystemInfoSync().windowWidth / 750 * 686,
    height: wx.getSystemInfoSync().windowWidth / 750 * 326
  }
}

wxchartsUtil.drawPie = function (canvasId, options) {
  var width = options.width || wxchartsUtil.getCanvasSize().width || 320,
    height = options.height || wxchartsUtil.getCanvasSize().height || 200,
    series = options.series || [];

  return new wxCharts({
    animation: true,
    canvasId: canvasId,
    type: 'pie',
    series: series,
    width: width,
    height: height,
    dataLabel: true,
  });
};

wxchartsUtil.drawLine = function (canvasId, options) {
  var width = options.width || wxchartsUtil.getCanvasSize().width || 320,
    height = options.height || wxchartsUtil.getCanvasSize().height || 200,
    series = options.series || [];

  return new wxCharts({
    canvasId: canvasId,
    type: 'line',
    categories: options.categories || [],
    animation: true,
    series: series,
    xAxis: {
      disableGrid: true
    },
    yAxis: {
      title: '',
      format: function (val) {
        return val.toFixed(2);
      },
      min: 0
    },
    width: width,
    height: height,
    dataLabel: false,
    dataPointShape: false,
    enableScroll: true
  });
};

wxchartsUtil.drawColumn = function (canvasId, options) {
  var width = options.width || wxchartsUtil.getCanvasSize().width || 320,
    height = options.height || wxchartsUtil.getCanvasSize().height || 200,
    series = options.series || [];

  if (series.length === 0 || (options.categories || []).length === 0) {
    wxchartsUtil.drawCenterText(canvasId, { text: "no data to display!" });
    return;
  }

  return new wxCharts({
    canvasId: canvasId,
    type: 'column',
    animation: true,
    categories: options.categories || [],
    series: series,
    yAxis: {
      title: '',
      min: 0
    },
    xAxis: {
      disableGrid: false,
      type: 'calibration'
    },
    extra: {
      column: {
        width: 15
      }
    },
    enableScroll: true,
    width: width,
    height: height,
  });
};

/**
 * 更新图 options支持 categories series title subtitle
 */
wxchartsUtil.updateChart = function (chart, options) {
  if (chart) {
    chart.updateData(options);
  }
}



module.exports = wxchartsUtil;