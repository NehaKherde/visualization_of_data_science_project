loadData().then(data => {

	// For no country selected by default
	this.activeCountry = null;
	this.activeYear = ["2000", "2000"]
    this.selected_health_factor = 'child-mortality';
    this.world_dict = {};
    let that = this;
    this.selected_factors_for_parallel_chart = ["child-mortality", "polio-vaccine-coverage-of-one-year-olds", "share-of-population-with-cancer"]
    this.selected_factor_for_map = ""
    this.selected_flag = false
    
    for (let i in data[this.selected_health_factor]) {
        let country_name = data[this.selected_health_factor][i].Country
        if (country_name.indexOf(' ') >= 0){
            country_name = country_name.replace(" ", "_");
        }
        this.world_dict[data[this.selected_health_factor][i].ID] = country_name
    }

    function updateYearRange(year) {
        this.activeYear = year
        parallel_chart.updateYear(this.activeYear);
    }
    function updateSelectedFactor(factor, yearArray){
        this.selected_factor_for_map = factor;
        this.selected_health_factor = factor;
        this.activeYear = yearArray;
        worldMap.updateMap(this.activeYear[0], this.selected_factor_for_map);
    }

    function updateSelectedFlag(flag){
        this.selected_flag = flag;
    }

    function update_title(countryId, reset_flag) {
        let text = undefined
        if(reset_flag) {
            text = "Study Of Factors And Countries"
        }
        else {
            let country_name = countryId.replace('_', " ")
            text = "Study Of Factors And Country " + country_name
        }
        d3.select("#parallel_chart_title").select("text").text(text)
    }

    function updateCountry(countryID) {
        that.activeCountry = countryID;
        worldMap.clearHighlight()
        worldMap.addHighlight(countryID)
        parallel_chart.clearHighlight();
        parallel_chart.addHighlight(world_dict[countryID]);
        update_title(world_dict[countryID], false)
        // Use world_dict[countryID] to fetch the country name that is selected
    }

    function get_ID_from_country_name(countryId) {
        this.world_dict
        for(let key in world_dict){
            if(world_dict[key] == countryId) {
                return key
            }
        }
    }

    function updateCountryMap(countryId){
        // countryId is in Name format
        //reverse map to country id reqd for worldMap
        countryID = get_ID_from_country_name(countryId)
        that.activeCountry = countryID;
        worldMap.clearHighlight()
        worldMap.addHighlight(countryID)
        update_title(countryId ,false)
    }

    function updateHighlight(){
        parallel_chart.clearHighlight();
    }

    const parallel_chart = new ParallelChart(data, this.selected_factors_for_parallel_chart, updateSelectedFactor, this.activeYear, updateSelectedFlag, updateCountryMap);
    const worldMap = new Map(data, this.activeYear, updateCountry, this.selected_health_factor, updateYearRange);

    d3.json('../data/world.json').then(mapData => {
        worldMap.drawMap(mapData);
    });

    worldMap.yearslider()


    function get_checked_box_list(value, is_checked) {
        if(value.endsWith(".csv")) {
            var len = value.length - 4
            value = value.slice(0,len); 
        }
        if(is_checked) {
            that.selected_factors_for_parallel_chart.push(value)
        }
        else {
            let index = that.selected_factors_for_parallel_chart.indexOf(value)
            if (index > -1) {
                that.selected_factors_for_parallel_chart.splice(index, 1);
            }
        }
        parallel_chart.updateFactor(that.selected_factors_for_parallel_chart);
    }

    document.addEventListener("click", function(e) {
        e.stopPropagation();
        // Update country if you click on any of the countries in the world map
       // worldMap.clearHighlight()
        // updateHighlight();    
        

        if (e.path[0].type == "checkbox") {
            var is_checked = e.path[0].checked
            get_checked_box_list(e.path[0].value, is_checked)
        }
        if ((e.path[1].id) == "map_chart_svg") {
             updateCountry(e.path[0].id);
             parallel_chart.updateSelectedCountry(world_dict[e.path[0].id])
        }
        if ((e.path[0].id) == "reset") {
             reset()
        }
        e.stopPropagation();
        //console.log(that.selected_factors_for_parallel_chart)
        // if (e.path[0].id == "play_button") {
        //     worldMap.playMap()
        // }
    });

    function reset(){
        updateHighlight();  
        worldMap.clearHighlight()
        update_title("", true)
    // document.getElementById("demo").innerHTML = "Hello World";
    }

});


// ******* DATA LOADING *******
async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let cmu = await loadFile('../../data/changed_csv/child-mortality.csv');
    let bcpp = await loadFile('../../data/changed_csv/beer-consumption-per-person.csv');
    let cmilc = await loadFile('../../data/changed_csv/child-mortality-by-income-level-of-country.csv');
    let eyl = await loadFile('../../data/changed_csv/expected-years-of-living-with-disability-or-disease-burden.csv');
    let le = await loadFile('../../data/changed_csv/life-expectancy.csv');
    let mm = await loadFile('../../data/changed_csv/maternal-mortality.csv');
    let ma = await loadFile('../../data/changed_csv/median-age.csv');
    let pvc = await loadFile('../../data/changed_csv/polio-vaccine-coverage-of-one-year-olds.csv');
    let spc = await loadFile('../../data/changed_csv/share-of-population-with-cancer.csv');
    let sad = await loadFile('../../data/changed_csv/share-with-alcohol-use-disorders.csv');
    let smsd = await loadFile('../../data/changed_csv/share-with-mental-and-substance-disorders.csv');
    let the = await loadFile('../../data/changed_csv/total-healthcare-expenditure-as-share-of-national-gdp-by-country.csv');

    return {
        'child-mortality': cmu,
        'beer-consumption-per-person': bcpp,
        'child-mortality-by-income-level-of-country': cmilc,
        'expected-years-of-living-with-disability-or-disease-burden': eyl,
        'life-expectancy': le,
        'maternal-mortality': mm,
        'median-age': ma,
        'polio-vaccine-coverage-of-one-year-olds': pvc,
        'share-of-population-with-cancer': spc,
        'share-with-alcohol-use-disorders': sad,
        'share-with-mental-and-substance-disorders': smsd,
        'total-healthcare-expenditure-as-share-of-national-gdp-by-country': the
    };
}
