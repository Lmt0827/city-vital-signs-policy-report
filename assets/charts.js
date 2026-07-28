(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#2b6cb0';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#38a169';
  var accent3 = style.getPropertyValue('--accent3').trim() || '#dd6b20';
  var accent4 = style.getPropertyValue('--accent4').trim() || '#805ad5';
  var ink = style.getPropertyValue('--ink').trim() || '#1a202c';
  var muted = style.getPropertyValue('--muted').trim() || '#718096';
  var rule = style.getPropertyValue('--rule').trim() || '#e2e8f0';
  var bg2 = style.getPropertyValue('--bg2').trim() || '#ffffff';

  // --- Chart 1: Keyword Frequency ---
  var chart1 = echarts.init(document.getElementById('chart-keyword-freq'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { color: muted }, splitLine: { lineStyle: { color: rule } } },
    yAxis: {
      type: 'category',
      data: ['无障碍环境', '城市孪生', '韧性城市', '数据共享', 'AI赋能', 'CIM/BIM', '城市更新', '一网统管', '城市生命线', '数字化转型', '城市体检'],
      axisLabel: { color: ink, fontWeight: 600 },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 4, itemStyle: { color: accent4 } },
        { value: 5, itemStyle: { color: accent4 } },
        { value: 6, itemStyle: { color: accent3 } },
        { value: 7, itemStyle: { color: accent3 } },
        { value: 8, itemStyle: { color: accent2 } },
        { value: 8, itemStyle: { color: accent2 } },
        { value: 10, itemStyle: { color: accent } },
        { value: 10, itemStyle: { color: accent } },
        { value: 12, itemStyle: { color: accent } },
        { value: 14, itemStyle: { color: '#1a365d' } },
        { value: 18, itemStyle: { color: '#1a365d' } }
      ],
      barWidth: '60%',
      label: { show: true, position: 'right', color: ink, fontWeight: 600 }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart 2: Domestic Policy Trend ---
  var chart2 = echarts.init(document.getElementById('chart-trend-domestic'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['2025年及以前', '2026年7月'], bottom: 0, textStyle: { color: muted } },
    radar: {
      indicator: [
        { name: '指标体系完善度', max: 100 },
        { name: '技术手段先进性', max: 100 },
        { name: '闭环管理机制', max: 100 },
        { name: '公众参与程度', max: 100 },
        { name: '数据互联互通', max: 100 },
        { name: '更新联动深度', max: 100 },
        { name: '安全韧性覆盖', max: 100 },
        { name: '标准化程度', max: 100 }
      ],
      splitArea: { areaStyle: { color: ['rgba(43,108,176,0.02)', 'rgba(43,108,176,0.05)'] } },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [45, 35, 30, 25, 30, 35, 30, 40],
          name: '2025年及以前',
          itemStyle: { color: muted },
          areaStyle: { color: 'rgba(113,128,150,0.15)' }
        },
        {
          value: [85, 80, 75, 70, 78, 82, 80, 88],
          name: '2026年7月',
          itemStyle: { color: accent },
          areaStyle: { color: 'rgba(43,108,176,0.2)' }
        }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // --- Chart 3: Compare Focus ---
  var chart3 = echarts.init(document.getElementById('chart-compare-focus'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true },
    legend: { data: ['国内政策侧重', '国外政策侧重'], bottom: 0, textStyle: { color: muted } },
    grid: { left: '3%', right: '4%', bottom: '12%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['交通出行', '环境监测', '基础设施', '公共安全', '数据治理', '数字孪生', '公众参与', 'AI应用'],
      axisLabel: { color: ink, rotate: 20 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: { type: 'value', max: 100, axisLabel: { color: muted }, splitLine: { lineStyle: { color: rule } } },
    series: [
      {
        name: '国内政策侧重',
        type: 'bar',
        data: [65, 70, 95, 90, 85, 80, 75, 85],
        itemStyle: { color: accent },
        barGap: '10%'
      },
      {
        name: '国外政策侧重',
        type: 'bar',
        data: [95, 80, 60, 55, 90, 50, 45, 75],
        itemStyle: { color: accent3 }
      }
    ]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // --- Chart 4: Hotspot Distribution ---
  var chart4 = echarts.init(document.getElementById('chart-hotspot'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: { orient: 'vertical', left: 'left', textStyle: { color: muted } },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['55%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 8, borderColor: bg2, borderWidth: 3 },
      label: { show: true, formatter: '{b}\n{d}%', color: ink, fontWeight: 600 },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 'bold' }
      },
      data: [
        { value: 28, name: '城市体检与更新', itemStyle: { color: accent } },
        { value: 22, name: '数字化转型', itemStyle: { color: accent2 } },
        { value: 18, name: '城市生命线安全', itemStyle: { color: accent3 } },
        { value: 14, name: '数据标准与共享', itemStyle: { color: accent4 } },
        { value: 10, name: 'AI智能应用', itemStyle: { color: '#1a365d' } },
        { value: 8, name: '可持续出行', itemStyle: { color: '#319795' } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart4.resize(); });

  // --- Chart 5: Timeline Distribution ---
  var chart5 = echarts.init(document.getElementById('chart-timeline'), null, { renderer: 'svg' });
  chart5.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['7月1日', '7月8日', '7月9日', '7月10日', '7月14日', '7月16日', '7月17日', '7月21日', '7月22日'],
      axisLabel: { color: ink, rotate: 25 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '政策发布数量',
      nameTextStyle: { color: muted },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [
      {
        name: '国内政策',
        type: 'bar',
        stack: 'total',
        data: [2, 1, 0, 1, 1, 0, 0, 1, 1],
        itemStyle: { color: accent },
        label: { show: true, position: 'inside', color: '#fff', fontWeight: 600 }
      },
      {
        name: '国外政策',
        type: 'bar',
        stack: 'total',
        data: [0, 0, 1, 0, 0, 0, 1, 0, 0],
        itemStyle: { color: accent3 },
        label: { show: true, position: 'inside', color: '#fff', fontWeight: 600 }
      }
    ]
  });
  window.addEventListener('resize', function() { chart5.resize(); });
})();
