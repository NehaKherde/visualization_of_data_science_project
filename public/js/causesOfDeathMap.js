class CountryData {
    constructor(type, id, properties, geometry, region) {
        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.region = region;
    }
}

class CodMap {

        constructor(data, activeYear, updateCountry, selected_health_factor, updateYearRange) {
        let mapDiv = d3.select("#map-chart")
        this.svgBounds = mapDiv.node().getBoundingClientRect();
        this.margin = {top: 30, right: 10, bottom: 10, left: 10},
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = this.svgBounds.height - this.margin.top - this.margin.bottom;
        this.projection = d3.geoEquirectangular().scale(90).translate([this.svgWidth/2, this.svgHeight/2.5]);

        this.complete_data = data
        this.selected_health_factor = selected_health_factor
        this.updateCountry = updateCountry;
        this.activeYear = activeYear;
        this.defaultData = 'causesOfDeath';
        this.updateYearRange = updateYearRange;
        let legendHeight = 90;
        let legend_section = d3.select("#legend").classed("tile_view",true);

        this.legendSvg = legend_section.append("svg")
                            .attr("width",500)
                            .attr("height",legendHeight)
                            .attr("transform", "translate("+0+",-200)");
    }

    drawMap(world) {
        let domain = [0, 100, 200, 400, 500, 7000, 8000];
        let range = [" #FFA07A", "#FA8072", "#F08080", "#DC143C", "#FF0000", "#B22222"];
        let colorScale = d3.scaleQuantile()
            .domain(domain)
            .range(range);

        let countries = topojson.feature(world, world.objects.countries);
        // projection converts the coordinates onto the screen coordinates. 
        // using geoPath(), convert the polygons to the svg path 
        let path = d3.geoPath().projection(this.projection);
        let svgContainer = d3.select("#map-chart").append("svg").attr('id', 'map_chart_svg');
        let path_element = svgContainer.selectAll("path")
                .data(countries.features)
                .enter()
                .append("path")
                .attr("id", (d, i) => countries.features[i].id)
                .attr("d", path);

        let graticule = d3.geoGraticule();
        let graticule_added = svgContainer.append('path')
                    .datum(graticule)
                    .attr('class', "graticule")
                    .attr('d', path)
                    .attr('fill', 'none');
        
        let graticule_border = svgContainer.append("path")
                    .datum(graticule.outline)
                    .attr("class", "stroke")
                    .attr("d", path);

        
        // Fetch the data related to the default health factor and year
        let data = this.fetchYearAndFactorRelatedData("2000", this.defaultData);

        let new_path_element = d3.select("#map_chart_svg").selectAll("path")
        let add_region_clas = new_path_element.attr("fill", function(d, i) {
                                                            let id = data[d["id"]]
                                                            if(id == undefined)
                                                                return "#eee"
                                                            return colorScale(data[d["id"]][1]/1000)
                                                        })
        let tooltip = new_path_element.append("svg:title").html(d=>this.tooltipRender(data, d, 'causesOfDeath'));

        this.legendSvg.append("g")
                .attr("class", "legendQuantile")
                .attr("transform", "translate(0,41)");
                
        let legendQuantile = d3.legendColor()
                .shapeWidth((this.svgWidth-100)/6)
                .cells(6)
                .orient('horizontal')
                .labelFormat(d3.format('.1r'))
                .scale(colorScale);

        this.legendSvg.select(".legendQuantile")
                .call(legendQuantile);

        let svgBounds = this.legendSvg.select(".legendQuantile").node().getBoundingClientRect();
        let legendGWidth = svgBounds.width;
            
        this.legendSvg.select(".legendQuantile").attr("transform", "translate(0,41)");
     //   svgContainer.append('text').classed('activeYear-background', true).text("2000").attr("x", 150).attr("y", 334);
   //     this.tooltip_message('causesOfDeath')
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

    updateMap(active_year, health_factor) {
        
        // check if the active year is only one year
        //if(active_year[0] == active_year[1]) {
          //  document.getElementById("play_button").disabled = true;
            let _that = this
       //     this.tooltip_message(health_factor)
            let domain = [0, 100, 200, 400, 500, 7000, 8000];
        let range = [" #FFA07A", "#FA8072", "#F08080", "#DC143C", "#FF0000", "#B22222"];
        let colorScale = d3.scaleQuantile()
            .domain(domain)
            .range(range);
            this.selected_health_factor = health_factor
            let data = this.fetchYearAndFactorRelatedData(active_year, health_factor)
            let new_path_element = d3.select("#map_chart_svg").selectAll("path")
            let add_region_clas = new_path_element.attr("fill", function(d, i) {
                                                            let id = data[d["id"]]
                                                            if(id == undefined)
                                                                return "#eee"
                                                            return colorScale(data[d["id"]][1]/1000)
                                                        })
            // Update the tooltip
            new_path_element.select("title").html(d=>this.tooltipRender(data, d, health_factor));

     }

    addHighlight(selected_countries) {
        for (let activeCountry in selected_countries) {
            let country_id = "#"+selected_countries[activeCountry];
            let selected_country = d3.select("#map-chart").select("svg").select(country_id);
            selected_country.classed("selected-country", true);
        }
        //clearHighlight(selected_countries)
    }

    /**
     * Clears all highlights
     */
    clearHighlight(removed_id) {
        let country_id = "#" + removed_id;
        let selector = d3.select("#map-chart").select("svg").select(country_id).classed("selected-country",false);
    }

    yearslider() {
        let that = this;

        let margin = {top: 200, right: 40, bottom: 200, left: 0},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var x = d3.scaleLinear()
            .domain([1990, 2015])
            .rangeRound([0, width]);

        let svg = d3.select("#nav_bar").append("svg")
            .attr("width", 923)
            .attr("height", 45).attr("id", "year_slider_id")
            .append("g")
            .attr("transform", "translate(" + margin.left + ", 0)");

        svg.append("g")
            .attr("class", "axis axis--grid")
            .attr("transform", "translate(0,30)")
            .call(d3.axisBottom(x)
                .ticks(20)
                .tickSize(-20)
                .tickFormat(function() { return null; }));
                
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform",  "translate(0,30)")
            .call(d3.axisBottom(x)
            .ticks(20)
            .tickFormat(d3.format("d"))
            .tickPadding(0))
            .attr("text-anchor", null)
            .selectAll("text")
            .attr("x", 6);

        let brush = d3.brushX()
                .extent([[0, 0], [width, 30]])
                .on("end", brushended);

        svg.append("g")
            .attr("class", "brush")
            .attr("id", "brush_div")
            .call(brush)
            .call(brush.move, [2000, 2001].map(x))
            .selectAll("rect")
            .attr('cursor', "")
            .attr('fill-opacity',"0.6")
            .attr('pointer-events', "");

        function brushended() {
            d1 = []
            if (!d3.event) { // add brush by default
                d1[0] = 2000
                d1[1] = 2001
            }
            else if (!d3.event.sourceEvent) return; // Only transition after input.
            else if (!d3.event.selection) { // if empty selection then choose the block
                // Selected block:

                let margin = document.getElementById("year_slider_id").getBoundingClientRect().x
                let clicked_location = x.invert(d3.event.sourceEvent.x-margin)
                //console.log(clicked_location)
                d1[0] = Math.floor(clicked_location)
                d1[1] = Math.floor(clicked_location)+1
            }
            else{
                var d0 = d3.event.selection.map(x.invert),
                d1 = d0.map(Math.round);
                d1[1] = d1[0] + 1
            }
            d3.select(this).transition().call(d3.event.target.move, d1.map(x));
            that.activeYear = [d1[0], d1[1]-1]
            

            //that.updateMap(that.activeYear[0], that.selected_health_factor)
            //that.tooltip_message(that.selected_health_factor)
            that.updateYearRange(that.activeYear)
            // if(d1[0] == d1[1]-1) {
            //     document.getElementById("play_button").disabled = true;
            // }
            // else {
            //     document.getElementById("play_button").disabled = false;
            //   //  that.updateMapForRange(that.activeYear, that.selected_health_factor)
            // }
            
        }

        // TODO: try to trigger a default event
        //brush.event(context.select('g.x.brush'));
    //    let point = document.getElementById("year_slider_id").getBoundingClientRect()
        //$(document.elementFromPoint(point.x+4, point.y+point.top)).click();
      //  $(document.elementFromPoint(115, 313)).click();
    }

    // updateMapForRange(activeYear_range, selected_health_factor) {
    //     let i;
    //     let diff = activeYear_range[1] - activeYear_range[0] +1

    //     this.theLoop(diff, activeYear_range[1], selected_health_factor, this.updateMap)
    //    // setTimeout(this.updateMap(i, selected_health_factor), 3000, diff)
    //     // for(i = activeYear_range[0]; i <= activeYear_range[1]; i++) {            
    //     // }
    // }

    // theLoop(i, activeYear, selected_health_factor, updateMapFunction) {
    //         setTimeout(function () {
    //             updateMapFunction(activeYear, selected_health_factor)
    //             if (--i) {
    //                 activeYear_range += 1// If i > 0, keep going
    //                 theLoop(i, activeYear, selected_health_factor, updateMapFunction);
    //         }
    //     }, 2000);
    // };


    tooltip_message(health_factor){
        switch(health_factor) {
            case 'causesOfDeath':
                d3.select("#tooltip_title").text("Child Mortality");
                d3.select(".sub-title").text("Shown is the share of children (born alive) who die before they are 5 years old");
                d3.select(".message").text("The world map shows the estimated level of child mortality for all world regions from 1990 to 2014 in the country borders of today. In all parts of the world child mortality is estimated to be higher than one third.")
                break;
        }
    }

    tooltipRender(data, d, health_factor) {
        let country_data = data[d["id"]]
        let text;
        let html_text;
        let val;
        if(country_data == undefined) {
            return html_text = "No Data"
        }
        val = Math.round(parseFloat(country_data[1]) * 10)/10;
        html_text = "<h2>" + country_data[0] + "</h2>";
        html_text += "<br>"
        switch(health_factor) {
            case 'causesOfDeath':
                    html_text += "<h5>"+ "Death toll is " + Math.floor(val/1000) +"</h5>"
                    break;
        }
        return html_text;
    }

    // getDomainAndRangeForColorScale(health_factor, value, get_divisions) {
    //     let domain = []
    //     let range = [];
    //     let colorScale
    //     switch(health_factor) {
    //         case "causesOfDeath":
    //             if(get_divisions)
    //                 return 6
    //             domain = [0, 1, 5, 10, 20, 30, 50];
    //             range = ["#fd9090", "#fc5959", "#fb0909", "#ba0303", "#fb0404", "#8d0202"];
    //             colorScale = d3.scaleQuantile()
    //                         .domain(domain)
    //                         .range(range);
    //             if (value == '')
    //                 return colorScale
    //             return colorScale(value)
    //     }
    // }
}