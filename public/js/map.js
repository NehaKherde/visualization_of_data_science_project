class CountryData {
    constructor(type, id, properties, geometry, region) {
        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.region = region;
    }
}

class Map {

        constructor(data, activeYear, updateCountry, selected_health_factor, updateYearRange) {
       // this.projection = d3.geoEquirectangular().scale(120).translate([0, 190]);
        this.complete_data = data
        this.selected_health_factor = selected_health_factor
        this.updateCountry = updateCountry;
        this.activeYear = activeYear;
        this.defaultData = 'child-mortality';
        this.updateYearRange = updateYearRange;
        let legendHeight = '100%';
        let legend_section = d3.select("#legend").classed("tile_view",true);

        this.legendSvg = legend_section.append("svg")
                            .attr("width",'100%')
                            .attr("id", "legend_svg")
                            .attr("height",legendHeight)
                            .attr("transform", "translate(0,0)");
        //this.legend_col_width = document.getElementById("legend_svg").width.baseVal.value
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

        let svgContainer = d3.select("#map-chart").append("svg").attr('id', 'map_chart_svg');
        let map_chart_width = document.getElementById("map-chart").offsetWidth
        let legend_col_width = document.getElementById("legend").offsetWidth
        this.projection = d3.geoEquirectangular().scale(120).translate([legend_col_width+100, 190]);
        let path = d3.geoPath().projection(this.projection);
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
        let tooltip = new_path_element.append("svg:title").html(d=>this.tooltipRender(data, d, 'child-mortality'));

       // document.getElementById("play_button").disabled = true;

        this.legendSvg.append("g")
                .attr("class", "legendQuantile")
                .attr("transform", "translate(0,0)");
        let width_rectangle = 600
        let legendQuantile = d3.legendColor()
                .shapeWidth(width_rectangle/12)
                .cells(6)
                .orient('vertical')
                .labelFormat(d3.format('.1r'))
                .scale(colorScale);

        this.legendSvg.select(".legendQuantile")
                .call(legendQuantile);

        let svgBounds = this.legendSvg.select(".legendQuantile").node().getBoundingClientRect();
        let legendGWidth = svgBounds.width;
        let translate_x= legendGWidth - (width_rectangle/12)
        this.legendSvg.select(".legendQuantile").attr("transform", "translate("+translate_x+",0)");
        svgContainer.append('text').classed('activeYear-background', true).text("2000").attr("x", 100).attr("y", 334);
        this.tooltip_message('child-mortality')
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
                .attr("transform", "translate(0,0)");        
        let divisions = this.getDomainAndRangeForColorScale(health_factor, '', true)
        let legendQuantile = d3.legendColor()
                .shapeWidth((600)/12)
                .cells(divisions)
                .orient('vertical')
                .labelFormat(d3.format('.1r'))
                .scale(this.getDomainAndRangeForColorScale(health_factor, '', false));

        this.legendSvg.select(".legendQuantile")
                .call(legendQuantile);

        let svgBounds = this.legendSvg.select(".legendQuantile").node().getBoundingClientRect();
        let legendGWidth = svgBounds.width;
        
        let diff = (600 - legendGWidth)/2;
        this.legendSvg.select(".legendQuantile").attr("transform", "translate(0,0)");
//        this.legendSvg.select(".legendQuantile").attr("transform", "translate(" + diff + ",50)");

        // let a_rect_bar_mouse_event = document.getElementById("map-chart")
        // a_rect_bar_mouse_event.onmouseover = function(event) {
        //     if("path" in event) {
        //         //event.target.style.stroke-width = "0.3px"
        //     }
        // };

    }

    addHighlight(activeCountry) {
        let country_id = "#"+activeCountry;
        let selected_country = d3.select("#map-chart").select("svg").select(country_id);
        selected_country.classed("selected-country", true);
    }

    /**
     * Clears all highlights
     */
    clearHighlight() {
        let selector = d3.select("#map-chart").select("svg").selectAll("path").classed("selected-country",false);
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

        svg.append("g")
            .attr("class", "brush")
            .attr("id", "brush_div")
            .call(d3.brushX()
                .extent([[0, 0], [width, 30]])
                .on("end", brushended));

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
            }
            d3.select(this).transition().call(d3.event.target.move, d1.map(x));
            that.activeYear = [d1[0], d1[1]-1]
            

            that.updateMap(that.activeYear[0], that.selected_health_factor)
            that.tooltip_message(that.selected_health_factor)
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
        let point = document.getElementById("year_slider_id").getBoundingClientRect()
        //$(document.elementFromPoint(point.x+4, point.y+point.top)).click();
        $(document.elementFromPoint(115, 313)).click();
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
            case 'child-mortality':
                    html_text += "<h5>" + val + "% of children that die before they are 5 years old" + "</h5>"
                    break;
            case 'beer-consumption-per-person':
                    html_text += "<h5>" + val + " liters of pure alcohol." + "</h5>"
                    break;
            case 'child-mortality-by-income-level-of-country':
                    html_text += "<h5>" + val + "%" + "</h5>"
                    break;
            case 'expected-years-of-living-with-disability-or-disease-burden':
                    html_text += "<h5>" + val + " years" + "</h5>"
                    break;
            case 'life-expectancy':
                    html_text += "<h5>" + val + " years" + "</h5>"
                    break;
            case 'maternal-mortality':
                    html_text += "<h5>" + val + " deaths per 100,000 live births" + "</h5>"
                    break;
            case 'median-age':
                    html_text += "<h5>" + val + " years" + "</h5>"
                    break;
            case 'polio-vaccine-coverage-of-one-year-olds':
                    html_text += "<h5>" + val + "%" + "</h5>"
                    break;
            case 'share-of-population-with-cancer':
                    html_text += "<h5>" + val + "%" + "</h5>"
                    break;
            case 'share-with-alcohol-use-disorders':
                    html_text += "<h5>" + val + "%" + "</h5>"
                    break;
            case 'share-with-mental-and-substance-disorders':
                    html_text += "<h5>" + val + "%" + "</h5>"
                    break;
            case 'total-healthcare-expenditure-as-share-of-national-gdp-by-country':
                    html_text += "<h5>" + val + "% of GDP" + "</h5>"
                    break;
        }
        return html_text;
    }

    getDomainAndRangeForColorScale(health_factor, value, get_divisions) {
        let domain = []
        let range = [];
        let colorScale
        switch(health_factor) {
            case "child-mortality":
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
            case "beer-consumption-per-person":
                if(get_divisions)
                    return 8
                domain = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                range = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#0c2c84"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "child-mortality-by-income-level-of-country":
                if(get_divisions)
                    return 5
                domain = [0, 5, 10, 20, 30];
                range = ["#ffffcc", "#c7e9b4", "#7fcdbb", "#2c7fb8", "#FFEC38"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "expected-years-of-living-with-disability-or-disease-burden":
                if(get_divisions)
                    return 7
                domain = [5, 6, 7, 8, 9, 10];
                range = ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "life-expectancy":
                if(get_divisions)
                    return 11
                domain = [20, 30, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
                range = ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#674c98"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "maternal-mortality":
                if(get_divisions)
                    return 7
                domain = [0, 10, 50, 100, 200, 500, 1000, 3000];
                range = ["#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "median-age":
                if(get_divisions)
                    return 8
                domain = [14, 20, 25, 30, 35, 40, 45, 50, 55];
                range = ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016450"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "polio-vaccine-coverage-of-one-year-olds":
                if(get_divisions)
                    return 10
                domain = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                range = ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "rgb(0, 89, 36)", "#00441b"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "share-of-population-with-cancer":
                if(get_divisions)
                    return 8
                domain = [0, 0.2, 0.5, 0.7, 0.9, 1.59, 2];
                range = ["#ffffcc", "#fed976", "#feb24c","#fc4e2a", "#e31a1c", "#b10026"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "share-with-alcohol-use-disorders":
                if(get_divisions)
                    return 8
                domain = [0, 0.5, 1, 1.5, 2, 4, 5];
                range = ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c6bb1", "#88419d", "#6e016b"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "share-with-mental-and-substance-disorders":
                if(get_divisions)
                    return 7
                domain = [7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25];
                range = ["#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
            case "total-healthcare-expenditure-as-share-of-national-gdp-by-country":
                if(get_divisions)
                    return 9
                domain = [1,2,3,4,5,7,8,9,10,18];
                range = ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "rgb(101, 192, 204)", "#4eb3d3", "rgb(61, 160, 201)", "#2b8cbe"];
                colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                if (value == '')
                    return colorScale
                return colorScale(value)
        }
    }
}