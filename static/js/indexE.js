function exporter(){
    Plotly.d3.json('/exporters', function(err, rows){
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }
        
        var allCountryNames = unpack(rows, 'Exporter'),
            allYear = unpack(rows, 'Year'),
            allValue = unpack(rows, 'value'),
            allWeight = unpack(rows, 'weight'),
            allPercent = unpack(rows, 'percent'),
            allLoad = unpack(rows, 'load'),
            listofYear = [], listofCountries = [], currentYear, currentBarCountry, currentBarValue = [], currentBarCountry = [], currentTablecountry = [],
            currentTablePercent = [], currentpercent = [], currentLoad = [], currentAreayear = [], currentAreavalue = [], currentLinePercent = [], currentLineCountry =[];
            
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
                currentAreavalue = [];
                currentAreayear = [];
                for (var i = 0 ; i < allCountryNames.length ; i++){
                    if ( allCountryNames[i] === chosenCountry ) {
                        currentAreavalue.push(allValue[i]);
                        currentAreayear.push(allYear[i]);
                    }
                }
            };
    
            function getYearData(chosenYear) {
                currentBarValue = [];
                currentBarCountry = [];
                currentTablePercent = [];
                currentTablecountry = [];
                currentBarpercent = [];
                currentLinePercent = [];
                currentLineCountry = [];
    
    
                for (var i = 0 ; i < allYear.length ; i++){
                        if ( allYear[i] === chosenYear && allWeight[i] !== '0') {
                            currentBarValue.push(allValue[i]);  
                            currentBarCountry.push(allCountryNames[i]);
                            currentBarpercent.push(allPercent[i]);   
                         }
                        if (allYear[i] === chosenYear && allLoad[i] !== '0'){
                            currentTablePercent.push(allLoad[i]); 
                            currentTablecountry.push(allCountryNames[i]);                      
                        }
                        if (allYear[i] === chosenYear && allLoad[i] !== '0'){
                            currentLinePercent.push(allLoad[i]); 
                            currentLineCountry.push(allCountryNames[i]);                                       
                        }
                    }   
            };
            setBarPlot('2007');
            setTabledata('2017');
            setLinePlot('2007');
            setAreaPlot('All Countries');
            
            function setAreaPlot(chosenCountry) {
                getCountryData(chosenCountry);
                var myPlot = document.getElementById('plotdiv2')
                var trace1 = {
                    x: currentAreayear,
                    y: currentAreavalue,
                    fill: 'tozeroy',
                    mode: 'lines+markers',
                    marker: {
                        size: 12,
                        opacity: 0.5
                    },
                    line: {color: '#006666'}
                };
        
                var data = [trace1];
        
                var layout = {
                    title:'Soy Beans Exporters -' +chosenCountry,
                    xaxis: {range: [2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]},
                    height: 450,
                    width: 1000,
                    plot_bgcolor:"#D2CBD2",

                };
                Plotly.newPlot('plotdiv2', data, layout);
                myPlot.on('plotly_click', function(data){
                  var pts = '';
                  for(var i=0; i < data.points.length; i++){
                    pts = data.points[i].x               
                  }
                if (pts === 2012){setBarPlot('2012');}else if (pts === 2013){setBarPlot('2013');} else if (pts === 2014){setBarPlot('2014');} else if (pts === 2015){setBarPlot('2015');}else if (pts === 2016){setBarPlot('2016');}else if (pts === 2007){setBarPlot('2007');}else if (pts === 2008){setBarPlot('2008');}else if (pts === 2009){setBarPlot('2009');}else if (pts === 2010){setBarPlot('2010');}else if (pts === 2011){setBarPlot('2011');}else if (pts === 2017){setBarPlot('2017');}
                if (pts === 2012){setTabledata('2012');}else if (pts === 2013){setTabledata('2013');} else if (pts === 2014){setTabledata('2014');} else if (pts === 2015){setTabledata('2015');}else if (pts === 2016){setTabledata('2016');}else if (pts === 2007){setTabledata('2007');}else if (pts === 2008){setTabledata('2008');}else if (pts === 2009){setTabledata('2009');}else if (pts === 2010){setTabledata('2010');}else if (pts === 2011){setTabledata('2011');}else if (pts === 2017){setTabledata('2017');}
                if (pts === 2012){setLinePlot('2012');}else if (pts === 2013){setLinePlot('2013');} else if (pts === 2014){setLinePlot('2014');} else if (pts === 2015){setLinePlot('2015');}else if (pts === 2016){setLinePlot('2016');}else if (pts === 2007){setLinePlot('2007');}else if (pts === 2008){setLinePlot('2008');}else if (pts === 2009){setLinePlot('2009');}else if (pts === 2010){setLinePlot('2010');}else if (pts === 2011){setLinePlot('2011');}else if (pts === 2017){setLinePlot('2017');}
                });
            };
    
        function setBarPlot(chosenYear) {
            getYearData(chosenYear);
            var myPlot = document.getElementById('plotdiv1')
            var trace1 = {
                x: currentBarValue,
                y: currentBarCountry,
                type: 'bar',
                text: currentBarpercent,
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
                    color: ['#009999','#00CCCC','#00FFFF','#33FFFF','#66FFFF']
                  },
                orientation : 'h',
            };      
            var data = [trace1];
    
            var layout = {
                title:'Top 5 Soybeans Exporters -'+chosenYear,
                height: 400,
                width: 400,
                plot_bgcolor:"#D2CBD2",
                paper_bgcolor:"#D2CBD2"
            };
    
            Plotly.newPlot('plotdiv1', data, layout);
            myPlot.on('plotly_click', function(data){
                var pts = '';
                for(var i=0; i < data.points.length; i++){
                  pts = data.points[i].y              
                }
                if (pts === 'Argentina'){setAreaPlot('Argentina');}else if (pts === 'Brazil'){setAreaPlot('Brazil');} else if (pts === 'USA'){setAreaPlot('USA');} else if (pts === 'Paraguay'){setAreaPlot('Paraguay');}else if (pts === 'Canada'){setAreaPlot('Canada');}else if (pts === 'Netherlands'){setAraePlot('Netherlands');}
            });
        };
    
        function setTabledata(chosenYear) {
            getYearData(chosenYear);
            function colorSetup(currentTablePercent){
                colours = 'white';
                result = [];
                for(var i=0; i < currentTablePercent.length; i++){
                  if (currentTablePercent[i] > '0' ){
                      result.push('#99FFFF');
                      colours = '#99FFFF';
                      console.log(colours);
                  }else{
                        result.push('#FF99CC');
                      colours = '#FF99CC';
                      console.log(colours);
                  }    
                }           
                console.log(result)
                return result;
              }
      
            var layout = {
                title: 'Fastest Growing/Declining',
            };
            var data = [{
                type: 'table',
                columnwidth: [30,30],
                columnorder: [0,1],
                header: {
                  values: ["Country","Percent"],
                  align: "left",
                  line: {width: 1, color: 'white'},
                  fill: {color: ['#009999']},
                  font: {family: "Arial", size: 14, color: "black"},
                  order: "ascending"
                },
                cells: {
                  values: [currentTablecountry,currentTablePercent],
                  align: ["left", "left"],
                  line: {color: "white", width: 1},
                  fill: {color: ['#00CCCC', colorSetup(currentTablePercent)]},
                  font: {family: "Arial", size: 12, color: ["black"]},
                  order: "ascending"
                }
              }]
              Plotly.plot('plotdiv', data, layout);
            };
    
            function setLinePlot(chosenYear) {
                    getYearData(chosenYear);
                    function colorSetup(currentLinePercent){
                        colours = 'white';
                        result = [];
                        for(var i=0; i < currentLinePercent.length; i++){
                          console.log(currentLinePercent[i]);
                          if (currentLinePercent[i] > '0' ){
                              result.push('#009900');
                              colours = '#009900';
                              console.log(colours);
                          }else{
                                result.push('#990000');
                              colours = '#990000';
                              console.log(colours);
                          }    
                        }           
                        console.log(result)
                        return result;
                      }
                    var trace1 = {
                        x: currentLinePercent,
                        y: currentLineCountry,
                        mode: 'lines+markers+text',
                        name: 'Lines, Markers and Text',
                        text: currentLinePercent,
                        textposition: 'bottom',
                        type: 'scatter',
                        line: {color: 'white'},
                        
                       marker:{
                            color: colorSetup(currentLinePercent)
                          },
    
                    };      
                    var data = [trace1];
            
                    var layout = {
                        title:"Fastest Growing / Declining-"+chosenYear,
                        height: 400,
                        width: 500,
                        xaxis: {range: [-20,0,20,40,60]},
                        plot_bgcolor:"#66B2FF",
                        paper_bgcolor:"#D2CBD2"
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
            setLinePlot(yearSelector.value);
        }
        assignOptions(listofCountries, countrySelector);
            
        function updateCountry(){
            setAreaPlot(countrySelector.value);
        }
    
        countrySelector.addEventListener('change', updateCountry, false);
        yearSelector.addEventListener('change', updateYear, false);
        
    });
    }