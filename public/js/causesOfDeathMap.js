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
                            .attr("transform", "translate("+50+",-200)");
    }

    drawMap(world) {

        let domain = [0, 1, 5, 10, 20, 30, 50];
        let range = ["#2166ac", "#67a9cf", "#d1e5f0", "#fddbc7", "#ef8a62", "#b2182b"];
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
                                                            return colorScale(data[d["id"]][1])
                                                        })
        let tooltip = new_path_element.append("svg:title").html(d=>this.tooltipRender(data, d, 'causesOfDeath'));

        this.legendSvg.append("g")
                .attr("class", "legendQuantile")
                .attr("transform", "translate(0,41)");
                
        let legendQuantile = d3.legendColor()
                .shapeWidth((500)/6)
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
            this.tooltip_message(health_factor)
            this.selected_health_factor = health_factor
            let data = this.fetchYearAndFactorRelatedData(active_year, health_factor)
            let new_path_element = d3.select("#map_chart_svg").selectAll("path")
            let add_region_clas = new_path_element.attr("fill", function(d, i) {
                                                            let id = data[d["id"]]
                                                            if(id == undefined)
                                                                return "#eee"                                                            
                                                            return _that.getDomainAndRangeForColorScale(health_factor, data[d["id"]][1], false)
                                                        })
            // Update the tooltip
            new_path_element.select("title").html(d=>this.tooltipRender(data, d, health_factor));
        //}
//        else {
    //        document.getElementById("play_button").disabled = false;
  //      }
        
        let text_select = d3.select(".activeYear-background").text(active_year);
        d3.selectAll("#legend").select('g').remove()

        this.legendSvg.append("g")
                .attr("class", "legendQuantile")
                .attr("transform", "translate(0,41)");        
        let divisions = this.getDomainAndRangeForColorScale(health_factor, '', true)
        let legendQuantile = d3.legendColor()
                .shapeWidth((600)/12)
                .cells(divisions)
                .orient('vertical')
                .labelFormat(d3.format('.1r'))
                .scale(this.getDomainAndRangeForColorScale(health_factor, '', false));

        this.legendSvg.select(".legendQuantile")
                .call(legendQuantile);

   //     let svgBounds = this.legendSvg.select(".legendQuantile").node().getBoundingClientRect();
        let legendGWidth = svgBounds.width;
        
        let diff = (600 - legendGWidth)/2;
        this.legendSvg.select(".legendQuantile").attr("transform", "translate(0,41)");
//        this.legendSvg.select(".legendQuantile").attr("transform", "translate(" + diff + ",50)");

        // let a_rect_bar_mouse_event = document.getElementById("map-chart")
        // a_rect_bar_mouse_event.onmouseover = function(event) {
        //     if("path" in event) {
        //         //event.target.style.stroke-width = "0.3px"
        //     }
        // };

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


    playMap() {
        this.updateMapForRange(this.activeYear, this.selected_health_factor)
    }

    tooltip_message(health_factor){
        switch(health_factor) {
            case 'child-mortality':
                d3.select("#tooltip_title").text("Child Mortality");
                d3.select(".sub-title").text("Shown is the share of children (born alive) who die before they are 5 years old");
                d3.select(".message").text("The world map shows the estimated level of child mortality for all world regions from 1990 to 2014 in the country borders of today. In all parts of the world child mortality is estimated to be higher than one third.")
                break;
            case 'beer-consumption-per-person':
                d3.select("#tooltip_title").text("Beer Consumption Per Person (liters pure alcohol)");
                d3.select(".sub-title").text("Average per capita beer consumption, measured as in liters of pure alcohol per year");
                d3.select(".message").text("The world map shows the measure in terms of pure alcohol/ethanol intake, rather than the total quantity of the beverage.")
                break;
            case 'child-mortality-by-income-level-of-country':
                d3.select("#tooltip_title").text("Child Mortality By Income Level Of Country");
                d3.select(".sub-title").text("The child mortality rate measures the share of children that die before reaching the age of 5.");
                d3.select(".message").text("As one would expect, income level of the country is extremely correlated with child mortality rate. The poorest countries have the highest levels of child mortality, and the countries with the highest income have the lowest rates. This relationship has remained the same even as child mortality has decreased around the world, as demonstrated below.") 
                break;
            case 'expected-years-of-living-with-disability-or-disease-burden':
                d3.select("#tooltip_title").text("Expected Years of Living With Disability Or Disease Burden");
                d3.select(".sub-title").text("");
                d3.select(".message").text("Average number of years with disability an individual born in the respective year can expect to experience. This is calculated as the difference between total and healthy life expectancy.")
                break;
            case 'life-expectancy':
                d3.select("#tooltip_title").text("Life Expectancy");
                d3.select(".sub-title").text("");
                d3.select(".message").text("Shown is period life expectancy at birth. This corresponds to an estimate of the average number of years a newborn infant would live if prevailing patterns of mortality at the time of its birth were to stay the same throughout its life")
                break;
            case 'maternal-mortality':
                d3.select("#tooltip_title").text("Maternal Mortality");
                d3.select(".sub-title").text("Maternal mortality ratio is the number of women who die from pregnancy-related causes while pregnant or within 42 days of pregnancy termination per 100,000 live births.");
                d3.select(".message").text("The countries that achieved the lowest maternal mortality rate are Finland, Greece, Iceland, and Poland. For each 100,000 deaths 3 mothers die.")
                break;
            case 'median-age':
                d3.select("#tooltip_title").text("Median Age");
                d3.select(".sub-title").text("");
                d3.select(".message").text("The median age divides the population in two parts of equal size: that is, there are as many persons with ages above the median as there are with ages below the median.")
                break;
            case 'polio-vaccine-coverage-of-one-year-olds':
                d3.select("#tooltip_title").text("Polio Vaccine Coverage Of One Year Olds");
                d3.select(".sub-title").text("Percentage of one-year-olds who have received three doses of polio vaccine in a given year.");
                d3.select(".message").text("Globally you can see that in 1990 only 22% of one-year-olds were vaccinated against polio, and this increased to a coverage of 86% of the world's one year-olds in 2014")
                break;
            case 'share-of-population-with-cancer':
                d3.select("#tooltip_title").text("Share Of Population With Cancer");
                d3.select(".sub-title").text("");
                d3.select(".message").text("Share of total population with any form of cancer, measured as the age-standardized percentage. This share has been age-standardized assuming a constant age structure to compare prevalence between countries and through time.")
                break;
            case 'share-with-alcohol-use-disorders':
                d3.select("#tooltip_title").text("Share With Alcohol Use Disorders");
                d3.select(".sub-title").text("");
                d3.select(".message").text("Alcohol dependence is defined by the International Classification of Diseases as the presence of three or more indicators of dependence for at least a month within the previous year. This is given as the age-standardized prevalence which assumes a constant age structure allowing for comparison by sex, country and through time.")
                break;
            case 'share-with-mental-and-substance-disorders':
                d3.select("#tooltip_title").text("Share of Population with Mental Health and Substance use Disorders");
                d3.select(".sub-title").text("");
                d3.select(".message").text("In the chart below we see that globally, mental and substance use disorders are very common: around 1-in-6 people (15-20 percent) have one or more mental or substance use disorders.")
                break;
            case 'total-healthcare-expenditure-as-share-of-national-gdp-by-country':
                d3.select("#tooltip_title").text("Total Healthcare Expenditure as Share of National GDP by Country");
                d3.select(".sub-title").text("Total Healthcare expenditure by country (% of corresponding national GDP) ");
                d3.select(".message").text("Global trends in healthcare expenditure mask a great deal of heterogeneity. The following map shows how total expenditure on healthcare has changed across the world.")
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
                    html_text += "<h5>" + val + "% of children that die before they are 5 years old" + "</h5>"
                    break;
        }
        return html_text;
    }

    getDomainAndRangeForColorScale(health_factor, value, get_divisions) {
        let domain = []
        let range = [];
        let colorScale
        switch(health_factor) {
            case "causesOfDeath":
                if(get_divisions)
                    return 6
                domain = [0, 1, 5, 10, 20, 30, 50];
                range = ["#2166ac", "#67a9cf", "#d1e5f0", "#fddbc7", "#ef8a62", "#b2182b"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
        }
    }
}