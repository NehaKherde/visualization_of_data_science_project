class TreeMap {
    constructor(worldMap){
        this.worldMap = worldMap
        this.causesOfDeathData = []
        this.selectedFeaturesData =[]
        this.selectedCause = ""
        this.selectedCauses =[]
        this.selectedYear = 0
        this.causesOfDeathName = {"Dementia": "Dementia","Cardiovascular diseases":"Cardiovascular","Kidney disease":"Kidney","Respiratory disease":"Respiratory","Liver disease":"Liver","Diabetes":"Diabetes","Digestive disease":"Digestive" ,"Hepatitis":"Hepatitis","Cancers":"Cancers","Parkinson's":"Parkinson's","Fire":"Fire","Malaria":"Malaria","Drowning":"Drowning","Homicide":"Homicide","HIV/AIDS":"HIV/AIDS","Drug disorder":"Drugs","Tuberculosis":"Tuberculosis","Road incidents":"Road incidents","Maternal deaths":"Maternal","Neonatal deaths":"Neonatal","Alcohol disorder":"Alcohol","Natural disasters":"Disasters","Diarrheal diseases":"Diarrheal","Heat or cold exposure":"Exposure","Nutritional deficiencies":"Nutrition","Suicide":"Suicide","Execution":"Execution","Meningitis":"Meningitis","Respiratory infections":"Respiratory","Intestinal infectious":"Intestinal","Protein-energy malnutrition":"Protein-energy","Conflict":"Conflict","Terrorism":"Terrorism"};
        this.causesOfDeathDetails= {
            "Causes Of Death": "As global population increases, life expectancy rises, and living standards improve, causes of death across the world are changing.",
            "Dementia": "Not a specific disease, dementia is a group of conditions characterized by impairment of at least two brain functions, such as memory loss and judgment.",
            "Cardiovascular diseases": "Cardiovascular disease (CVD) is a class of diseases that involve the heart or blood vessels.",
            "Kidney disease": "Kidney disease, or renal disease, also known as nephropathy, is damage to or disease of a kidney.",
            "Respiratory disease":"Respiratory disease is a medical term that encompasses pathological conditions affecting the organs and tissues that make gas exchange possible in higher organisms.",
            "Liver disease": "liver disease in the clinical context is a disease process of the liver that involves a process of progressive destruction and regeneration of the liver parenchyma leading to fibrosis and cirrhosis.",
            "Diabetes": "Diabetes mellitus (DM), commonly referred to as diabetes, is a group of metabolic disorders in which there are high blood sugar levels over a prolonged period.",
            "Digestive disease": "Gastrointestinal diseases refer to diseases involving the gastrointestinal tract, namely the esophagus, stomach, small intestine, large intestine and rectum, and the accessory organs of digestion, the liver, gallbladder, and pancreas.",
            "Hepatitis": "Hepatitis is inflammation of the liver tissue.",
            "Cancers": "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.",
            "Parkinson's": "Parkinson's disease (PD) is a long-term degenerative disorder of the central nervous system that mainly affects the motor system.",
            "Fire": "Accidents caused by fire can result in serious injury and damage to personal property.",
            "Malaria":"Malaria is a mosquito-borne infectious disease affecting humans and other animals caused by parasitic single-celled microorganisms belonging to the Plasmodium group.",
            "Drowning":"Drowning is defined as respiratory impairment as a result of being in or under a liquid.",
            "Homicide":"Homicide is the act of one human killing another.",
            "HIV/AIDS":"Human immunodeficiency virus infection and acquired immune deficiency syndrome (HIV/AIDS) is a spectrum of conditions caused by infection with the human immunodeficiency virus (HIV).",
            "Drug disorder":"Substance abuse, also known as drug abuse, is a patterned use of a drug in which the user consumes the substance in amounts or with methods which are harmful to themselves or others.",
            "Tuberculosis":"Tuberculosis generally affects the lungs, but can also affect other parts of the body.",
            "Road incidents":"A traffic collision, occurs when a vehicle collides with another vehicle, pedestrian, animal, road debris, or other stationary obstruction.",
            "Maternal deaths":"Maternal death or maternal mortality is defined by the World Health Organization (WHO) as \"the death of a woman while pregnant or within 42 days of termination of pregnancy, irrespective of the duration and site \nof the pregnancy, from any cause related to or aggravated by the pregnancy or its management but not from vaccidental or incidental causes.\"",
            "Neonatal deaths":"Premature birth is the biggest contributor to the IMR. Other leading causes of infant mortality are birth asphyxia, pneumonia, congenital malformations, term birth complications such as abnormal presentation of \nthe foetus umbilical cord prolapse, or prolonged labor, neonatal infection, diarrhea, malaria, measles and malnutrition. One of the most common preventable causes of infant mortality is \nsmoking during pregnancy. Many factors contribute to infant mortality, such as the mother's level of education, environmental conditions, and political and medical infrastructure. Improving sanitation,\n access to clean drinking water, immunization against infectious diseases, and other public health measures can help reduce high rates of infant mortality.",
            "Alcohol disorder":"Alcoholism, also known as alcohol use disorder (AUD), is a broad term for any drinking of alcohol that results in mental or physical health problems.",
            "Natural disasters":"A natural disaster is a major adverse event resulting from natural processes of the Earth; examples are floods, hurricanes, tornadoes, volcanic eruptions, earthquakes, tsunamis, and other geologic processes. A \nnatural disaster can cause loss of life or property damage, and typically leaves some economic damage in its wake, the severity of which depends on the affected population's resilience, \nor ability to recover and also on the infrastructure available.",
            "Diarrheal diseases":"Diarrhea, also spelled diarrhoea, is the condition of having at least three loose or liquid bowel movements each day. It often lasts for a few days and can result in dehydration due to fluid loss. Signs of \ndehydration often begin with loss of the normal stretchiness of the skin and irritable behaviour. This can progress to decreased urination, loss of skin color, a fast heart rate, and a decrease \nin responsiveness as it becomes more severe. Loose but non-watery stools in babies who are exclusively breastfed, however, are normal",
            "Heat or cold exposure":"Hypothermia is reduced body temperature that happens when a body dissipates more heat than it absorbs. In humans, it is defined as a body core temperature below 35.0 °C (95.0 °F). Symptoms depend on the \ntemperature. In mild hypothermia there is shivering and mental confusion. In moderate hypothermia shivering stops and confusion increases. In severe hypothermia, there may be paradoxical \nundressing, in which a person removes their clothing, as well as an increased risk of the heart stopping. \n \n \n Heat stroke, also known as sun stroke, is a type of severe heat illness that results \nin a body temperature greater than 40.0 °C (104.0 °F) and confusion. Other symptoms include red, dry or damp skin, headache, and dizziness. Onset can be sudden or gradual. Complications may \ninclude seizures, rhabdomyolysis, or kidney failure.",
            "Nutritional deficiencies":"Nutrient deficiency may refer to: Malnutrition, a condition in animals that results from a diet deficient in calories and/or essential nutrients Micronutrient deficiency, a lack of one or more of the \nmicronutrients required for plant or animal health Avitaminosis, any disease caused by chronic or long-term vitamin deficiency or caused by a defect in metabolic conversion Mineral deficiency, \na lack of dietary minerals that are needed for an organism's proper health",
            "Suicide":"Suicide is the act of intentionally causing one's own death. Depression, bipolar disorder, schizophrenia, personality disorders, and substance abuse — including alcoholism and the use of benzodiazepines — are risk \nfactors. Some suicides are impulsive acts due to stress such as from financial difficulties, troubles with relationships, or bullying. Those who have previously attempted suicide are at a higher \nrisk for future attempts. Suicide prevention efforts include limiting access to methods of suicide — such as firearms, drugs, and poisons; treating mental disorders and substance misuse; proper\n media reporting of suicide; and improving economic conditions. Even though crisis hotlines are common, there is little evidence for their effectiveness.",
            "Execution":"Capital punishment, also known as the death penalty, is a government-sanctioned practice whereby a person is killed by the state as a punishment for a crime. The sentence that someone be punished in such a manner is \nreferred to as a death sentence, whereas the act of carrying out the sentence is known as an execution. Crimes that are punishable by death are known as capital crimes or capital offences, \nand they commonly include offences such as murder, treason, espionage, war crimes, crimes against humanity and genocide. Etymologically, the term capital (lit. \"of the head\", derived via the Latin\n capitalis from caput, \"head\") in this context alluded to execution by beheading.",
            "Meningitis":"Meningitis is an acute inflammation of the protective membranes covering the brain and spinal cord, known collectively as the meninges. The most common symptoms are fever, headache, and neck stiffness. Other symptoms \ninclude confusion or altered consciousness, vomiting, and an inability to tolerate light or loud noises. Young children often exhibit only nonspecific symptoms, such as irritability, \ndrowsiness, or poor feeding. If a rash is present, it may indicate a particular cause of meningitis; for instance, meningitis caused by meningococcal bacteria may be accompanied by a characteristic rash.",
            "Respiratory infections":"Respiratory tract infection (RTI) refers to any of a number of infectious diseases involving the respiratory tract. An infection of this type is normally further classified as an upper respiratory tract \ninfection (URI or URTI) or a lower respiratory tract infection (LRI or LRTI). Lower respiratory infections, such as pneumonia, tend to be far more serious conditions than upper respiratory \ninfections, such as the common cold.",
            "Intestinal infectious":"Intestinal infectious diseases include a large number of infections of the bowels including: cholera, typhoid fever, paratyphoid fever, other types of salmonella infections, shigellosis, botulism, gastroenteritis, and amoebiasis among others.",
            "Protein-energy malnutrition":"Protein–energy malnutrition (PEM) is a form of malnutrition that is defined as a range of pathological conditions arising from coincident lack of dietary protein and/or energy (calories) in varying proportions.",
            "Conflict":"In wartime, you'll hear the word casualty used often for someone killed or injured.",
            "Terrorism":"Terrorism is, in the broadest sense, the use of intentionally indiscriminate violence as a means to create terror among masses of people."
        };
        this.causesOfDeathSumValues= {"Dementia": 0 ,"Cardiovascular diseases": 0 ,"Kidney disease": 0 ,"Respiratory disease": 0 ,"Liver disease": 0 ,"Diabetes": 0 ,"Digestive disease": 0 ,"Hepatitis": 0 ,"Cancers": 0 ,"Parkinson's": 0 ,"Fire": 0 ,"Malaria": 0 ,"Drowning": 0 ,"Homicide": 0 ,"HIV/AIDS": 0 ,"Drug disorder": 0 ,"Tuberculosis": 0 ,"Road incidents": 0 ,"Maternal deaths": 0 ,"Neonatal deaths": 0 ,"Alcohol disorder": 0 ,"Natural disasters": 0 ,"Diarrheal diseases": 0 ,"Heat or cold exposure": 0 ,"Nutritional deficiencies": 0 ,"Suicide": 0 ,"Execution": 0 ,"Meningitis": 0 ,"Respiratory infections": 0 ,"Intestinal infectious": 0 ,"Protein-energy malnutrition": 0 ,"Conflict": 0 ,"Terrorism":0}
        let svgWidth = 800;
        let svgHeight = 500;
        this.lineAndBarSvgWidth = 500;
        this.lineAndBarSvgHeight = 450;
        this.deathType = {"Dementia": "NE","Cardiovascular diseases":"NC","Kidney disease":"NC","Respiratory disease":"RE","Liver disease":"NC","Diabetes":"NC","Digestive disease":"NC","Hepatitis":"C","Cancers":"NC","Parkinson's":"NE","Fire":"A","Malaria":"NC","Drowning":"A","Homicide":"CR","HIV/AIDS":"C","Drug disorder":"NC","Tuberculosis":"RE","Road incidents":"A","Maternal deaths":"A","Neonatal deaths":"A","Alcohol disorder":"AD","Natural disasters":"A","Diarrheal diseases":"NC","Heat or cold exposure":"NC","Nutritional deficiencies":"NU","Suicide":"CR","Execution":"CR","Meningitis":"C","Respiratory infections":"RE","Intestinal infectious":"NC","Protein-energy malnutrition":"NU","Conflict":"CR","Terrorism":"CR"};
        this.treeMapWidth = 800;
        this.treeMapHeight = 500;
        this.selectedYear = 0;
        this.lineSelectedYear = 0;
        this.selectedYears = [];
        this.selectedCountries = ["USA", "CAN"];
        this.allContries = true;
        this.allYears = false;
        this.padding = 50;
        this.width = this.lineAndBarSvgWidth - 2*this.padding - 50;
        this.height = this.lineAndBarSvgHeight - 2*this.padding;
        d3.select("#treeMap").append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
        d3.select("#infoBox").append("svg")
            .attr("width", "100%")
            .attr("height", 200);
        this.creatInfoBox("Causes Of Death");
        d3.select("#lineChart").append("svg")
            .attr("width", this.lineAndBarSvgWidth + 100)
            .attr("height", this.lineAndBarSvgHeight);
        d3.select("#barChart").append("svg")
            .attr("width", this.lineAndBarSvgWidth + 100)
            .attr("height", this.lineAndBarSvgHeight);
    };
    
    displayBarChart(year, cause){  
        this.selectedCause = cause;
        this.lineSelectedYear = year;
        let that = this;
        let barChartData = [];
        let barData= [];
        let dataBuffer = 2000;
        that.selectedFeaturesData.forEach(function(element){
            if (element["Year"] == that.lineSelectedYear && that.selectedCountries.includes(element["Code"]) ){
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
            .transition().duration(3000)
            .attr("width", function(d) { return x(d.CauseValue); })
            .attr("fill", function(d){return colorScale(d.CauseValue);});
        svgContainer.selectAll("text")
            .data(barChartData)
            .enter()
            .append("text")
            .attr("y", function(d) {return y(d.country)+25; })
            .transition().duration(3000)    
            .attr("x", function(d) { return x(d.CauseValue)+80; })
            .text(function(d){return d.CauseValue });
        svgContainer.append("g").attr("transform", "translate("+textPadding+"," + (this.lineAndBarSvgWidth -(2*this.padding) -50 ) + ")").call(xAxis);
        svgContainer.append("g").attr("transform", "translate(" +textPadding+ ",0)").call(yAxis);
        svgContainer.append("text")             
            .attr("transform","translate(" + ((this.width/2)+textPadding) + " ," + (this.height + 40) + ")")
            .style("text-anchor", "middle")
            .text("Death Toll");
        svgContainer.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -20)
            .attr("x",0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Countries");
        svgContainer.append("text")
            .attr("y", -50)
            .attr("x",300)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(cause + "-" + year)
            .style("fill", "#2E1114")
            .style("font-weight", "bold")
            .style("font-size", "20px");
    }
    
    creatInfoBox(cause){  
        let that = this;
        let svgContainer = d3.select("#infoBox").select("svg");
        let text = svgContainer.selectAll("text")
            .data(cause)
            .enter()
            .append("text")
            .attr("x", 20)
            .attr("y", 20);
        text.append("tspan").text(cause).attr("class", "title");
        text.selectAll("tspan.text")
            .data(this.causesOfDeathDetails[cause].split("\n"))
            .enter()
            .append("tspan")
            .attr("class", "text")
            .text(d => d)
            .attr("x", 20)
            .attr("dx", 10)
            .attr("dy", 22);
    }
    displayLineChart(cause){  
        if(this.selectedCauses.includes(cause)){
            delete this.selectedCauses[this.selectedCauses.indexOf(cause)];
        }else{
            this.selectedCauses.push(cause);
        }
        let that = this;
        let dataBuffer = 1000;
        let yearBuffer = 1;
        let lineChartData = [];
        let causeData = {};
        let svgContainer ;
        let x;
        let y;
        let textPadding = 70;  
        this.selectedCauses.forEach(function(cause){
            that.selectedCause = cause;
            let cData = []
            that.selectedYears.forEach(function(year){
                let yearCauseSum = 0;
                that.selectedFeaturesData.forEach(function(element){
                    if (element["Year"] == year){
                        if (element[that.selectedCause] != undefined){
                            yearCauseSum +=  element[that.selectedCause]
                        }
                    }
                });
                lineChartData.push({"cause":that.selectedCause,"Year":year, "causeSum":yearCauseSum});
                cData.push({"Year":year, "causeSum":yearCauseSum});
            });
            causeData[cause] = cData;
            svgContainer = d3.select("#barChart").select("svg");
            svgContainer.selectAll("g").remove();
            svgContainer = d3.select("#infoBox").select("svg");
            svgContainer.selectAll("text").remove();
            svgContainer = d3.select("#lineChart").select("svg");
            svgContainer.selectAll("g").remove();
            svgContainer = svgContainer.append("g").attr("transform", "translate(" + that.padding + "," + that.padding + ")");
            x = d3.scaleLinear().domain([Math.min.apply(null, that.selectedYears) - yearBuffer, Math.max.apply(null, that.selectedYears)+ yearBuffer]).range([0, that.width]); 
            y = d3.scaleLinear().domain([d3.min(lineChartData, function(d) { return d.causeSum; })-dataBuffer, d3.max(lineChartData, function(d) { return d.causeSum; })+dataBuffer]).range([that.height, 0]);
            let xAxis = d3.axisBottom(x).ticks(5);
            let yAxis = d3.axisLeft(y).ticks(5);
            let div = d3.select("body").append("div")
            .attr("class", "tooltip")				
            .style("opacity", 0);
            svgContainer.selectAll("circle")
                .data(lineChartData)
                .enter().append("circle")
                .attr("r", function(d) { 
                    if(d.Year == that.selectedYear){
                        return 7;
                    }else{
                        return 5;
                    }
                })
                .attr("cx", function(d) { return x(d.Year); })
                .attr("cy", function(d) { return y(d.causeSum); })
                .attr("id",  function(d) { return d.Year+"-"+d.cause; })
                .attr("fill", function(d) { 
                    if(d.Year == that.selectedYear){
                        return  "#ffffff";
                    }else{
                        return "#ADADAD";
                    }
                })
                .attr("stroke", function(d) { 
                    if(d.Year == that.selectedYear){
                        return  "#000000";
                    }else{
                        return "#644856";
                    }
                })
                .attr("stroke-width", 2)
                .attr("transform", "translate(" +textPadding+ ",0)")
                .on("click", function() { that.displayBarChart(parseInt(this.id.split("-")[0]), this.id.split("-")[1]); })	
                .on("mouseover", function(d) {		
                    div.transition()		
                        .duration(200)		
                        .style("opacity", .9);		
                    div	.html("YEAR: "+d.Year + "<br/> Count: "  + d.causeSum + "<br/> Click Me !! ")	
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top", (d3.event.pageY - 28) + "px");	
                    })					
                .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });
            svgContainer.append("g").attr("transform", "translate("+textPadding+"," + (that.width) + ")").call(xAxis);
            svgContainer.append("g").attr("transform", "translate(" +textPadding+ ",0)").call(yAxis);
            svgContainer.append("text")             
                .attr("transform","translate(" + ((that.width/2)+textPadding) + " ," + (that.height + 40) + ")")
                .style("text-anchor", "middle")
                .text("Year");
            svgContainer.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -20)
                .attr("x",0 - (that.height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Death Toll");
        });
        svgContainer.append("text")
            .attr("y", -50)
            .attr("x",300)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(cause)
            .style("fill", "#2E1114")
            .style("font-weight", "bold")
            .style("font-size", "20px");
        this.selectedCauses.forEach(function(cause){
            let valueline = d3.line()
                .x(function(d) { return x(d.Year); })
                .y(function(d) { return y(d.causeSum); });
            let pathValue = svgContainer.append("path")
            .attr("d", valueline(causeData[cause]))
            .attr("stroke", "#2E1114")
            .attr("stroke-width", 2)
            .attr("fill", " none")
            .attr("transform", "translate(" +textPadding+ ",0)");
            let totalLength = pathValue.node().getTotalLength();
            pathValue
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition().duration(2000)
            .attr("stroke-dashoffset", 0);
        });
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
        let cell = svgContainer.selectAll("a")
            .data(root.leaves())
            .enter().append("a")
            .attr("transform", d => "translate(" + d.x0 + "," + d.y0 + ")");
        cell.append("rect")
            .attr("id", d => d.id)
            .attr("height", d => d.y1 - d.y0)
            .transition().duration(4000) 
            .attr("width", d => d.x1 - d.x0)
            .attr("fill",  d => {
                let a = d.ancestors();
                return colorScale(a[a.length - 2].id); });
            // .on("mouseover", function(d) {		
            //     div.transition()		
            //         .duration(200)		
            //         .style("opacity", .9);		
            //     div	.html("YEAR: "+d.Year + "<br/> Count: "  + d.causeSum)	
            //         .style("left", (d3.event.pageX) + "px")		
            //         .style("top", (d3.event.pageY - 28) + "px");	
            //     })					
            // .on("mouseout", function(d) {		
            //     div.transition()		
            //         .duration(500)		
            //         .style("opacity", 0);	
            // });
        let label = cell.append("text")
            .attr("clip-path", d => d.name);
        label.append("tspan")
            .attr("x", 3)
            .attr("y", 18)
            .text(function(d){
                if(d.x1 - d.x0 > 50 && d.y1 -d.y0 >25){
                    return that.causesOfDeathName[d.id];
                }else{
                    return ""
                }
            });
        label.append("tspan")
            .attr("x", 15)
            .attr("y", 40)
            .text(function(d){
                if(d.x1 - d.x0 > 50 && d.y1 - d.y0 >50){
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
    update(year){
        this.selectedYear =  parseInt(year);
        let tempYear =  parseInt(year) - 3;
        while(tempYear <=  parseInt(year)+3){
            if(tempYear >= 1990 && tempYear <=2016){
                this.selectedYears.push(tempYear);
            }
            tempYear += 1;
        }
        let that = this;
        d3.csv("../data/annual-number-of-deaths-by-cause.csv").then( causesOfDeath => {
            that.causesOfDeathData.push(causesOfDeath);
            setTimeout(treeMapData(), 3000);
        });
        function treeMapData(){
            that.causesOfDeathData.forEach(function(element){
                element.forEach(function(ele){
                    if (that.selectedYears.includes(parseInt(ele["Year"])) && (that.allContries || that.selectedCountries.includes(ele["Code"]))){   
                        let dataDict = {};
                        dataDict["Entity"] = ele["Entity"];
                        dataDict["Code"] = ele["Code"];
                        dataDict["Year"] = parseInt(ele["Year"]);
                        if(ele["Dementia"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Dementia"] += parseInt(ele["Dementia"]);
                            }
                            dataDict["Dementia"] = parseInt(ele["Dementia"]);
                        }if(ele["Cardiovascular diseases"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Cardiovascular diseases"] += parseInt(ele["Cardiovascular diseases"]);
                            }
                            dataDict["Cardiovascular diseases"] = parseInt(ele["Cardiovascular diseases"]);
                        }if(ele["Kidney disease"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Kidney disease"] += parseInt(ele["Kidney disease"]);
                            }
                            dataDict["Kidney disease"] = parseInt(ele["Kidney disease"]);
                        }if(ele["Respiratory disease"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Respiratory disease"] += parseInt(ele["Respiratory disease"]);
                            }
                            dataDict["Respiratory disease"] = parseInt(ele["Respiratory disease"]);
                        }if(ele["Liver disease"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Liver disease"] += parseInt(ele["Liver disease"]);
                            }
                            dataDict["Liver disease"] = parseInt(ele["Liver disease"]);
                        }if(ele["Diabetes, blood and endocrine disease"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Diabetes"] += parseInt(ele["Diabetes, blood and endocrine disease"]);
                            }
                            dataDict["Diabetes"] = parseInt(ele["Diabetes, blood and endocrine disease"]);
                        }if(ele["Digestive disease"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Digestive disease"] += parseInt(ele["Digestive disease"]);
                            }
                            dataDict["Digestive disease"] = parseInt(ele["Digestive disease"]);
                        }if(ele["Hepatitis"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Hepatitis"] += parseInt(ele["Hepatitis"]);
                            }
                            dataDict["Hepatitis"] = parseInt(ele["Hepatitis"]);
                        }if(ele["Cancers"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Cancers"] += parseInt(ele["Cancers"]);
                            }
                            dataDict["Cancers"] = parseInt(ele["Cancers"]);
                        }if(ele["Parkinson's disease"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Parkinson's"] += parseInt(ele["Parkinson's disease"]);
                            }
                            dataDict["Parkinson's"] = parseInt(ele["Parkinson's disease"]);
                        }if(ele["Fire"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Fire"] += parseInt(ele["Fire"]);
                            }
                            dataDict["Fire"] = parseInt(ele["Fire"]);
                        }if(ele["Malaria"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Malaria"] += parseInt(ele["Malaria"]);
                            }
                            dataDict["Malaria"] = parseInt(ele["Malaria"]);
                        }if(ele["Drowning"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Drowning"] += parseInt(ele["Drowning"]);
                            }
                            dataDict["Drowning"] = parseInt(ele["Drowning"]);
                        }if(ele["Homicide"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Homicide"] += parseInt(ele["Homicide"]);
                            }
                            dataDict["Homicide"] = parseInt(ele["Homicide"]);
                        }if(ele["HIV/AIDS"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "HIV/AIDS"] += parseInt(ele["HIV/AIDS"]);
                            }
                            dataDict["HIV/AIDS"] = parseInt(ele["HIV/AIDS"]);
                        }if(ele["Drug disorder"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Drug disorder"] += parseInt(ele["Drug disorder"]);
                            }
                            dataDict["Drug disorder"] = parseInt(ele["Drug disorder"]);
                        }if(ele["Tuberculosis"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Tuberculosis"] += parseInt(ele["Tuberculosis"]);
                            }
                            dataDict["Tuberculosis"] = parseInt(ele["Tuberculosis"]);
                        }if(ele["Road incidents"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Road incidents"] += parseInt(ele["Road incidents"]);
                            }
                            dataDict["Road incidents"] = parseInt(ele["Road incidents"]);
                        }if(ele["Maternal deaths"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Maternal deaths"] += parseInt(ele["Maternal deaths"]);
                            }
                            dataDict["Maternal deaths"] = parseInt(ele["Maternal deaths"]);
                        }if(ele["Neonatal deaths"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Neonatal deaths"] += parseInt(ele["Neonatal deaths"]);
                            }
                            dataDict["Neonatal deaths"] = parseInt(ele["Neonatal deaths"]);
                        }if(ele["Alcohol disorder"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Alcohol disorder"] += parseInt(ele["Alcohol disorder"]);
                            }
                            dataDict["Alcohol disorder"] = parseInt(ele["Alcohol disorder"]);
                        }if(ele["Natural disasters"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Natural disasters"] += parseInt(ele["Natural disasters"]);
                            }
                            dataDict["Natural disasters"] = parseInt(ele["Natural disasters"]);
                        }if(ele["Heat-related deaths (hot or cold exposure)"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Heat or cold exposure"] += parseInt(ele["Heat-related deaths (hot or cold exposure)"]);
                            }
                            dataDict["Heat or cold exposure"] = parseInt(ele["Heat-related deaths (hot or cold exposure)"]);
                        }if(ele["Nutritional deficiencies"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Nutritional deficiencies"] += parseInt(ele["Nutritional deficiencies"]);
                            }
                            dataDict["Nutritional deficiencies"] = parseInt(ele["Nutritional deficiencies"]);
                        }if(ele["Suicide"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Suicide"] += parseInt(ele["Suicide"]);
                            }
                            dataDict["Suicide"] = parseInt(ele["Suicide"]);
                        }if(ele["Execution (deaths)"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Execution"] += parseInt(ele["Execution (deaths)"]);
                            }
                            dataDict["Execution"] = parseInt(ele["Execution (deaths)"]);
                        }if(ele["Meningitis (deaths)"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Meningitis"] += parseInt(ele["Meningitis (deaths)"]);
                            }
                            dataDict["Meningitis"] = parseInt(ele["Meningitis (deaths)"]);
                        }if(ele["Lower respiratory infections (deaths)"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Respiratory infections"] += parseInt(ele["Lower respiratory infections (deaths)"]);
                            }
                            dataDict["Respiratory infections"] = parseInt(ele["Lower respiratory infections (deaths)"]);
                        }if(ele["Intestinal infectious diseases (deaths)"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Intestinal infectious"] += parseInt(ele["Intestinal infectious diseases (deaths)"]);
                            }
                            dataDict["Intestinal infectious"] = parseInt(ele["Intestinal infectious diseases (deaths)"]);
                        }if(ele["Protein-energy malnutrition (deaths)"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Protein-energy malnutrition"] += parseInt(ele["Protein-energy malnutrition (deaths)"]);
                            }
                            dataDict["Protein-energy malnutrition"] = parseInt(ele["Protein-energy malnutrition (deaths)"]);
                        }if(ele["Conflict (deaths)"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Conflict"] += parseInt(ele["Conflict (deaths)"]);
                            }
                            dataDict["Conflict"] = parseInt(ele["Conflict (deaths)"]);
                        }if(ele["Terrorism (deaths)"] != ""){
                            if(that.selectedYear == parseInt(ele["Year"])){
                                that.causesOfDeathSumValues[ "Terrorism"] += parseInt(ele["Terrorism (deaths)"]);
                            }
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
            causesOfDeathJson.push({"name":"RE", "parent":"Overall", "sum":undefined});
            causesOfDeathJson.push({"name":"NE", "parent":"Overall", "sum":undefined});
            causesOfDeathJson.push({"name":"NU", "parent":"Overall", "sum":undefined});
            causesOfDeathJson.push({"name":"AD", "parent":"Overall", "sum":undefined});
            for (ele in that.causesOfDeathSumValues){
                causesOfDeathJson.push({"name":ele, "parent": that.deathType[ele], "sum":that.causesOfDeathSumValues[ele].toString()})
            }
            that.createTreeMap(causesOfDeathJson);
        }
    };
}