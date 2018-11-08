class treeMap {
    constructor(){
        console.log("treeMap");
        causesOfDeathData = [];
    };
    update(){
        let that = this;
        d3.csv("../data/annual-number-of-deaths-by-cause.csv").then(causesOfDeath => {
            that.causesOfDeathData.push(causesOfDeath);
        });
        console.log(causesOfDeathData); 
    };
}