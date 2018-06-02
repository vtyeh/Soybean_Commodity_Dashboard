Plotly.d3.csv('../data/exp.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    var allCountryNames = unpack(rows, 'Exporter'),
        allYear = unpack(rows, 'Year'),
        allValue = unpack(rows, 'value'),
        allWeight = unpack(rows, 'weight'),
        allPercent = unpack(rows, 'percent'),
        allLoad = unpack(rows, 'loads'),
        listofYear = [], listofCountries = [], currentYear, currentCountry, currentValue = [], currentCountry = [], currentcountry = [],
        currentPercent = [], currentpercent = [], currentLoad = [], currentyear = [], currentvalue = [];
        
        for (var i = 0; i < allCountryNames.length; i++ ){
            if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
                listofCountries.push(allCountryNames[i]);
                listofCountries.sort();
            }
        }
        for (var i = 0; i < allYear.length; i++ ){
            if (listofYear.indexOf(allYear[i]) === -1 ){
                listofYear.push(allYear[i]);
            }
        }

        function getCountryData(chosenCountry) {
            currentvalue = [];
            currentyear = [];
            for (var i = 0 ; i < allCountryNames.length ; i++){
                if ( allCountryNames[i] === chosenCountry ) {
                    currentvalue.push(allValue[i]);
                    currentyear.push(allYear[i]);
                }
            }
        };

        function getYearData(chosenYear) {
            currentValue = [];
            currentCountry = [];
            currentPercent = [];
            currentcountry = [];
            currentpercent = [];
            currentper = [];
            currentcount = [];
            currenttotalper = [];
            currenttotalcount = [];


            for (var i = 0 ; i < allYear.length ; i++){
                    if ( allYear[i] === chosenYear && allWeight[i] !== '0') {
                        currentValue.push(allValue[i]);  
                        currentCountry.push(allCountryNames[i]);
                        currentpercent.push(allPercent[i]);   
                     }
                    if (allYear[i] === chosenYear && allLoad[i] !== '0'){
                        currentPercent.push(allLoad[i]); 
                        currentcountry.push(allCountryNames[i]);                      
                    }
                    if (allYear[i] === chosenYear && allLoad[i] !== '0'){
                        currenttotalper.push(allLoad[i]); 
                        currenttotalcount.push(allCountryNames[i]);                                       
                    }
                }   
        };
        setBarPlot('2012');
        setTabledata('2012');
        setBartotalPlot('2012');
        setBubblePlot('All Countries');
        
        function setBubblePlot(chosenCountry) {
            getCountryData(chosenCountry);
            var myPlot = document.getElementById('plotdiv2')
            var trace1 = {
                x: currentyear,
                y: currentvalue,
                fill: 'tozeroy',
                mode: 'lines+markers',
                marker: {
                    size: 12,
                    opacity: 0.5
                },
                line: {color: 'green'}
            };
    
            var data = [trace1];
    
            var layout = {
                title:'Soy Beans Exporters',
                height: 400,
                width: 900
            };
            Plotly.newPlot('plotdiv2', data, layout);
            myPlot.on('plotly_click', function(data){
              var pts = '';
              for(var i=0; i < data.points.length; i++){
                pts = data.points[i].x               
              }
            if (pts === 2012){setBarPlot('2012');}else if (pts === 2013){setBarPlot('2013');} else if (pts === 2014){setBarPlot('2014');} else if (pts === 2015){setBarPlot('2015');}else if (pts === 2016){setBarPlot('2016');}else if (pts === 2007){setBarPlot('2007');}else if (pts === 2008){setBarPlot('2008');}else if (pts === 2009){setBarPlot('2009');}else if (pts === 2010){setBarPlot('2010');}else if (pts === 2011){setBarPlot('2011');}
            if (pts === 2012){setTabledata('2012');}else if (pts === 2013){setTabledata('2013');} else if (pts === 2014){setTabledata('2014');} else if (pts === 2015){setTabledata('2015');}else if (pts === 2016){setTabledata('2016');}else if (pts === 2007){setTabledata('2007');}else if (pts === 2008){setTabledata('2008');}else if (pts === 2009){setTabledata('2009');}else if (pts === 2010){setTabledata('2010');}else if (pts === 2011){setTabledata('2011');}  
            if (pts === 2012){setBartotalPlot('2012');}else if (pts === 2013){setBartotalPlot('2013');} else if (pts === 2014){setBartotalPlot('2014');} else if (pts === 2015){setBartotalPlot('2015');}else if (pts === 2016){setBartotalPlot('2016');}else if (pts === 2007){setBartotalPlot('2007');}else if (pts === 2008){setBartotalPlot('2008');}else if (pts === 2009){setBartotalPlot('2009');}else if (pts === 2010){setBartotalPlot('2010');}else if (pts === 2011){setBartotalPlot('2011');}
            });
        };

    function setBarPlot(chosenYear) {
        getYearData(chosenYear);
        var myPlot = document.getElementById('plotdiv1')
        var trace1 = {
            x: currentValue,
            y: currentCountry,
            type: 'bar',
            text: currentpercent,
            textposition: 'auto',

            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
              }, {
                type: 'filter',
                target: 'x',
                operation: '>',
                value: 1
              }],
            marker:{
                color: ['rgb(180, 223, 123)','rgb(163, 223, 83)', 'rgb(180, 223, 123)','rgb(183, 215, 55)', 'rgb(179, 215, 35)']
              },
            orientation : 'h',
        };      
        var data = [trace1];

        var layout = {
            title:'Top 5 Soybeans Exporters',
            height: 400,
            width: 400
        };

        Plotly.newPlot('plotdiv1', data, layout);
        myPlot.on('plotly_click', function(data){
            var pts = '';
            for(var i=0; i < data.points.length; i++){
              pts = data.points[i].y              
            }
          if (pts === 'Argentina'){setBubblePlot('Argentina');}else if (pts === 'Brazil'){setBubblePlot('Brazil');} else if (pts === 'USA'){setBubblePlot('USA');} else if (pts === 'Paraguay'){setBubblePlot('Paraguay');}else if (pts === 'Canada'){setBubblePlot('Canada');}else if (pts === 'Netherlands'){setBubblePlot('Netherlands');}
        });
    };

    function setTabledata(chosenYear) {
        getYearData(chosenYear);

            function colorSetup(color){
              for(var i=0; i < color.length; i++){
                console.log(color[i]);
                if (color[i] > '0.30' ){
                    colours = 'green';
                    console.log(colours);
                }else{
                    colours = 'red';
                    console.log(colours);
                } 
                        fill : {colours}
      
              }
            }
        var data = [{
            type: 'table',
            columnwidth: [30,30],
            columnorder: [0,1],
            header: {
              values: ["Country","Percent"],
              align: "left",
              line: {width: 1, color: 'white'},
              fill: {color: ['rgb(86, 156, 120)']},
              font: {family: "Arial", size: 12, color: "black"},
              order: "ascending"
            },
            cells: {
              values: [currentcountry,currentPercent],
              align: ["left", "left"],
              line: {color: "white", width: 1},
              fill: colorSetup(currentPercent),
              font: {family: "Arial", size: 12, color: ["black"]},
              order: "ascending"
            }
          }]
          
          var layout = {
            title: "Fastest Growing/Declining"
          }

          Plotly.plot('plotdiv', data, layout);
        };

        function setBartotalPlot(chosenYear) {
                getYearData(chosenYear);
                var trace1 = {
                    x: currenttotalper,
                    y: currenttotalcount,
                    mode: 'lines+markers+text',
                    name: 'Lines, Markers and Text',
                    text: currenttotalper,
                    textposition: 'left',
                    type: 'scatter',
                    
                   marker:{
                        color: ['rgb(216, 134, 118)','rgb(180, 223, 123)','rgb(163, 223, 83)', 'rgb(180, 223, 123)','rgb(183, 215, 55)', 'rgb(179, 215, 35)']
                      },

                };      
                var data = [trace1];
        
                var layout = {
                    title:'Fastest Growing and Declining',
                    height: 400,
                    width: 400,
                    xaxis: {range: [-20,0,20,40,60]}
                };
        
                Plotly.newPlot('plotdiv3', data, layout);
            };
    
    /****display */
    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot1'),
        plotE = innerContainer.querySelector('.plot'),
        plotE3 = innerContainer.querySelector('.plot3'),
        plotE2 = innerContainer.querySelector('.plot2'),
        countrySelector = innerContainer.querySelector('.countrydata'),
        yearSelector = innerContainer.querySelector('.yeardata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }
    assignOptions(listofYear, yearSelector);

    function updateYear(){
        setBarPlot(yearSelector.value);
        setTabledata(yearSelector.value);
        setBartotalPlot(yearSelector.value);
    }
    assignOptions(listofCountries, countrySelector);
        
    function updateCountry(){
        setBubblePlot(countrySelector.value);
    }

    countrySelector.addEventListener('change', updateCountry, false);
    yearSelector.addEventListener('change', updateYear, false);
});
