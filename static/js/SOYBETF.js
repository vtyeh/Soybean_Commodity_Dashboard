// create myChart and connect to DOM element.
var myChart = echarts.init(document.getElementById('main'));
// moving average legend color list
var colorList = ['black','purple','blue'];
var labelFont = 'bold 12px Sans-serif';
// create function to calculate moving average, MA = sum of daycount values / daycounts
function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data[i - j][1];
        }
        result.push((sum / dayCount).toFixed(2));
    }
    return result;
}

// retrieve data from SOYB.csv file from yahoo finance historical data
d3.json("/etf",function(data){
    var dates = [];
    var values = [];
    var volumes = [];
    data.forEach(function(d){
        dates.push(d.Date)
        values.push([+d.Open,+d.Close,+d.Low,+d.High])
        volumes.push(+d.Volume)
    })
    // get moving average values
    var dataMA5 = calculateMA(5, values);
    var dataMA10 = calculateMA(10, values);
    var dataMA20 = calculateMA(20, values);



    // create chart
    option = {
        color: colorList,
        title: {
            left: 'center',
            text: 'Soybean ETF (SOYB)'
        },
        legend: {
            top: 30,
            left:"center",
            data: ['SOYB', 'MA5', 'MA10', 'MA20']
        },
        // move the slider get the detailed information. 
        tooltip: {
            triggerOn: 'axis',
            transitionDuration: 0,
            confine: true,
            bordeRadius: 4,
            borderWidth: 1,
            borderColor: '#333',
            backgroundColor: 'rgba(255,255,255,0.9)',
            textStyle: {
                fontSize: 12,
                color: '#333'
            },
            position: function (pos, params, el, elRect, size) {
                var obj = {
                    top: 60
                };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            }
        },
        axisPointer: {
            link: [{
                xAxisIndex: [0, 1]
            }]
        },
        // added tool box on top right, can zoom in and reset the zoom
        toolbox:{
            feature:{
                dataZoom:{
                    yAxisIndex:false
                },
                brush:{
                    type:['lineX','clear']
                }
            }
        },
        dataZoom: [{
            show:true,
            type: 'slider', //slide the bar to zoom in
            xAxisIndex: [0, 1],
            realtime: false,
            start: 70, //when you open the chart, you will see zoom data from 50 to 100
            end: 100,
            top: 65,
            height: 20,
            handleSize: '120%'
        }, {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 40,
            end: 70,
            top: 30,
            height: 20
        }],
        xAxis: [{
            type: 'category',
            data: dates,
            boundaryGap : false,
            axisLine: { lineStyle: { color: '#777' } },
            // axisLabel: {
            //     formatter: function (value) {
            //         return echarts.format.formatTime('MM-dd', value);
            //     }
            // },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                show: true
            }
        }, {
            type: 'category',
            gridIndex: 1,
            data: dates,
            scale: true,
            boundaryGap : false,
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: { lineStyle: { color: '#777' } },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                type: 'shadow',
                label: {show: false},
                triggerTooltip: true,
                handle: {
                    show: true,
                    margin: 30,
                    color: '#B80C00'
                }
            }
        }],
        yAxis: [{
            scale: true,
            splitNumber: 2,
            axisLine: { lineStyle: { color: '#777' } },
            splitLine: { show: true },
            axisTick: { show: false },
            axisLabel: {
                inside: true,
                formatter: '{value}\n'
            }
        }, {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }],
        grid: [{ //for the candlestick main graph
            left: 20,
            right: 60,
            top: 110,
            height: 300
        }, { // for the volumes bar graph
            left: 20,
            right: 60,
            height: 70,
            top: 450
        }],
        graphic: [{
            type: 'group',
            left: 'center',
            top: 70,
            width: 300,
            bounding: 'raw',
            children: [{
                id: 'MA5',
                type: 'text',
                style: {fill: colorList[1], font: labelFont},
                left: 0
            }, {
                id: 'MA10',
                type: 'text',
                style: {fill: colorList[2], font: labelFont},
                left: 'center'
            }, {
                id: 'MA20',
                type: 'text',
                style: {fill: colorList[3], font: labelFont},
                right: 0
            }]
        }],
        // create volume bar chart below the main chart
        series: [{
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#7fbe9e'
                },
                emphasis: {
                    color: '#140'
                }
            },
            data: volumes
        }, { //create candle stick for soybean etf. 
            type: 'candlestick',
            name: 'SOYB',
            data: values,
            itemStyle: {
                normal: {
                    color: 'green',
                    color0: 'red',
                    borderColor: 'green',
                    borderColor0: 'red'
                },
                emphasis: { // when you select the bar it will change to black color. 
                    color: 'black',
                    color0: '#444',
                    borderColor: 'black',
                    borderColor0: '#444'
                }
            },
            // 3 balloon marker, tells highest value, lowest value, and average value on close
            markPoint: {
                label: {
                    normal: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) : '';
                        }
                    }
                },
                data: [
                    {
                        name: 'highest value',
                        type: 'max',
                        valueDim: 'highest'
                    },
                    {
                        name: 'lowest value',
                        type: 'min',
                        valueDim: 'lowest'
                    },
                    {
                        name: 'average value on close',
                        type: 'average',
                        valueDim: 'close'
                    }
                ],
                tooltip: {
                    formatter: function (param) {
                        return param.name + '<br>' + (param.data.coord || '');
                    }
                }
            },
            // shows the highest dashed line and lowest dashed line
            markLine: {
                symbol: ['none', 'none'],
                data: [
                    [
                        {
                            name: 'from lowest to highest',
                            type: 'min',
                            valueDim: 'lowest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                normal: {show: false},
                                emphasis: {show: false}
                            }
                        },
                        {
                            type: 'max',
                            valueDim: 'highest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                normal: {show: false},
                                emphasis: {show: false}
                            }
                        }
                    ],
                    {
                        name: 'min line on close',
                        type: 'min',
                        valueDim: 'close'
                    },
                    {
                        name: 'max line on close',
                        type: 'max',
                        valueDim: 'close'
                    }
                ]
            }
        }, { //create moving average lines
            name: 'MA5',
            type: 'line',
            data: dataMA5,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 1,
                    opacity:0.75
                }
            }
        }, {
            name: 'MA10',
            type: 'line',
            data: dataMA10,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 1,
                    opacity:0.75
                }
            }
        }, {
            name: 'MA20',
            type: 'line',
            data: dataMA20,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 1,
                    opacity:0.75
                }
            }
        }]
    };
myChart.setOption(option)
$(window).on('resize', function(){
    if(myChart != null && myChart != undefined){
        myChart.resize();
    }
});
})
