loadData().then(data => {

    const worldMap = new Map(data, updateCountry);

    d3.json('data/world.json').then(mapData => {
        worldMap.drawMap(mapData);
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
    let cmu = await loadFile('../../data/child-mortality.csv');

    return {
        'child-mortality': cmu,
    };
}