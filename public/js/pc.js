class ParallelChart{
  //later pass year array and factor array 
  constructor(data, factor, updateSelectedFactor, yearArray){
    // this.margin = {top: 30, right: 20, bottom: 30, left: 100};
    let parallelDiv = d3.select("#parallel-chart").classed("contentforparallelplot", true);
    this.svgBounds = parallelDiv.node().getBoundingClientRect();
    this.margin = {top: 30, right: 10, bottom: 10, left: 10},
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = this.svgBounds.height - this.margin.top - this.margin.bottom;
    this.background;
    this.complete_data = data;
    this.updateSelectedFactor = updateSelectedFactor;
     //add the svg to the div
    this.svg = parallelDiv.append("svg")
          .attr("width",this.svgWidth + this.margin.left + this.margin.right)
          .attr("height",this.svgHeight + this.margin.top + this.margin.bottom)
          .attr("transform", "translate(10 ,30)")
    //this.yearArray = yearArray
    this.factor = factor
    this.originalArr = yearArray;
    this.yearArray = yearArray;
    if(this.yearArray[0] == this.yearArray[1]){
      this.yearArray = [this.yearArray[0]];
    }
    //this.factor = ["child-mortality","child-mortality-by-income-level-of-country", "polio-vaccine-coverage-of-one-year-olds","maternal-mortality" ]
    this.factormap = {
      'child-mortality' : 'Child Mortality',
      'beer-consumption-per-person': "Beer consumption per person",
      'child-mortality-by-income-level-of-country': "Child Mortality by Income Level",
      'expected-years-of-living-with-disability-or-disease-burden': "Life Expectancy with Disability",
      'life-expectancy': "Life Expectancy",
      'maternal-mortality': "Maternal Mortality",
      'median-age': "Median Age",
      'polio-vaccine-coverage-of-one-year-olds': "Polio vaccine coverage of one year olds",
      'share-of-population-with-cancer': "Share of population with cancer",
      'share-with-alcohol-use-disorders': "Share with alchohol use disorders",
      'share-with-mental-and-substance-disorders': "Mental and substance disorders",
      'total-healthcare-expenditure-as-share-of-national-gdp-by-country': "HealthCare Expenditure"
    }
    this.reversefactormap = {
      'Child Mortality':'child-mortality',
      "Beer consumption per person":'beer-consumption-per-person',
      "Child Mortality by Income Level": 'child-mortality-by-income-level-of-country',
      "Life Expectancy with Disability": 'expected-years-of-living-with-disability-or-disease-burden',
      "Life Expectancy": 'life-expectancy',
      "Maternal Mortality": 'maternal-mortality',
      "Median Age": 'median-age',
      "Polio vaccine coverage of one year olds": 'polio-vaccine-coverage-of-one-year-olds',
      "Share of population with cancer": 'share-of-population-with-cancer',
      "Share with alchohol use disorders":'share-with-alcohol-use-disorders',
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
          row[self.factormap[f]] = String(data[key][1]);
        }
        else{
          let row ={}
          row[self.factormap[f]] = String(data[key][1]);
          combined_data[data[key][0]] = row
        }
      }
    })
    let data = []
    for(let key in combined_data){
        let row = {};
        row = combined_data[key];
        row["name"] = key;        
        data.push(row);
    }
    this.updateParallelPlot(data);
   
  }

  addHighlight(countryId){
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

  clearHighlight(){
    let f = d3.select("#parallel-chart").selectAll("path");
              f.style("stroke","#5c5c8a") 
              f.style("stroke-width", "1")
  }

  updateParallelPlot(combined_data){

    let self = this;
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
)                                                    .range([this.margin.top, this.svgHeight - this.margin.bottom]);
    }
        

        let line = d3.line();
        let background = this.svg.append("g")
                        .attr("class", "background")
                        .selectAll("path")
                        .data(combined_data)
                        .enter().append("path").attr("id", function(d,i) { return combined_data[i]["name"]})
                        .attr("d", path);


        let foreground = this.svg.append("g")
                        .attr("class", "foreground")
                        .selectAll("path")
                        .data(combined_data)
                        .enter().append("path").attr("id", function(d,i) { return combined_data[i]["name"]})
                        .attr("d", path)
                        .on("mouseover",onhover)
                        .on("mouseout",nothover)
                        .append("svg:title")
                        .text(function(d, i) { return d["name"];  });
          function onhover(){
              let f = d3.select("#parallel-chart").select(".foreground").selectAll("path");
              f.style("stroke","#ddd") 
              let a = d3.select(this);
              this.parentElement.appendChild(this);
              a.style("stroke", "black")
              a.style("stroke-width", "2")
              // a.append("text").text("Hi");
          }
                        
          function nothover(){
              let f = d3.select("#parallel-chart").select(".foreground").selectAll("path");
              f.style("stroke","#5c5c8a") 
              f.style("stroke-width", "1")
          }                        
          

                         // .on("mouseover", function(){
                        //    let a = d3.event;
                        //    console.log(a.path[0].id);  
                        //    svg.append("text").attr({
                        //      id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
                        //       x: function() { return xScale(d.x) - 30; },
                        //       y: function() { return yScale(d.y) - 15; }
                        //   })
                        //   .text(function() {
                        //     return [d.x, d.y];  // Value of the text
                        //   });
                        //    return tooltip.text(a.path[0].id).style("visibility", "visible");
                        // });       
         // let tooltip = foreground.append("svg:title").html(function(d,i){ return combined_data[i]["id"]});
        
        
        // let tooltip "visibility", "hidden")                 
        // foreground.on("mouseover", function(){
        //      let a = d3.event;
        //      console.log(a.path[0].id);  
        //      return tooltip.text(a.path[0].id).style("visibility", "visible");
        //   });                                    
    //                   // Add a group element for each dimension.
        let g = this.svg.selectAll(".column")
                        .data(column_names)
                        .enter().append("g")
                        .attr("class", "column")
                        .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; });

         //Add an axis and title.
         // let axes = g.append("g").attr("class", "axis")
         //                  .each(function(d) { d3.select(this).call(yAxis.scale(yScales[d])).selectAll("text").style("font-size",12)})
         //                  .attr("class","headerdiv")
         //                    .append("text")
         //                      .attr("y", 12)
         //                      .text(function(d,i) { console.log(d); return d; })
         //                      .attr("class", "text")
          let axes = g.append("g").attr("class", "axis")
                          .each(function(d) { d3.select(this).call(yAxis.scale(yScales[d])).selectAll('text')})
                            .append("text")
                              .attr("class", "header-pc")
                              .attr("y", 20)
                              .text(function(d,i) { console.log(d); return d; })
                                 

          axes.on("click", function(){
             let a = d3.event;
              let val = a.srcElement.__data__;
              let key = self.reversefactormap[val]
              let value = self.originalArr;
              self.updateSelectedFactor(key, value);
              d3.event.stopPropagation();
          });                    
           // g.append("g").attr("class", "brush")
           //    .each(funtion(d) {
           //      d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
           //    })
           //  .selectAll("rect")
           //    .attr("x", -8)
           //    .attr("width", 16);
           // let axes = g.append("g").attr("class", "axis")
           //                .each(function(d) { d3.select(this).call(yAxis.scale(yScales[d])).selectAll('text')
           //                .style("font-size",12)})
           //                  .append("text")
           //                    .style("text-anchor", "middle")
           //                    .attr("y", 12)
           //                    .text(function(d,i) { console.log(d); return d; })
           //                    .style("stroke","black")
           //                    .style("font-size",10)     

            // g.append("g").attr("class", "brush")
            //                .each(function(d) {
            //                  d3.select(this).call(yScales[d].brush = d3.brushY().extent([[-10,self.margin.top],[10,(self.svgHeight - self.margin.bottom)]]).on("brush", brush));
            //                })
            //              .selectAll("rect")
            //                .attr("x", -8)
            //                .attr("width", 16);         


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

