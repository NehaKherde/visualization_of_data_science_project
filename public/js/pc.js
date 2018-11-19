class ParallelChart{
  //later pass year array and factor array 
  constructor(data){
    // this.margin = {top: 30, right: 20, bottom: 30, left: 100};
    let parallelDiv = d3.select("#parallel-chart").classed("contentforparallelplot", true);
    this.svgBounds = parallelDiv.node().getBoundingClientRect();
    this.margin = {top: 30, right: 10, bottom: 10, left: 10},
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = this.svgBounds.height - this.margin.top - this.margin.bottom;


    // this.svgWidth = 450 - this.margin.left - this.margin.right,
    // this.svgHeight = 250 - this.margin.top - this.margin.bottom;
    this.background;
    this.complete_data = data;
     //add the svg to the div
    this.svg = parallelDiv.append("svg")
          .attr("width",this.svgWidth + this.margin.left + this.margin.right)
          .attr("height",this.svgHeight + this.margin.top + this.margin.bottom)
          .attr("transform", "translate(10 ,30)")
    //this.yearArray = yearArray
    //this.factor = factor
    this.yearArray = ["2005","2000"];
    this.factor = ["child-mortality","child-mortality-by-income-level-of-country", "polio-vaccine-coverage-of-one-year-olds","maternal-mortality" ]
    this.factormap = {
      'child-mortality' : 'Child Mortality',
      'beer-consumption-per-person': "Beer beer consumption per person",
      'child-mortality-by-income-level-of-country': "Child Mortality by Income Level",
      'expected-years-of-living-with-disability-or-disease-burden': "Life Expectancy with Disability",
      'life-expectancy': "Life Expectancy",
      'maternal-mortality': "Mental Mortality",
      'median-age': "Median Age",
      'polio-vaccine-coverage-of-one-year-olds': "Polio vaccine coverage of one year olds",
      'share-of-population-with-cancer': "Share of population with cancer",
      'share-with-alcohol-use-disorders': "Share with alchohol use disorders",
      'share-with-mental-and-substance-disorders': "share-with-alcohol-use-disordersre with mental and substance disorders",
      'total-healthcare-expenditure-as-share-of-national-gdp-by-country': "HealthCare Expenditure"
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

  // updateCoordinates(){
  //   let self = this;
  //   let combined_data = {}
  //   this.factor.forEach(function(f){
  //     let data = self.fetchYearAndFactorRelatedData(self.yearArray, f);
  //     for(var key in data) {
  //       if (key in combined_data){
  //         combined_data[key].push(data[key][1])
  //       }
  //       else{
  //         combined_data[key] = [data[key][0]]
  //         combined_data[key].push(data[key][1])
  //       }
  //     }
  //   })
  //   this.updateParallelPlot(combined_data);
  // }


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

  updateParallelPlot(combined_data){

    let self = this;
    d3.select('#parallel-chart').selectAll('svg').remove()
  //   var svg = d3.select("body").append("svg")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  // .append("g")
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.svg = d3.select('#parallel-chart').append('svg').attr("width", this.svgWidth + this.margin.left + this.margin.right).attr("height", this.svgHeight + this.margin.top + this.margin.bottom)
                    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
                    .append("g");
    let yAxis = d3.axisRight();
    
  //   d3.csv("export.csv", function(error, countries) {
  //   d3.csv("export.csv").then(countries => {
  // // Extract the list of dimensions and create a scale for each.
  //   //     x.domain(dimensions = d3.keys(countries[0]).filter(function(d) {
  //   //     return d != "name" && (y[d] = d3.scaleLinear()
  //   //     .domain(d3.extent(countries, function(p) { return +p[d]; }))
  //   //     .range([self.margin.height, 0]));
  //   // }));

  //   // let background = this.svg.append("g")
  //   //                     .attr("class", "background")
  //   //                     .selectAll("path")
  //   //                     .data(countries)
  //   //                     .enter().append("path")
  //   //                     .attr("d", path);
  //    x.domain(dimensions = d3.keys(countries[0]).filter(function(d) {
  //     return d != "name" && (y[d] = d3.scaleLinear()
  //         .domain(d3.extent(countries, function(p) { return +p[d]; }))
  //         .range([self.svgHeight, 0]));
  //   }));

//     // Add grey background lines for context.
//     this.background = this.svg.append("g")
//       .attr("class", "background")
//       .selectAll("path")
//       .data(countries)
//       .enter().append("path")
//       .attr("d", path);

//       function path(d) {
//         let line = d3.line();
//         return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
//       }

//       function path(d) {
//   return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
// }
//     });



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
        //yScales[column_names[i]] = d3.scaleLinear().domain(tempArray).range([height, h1]);
        // yScales[column_names[i]] = d3.scaleBand().domain(tempArray)
        //                                             .range([this.margin.top, this.svgHeight - this.margin.bottom])
        //                                             .padding(1)
        //                                             .round(true);
        yScales[column_names[i]] = d3.scaleLinear().domain(d3.extent(combined_data, function(p) { return +p[column_names[i]]; })
)                                                    .range([this.margin.top, this.svgHeight - this.margin.bottom]);
        // yScales[column_names[i]] = d3.scaleLinear().domain(tempArray).range([ height , h1]);
    }

        let line = d3.line();
        let background = this.svg.append("g")
                        .attr("class", "background")
                        .selectAll("path")
                        .data(combined_data)
                        .enter().append("path")
                        .attr("d", path);

        let foreground = this.svg.append("g")
                        .attr("class", "foreground")
                        .selectAll("path")
                        .data(combined_data)
                        .enter().append("path")
                        .attr("d", path);

    //                   // Add a group element for each dimension.
        let g = this.svg.selectAll(".column")
                        .data(column_names)
                        .enter().append("g")
                        .attr("class", "column")
                        .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; });

         //Add an axis and title.
          g.append("g").attr("class", "axis")
                          .each(function(d) { d3.select(this).call(yAxis.scale(yScales[d])).selectAll('text')
                          .style("font-size",12)})
                            .append("text")
                              .style("text-anchor", "middle")
                              .attr("y", 12)
                              .text(function(d,i) { console.log(d); return d; })
                              .style("stroke","black")
                              .style("font-size",10)
                        
      // g.append("g")
      // .attr("class", "axis")
      // .each(function(d) { d3.select(this).call(yAxis.scale(yScales[d])); })
      // .append("text")
      // .style("text-anchor", "middle")
      // .attr("y", 30)
      // .text(function(d) { return d; });


                       //  // Add and store a brush for each axis.
                       // g.append("g")
                       //     .attr("class", "brush")
                       //     .each(function(d) {
                       //       d3.select(this).call(yScales[d].brush = d3.brushY().extent([[-10,THIS.margin.top],[10,(THIS.svgHeight - THIS.margin.bottom)]]).on("brush", brush));
                       //     })
                       //   .selectAll("rect")
                       //     .attr("x", -8)
                       //     .attr("width", 16);
                
        // Returns the path for a given data point.
        function path(d) {
                        return line(column_names.map(function(p) {
                          return [xScale(p), yScales[p](d[p])]; }));
        }
  }
}



// updateParallelPlot(yearData){
//   // console.log("here"+yearData.case_status)
//   console.log(yearData)
//   d3.select("#parallel-chart").selectAll('svg').remove();
//   this.svg = d3.select("#parallel-chart").append("svg")
//                       .attr("width",this.svgWidth)
//                       .attr("height",this.svgHeight)
//                       .attr("transform", "translate(0 ,50)")
//                       .attr("height",this.svgHeight);
//                       let THIS = this
//                       let yAxis =d3.axisRight();
//                       let yScales ={}
//                       let column_names = ['Case_Status', 'Class_Of_Admission', 'US_Economic_Sector', 'Employer_State', 'Country_Of_Citzenship' ]
//                         // Extract the list of column_names and create a scale for each.
//                       let xScale = d3.scaleBand()
//                                     .domain(column_names)
//                                     .range([this.margin.left, this.svgWidth-this.margin.right]);

//                       for (let i=0; i<column_names.length; i++) {
//                         let temp =[]
//                         let country ={}
//                           for (let j =0; j<yearData.length; j++){
//                             temp.push(yearData[j][column_names[i]])
//                           }
//                         let tempArray = [...new Set(temp)]
//                         yScales[column_names[i]] = d3.scaleBand()
//                                                     .domain(tempArray)
//                                                     .range([this.margin.top, this.svgHeight - this.margin.bottom])
//                                                     .padding(1)
//                                                     .round(true);
//                       }

//                       // define the line
//                       let line = d3.line();


//                       // Add grey background lines for context.
//                       let background = this.svg.append("g")
//                           .attr("class", "background")
//                         .selectAll("path")
//                           .data(yearData)
//                         .enter().append("path")
//                           .attr("d", path);

//                       // Add blue foreground lines for focus.
//                       let foreground = this.svg.append("g")
//                           .attr("class", "foreground")
//                         .selectAll("path")
//                           .data(yearData)
//                         .enter().append("path")
//                           .attr("d", path);

//                       // Add a group element for each dimension.
//                       let g = this.svg.selectAll(".column")
//                           .data(column_names)
//                         .enter().append("g")
//                           .attr("class", "column")
//                           .attr("transform", function(d) { return "translate(" + xScale(d) + ")"; });

//                       // Add an axis and title.
//                       g.append("g")
//                           .attr("class", "axis")
//                           .each(function(d) { d3.select(this).call(yAxis.scale(yScales[d])).selectAll('text')
//                           .style("font-size",12)
//                           .style("fill",'black');})
//                             .append("text")
//                               .style("text-anchor", "middle")
//                               .attr("y", 12)
//                               .text(function(d,i) { console.log(d); return d; })
//                               .style("stroke","black")
//                               .style("font-size",15)
//                               .style("fill",'black');



//                         // Add and store a brush for each axis.
//                        g.append("g")
//                            .attr("class", "brush")
//                            .each(function(d) {
//                              d3.select(this).call(yScales[d].brush = d3.brushY().extent([[-10,THIS.margin.top],[10,(THIS.svgHeight - THIS.margin.bottom)]]).on("brush", brush));
//                            })
//                          .selectAll("rect")
//                            .attr("x", -8)
//                            .attr("width", 16);

//                       console.log(yScales)
//                       // Returns the path for a given data point.
//                       function path(d) {
//                         return line(column_names.map(function(p) {
//                           return [xScale(p), yScales[p](d[p])]; }));
//                       }

//                       function getRandom(arr, n) {
//                           var result = new Array(n),
//                               len = arr.length,
//                               taken = new Array(len);
//                           if (n > len)
//                               throw new RangeError("getRandom: more elements taken than available");
//                           while (n--) {
//                               var x = Math.floor(Math.random() * len);
//                               result[n] = arr[x in taken ? taken[x] : x];
//                               taken[x] = --len;
//                           }
//                           return result;
//                       }

//                       // Handles a brush event, toggling the display of foreground lines.
//                     function brush() {

//                       var actives = [];
//                         d3.selectAll(".brush")
//                           .filter(function(d) {
//                             return d3.brushSelection(this);
//                           })
//                           .each(function(d) {
//                             actives.push({
//                               dimension: d,
//                               extent: d3.brushSelection(this)
//                             });
//                           });
//                       let extents = actives.map(function(p) { return p.extent});
//                       console.log(actives, extents)
//                       foreground.style("display", function(d) {
//                         return actives.every(function(p, i) {
//                           console.log(d[p.dimension]  )
//                           return extents[i][0] <= yScales[p.dimension](d[p.dimension]) && yScales[p.dimension](d[p.dimension]) <= extents[i][1];

//                         }) ? null : "none";
//                       });
//                     }
//   }
// }

// // console.log("hi")
// // var margin = {top: 30, right: 10, bottom: 10, left: 10},
// //     width = 960 - margin.left - margin.right,
// //     height = 500 - margin.top - margin.bottom;

// //   this.x = d3.scalePoint().range([0, this.width]).padding(1),
// //     y = {},
// //     dragging = {};

// // var line = d3.line(),
// //     axis = d3.axisLeft(),
// //     background,
// //     foreground;

// // var svg = d3.select("parallel-chart").append("svg")
// //     .attr("width", width + margin.left + margin.right)
// //     .attr("height", height + margin.top + margin.bottom)
// //   .append("g")
// //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// // // var div = d3.select("svg").append("div")
// // //     .attr("class", "tooltip")
// // //     .style("opacity", 0);

// // var myTool = d3.select("svg")
// //                   .append("div")
// //                   .attr("class", "mytooltip")
// //                   .style("opacity", "0")
// //                   .style("display", "none");

// // d3.csv("pc.csv", function(error, countries) {

// //   // Extract the list of dimensions and create a scale for each.
// //   x.domain(dimensions = d3.keys(countries[0]).filter(function(d) {
// //     return d != "name" && (y[d] = d3.scaleLinear()
// //         .domain(d3.extent(countries, function(p) { return +p[d]; }))
// //         .range([height, 0]));
// //   }));

// //   // Add grey background lines for context.
// //   background = svg.append("g")
// //       .attr("class", "background")
// //     .selectAll("path")
// //       .data(countries)
// //     .enter().append("path")
// //       .attr("d", path);

// //   // Add blue foreground lines for focus.
// //   foreground = svg.append("g")
// //       .attr("class", "foreground")
// //     .selectAll("path")
// //       .data(countries)
// //     .enter().append("path")
// //       .attr("d", path)
// //       .on("mouseover", function(d){  //Mouse event
// //                 d3.select(this)
// //                     .transition()
// //                     .duration(500)
// //                     .attr("x", function(d) { return x(d.cocoa) - 30; })
// //                     .style("cursor", "pointer")
// //                     .attr("width", 60)
// //                     myTool
// //                       .transition()  //Opacity transition when the tooltip appears
// //                       .duration(500)
// //                       .style("opacity", "1")                           
// //                       .style("display", "block")  //The tooltip appears

// //                     myTool
// //                       .html(
// //                       "<div id='text'><b>" + d.name + "</b></div")
// //                       .style("left", (d3.event.pageX - 113) + "px")   
// //                       .style("top", (d3.event.pageY - 190) + "px")
// //        });

// //   // Add a group element for each dimension.
// //   var g = svg.selectAll(".dimension")
// //       .data(dimensions)
// //     .enter().append("g")
// //       .attr("class", "dimension")
// //       .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
// //       .call(d3.behavior.drag()
// //         .origin(function(d) { return {x: x(d)}; })
// //         .on("dragstart", function(d) {
// //           dragging[d] = x(d);
// //           background.attr("visibility", "hidden");
// //         })
// //         .on("drag", function(d) {
// //           dragging[d] = Math.min(width, Math.max(0, d3.event.x));
// //           foreground.attr("d", path);
// //           dimensions.sort(function(a, b) { return position(a) - position(b); });
// //           x.domain(dimensions);
// //           g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
// //         })
// //         .on("dragend", function(d) {
// //           delete dragging[d];
// //           transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
// //           transition(foreground).attr("d", path);
// //           background
// //               .attr("d", path)
// //             .transition()
// //               .delay(500)
// //               .duration(0)
// //               .attr("visibility", null);
// //         }));

// //   // Add an axis and title.
// //   g.append("g")
// //       .attr("class", "axis")
// //       .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
// //       .append("text")
// //       .style("text-anchor", "middle")
// //       .attr("y", -9)
// //       .text(function(d) { return d; });

// // //  Add and store a brush for each axis.
// //   g.append("g")
// //       .attr("class", "brush")
// //       .each(function(d) {
// //         d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
// //       })
// //     .selectAll("rect")
// //       .attr("x", -8)
// //       .attr("width", 16);
// // });

// // function position(d) {
// //   var v = dragging[d];
// //   return v == null ? x(d) : v;
// // }

// // function transition(g) {
// //   return g.transition().duration(500);
// // }

// // // Returns the path for a given data point.
// // function path(d) {
// //   return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
// // }

// // function brushstart() {
// //   d3.event.sourceEvent.stopPropagation();
// // }

// // // Handles a brush event, toggling the display of foreground lines.
// //  function brush() {
// //   var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
// //       extents = actives.map(function(p) { return y[p].brush.extent(); });
// //   foreground.style("display", function(d) {
// //     return actives.every(function(p, i) {
// //       return extents[i][0] <= d[p] && d[p] <= extents[i][1];
// //     }) ? null : "none";
// //   });
// // }
