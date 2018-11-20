
loadData().then(data => {

	this.activeYear = ["2006", "2006"]
    const worldMap = new Map(data, this.activeYear, updateCountry, "causesOfDeath");
    this.treeMap = new TreeMap(worldMap);
    this.treeMap.update(this.activeYear[0]);

	this.activeCountry = null;
    let that = this;
    function updateCountry(countryID) {
        that.activeCountry = countryID;
        worldMap.clearHighlight()
        worldMap.addHighlight(countryID)
    }
    d3.json('../data/world.json').then(mapData => {
        worldMap.drawMap(mapData);
    });
    worldMap.yearslider()
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
        if (e.path[0].id == "play_button") {
            worldMap.playMap()
        }
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
    let causedOfDeathData = await loadFile('../../data/changed_csv/annual-number-of-deaths-by-cause-aggrigated.csv');
    return {'causesOfDeath': causedOfDeathData}
};
