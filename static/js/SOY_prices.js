d3.json("/soybean_prices",function(d){
    var myChart = echarts.init(document.getElementById('plot'));
    var date = [];
    var price = [];
    d.forEach(function(data){
        date.push(data.Date)
        price.push(data.Price)
    })
    myChart.setOption(option = {
            title: {
                text: 'Soybean Prices'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: date
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
            toolbox: {
                left: 'center',
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: [{
                startValue: '9/19/11'
            }, {
                type: 'inside'
            }],
            
            visualMap: {
                top: -6,
                right: 0,
                size:"6px",
                pieces: [{
                    gt: 0,
                    lte: 5,
                    color: '#66ccff'
                }, {
                    gt: 5,
                    lte: 8,
                    color: '#3399ff'
                }, {
                    gt: 8,
                    lte: 12,
                    color: '#0066ff'
                }, {
                    gt: 12,
                    lte: 15,
                    color: '#0000cc'
                }, {
                    gt: 15,
                    color: '#000099'
                }],
                outOfRange: {
                    color: '#660099'
                }
            },
            series: {
                name: 'Soybean Price',
                type: 'line',
                data: price,
                markLine: {
                    silent: true,
                    data: [{
                        yAxis: 5
                    }, {
                        yAxis: 8
                    }, {
                        yAxis: 12
                    }, {
                        yAxis: 15
                    }]
                },
                markPoint:{
                    data:[
                        {type:'max',name:"highest price"},
                        {type:"min",name:"lowest price"}
                    ]
                }
            }
        });
        $(window).on('resize', function(){
            if(myChart != null && myChart != undefined){
                myChart.resize();
            }
        });
})

