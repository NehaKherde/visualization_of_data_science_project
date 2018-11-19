loadData().then(data => {

	// For no country selected by default
	this.activeCountry = null;
	this.activeYear = ["2000", "2000"]
    this.selected_health_factor = 'child-mortality';
    let that = this;
    this.selected_factors_for_parallel_chart = ["child-mortality", "polio-vaccine-coverage-of-one-year-olds", "share-of-population-with-cancer"]
    this.selected_factor_for_map = ""
    function updateYearRange(year) {
        this.activeYear = year
        parallel_chart.updateYear(this.activeYear);
    }
    function updateSelectedFactor(factor, yearArray){
        this.selected_factor_for_map = factor;
        this.activeYear = yearArray;
        worldMap.updateMap(this.activeYear, this.selected_factor_for_map);
    }

    function updateCountry(countryID) {
        that.activeCountry = countryID;
        worldMap.clearHighlight()
        worldMap.addHighlight(countryID)
    }

    const parallel_chart = new ParallelChart(data, this.selected_factors_for_parallel_chart, updateSelectedFactor, this.activeYear);
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
        worldMap.clearHighlight()

        if (e.path[0].type == "checkbox") {
            var is_checked = e.path[0].checked
            get_checked_box_list(e.path[0].value, is_checked)
        }
        if ((e.path[1].id) == "map_chart_svg") {
             updateCountry(e.path[0].id);
        }
        e.stopPropagation();
        //console.log(that.selected_factors_for_parallel_chart)
        // if (e.path[0].id == "play_button") {
        //     worldMap.playMap()
        // }
    });


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
