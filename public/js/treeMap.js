class TreeMap {
    constructor(){
        console.log("tree map constructor");
        this.causesOfDeathData = []
        this.selectedFeaturesData =[]
        this.selectedCause = ""
        this.selectedYear = 0
        this.causesOfDeathName = {"Dementia": "Dementia","Cardiovascular diseases":"Cardiovascular","Kidney disease":"Kidney","Respiratory disease":"Respiratory","Liver disease":"Liver","Diabetes":"Diabetes","Digestive disease":"Digestive" ,"Hepatitis":"Hepatitis","Cancers":"Cancers","Parkinson's":"Parkinson's","Fire":"Fire","Malaria":"Malaria","Drowning":"Drowning","Homicide":"Homicide","HIV/AIDS":"HIV/AIDS","Drug disorder":"Drugs","Tuberculosis":"Tuberculosis","Road incidents":"Road incidents","Maternal deaths":"Maternal","Neonatal deaths":"Neonatal","Alcohol disorder":"Alcohol","Natural disasters":"Disasters","Diarrheal diseases":"Diarrheal","Heat or cold exposure":"Exposure","Nutritional deficiencies":"Nutrition","Suicide":"Suicide","Execution":"Execution","Meningitis":"Meningitis","Respiratory infections":"Respiratory","Intestinal infectious":"Intestinal","Protein-energy malnutrition":"Protein-energy","Conflict":"Conflict","Terrorism":"Terrorism"};
        this.causesOfDeathDetails= {
            "Dementia": "Not a specific disease, dementia is a group of conditions characterized by impairment of at least two brain functions, such as memory loss and judgment. \n\nSymptoms include forgetfulness, limited social skills, and thinking abilities so impaired that it interferes with daily functioning. \n \n Medications and therapies may help manage symptoms. Some causes are reversible.","Cardiovascular diseases":"NC","Kidney disease":"NC","Respiratory disease":"NC","Liver disease":"NC","Diabetes":"NC","Digestive disease":"NC","Hepatitis":"C","Cancers":"NC","Parkinson's":"NC","Fire":"A","Malaria":"NC","Drowning":"A","Homicide":"CR","HIV/AIDS":"C","Drug disorder":"NC","Tuberculosis":"C","Road incidents":"A","Maternal deaths":"A","Neonatal deaths":"NC","Alcohol disorder":"NC","Natural disasters":"A","Diarrheal diseases":"NC","Heat or cold exposure":"NC","Nutritional deficiencies":"NC","Suicide":"CR","Execution":"CR","Meningitis":"C","Respiratory infections":"NC","Intestinal infectious":"NC","Protein-energy malnutrition":"NC","Conflict":"CR","Terrorism":"CR"};
        this.causesOfDeathSumValues= {"Dementia": 0 ,"Cardiovascular diseases": 0 ,"Kidney disease": 0 ,"Respiratory disease": 0 ,"Liver disease": 0 ,"Diabetes": 0 ,"Digestive disease": 0 ,"Hepatitis": 0 ,"Cancers": 0 ,"Parkinson's": 0 ,"Fire": 0 ,"Malaria": 0 ,"Drowning": 0 ,"Homicide": 0 ,"HIV/AIDS": 0 ,"Drug disorder": 0 ,"Tuberculosis": 0 ,"Road incidents": 0 ,"Maternal deaths": 0 ,"Neonatal deaths": 0 ,"Alcohol disorder": 0 ,"Natural disasters": 0 ,"Diarrheal diseases": 0 ,"Heat or cold exposure": 0 ,"Nutritional deficiencies": 0 ,"Suicide": 0 ,"Execution": 0 ,"Meningitis": 0 ,"Respiratory infections": 0 ,"Intestinal infectious": 0 ,"Protein-energy malnutrition": 0 ,"Conflict": 0 ,"Terrorism":0}
        let svgWidth = 900;
        let svgHeight = 500;
        this.lineAndBarSvgWidth = 400;
        this.lineAndBarSvgHeight = 350;
        this.deathType = {"Dementia": "NC","Cardiovascular diseases":"NC","Kidney disease":"NC","Respiratory disease":"NC","Liver disease":"NC","Diabetes":"NC","Digestive disease":"NC","Hepatitis":"C","Cancers":"NC","Parkinson's":"NC","Fire":"A","Malaria":"NC","Drowning":"A","Homicide":"CR","HIV/AIDS":"C","Drug disorder":"NC","Tuberculosis":"C","Road incidents":"A","Maternal deaths":"A","Neonatal deaths":"NC","Alcohol disorder":"NC","Natural disasters":"A","Diarrheal diseases":"NC","Heat or cold exposure":"NC","Nutritional deficiencies":"NC","Suicide":"CR","Execution":"CR","Meningitis":"C","Respiratory infections":"NC","Intestinal infectious":"NC","Protein-energy malnutrition":"NC","Conflict":"CR","Terrorism":"CR"};
        this.treeMapWidth = 800;
        this.treeMapHeight = 500;
        this.selectedYears = [2006, 2007, 2008, 2009, 2010];
        this.selectedCountries = ["AFG", "ALB", "NOR", "OMN", "SWE", "SGP"];
        this.padding = 50;
        this.width = this.lineAndBarSvgWidth - 2*this.padding - 50;
        this.height = this.lineAndBarSvgHeight - 2*this.padding;
        d3.select("#treeMap").append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
        d3.select("#infoBox").append("svg")
            .attr("width", this.lineAndBarSvgWidth + 100)
            .attr("height", this.lineAndBarSvgHeight);
        d3.select("#lineChart").append("svg")
            .attr("width", this.lineAndBarSvgWidth + 100)
            .attr("height", this.lineAndBarSvgHeight);
        d3.select("#barChart").append("svg")
            .attr("width", this.lineAndBarSvgWidth + 100)
            .attr("height", this.lineAndBarSvgHeight);
    };
    
    displayBarChart(year){  
        this.selectedYear = year;
        let that = this;
        let barChartData = [];
        let dataBuffer = 2000;
        that.selectedFeaturesData.forEach(function(element){
            if (element["Year"] == that.selectedYear){
                if (element[that.selectedCause]!= undefined){
                    barChartData.push({"country":element["Entity"], "conCode": element["Code"], "CauseValue": element[that.selectedCause]});
                }else{
                    barChartData.push({"country":element["Entity"], "conCode": element["Code"], "CauseValue": 0});
                }
            }
        });
        let textPadding = 70;
        let x = d3.scaleLinear().domain([d3.min(barChartData, function(d) { return d.CauseValue; })-dataBuffer, d3.max(barChartData, function(d) { return d.CauseValue; })+dataBuffer]).range([0, this.height]);
        let y = d3.scaleBand().domain(barChartData.map(function(d) { return d.country; })).range([0, this.width]); 
        
        let xAxis = d3.axisBottom(x).ticks(5);
        let yAxis = d3.axisLeft(y).ticks(5);
        
        let domain = [d3.min(barChartData, function(d) { return d.CauseValue; })-dataBuffer, d3.max(barChartData, function(d) { return d.CauseValue; })+dataBuffer];
        let range = ["#83677B", "#2E1114"];
        let colorScale = d3.scaleQuantile().domain(domain).range(range);

        let svgContainer = d3.select("#barChart").select("svg");
        svgContainer.selectAll("g").remove();
        svgContainer = svgContainer.append("g").attr("transform", "translate(" + this.padding + "," + this.padding + ")");
        
        svgContainer.selectAll("rect")
            .data(barChartData)
            .enter().append("rect")
            .attr("x", 0)
            .attr("height", 25)
            .attr("y", function(d) {return y(d.country)+10; })
            .attr("transform", "translate(" +textPadding+ ",0)")
            .transition().duration(4000)
            .attr("width", function(d) { return x(d.CauseValue); })
            .attr("fill", function(d){return colorScale(d.CauseValue);});
        svgContainer.selectAll("text")
            .data(barChartData)
            .enter()
            .append("text")
            .attr("x", function(d) { return x(d.CauseValue)+80; })
            .attr("y", function(d) {return y(d.country)+25; })
            .text(function(d){return d.CauseValue });
        svgContainer.append("g").attr("transform", "translate("+textPadding+"," + (this.lineAndBarSvgWidth -(2*this.padding) -50 ) + ")").call(xAxis);
        svgContainer.append("g").attr("transform", "translate(" +textPadding+ ",0)").call(yAxis);
        
        svgContainer.append("text")             
            .attr("transform","translate(" + ((this.width/2)+textPadding) + " ," + (this.height + 40) + ")")
            .style("text-anchor", "middle")
            .text("Death Toll");
        svgContainer.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Countries");
    }
    
    creatInfoBox(cause){  
        console.log(cause)
        let svgContainer = d3.select("#infoBox").select("svg");
        svgContainer.append("text")    
            .attr('x', 150)
            .attr('y', 50)
            .style("text-anchor", "middle")
            .text(cause);
            
        svgContainer = d3.select("#infoBox").select("svg");
        svgContainer.append("text")    
            .attr('x', 50)
            .attr('y', 100)
            .style("text-anchor", "middle")
            .text(this.causesOfDeathDetails[cause]);
    }
    displayLineChart(cause){  
        this.selectedCause = cause;
        let that = this;
        let dataBuffer = 1000;
        let yearBuffer = 1;
        let lineChartData = [];
        this.selectedYears.forEach(function(year){
            let yearCauseSum = 0;
            that.selectedFeaturesData.forEach(function(element){
                if (element["Year"] == year){
                    if (element[that.selectedCause] != undefined){
                        yearCauseSum +=  element[that.selectedCause]
                    }
                }
            });
            lineChartData.push({"Year":year, "causeSum":yearCauseSum});
        });
        let textPadding = 70;
        let svgContainer = d3.select("#barChart").select("svg");
        svgContainer.selectAll("g").remove();
        svgContainer = d3.select("#infoBox").select("svg");
        svgContainer.selectAll("text").remove();
        svgContainer = d3.select("#lineChart").select("svg");
        svgContainer.selectAll("g").remove();

        svgContainer = svgContainer.append("g").attr("transform", "translate(" + this.padding + "," + this.padding + ")");
        let x = d3.scaleLinear().domain([Math.min.apply(null, this.selectedYears) - yearBuffer, Math.max.apply(null, this.selectedYears)+ yearBuffer]).range([0, this.width]); 
        let y = d3.scaleLinear().domain([d3.min(lineChartData, function(d) { return d.causeSum; })-dataBuffer, d3.max(lineChartData, function(d) { return d.causeSum; })+dataBuffer]).range([this.height, 0]);
        let xAxis = d3.axisBottom(x).ticks(5);
        let yAxis = d3.axisLeft(y).ticks(5);

        let div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);
        
        let valueline = d3.line()
            .x(function(d) { return x(d.Year); })
            .y(function(d) { return y(d.causeSum); });
        let pathValue = svgContainer.append("path")
            .attr("d", valueline(lineChartData))
            .attr("stroke", "#2E1114")
            .attr("stroke-width", 2)
            .attr("fill", " none")
            .attr("transform", "translate(" +textPadding+ ",0)");
        let totalLength = pathValue.node().getTotalLength();

        pathValue
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition().duration(2000)//harshi
            .attr("stroke-dashoffset", 0);

        svgContainer.selectAll("circle")
            .data(lineChartData)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d.causeSum); })
            .attr("id",  function(d) { return d.Year; })
            .attr("fill", "#ADADAD")
            .attr("stroke", "#644856")
            .attr("stroke-width", 2)
            .attr("transform", "translate(" +textPadding+ ",0)")
            .on("click", function() { that.displayBarChart(this.id); })	
            .on("mouseover", function(d) {		
                div.transition()		
                    .duration(200)		
                    .style("opacity", .9);		
                div	.html("YEAR: "+d.Year + "<br/> Count: "  + d.causeSum)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
                })					
            .on("mouseout", function(d) {		
                div.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
            });;
            
        svgContainer.append("g").attr("transform", "translate("+textPadding+"," + (this.width) + ")").call(xAxis);
        svgContainer.append("g").attr("transform", "translate(" +textPadding+ ",0)").call(yAxis);
        
        svgContainer.append("text")             
            .attr("transform","translate(" + ((this.width/2)+textPadding) + " ," + (this.height + 40) + ")")
            .style("text-anchor", "middle")
            .text("Year");
        svgContainer.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("x",0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Death Toll");
        this.creatInfoBox(cause)
    }
    createTreeMap(causesOfDeathData){
        let domain = [d3.min(causesOfDeathData, function(d) { return d.sum; }), d3.max(causesOfDeathData, function(d) { return d.sum; })];
        let range = ["#83677B", "#2E1114"];
        let that = this;           
        let colorScale = d3.scaleOrdinal(d3.schemePaired);
        let svgContainer = d3.select("#treeMap").select("svg");
        let treemap = d3.treemap()
            .size([this.treeMapWidth, this.treeMapHeight])
            .round(true)
            .padding(1);
        
        let root = d3.stratify()
            .id(d => d.name)
            .parentId(d => d.parent)
            (causesOfDeathData)
            .sum(d => d.sum)
            .sort((a, b) => b.height - a.height || b.value - a.value);

        treemap(root);
        
        let format = d3.format(",d");
        let cell = svgContainer.selectAll("a")
            .data(root.leaves())
            .enter().append("a")
            .attr("transform", d => "translate(" + d.x0 + "," + d.y0 + ")");
        cell.append("rect")
            .attr("id", d => d.id)
            .attr("height", d => d.y1 - d.y0)
            .transition().duration(4000) 
            .attr("width", d => d.x1 - d.x0)
            .attr("fill",  d=> {
                let a = d.ancestors();
                return colorScale(a[a.length - 2].id); });
        let label = cell.append("text")
            .attr("clip-path", d => d.name);
        label.append("tspan")
            .attr("x", 3)
            .attr("y", 18)
            .text(function(d){
                if(d.x1 - d.x0 > 50){
                    return that.causesOfDeathName[d.id];
                }else{
                    return ""
                }
            });
        label.append("tspan")
            .attr("x", 15)
            .attr("y", 40)
            .text(function(d){
                if(d.x1 - d.x0 > 50){
                    return d.value;
                }else{
                    return ""
                }
            });
            
        cell.selectAll("rect").on("click", function() { 
            that.displayLineChart(this.id);});
        cell.append("title")    
            .text(d =>  d.id + "\n" + d.value)
            .style('fill', "white"); 
        
    }
    update (){
        let that = this;
        d3.csv("../data/annual-number-of-deaths-by-cause.csv").then( causesOfDeath => {
            that.causesOfDeathData.push(causesOfDeath);
            setTimeout(treeMapData(), 3000);
        });
        function treeMapData(){
            that.causesOfDeathData.forEach(function(element){
                element.forEach(function(ele){
                    if (that.selectedYears.includes(parseInt(ele["Year"])) && that.selectedCountries.includes(ele["Code"])){   
                        let dataDict = {};
                        dataDict["Entity"] = ele["Entity"];
                        dataDict["Code"] = ele["Code"];
                        dataDict["Year"] = parseInt(ele["Year"]);
                        if(ele["Dementia"] != ""){
                            that.causesOfDeathSumValues[ "Dementia"] += parseInt(ele["Dementia"]);
                            dataDict["Dementia"] = parseInt(ele["Dementia"]);
                        }if(ele["Cardiovascular diseases"] != ""){
                            that.causesOfDeathSumValues[ "Cardiovascular diseases"] += parseInt(ele["Cardiovascular diseases"]);
                            dataDict["Cardiovascular diseases"] = parseInt(ele["Cardiovascular diseases"]);
                        }if(ele["Kidney disease"] != ""){
                            that.causesOfDeathSumValues[ "Kidney disease"] += parseInt(ele["Kidney disease"]);
                            dataDict["Kidney disease"] = parseInt(ele["Kidney disease"]);
                        }if(ele["Respiratory disease"] != ""){
                            that.causesOfDeathSumValues[ "Respiratory disease"] += parseInt(ele["Respiratory disease"]);
                            dataDict["Respiratory disease"] = parseInt(ele["Respiratory disease"]);
                        }if(ele["Liver disease"] != ""){
                            that.causesOfDeathSumValues[ "Liver disease"] += parseInt(ele["Liver disease"]);
                            dataDict["Liver disease"] = parseInt(ele["Liver disease"]);
                        }if(ele["Diabetes, blood and endocrine disease"] != ""){
                            that.causesOfDeathSumValues[ "Diabetes"] += parseInt(ele["Diabetes, blood and endocrine disease"]);
                            dataDict["Diabetes"] = parseInt(ele["Diabetes, blood and endocrine disease"]);
                        }if(ele["Digestive disease"] != ""){
                            that.causesOfDeathSumValues[ "Digestive disease"] += parseInt(ele["Digestive disease"]);
                            dataDict["Digestive disease"] = parseInt(ele["Digestive disease"]);
                        }if(ele["Hepatitis"] != ""){
                            that.causesOfDeathSumValues[ "Hepatitis"] += parseInt(ele["Hepatitis"]);
                            dataDict["Hepatitis"] = parseInt(ele["Hepatitis"]);
                        }if(ele["Cancers"] != ""){
                            that.causesOfDeathSumValues[ "Cancers"] += parseInt(ele["Cancers"]);
                            dataDict["Cancers"] = parseInt(ele["Cancers"]);
                        }if(ele["Parkinson's disease"] != ""){
                            that.causesOfDeathSumValues[ "Parkinson's"] += parseInt(ele["Parkinson's disease"]);
                            dataDict["Parkinson's"] = parseInt(ele["Parkinson's disease"]);
                        }if(ele["Fire"] != ""){
                            that.causesOfDeathSumValues[ "Fire"] += parseInt(ele["Fire"]);
                            dataDict["Fire"] = parseInt(ele["Fire"]);
                        }if(ele["Malaria"] != ""){
                            that.causesOfDeathSumValues[ "Malaria"] += parseInt(ele["Malaria"]);
                            dataDict["Malaria"] = parseInt(ele["Malaria"]);
                        }if(ele["Drowning"] != ""){
                            that.causesOfDeathSumValues[ "Drowning"] += parseInt(ele["Drowning"]);
                            dataDict["Drowning"] = parseInt(ele["Drowning"]);
                        }if(ele["Homicide"] != ""){
                            that.causesOfDeathSumValues[ "Homicide"] += parseInt(ele["Homicide"]);
                            dataDict["Homicide"] = parseInt(ele["Homicide"]);
                        }if(ele["HIV/AIDS"] != ""){
                            that.causesOfDeathSumValues[ "HIV/AIDS"] += parseInt(ele["HIV/AIDS"]);
                            dataDict["HIV/AIDS"] = parseInt(ele["HIV/AIDS"]);
                        }if(ele["Drug disorder"] != ""){
                            that.causesOfDeathSumValues[ "Drug disorder"] += parseInt(ele["Drug disorder"]);
                            dataDict["Drug disorder"] = parseInt(ele["Drug disorder"]);
                        }if(ele["Tuberculosis"] != ""){
                            that.causesOfDeathSumValues[ "Tuberculosis"] += parseInt(ele["Tuberculosis"]);
                            dataDict["Tuberculosis"] = parseInt(ele["Tuberculosis"]);
                        }if(ele["Road incidents"] != ""){
                            that.causesOfDeathSumValues[ "Road incidents"] += parseInt(ele["Road incidents"]);
                            dataDict["Road incidents"] = parseInt(ele["Road incidents"]);
                        }if(ele["Maternal deaths"] != ""){
                            that.causesOfDeathSumValues[ "Maternal deaths"] += parseInt(ele["Maternal deaths"]);
                            dataDict["Maternal deaths"] = parseInt(ele["Maternal deaths"]);
                        }if(ele["Neonatal deaths"] != ""){
                            that.causesOfDeathSumValues[ "Neonatal deaths"] += parseInt(ele["Neonatal deaths"]);
                            dataDict["Neonatal deaths"] = parseInt(ele["Neonatal deaths"]);
                        }if(ele["Alcohol disorder"] != ""){
                            that.causesOfDeathSumValues[ "Alcohol disorder"] += parseInt(ele["Alcohol disorder"]);
                            dataDict["Alcohol disorder"] = parseInt(ele["Alcohol disorder"]);
                        }if(ele["Natural disasters"] != ""){
                            that.causesOfDeathSumValues[ "Natural disasters"] += parseInt(ele["Natural disasters"]);
                            dataDict["Natural disasters"] = parseInt(ele["Natural disasters"]);
                        }if(ele["Heat-related deaths (hot or cold exposure)"] != ""){
                            that.causesOfDeathSumValues[ "Heat or cold exposure"] += parseInt(ele["Heat-related deaths (hot or cold exposure)"]);
                            dataDict["Heat or cold exposure"] = parseInt(ele["Heat-related deaths (hot or cold exposure)"]);
                        }if(ele["Nutritional deficiencies"] != ""){
                            that.causesOfDeathSumValues[ "Nutritional deficiencies"] += parseInt(ele["Nutritional deficiencies"]);
                            dataDict["Nutritional deficiencies"] = parseInt(ele["Nutritional deficiencies"]);
                        }if(ele["Suicide"] != ""){
                            that.causesOfDeathSumValues[ "Suicide"] += parseInt(ele["Suicide"]);
                            dataDict["Suicide"] = parseInt(ele["Suicide"]);
                        }if(ele["Execution (deaths)"] != ""){
                            that.causesOfDeathSumValues[ "Execution"] += parseInt(ele["Execution (deaths)"]);
                            dataDict["Execution"] = parseInt(ele["Execution (deaths)"]);
                        }if(ele["Meningitis (deaths)"] != ""){
                            that.causesOfDeathSumValues[ "Meningitis"] += parseInt(ele["Meningitis (deaths)"]);
                            dataDict["Meningitis"] = parseInt(ele["Meningitis (deaths)"]);
                        }if(ele["Lower respiratory infections (deaths)"] != ""){
                            that.causesOfDeathSumValues[ "Respiratory infections"] += parseInt(ele["Lower respiratory infections (deaths)"]);
                            dataDict["Respiratory infections"] = parseInt(ele["Lower respiratory infections (deaths)"]);
                        }if(ele["Intestinal infectious diseases (deaths)"] != ""){
                            that.causesOfDeathSumValues[ "Intestinal infectious"] += parseInt(ele["Intestinal infectious diseases (deaths)"]);
                            dataDict["Intestinal infectious"] = parseInt(ele["Intestinal infectious diseases (deaths)"]);
                        }if(ele["Protein-energy malnutrition (deaths)"] != ""){
                            that.causesOfDeathSumValues[ "Protein-energy malnutrition"] += parseInt(ele["Protein-energy malnutrition (deaths)"]);
                            dataDict["Protein-energy malnutrition"] = parseInt(ele["Protein-energy malnutrition (deaths)"]);
                        }if(ele["Conflict (deaths)"] != ""){
                            that.causesOfDeathSumValues[ "Conflict"] += parseInt(ele["Conflict (deaths)"]);
                            dataDict["Conflict"] = parseInt(ele["Conflict (deaths)"]);
                        }if(ele["Terrorism (deaths)"] != ""){
                            that.causesOfDeathSumValues[ "Terrorism"] += parseInt(ele["Terrorism (deaths)"]);
                            dataDict["Terrorism"] = parseInt(ele["Terrorism (deaths)"]);
                        }
                       that.selectedFeaturesData.push(dataDict); 
                    }
                });
            });
            let causesOfDeathJson = []
            let ele = "";
            causesOfDeathJson.push({"name":"Overall", "parent":"", "sum":undefined});
            causesOfDeathJson.push({"name":"NC", "parent":"Overall", "sum":undefined});
            causesOfDeathJson.push({"name":"C", "parent":"Overall", "sum":undefined});
            causesOfDeathJson.push({"name":"A", "parent":"Overall", "sum":undefined});
            causesOfDeathJson.push({"name":"CR", "parent":"Overall", "sum":undefined});
            for (ele in that.causesOfDeathSumValues){
                causesOfDeathJson.push({"name":ele, "parent": that.deathType[ele], "sum":that.causesOfDeathSumValues[ele].toString()})
            }
            that.createTreeMap(causesOfDeathJson);
        }
    };
}