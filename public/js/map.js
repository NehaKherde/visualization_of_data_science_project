/**
 * Data structure for the data associated with an individual country.
 * the CountryData class will be used to keep the data for drawing your map.
 * You will use the region to assign a class to color the map!
 */
class CountryData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the country paths
     * @param region the country region
     */
    constructor(type, id, properties, geometry, region) {

        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.region = region;
    }
}

/** Class representing the map view. */
class Map {

    /**
     * Creates a Map Object
     *
     * @param data the full dataset
     * @param updateCountry a callback function used to notify other parts of the program when the selected
     * country was updated (clicked)
     */
    constructor(data, activeYear, updateCountry, selected_health_factor) {
        // ******* TODO: PART I *******
        this.projection = d3.geoEquirectangular().scale(150).translate([480, 325]);
        //this.nameArray = data.population.map(d => d.geo.toUpperCase());
        //this.populationData = data.population;
        this.complete_data = data
        this.selected_health_factor = selected_health_factor
        this.updateCountry = updateCountry;
        this.activeYear = activeYear;
    }


    /**
     * Renders the map
     * @param world the topojson data with the shape of all countries and a string for the activeYear
     */
    drawMap(world) {
        //note that projection is global!

        // ******* TODO: PART I *******

        //world is a topojson file. you will have to convert this to geojson (hint: you should have learned this in class!)

        // Draw the background (country outlines; hint: use #map-chart)
        // Make sure to add a graticule (gridlines) and an outline to the map

        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)

        // You need to match the country with the region. This can be done using .map()
        // We have provided a class structure for the data called CountryData that you should assign the paramters to in your mapping

        //TODO - Your code goes here - 

        // Converted topoJSON to geoJson

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
        let data = this.fetchYearAndFactorRelatedData("2000", 'child-mortality')

        let new_path_element = d3.select("#map_chart_svg").selectAll("path")
        let add_region_clas = new_path_element.attr("fill", function(d, i) {
                                                            let id = data[d["id"]]
                                                            if(id == undefined)
                                                                return "#eee"
                                                            return colorScale(data[d["id"]][1])
                                                        })
        let tooltip = new_path_element.append("svg:title").html(d=>this.tooltipRender(data, d, 'child-mortality'));
    }

    getDomainAndRangeForColorScale(health_factor, value) {
        let domain = []
        let range = [];
        
        switch(health_factor) {
            case "child-mortality":
                domain = [0, 1, 5, 10, 20, 30, 50];
                range = ["#2166ac", "#67a9cf", "#d1e5f0", "#fddbc7", "#ef8a62", "#b2182b"];
                let colorScale = d3.scaleQuantile()
                            .domain(domain)
                            .range(range);
                return colorScale(value)
            // Need to add other factor values
        }
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
        if(active_year[0] == active_year[1]) {
            let _that = this
            let data = this.fetchYearAndFactorRelatedData(active_year[0], health_factor)
            let new_path_element = d3.select("#map_chart_svg").selectAll("path")
            let add_region_clas = new_path_element.attr("fill", function(d, i) {
                                                            let id = data[d["id"]]
                                                            if(id == undefined)
                                                                return "#eee"
                                                            return _that.getDomainAndRangeForColorScale(health_factor, data[d["id"]][1])
                                                        })
            // Update the tooltip
            new_path_element.select("title").html(d=>this.tooltipRender(data, d, 'child-mortality'));
        }
    }

    /**
     * Highlights the selected conutry and region on mouse click
     * @param activeCountry the country ID of the country to be rendered as selected/highlighted
     */
    addHighlight(activeCountry) {
        let country_id = "#"+activeCountry;
        let selected_country = d3.select("#map-chart").select("svg").select(country_id);
        selected_country.classed("selected-country", true);
    }

    /**
     * Clears all highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.
        let selector = d3.select("#map-chart").select("svg").selectAll("path").classed("selected-country",false);


    }

    yearslider() {
        let that = this;

        let margin = {top: 200, right: 40, bottom: 200, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var x = d3.scaleLinear()
            .domain([1990, 2015])
            .rangeRound([0, width]);

        let svg = d3.select("#nav_bar").append("svg")
            .attr("width", 923)
            .attr("height", 50)
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
                let clicked_location = x.invert(d3.event.sourceEvent.x)
                //console.log(clicked_location)
                d1[0] = Math.round(clicked_location)-5
                d1[1] = Math.round(clicked_location)-5+1
            }
            else{
                var d0 = d3.event.selection.map(x.invert),
                d1 = d0.map(Math.round);
            }
            d3.select(this).transition().call(d3.event.target.move, d1.map(x));
            that.activeYear = [d1[0], d1[1]-1]
            that.updateMap(that.activeYear, that.selected_health_factor)
            
        }

        // TODO: try to trigger a default event
        //brush.event(context.select('g.x.brush'));
        //document.getElementById('brush_div').click();
    }

    tooltipRender(data, d, health_factor) {

        let country_data = data[d["id"]]
        let text;
        let html_text;
        let val;
        switch(health_factor) {
            case 'child-mortality':
                if(country_data == undefined) {
                    html_text = "No Data"
                }
                else {
                    val = Math.round(parseFloat(country_data[1]) * 10)/10;
                    // TODO: add horizontal line and change the way tooltip is displayed
                    html_text = "<h2><b>"+ country_data[0] +"</b></h2><hr>"+"<h2>" + val + "% of children that die before they are 5 years old" + "</h2>";
                }
                break;
        }
        return html_text;
    }
}