class TreeMap {
    constructor(worldMap){
        this.worldMap = worldMap
        this.causesOfDeathData = []
        this.selectedFeaturesData =[]
        this.selectedCause = ""
        this.selectedYear = 0
        this.causesOfDeathName = {"Dementia": "Dementia","Cardiovascular diseases":"Cardiovascular","Kidney disease":"Kidney","Respiratory disease":"Respiratory","Liver disease":"Liver","Diabetes":"Diabetes","Digestive disease":"Digestive" ,"Hepatitis":"Hepatitis","Cancers":"Cancers","Parkinson's":"Parkinson's","Fire":"Fire","Malaria":"Malaria","Drowning":"Drowning","Homicide":"Homicide","HIV/AIDS":"HIV/AIDS","Drug disorder":"Drugs","Tuberculosis":"Tuberculosis","Road incidents":"Road incidents","Maternal deaths":"Maternal","Neonatal deaths":"Neonatal","Alcohol disorder":"Alcohol","Natural disasters":"Disasters","Diarrheal diseases":"Diarrheal","Heat or cold exposure":"Exposure","Nutritional deficiencies":"Nutrition","Suicide":"Suicide","Execution":"Execution","Meningitis":"Meningitis","Respiratory infections":"Respiratory","Intestinal infectious":"Intestinal","Protein-energy malnutrition":"Protein-energy","Conflict":"Conflict","Terrorism":"Terrorism"};
        this.causesOfDeathDetails= {
            "Dementia": "Not a specific disease, dementia is a group of conditions characterized by impairment of at least two brain functions, \nsuch as memory loss and judgment. \n\nSymptoms include forgetfulness, limited social skills, and thinking abilities so impaired that it interferes with daily functioning. \n \n Medications and therapies may help manage symptoms. Some causes are reversible.",
            "Cardiovascular diseases": "Cardiovascular disease (CVD) is a class of diseases that involve the heart or blood vessels. Cardiovascular disease \nincludes coronary artery diseases (CAD) such as angina and myocardial infarction (commonly known as a heart attack). \nOther CVDs include stroke, heart failure, hypertensive heart disease, rheumatic \nheart disease, cardiomyopathy, \nheart arrhythmia, congenital heart disease, valvular heart disease, carditis, aortic aneurysms, \nperipheral artery disease, thromboembolic disease, and venous thrombosis.",
            "Kidney disease": "Kidney disease, or renal disease, also known as nephropathy, is damage to or disease of a kidney. \nNephritis is an inflammatory kidney disease and has several types according to the location of the inflammation. \nInflammation can be diagnosed by blood tests. Nephrosis is non-inflammatory kidney disease. Nephritis and \nnephrosis can give rise to nephritic syndrome and nephrotic syndrome respectively. Kidney disease usually \ncauses a loss of kidney function to some degree and can result in kidney failure, the complete loss of kidney \nfunction. Kidney failure is known as the end-stage of kidney disease, where dialysis or a \nkidney transplant is the only treatment option.",
            "Respiratory disease":"Respiratory disease is a medical term that encompasses pathological conditions affecting the \norgans and tissues that make gas exchange possible in higher organisms, and includes conditions of the upper \nrespiratory tract, trachea, bronchi, bronchioles, alveoli, pleura and pleural cavity, and the nerves and muscles of \nbreathing. Respiratory diseases range from mild and self-limiting, such as the common cold, to life-threatening \nentities like bacterial pneumonia, pulmonary embolism, acute asthma and lung cancer.",
            "Liver disease": "liver disease in the clinical context is a disease process of the liver that involves a process of \nprogressive destruction and regeneration of the liver parenchyma leading to fibrosis and cirrhosis. \"Chronic \nliver disease\" refers to disease of the liver which lasts over a period of six months. It consists of a wide range \nof liver pathologies which include inflammation (chronic hepatitis), liver cirrhosis, and hepatocellular \ncarcinoma. The entire spectrum need not be experienced.",
            "Diabetes": "Diabetes mellitus (DM), commonly referred to as diabetes, is a group of metabolic disorders in which \nthere are high blood sugar levels over a prolonged period. Symptoms of high blood sugar include frequent urination, \nincreased thirst, and increased hunger. If left untreated, diabetes can cause many complications. Acute \ncomplications can include diabetic ketoacidosis, hyperosmolar hyperglycemic state, or death. Serious \nlong-term complications include cardiovascular disease, stroke, chronic kidney disease, foot ulcers, and damage to the \neyes.",
            "Digestive disease": "Gastrointestinal diseases refer to diseases involving the gastrointestinal tract, namely the \nesophagus, stomach, small intestine, large intestine and rectum, and the accessory organs of digestion, the liver, \ngallbladder, and pancreas.",
            "Hepatitis": "Hepatitis is inflammation of the liver tissue. Some people have no symptoms whereas others develop \nyellow discoloration of the skin and whites of the eyes, poor appetite, vomiting, tiredness, abdominal pain, or diarrhea. \nHepatitis may be temporary (acute) or long term (chronic) depending on whether it lasts for less than or more \nthan six months. Acute hepatitis can sometimes resolve on its own, progress to chronic hepatitis, or \nrarely result in acute liver failure. Over time the chronic form may progress to scarring of the liver, liver \nfailure, or liver cancer.",
            "Cancers": "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to \nother parts of the body. These contrast with benign tumors, which do not spread to other parts of the body. Possible \nsigns and symptoms include a lump, abnormal bleeding, prolonged cough, unexplained weight loss and a change in \nbowel movements. While these symptoms may indicate cancer, they may have other causes. Over 100 types of \ncancers affect humans.",
            "Parkinson's": "Parkinson's disease (PD) is a long-term degenerative disorder of the central nervous system that \nmainly affects the motor system. The symptoms generally come on slowly over time. Early in the disease, the most obvious \nare shaking, rigidity, slowness of movement, and difficulty with walking. Thinking and behavioral problems \nmay also occur. Dementia becomes common in the advanced stages of the disease. Depression and anxiety are \nalso common, occurring in more than a third of people with PD. Other symptoms include sensory, sleep, and \nemotional problems. The main motor symptoms are collectively called \"parkinsonism\", or a \n\"parkinsonian syndrome\".",
            "Fire": "Accidents caused by fire can result in serious injury and damage to personal property. Fire hazards are \nnot always obvious in and around the home, so accidents involving fire are often unexpected and sudden. These accidents \ncan occur from faulty wiring, defective products, discarded cigarettes left on flammable materials, and smoke \ndetectors that fail to activate. Car fires can trap victims inside a vehicle. A major concern for anyone \ninvolved in a fire accident is the damage smoke inhalation can cause to the lungs.",
            "Malaria":"Malaria is a mosquito-borne infectious disease affecting humans and other animals caused by parasitic \nsingle-celled microorganisms belonging to the Plasmodium group. Malaria causes symptoms that typically include fever, \ntiredness, vomiting, and headaches. In severe cases it can cause yellow skin, seizures, coma, or death. Symptoms \nusually begin ten to fifteen days after being bitten by an infected mosquito. If not properly treated, \npeople may have recurrences of the disease months later. In those who have recently survived an infection, \nreinfection usually causes milder symptoms. This partial resistance disappears over months to \nyears if the person has no continuing exposure to malaria.",
            "Drowning":"Drowning is defined as respiratory impairment as a result of being in or under a liquid. Drowning \ntypically occurs silently, with only a few people able to wave their hands or call for help. Symptoms following rescue may \ninclude breathing problems, vomiting, confusion, or unconsciousness. Occasionally symptoms may not appear until \nup to six hours afterwards. Drowning may be complicated by low body temperature, aspiration of vomit, or \nacute respiratory distress syndrome.",
            "Homicide":"Homicide is the act of one human killing another. A homicide requires only a volitional act by another \nperson that results in death, and thus a homicide may result from accidental, reckless, or negligent acts even if \nthere is no intent to cause harm. Homicides can be divided into many overlapping legal categories, including murder, \nmanslaughter, justifiable homicide, killing in war (either following the laws of war or as a war crime), \neuthanasia, and capital punishment, depending on the circumstances of the death. These different types of \nhomicides are often treated very differently in human societies; some are considered crimes, while \nothers are permitted or even ordered by the legal system.",
            "HIV/AIDS":"Human immunodeficiency virus infection and acquired immune deficiency syndrome (HIV/AIDS) is a spectrum \nof conditions caused by infection with the human immunodeficiency virus (HIV). Following initial infection, a \nperson may not notice any symptoms or may experience a brief period of influenza-like illness. Typically, this is \nfollowed by a prolonged period with no symptoms. As the infection progresses, it interferes more with the immune \nsystem, increasing the risk of developing common infections such as tuberculosis, as well as other opportunistic \ninfections, and tumors that rarely affect people who have working immune systems. These late \nsymptoms of infection are referred to as acquired immunodeficiency syndrome (AIDS). This stage is often also associated with unintended \nweight loss.",
            "Drug disorder":"Substance abuse, also known as drug abuse, is a patterned use of a drug in which the user consumes \nthe substance in amounts or with methods which are harmful to themselves or others, and is a form of substance-related \ndisorder. Widely differing definitions of drug abuse are used in public health, medical and criminal justice \ncontexts. In some cases criminal or anti-social behavior occurs when the person is under the influence of a drug, \nand long term personality changes in individuals may occur as well. In addition to possible physical, social, \nand psychological harm, use of some drugs may also lead to criminal penalties, although these \nvary widely depending on the local jurisdiction.",
            "Tuberculosis":"Tuberculosis (TB) is an infectious disease usually caused by the bacterium Mycobacterium tuberculosis \n(MTB). Tuberculosis generally affects the lungs, but can also affect other parts of the body. Most infections do \nnot have symptoms, in which case it is known as latent tuberculosis. About 10% of latent infections progress \nto active disease which, if left untreated, kills about half of those infected. The classic symptoms of active TB are a \nchronic cough with blood-containing sputum, fever, night sweats, and weight loss. It was historically called \n\"consumption\" due to the weight loss. Infection of other organs can cause a wide range of symptoms.",
            "Road incidents":"A traffic collision, also called a motor vehicle collision (MVC) among other terms, occurs when a \nvehicle collides with another vehicle, pedestrian, animal, road debris, or other stationary obstruction, such as a \ntree, pole or building. Traffic collisions often result in injury, death, and property damage. A number of \nfactors contribute to the risk of collision, including vehicle design, speed of operation, road design, road environment, \nand driver skill, impairment due to alcohol or drugs, and behavior, notably speeding and street racing. \nWorldwide, motor vehicle collisions lead to death and disability as well as financial costs to both society \nand the individuals involved.",
            "Maternal deaths":"Maternal death or maternal mortality is defined by the World Health Organization (WHO) as \"the \ndeath of a woman while pregnant or within 42 days of termination of pregnancy, irrespective of the duration and site \nof the pregnancy, from any cause related to or aggravated by the pregnancy or its management but not from vaccidental or incidental causes.\"",
            "Neonatal deaths":"Premature birth is the biggest contributor to the IMR. Other leading causes of infant mortality \nare birth asphyxia, pneumonia, congenital malformations, term birth complications such as abnormal presentation of \nthe foetus umbilical cord prolapse, or prolonged labor, neonatal infection, diarrhea, malaria, measles and \nmalnutrition. One of the most common preventable causes of infant mortality is smoking during pregnancy. Many factors \ncontribute to infant mortality, such as the mother's level of education, environmental conditions, and political \nand medical infrastructure. Improving sanitation, access to clean drinking water, immunization against \ninfectious diseases, and other public health measures can help reduce high rates of infant mortality.",
            "Alcohol disorder":"Alcoholism, also known as alcohol use disorder (AUD), is a broad term for any drinking of alcohol \nthat results in mental or physical health problems. The disorder was previously divided into two types: alcohol \nabuse and alcohol dependence. In a medical context, alcoholism is said to exist when two or more of the \nfollowing conditions are present: a person drinks large amounts over a long time period, has difficulty cutting down, acquiring \nand drinking alcohol takes up a great deal of time, alcohol is strongly desired, usage results in not \nfulfilling responsibilities, usage results in social problems, usage results in health problems, usage results \nin risky situations, withdrawal occurs when stopping, and alcohol tolerance has occurred with use. Risky situations include \ndrinking and driving or having unsafe sex, among other things. Alcohol use can affect all parts of the \nbody, but it particularly affects the brain, heart, liver, pancreas and immune system. This can result in mental illness, Wernicke–Korsakoff syndrome, \nirregular heartbeat, liver cirrhosis and increased cancer risk, among other diseases.",
            "Natural disasters":"A natural disaster is a major adverse event resulting from natural processes of the Earth; examples \nare floods, hurricanes, tornadoes, volcanic eruptions, earthquakes, tsunamis, and other geologic processes. A \nnatural disaster can cause loss of life or property damage, and typically leaves some economic damage in \nits wake, the severity of which depends on the affected population's resilience, or ability to recover and also on the \ninfrastructure available.",
            "Diarrheal diseases":"Diarrhea, also spelled diarrhoea, is the condition of having at least three loose or liquid bowel \nmovements each day. It often lasts for a few days and can result in dehydration due to fluid loss. Signs of \ndehydration often begin with loss of the normal stretchiness of the skin and irritable behaviour. This can \nprogress to decreased urination, loss of skin color, a fast heart rate, and a decrease in responsiveness as it becomes more \nsevere. Loose but non-watery stools in babies who are exclusively breastfed, however, are normal",
            "Heat or cold exposure":"Hypothermia is reduced body temperature that happens when a body dissipates more heat than it \nabsorbs. In humans, it is defined as a body core temperature below 35.0 °C (95.0 °F). Symptoms depend on the \ntemperature. In mild hypothermia there is shivering and mental confusion. In moderate hypothermia shivering \nstops and confusion increases. In severe hypothermia, there may be paradoxical undressing, in which a person removes their \nclothing, as well as an increased risk of the heart stopping. \n \n \n Heat stroke, also known as sun stroke, \nis a type of severe heat illness that results in a body temperature greater than 40.0 °C (104.0 °F) and confusion. \nOther symptoms include red, dry or damp skin, headache, and dizziness. Onset can be sudden or gradual. Complications \nmay include seizures, rhabdomyolysis, or kidney failure.",
            "Nutritional deficiencies":"Nutrient deficiency may refer to: Malnutrition, a condition in animals that results from a \ndiet deficient in calories and/or essential nutrients Micronutrient deficiency, a lack of one or more of the \nmicronutrients required for plant or animal health Avitaminosis, any disease caused by chronic or long-term \nvitamin deficiency or caused by a defect in metabolic conversion Mineral deficiency, a lack of dietary minerals that are \nneeded for an organism's proper health",
            "Suicide":"Suicide is the act of intentionally causing one's own death. Depression, bipolar disorder, schizophrenia, \npersonality disorders, and substance abuse — including alcoholism and the use of benzodiazepines — are risk \nfactors. Some suicides are impulsive acts due to stress such as from financial difficulties, troubles with \nrelationships, or bullying. Those who have previously attempted suicide are at a higher risk for future attempts. Suicide \nprevention efforts include limiting access to methods of suicide — such as firearms, drugs, and poisons; treating mental \ndisorders and substance misuse; proper media reporting of suicide; and improving economic conditions. Even \nthough crisis hotlines are common, there is little evidence for their effectiveness.",
            "Execution":"Capital punishment, also known as the death penalty, is a government-sanctioned practice whereby a person \nis killed by the state as a punishment for a crime. The sentence that someone be punished in such a manner is \nreferred to as a death sentence, whereas the act of carrying out the sentence is known as an execution. \nCrimes that are punishable by death are known as capital crimes or capital offences, and they commonly include offences such \nas murder, treason, espionage, war crimes, crimes against humanity and genocide. Etymologically, the term capital (lit. \n\"of the head\", derived via the Latin capitalis from caput, \"head\") in this context alluded to execution \nby beheading.",
            "Meningitis":"Meningitis is an acute inflammation of the protective membranes covering the brain and spinal cord, known \ncollectively as the meninges. The most common symptoms are fever, headache, and neck stiffness. Other symptoms \ninclude confusion or altered consciousness, vomiting, and an inability to tolerate light or loud noises. \nYoung children often exhibit only nonspecific symptoms, such as irritability, drowsiness, or poor feeding. If a rash is present, \nit may indicate a particular cause of meningitis; for instance, meningitis caused by meningococcal bacteria may \nbe accompanied by a characteristic rash.",
            "Respiratory infections":"Respiratory tract infection (RTI) refers to any of a number of infectious diseases involving \nthe respiratory tract. An infection of this type is normally further classified as an upper respiratory tract \ninfection (URI or URTI) or a lower respiratory tract infection (LRI or LRTI). Lower respiratory infections, \nsuch as pneumonia, tend to be far more serious conditions than upper respiratory infections, such as the common cold.",
            "Intestinal infectious":"Intestinal infectious diseases include a large number of infections of the bowels including: \ncholera, typhoid fever, paratyphoid fever, other types of salmonella infections, shigellosis, botulism, gastroenteritis, \nand amoebiasis among others. Typhoid and paratyphoid resulted in 221,000 deaths in 2013 down from \n259,000 deaths in 1990. Other diseases which result in diarrhea caused another 1.3 million additional deaths in 2013 down from \n2.6 million deaths in 1990.",
            "Protein-energy malnutrition":"Protein–energy malnutrition (PEM) is a form of malnutrition that is defined as a range \nof pathological conditions arising from coincident lack of dietary protein and/or energy (calories) in varying \nproportions. EM is fairly common worldwide in both children and adults and accounts for 6 million deaths annually. \nIn the industrialized world, PEM is predominantly seen in hospitals, is associated with disease, or is often found \nin the elderly. Note that PEM may be secondary to other conditions such as chronic renal disease or cancer cachexia in \nwhich protein energy wasting may occur.Protein–energy malnutrition affects children the most because they have \nless protein intake. The few rare cases found in the developed world are almost entirely found in small children as \na result of fad diets, or ignorance of the nutritional needs of children, particularly in cases of milk allergy.",
            "Conflict":"In wartime, you'll hear the word casualty used often for someone killed or injured. But casualty can also \nrefer to deaths or injuries suffered in an accident or some other unfortunate event. The term \"casualties of war\" \nhas been around for a while and refers to the ugly downside of military victory. Anyone who loses life or limb, \neither in the fighting or as a civilian, is called a casualty. If you're feeling poetic, though, you can extend the \nmeaning to include, say, the children of a divorce: while they don't die and aren't physically injured, their emotional \nsuffering qualifies them to be called casualties of their parents' fighting. Driving drunk, too, results in \ncasualties.",
            "Terrorism":"Terrorism is, in the broadest sense, the use of intentionally indiscriminate violence as a means to \ncreate terror among masses of people; or fear to achieve a religious or political aim. It is used in this regard primarily \nto refer to violence against peacetime targets or in war against non-combatants. The terms 'terrorist' and \n'terrorism' originated during the French Revolution of the late 18th century but gained mainstream popularity during the \nU.S. presidency of Ronald Reagan (1981–89) after the 1983 Beirut barracks bombings and again after the 2001 September \n11 attacks and the 2002 Bali bombings."
        };
        this.causesOfDeathSumValues= {"Dementia": 0 ,"Cardiovascular diseases": 0 ,"Kidney disease": 0 ,"Respiratory disease": 0 ,"Liver disease": 0 ,"Diabetes": 0 ,"Digestive disease": 0 ,"Hepatitis": 0 ,"Cancers": 0 ,"Parkinson's": 0 ,"Fire": 0 ,"Malaria": 0 ,"Drowning": 0 ,"Homicide": 0 ,"HIV/AIDS": 0 ,"Drug disorder": 0 ,"Tuberculosis": 0 ,"Road incidents": 0 ,"Maternal deaths": 0 ,"Neonatal deaths": 0 ,"Alcohol disorder": 0 ,"Natural disasters": 0 ,"Diarrheal diseases": 0 ,"Heat or cold exposure": 0 ,"Nutritional deficiencies": 0 ,"Suicide": 0 ,"Execution": 0 ,"Meningitis": 0 ,"Respiratory infections": 0 ,"Intestinal infectious": 0 ,"Protein-energy malnutrition": 0 ,"Conflict": 0 ,"Terrorism":0}
        let svgWidth = 900;
        let svgHeight = 500;
        this.lineAndBarSvgWidth = 600;
        this.lineAndBarSvgHeight = 550;
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
            .attr("width", this.treeMapWidth)
            .attr("height", this.lineAndBarSvgHeight);
        d3.select("#lineChart").append("svg")
            .attr("width", this.lineAndBarSvgWidth + 100)
            .attr("height", this.lineAndBarSvgHeight);
        d3.select("#barChart").append("svg")
            .attr("width", this.lineAndBarSvgWidth + 100)
            .attr("height", this.lineAndBarSvgHeight);
    };
    
    displayBarChart(year){  
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
            .text(year)
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
            .attr("r", function(d) { 
                if(d.Year == that.selectedYear){
                    return 7;
                }else{
                    return 5;
                }
            })
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d.causeSum); })
            .attr("id",  function(d) { return d.Year; })
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
            });
        svgContainer.append("g").attr("transform", "translate("+textPadding+"," + (this.width) + ")").call(xAxis);
        svgContainer.append("g").attr("transform", "translate(" +textPadding+ ",0)").call(yAxis);
        svgContainer.append("text")             
            .attr("transform","translate(" + ((this.width/2)+textPadding) + " ," + (this.height + 40) + ")")
            .style("text-anchor", "middle")
            .text("Year");
        svgContainer.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -20)
            .attr("x",0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Death Toll");
        svgContainer.append("text")
            .attr("y", -50)
            .attr("x",300)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(cause)
            .style("fill", "#2E1114")
            .style("font-weight", "bold")
            .style("font-size", "20px");
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