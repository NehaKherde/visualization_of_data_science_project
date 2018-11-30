class ParallelChart{
  //later pass year array and factor array 
  constructor(data, factor, updateSelectedFactor, yearArray, updateSelectedFlag, updateCountryMap){
    // this.margin = {top: 30, right: 20, bottom: 30, left: 100};
    let parallelDiv = d3.select("#parallel-chart").classed("contentforparallelplot", true);
    this.svgBounds = parallelDiv.node().getBoundingClientRect();
    this.margin = {top: 30, right: 10, bottom: 10, left: 10},
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = this.svgBounds.height - this.margin.top - this.margin.bottom;
    this.background;
    this.complete_data = data;
    this.updateSelectedFactor = updateSelectedFactor;
    this.updateSelectedFlag = updateSelectedFlag;
     //add the svg to the div
    this.svg = parallelDiv.append("svg")
          .attr("width",this.svgWidth + this.margin.left + this.margin.right)
          .attr("height",this.svgHeight + this.margin.top + this.margin.bottom)
          .attr("transform", "translate(10 ,30)")
    //this.yearArray = yearArray
    this.factor = factor
    this.originalArr = yearArray;
    this.yearArray = yearArray;
    this.selected_flag = false;
    this.updateCountryMap = updateCountryMap;
    this.countryId = "";
    if(this.yearArray[0] == this.yearArray[1]){
      this.yearArray = [this.yearArray[0]];
    }
    //this.factor = ["child-mortality","child-mortality-by-income-level-of-country", "polio-vaccine-coverage-of-one-year-olds","maternal-mortality" ]
    this.factormap = {
      'child-mortality' : 'Child Mortality',
      'beer-consumption-per-person': "Beer consumption",
      'child-mortality-by-income-level-of-country': "Child Mortality(Income Level)",
      'expected-years-of-living-with-disability-or-disease-burden': "Life Expectancy (Disability)",
      'life-expectancy': "Life Expectancy",
      'maternal-mortality': "Maternal Mortality",
      'median-age': "Median Age",
      'polio-vaccine-coverage-of-one-year-olds': "Polio vaccine coverage",
      'share-of-population-with-cancer': "Cancer",
      'share-with-alcohol-use-disorders': "Alchohol use disorders",
      'share-with-mental-and-substance-disorders': "Mental and substance disorders",
      'total-healthcare-expenditure-as-share-of-national-gdp-by-country': "HealthCare Expenditure"
    }
    this.completeFactor = {
      'Child Mortality' : 'Child Mortality',
      'Beer consumption': "Beer Consumption Per Person (liters pure alcohol)",
      'Child Mortality(Income Level)': "Child Mortality By Income Level Of Country",
      'Life Expectancy (Disability)': "Expected Years of Living With Disability Or Disease Burden",
      'Life Expectancy': "Life Expectancy",
      'Maternal Mortality': "Maternal Mortality",
      'Median Age': "Median Age",
      'Polio vaccine coverage': "Polio vaccine coverage of one year olds",
      'Cancer': "Share of population with cancer",
      'Alchohol use disorders': "Share with alchohol use disorders",
      'Mental and substance disorders': "Share of Population with Mental Health and Substance use Disorders",
      'HealthCare Expenditure': "Total Healthcare Expenditure as Share of National GDP by Country"
    }
    this.reversefactormap = {
      'Child Mortality':'child-mortality',
      "Beer consumption":'beer-consumption-per-person',
      "Child Mortality(Income Level)": 'child-mortality-by-income-level-of-country',
      "Life Expectancy (Disability)": 'expected-years-of-living-with-disability-or-disease-burden',
      "Life Expectancy": 'life-expectancy',
      "Maternal Mortality": 'maternal-mortality',
      "Median Age": 'median-age',
      "Polio vaccine coverage": 'polio-vaccine-coverage-of-one-year-olds',
      "Cancer": 'share-of-population-with-cancer',
      "Alchohol use disorders":'share-with-alcohol-use-disorders',
      "Mental and substance disorders":'share-with-mental-and-substance-disorders',
      "HealthCare Expenditure":'total-healthcare-expenditure-as-share-of-national-gdp-by-country'
    }
    this.indexmap = {}
    for(let i = 0; i<this.factor.length; i++){
      this.indexmap[this.factormap[this.factor[i]]] = i+1 ;
    }
    //update data according to coordinates and country
    this.updateCoordinates(); 
  }

  updateYear(yearArray){
    this.yearArray = yearArray;
    this.originalArr = yearArray;
    if(this.yearArray[0] == this.yearArray[1]){
      this.yearArray = [this.yearArray[0]];
    }
    this.updateCoordinates()
  }

  updateFactor(factor){
    this.factor = factor;
    this.updateCoordinates()
  }
  
  fetchYearAndFactorRelatedData(active_year, health_factor) {
        let factor_data = this.complete_data[health_factor]
        let year_specific_data = []
        let data = {}
        factor_data.forEach(function(item) {
            data[item["ID"]] = [item["Country"], item[active_year]]
        })
        return data;
  }


  updateCoordinates(){
    let self = this;
    let combined_data = []
    this.factor.forEach(function(f){
      let data = self.fetchYearAndFactorRelatedData(self.yearArray, f);
      for(let key in data) {
        if (data[key][0] in combined_data){
          let row = combined_data[data[key][0]];
          row[self.factormap[f]] = parseFloat(data[key][1]);
        }
        else{
          let row ={}
          row[self.factormap[f]] = parseFloat(data[key][1]);
          combined_data[data[key][0]] = row
        }
      }
    })
    let data = []
    for(let key in combined_data){
        let row = {};
        row = combined_data[key];
        key = key.replace(/\s+/g, '_');
        row["name"] = key;        
        data.push(row);
    }
    this.updateParallelPlot(data);
   
  }

  updateSelectedCountry(countryId){
    this.countryId = countryId;
  }

  addHighlight(countryId){
    countryId = countryId.replace(/\s+/g, '_');
    let country_id = "#"+countryId;
    let selected_country = d3.select("#parallel-chart").select(".foreground").select(country_id);
    let f = d3.select("#parallel-chart").select(".foreground").selectAll("path");
              f.style("stroke","#ddd") 
              let a = selected_country;
              let b = a.parentElement;
              a._groups[0][0].parentElement.appendChild(a._groups[0][0]);
              a.style("stroke", "black")
              a.style("stroke-width", "2")
    this.selected_flag = true;
    this.updateSelectedFlag(true)
  }

  clearHighlight(){
    let f = d3.select("#parallel-chart").selectAll("path");
              f.style("stroke","#5c5c8a") 
              f.style("stroke-width", "1")
    this.selected_flag = false;
    this.updateSelectedFlag(false);
  }

  clearTitleHighlight(){
    let self = this;
    let factors = this.factor
    for(let i = 0; i<factors.length; i++){
      document.getElementById([factors[i]]).style.fill = "black";
    }
  }

  updateParallelPlot(combined_data){

    let self = this;

    if(!document.getElementById("parallel_chart_title").contains(document.getElementsByClassName("parallel_chart_class")[0])) {
    d3.select("#parallel_chart_title").append("text")
                                      .text("Study Of Factors For Countries")
                                      .attr("class", "parallel_chart_class")
                                      .attr("font-family", "sans-serif")
                                      .attr("fill", "red")
                                      .attr("transform", "translate(0,30)");
    }
    d3.select('#parallel-chart').selectAll('svg').remove()
    this.svg = d3.select('#parallel-chart').append('svg').attr("width", this.svgWidth + this.margin.left + this.margin.right).attr("height", this.svgHeight + this.margin.top + this.margin.bottom)
                    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
                    .append("g");
    let yAxis = d3.axisRight();
    let yScales ={}
    let column_names = []
    let factors = this.factor
    factors.forEach(function(factor){
        column_names.push(self.factormap[factor]);
    })
    //let xScale = d3.scaleBand().domain(column_names).range([this.margin.left, this.svgWidth-this.margin.right]);
    let xScale = d3.scalePoint().domain(column_names).range([this.margin.left, this.svgWidth-this.margin.right]).padding(1);
    // let dragging = {};
    for (let i=0; i<column_names.length; i++) {
        let temp =[]
        for (let key in combined_data){
            let values = combined_data[key]
            //let index = this.indexmap[column_names[i]]
            temp.push(values[column_names[i]])
        }
        let tempArray = [...new Set(temp)]
        let height =  (this.margin.top + 200);
        let h1 = (this.svgHeight - this.margin.bottom-50);
        yScales[column_names[i]] = d3.scaleLinear().domain(d3.extent(combined_data, function(p) { return +p[column_names[i]]; })
                                    ).range([this.margin.top, this.svgHeight - this.margin.bottom]);
    }
        

        let line = d3.line();

        let foreground = this.svg.append("g")
                        .attr("class", "foreground")
                        .selectAll("path")
                        .data(combined_data)
                        .enter().append("path").attr("id", function(d,i) { return combined_data[i]["name"]})
                        .attr("d", path)
                        .on("mouseover",onhover)
                        .on("mouseout",nothover)
                        .on("click",clicked)
                        .append("svg:title")
                        .text(function(d, i) { return d["name"];  });
          function onhover(){
              if ( self.selected_flag == false){
                let f = d3.select("#parallel-chart").select(".foreground").selectAll("path");
                f.style("stroke","#ddd") 
                let a = d3.select(this);
                this.parentElement.appendChild(this);
                a.style("stroke", "black")
                a.style("stroke-width", "2")  
              }
              else{
                let countryId = self.countryId.replace(/\s+/g, '');
                let country_id = "#"+countryId;
                let selected_country = d3.select("#parallel-chart").select(".foreground").select(country_id);
                let f = d3.select("#parallel-chart").select(".foreground").selectAll("path");
                          f.style("stroke","#ddd") 
                          let a = selected_country;
                          let b = a.parentElement;
                          a._groups[0][0].parentElement.appendChild(a._groups[0][0]);
                          a.style("stroke", "black")
                          a.style("stroke-width", "2")
                let c = d3.select(this);
                this.parentElement.appendChild(this);
                c.style("stroke", "red")
                c.style("stroke-width", "2")  
              }
              // a.append("text").text("Hi");
          }
                        
          function nothover(){
            if ( self.selected_flag == false){
              let f = d3.select("#parallel-chart").select(".foreground").selectAll("path");
              f.style("stroke","#5c5c8a") 
              f.style("stroke-width", "1")
            }
            else{
              let countryId = self.countryId.replace(/\s+/g, '');
                let country_id = "#"+countryId;
                let selected_country = d3.select("#parallel-chart").select(".foreground").select(country_id);
                let f = d3.select("#parallel-chart").select(".foreground").selectAll("path");
                          f.style("stroke","#ddd") 
                          let a = selected_country;
                          let b = a.parentElement;
                          a._groups[0][0].parentElement.appendChild(a._groups[0][0]);
                          a.style("stroke", "black")
                          a.style("stroke-width", "2")
            }
          }                        
          function clicked(e){
              if(e.name != undefined){
                let name = e.name;
                self.updateSelectedCountry(name);
                self.clearHighlight();
                self.addHighlight(name);
                self.updateCountryMap(name);
              }
          }
                                   
    //                   // Add a group element for each dimension.
        let g = this.svg.selectAll(".column")
                        .data(column_names)
                        .enter().append("g")
                        .attr("class", "column")
                        .attr("transform", function(d) { 
                          console.log(d);
                          return "translate(" + xScale(d) + ")"; 
                        })
                     
         
          let tool_tip = d3.tip()
              .attr("class", "d3-tip")
              .offset([-8, 0])
              .html(function(d) { return self.completeFactor[d]; });
          this.svg.call(tool_tip);

          let axes = g.append("g").attr("class", "axis")
                          .each(function(d) { d3.select(this).call(yAxis.scale(yScales[d])).selectAll('text')})
                            .append("text")
                              .attr("y", 20)
                              .text(function(d,i) { console.log(d); return d; })
                              .on("mouseover",tool_tip.show)
                              .on("mouseout",tool_tip.hide)
                              .attr("id", idfunc)
                              .attr("class", "header-pc");


          function idfunc(d){
            return self.reversefactormap[d]
          }                                 
          axes.on("click", function(){
             let a = d3.event;
              let val = a.srcElement.__data__;
              let key = self.reversefactormap[val]
              let value = self.originalArr;
              self.updateSelectedFactor(key, value);
              d3.event.stopPropagation();
              self.clearTitleHighlight();
              document.getElementById(key).style.fill = "#b2182b";
          });          


        // Returns the path for a given data point.
        function path(d) {
                        return line(column_names.map(function(p) {
                          return [xScale(p), yScales[p](d[p])]; }));
        }

        function brushstart() {
          d3.event.sourceEvent.stopPropagation();
        }


         function brush() {
                      var actives = [];
                        d3.selectAll(".brush")
                          .filter(function(d) {
                            return d3.brushSelection(this);
                          })
                          .each(function(d) {
                            actives.push({
                              "dimension": d,
                              extent: d3.brushSelection(this)
                            });
                          });
                      let extents = actives.map(function(p) { return p.extent});
                      console.log(actives, extents)
                      foreground.style("display", function(d) {
                        return actives.every(function(p, i) {
                          console.log(d[p.dimension]  )
                          return extents[i][0] <= yScales[p.dimension](d[p.dimension]) && yScales[p.dimension](d[p.dimension]) <= extents[i][1];

                        }) ? null : "none";
                      });
                    }
  }
}

