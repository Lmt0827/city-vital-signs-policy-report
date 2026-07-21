(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var palette = [accent, accent2, '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

  // ===== Chart: Domestic Policy Type Distribution =====
  var chartDomesticType = echarts.init(document.getElementById('chart-domestic-type'), null, { renderer: 'svg' });
  chartDomesticType.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: { bottom: 0, textStyle: { color: muted } },
    color: palette,
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 8, borderColor: bg2, borderWidth: 2 },
      label: { show: true, color: ink, formatter: '{b}\n{d}%' },
      data: [
        { value: 4, name: '国家标准' },
        { value: 3, name: '住建部政策' },
        { value: 3, name: '地方标准/政策' },
        { value: 2, name: '技术文件/团体标准' }
      ]
    }]
  });
  window.addEventListener('resize', function() { chartDomesticType.resize(); });

  // ===== Chart: Domestic Policy Trend =====
  var chartDomesticTrend = echarts.init(document.getElementById('chart-domestic-trend'), null, { renderer: 'svg' });
  chartDomesticTrend.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: 50, right: 30, top: 40, bottom: 40 },
    xAxis: {
      type: 'category',
      data: ['7月1日', '7月6日', '7月9日', '7月10日', '7月15日', '7月16日', '7月17日', '7月20日', '7月21日'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, rotate: 30 }
    },
    yAxis: {
      type: 'value',
      name: '发布数量',
      nameTextStyle: { color: muted },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    series: [{
      type: 'line',
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      smooth: true,
      symbol: 'circle',
      symbolSize: 10,
      lineStyle: { width: 3, color: accent },
      itemStyle: { color: accent, borderColor: bg2, borderWidth: 2 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: accent + '40' },
            { offset: 1, color: accent + '05' }
          ]
        }
      }
    }]
  });
  window.addEventListener('resize', function() { chartDomesticTrend.resize(); });

  // ===== Chart: Domestic Keyword Cloud (using bar as proxy) =====
  var chartDomesticKeyword = echarts.init(document.getElementById('chart-domestic-keyword'), null, { renderer: 'svg' });
  var keywordData = [
    { name: '城市体检', value: 95 },
    { name: '城市生命线', value: 88 },
    { name: '监测预警', value: 82 },
    { name: '物联网', value: 78 },
    { name: '数字孪生', value: 75 },
    { name: 'AI识别', value: 72 },
    { name: '一网统管', value: 70 },
    { name: '感知体系', value: 68 },
    { name: '内涝预警', value: 65 },
    { name: '燃气安全', value: 62 },
    { name: '适老化', value: 58 },
    { name: 'CIM平台', value: 55 },
    { name: '数据互通', value: 52 },
    { name: '海绵城市', value: 48 },
    { name: '智慧灯杆', value: 45 }
  ];
  chartDomesticKeyword.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, formatter: '{b}: 热度 {c}' },
    grid: { left: 100, right: 40, top: 20, bottom: 20 },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'category',
      data: keywordData.map(function(d) { return d.name; }).reverse(),
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontWeight: 600 },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: keywordData.map(function(d) { return d.value; }).reverse(),
      barWidth: 16,
      itemStyle: {
        borderRadius: [0, 8, 8, 0],
        color: function(params) {
          var colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#06b6d4', '#2563eb', '#8b5cf6'];
          var idx = Math.floor(params.dataIndex / 3) % colors.length;
          return colors[idx];
        }
      },
      label: { show: true, position: 'right', color: muted, fontSize: 12 }
    }]
  });
  window.addEventListener('resize', function() { chartDomesticKeyword.resize(); });

  // ===== Chart: Domestic Heatmap =====
  var chartDomesticHeatmap = echarts.init(document.getElementById('chart-domestic-heatmap'), null, { renderer: 'svg' });
  var heatmapCategories = ['交通监测', '环境监测', '公共安全', '市政设施', '建筑安全', '能源监测', '水务管理'];
  var heatmapYears = ['2024年', '2025年', '2026年7月'];
  var heatmapData = [
    [0, 0, 65], [1, 0, 70], [2, 0, 85],
    [0, 1, 55], [1, 1, 60], [2, 1, 78],
    [0, 2, 75], [1, 2, 82], [2, 2, 92],
    [0, 3, 80], [1, 3, 85], [2, 3, 95],
    [0, 4, 50], [1, 4, 55], [2, 4, 72],
    [0, 5, 45], [1, 5, 52], [2, 5, 68],
    [0, 6, 70], [1, 6, 75], [2, 6, 88]
  ];
  chartDomesticHeatmap.setOption({
    animation: false,
    tooltip: {
      position: 'top',
      appendToBody: true,
      formatter: function(p) {
        return heatmapYears[p.value[0]] + ' ' + heatmapCategories[p.value[1]] + '<br/>热度: ' + p.value[2];
      }
    },
    grid: { left: 100, right: 60, top: 30, bottom: 60 },
    xAxis: {
      type: 'category',
      data: heatmapYears,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontWeight: 600 },
      splitArea: { show: false }
    },
    yAxis: {
      type: 'category',
      data: heatmapCategories,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink },
      splitArea: { show: false }
    },
    visualMap: {
      min: 40, max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: {
        color: ['#e0f2fe', '#7dd3fc', '#0ea5e9', '#0369a1']
      },
      textStyle: { color: muted }
    },
    series: [{
      type: 'heatmap',
      data: heatmapData,
      label: { show: true, color: ink, fontWeight: 600 },
      itemStyle: { borderColor: bg2, borderWidth: 2, borderRadius: 4 }
    }]
  });
  window.addEventListener('resize', function() { chartDomesticHeatmap.resize(); });

  // ===== Chart: Intl Region Distribution =====
  var chartIntlRegion = echarts.init(document.getElementById('chart-intl-region'), null, { renderer: 'svg' });
  chartIntlRegion.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: { bottom: 0, textStyle: { color: muted } },
    color: ['#2563eb', '#0d9488', '#f59e0b', '#ef4444', '#8b5cf6'],
    series: [{
      type: 'pie',
      radius: ['35%', '65%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 8, borderColor: bg2, borderWidth: 2 },
      label: { show: true, color: ink, formatter: '{b}\n{d}%' },
      data: [
        { value: 1, name: '欧盟法规' },
        { value: 1, name: '英国政策' },
        { value: 1, name: '美国政策' },
        { value: 1, name: '日本政策' },
        { value: 2, name: '联合国/新加坡/其他' }
      ]
    }]
  });
  window.addEventListener('resize', function() { chartIntlRegion.resize(); });

  // ===== Chart: Intl Dimension Radar =====
  var chartIntlDimension = echarts.init(document.getElementById('chart-intl-dimension'), null, { renderer: 'svg' });
  chartIntlDimension.setOption({
    animation: false,
    tooltip: { appendToBody: true },
    legend: { bottom: 0, data: ['欧盟', '联合国ITU', '美国'], textStyle: { color: muted } },
    radar: {
      indicator: [
        { name: '可持续性', max: 100 },
        { name: '安全性', max: 100 },
        { name: '可达性', max: 100 },
        { name: '数字人权', max: 100 },
        { name: '韧性', max: 100 },
        { name: '经济', max: 100 }
      ],
      shape: 'polygon',
      splitNumber: 4,
      axisName: { color: ink, fontWeight: 600 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { show: true, areaStyle: { color: ['#fff', '#f8fafc'] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        { value: [95, 90, 88, 60, 75, 70], name: '欧盟', itemStyle: { color: accent }, areaStyle: { color: accent + '30' } },
        { value: [80, 70, 75, 95, 90, 65], name: '联合国ITU', itemStyle: { color: accent2 }, areaStyle: { color: accent2 + '30' } },
        { value: [70, 85, 65, 80, 80, 90], name: '美国', itemStyle: { color: '#f59e0b' }, areaStyle: { color: '#f59e0b30' } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chartIntlDimension.resize(); });

  // ===== Chart: Compare Keywords =====
  var chartCompareKeyword = echarts.init(document.getElementById('chart-compare-keyword'), null, { renderer: 'svg' });
  chartCompareKeyword.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
    legend: { bottom: 0, data: ['国内热度', '国外热度'], textStyle: { color: muted } },
    grid: { left: 80, right: 30, top: 30, bottom: 50 },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'category',
      data: ['数字孪生', 'AI/人工智能', '物联网', '韧性城市', '可持续性', '数据互通', '隐私保护'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontWeight: 600 },
      axisTick: { show: false }
    },
    series: [
      {
        name: '国内热度',
        type: 'bar',
        data: [85, 78, 82, 70, 55, 88, 45],
        barWidth: 12,
        itemStyle: { borderRadius: [0, 6, 6, 0], color: accent },
        label: { show: true, position: 'right', color: muted, fontSize: 11, formatter: '{c}' }
      },
      {
        name: '国外热度',
        type: 'bar',
        data: [75, 85, 70, 80, 90, 65, 88],
        barWidth: 12,
        itemStyle: { borderRadius: [0, 6, 6, 0], color: accent2 },
        label: { show: true, position: 'right', color: muted, fontSize: 11, formatter: '{c}' }
      }
    ]
  });
  window.addEventListener('resize', function() { chartCompareKeyword.resize(); });

})();
