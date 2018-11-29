drawWordCloud();

function drawWordCloud() {
  // word_count = {'Beer Consumption':2, 'Child Mortality':4, 'Disability':1, 'Life Expectancy':4, 'Maternal Mortality':2, 'Median Age':1, 'Polio':2, 'Vaccine':3, 'Cancer':4, 'Alcohol':4, 'Expenditure':2, 'Deaths':3, 'Diseases':2, 'Suicide':4, 'Homicide':5, 'Deficiencies':3, 'Protein-Energy':2, 'Natural Disasters':3, 'Heat-related':5, 'Diarrheal':3, 'Road':2, 'Tuberculosis':3, 'HIV/AIDS':4, 'Drowning':1, 'Malaria':1, 'Fire':1, 'Hepatitis':4, 'Digestive':2, 'Diabetes':1, 'Liver':2, 'Respiratory':1, 'Kidney':1, 'Cardiovascular':4, 'Drug':2, 'Alcohol':1, "Parkinson's":1, 'Dementia':1}
  
  word_count = {'Beer Consumption':3, 
                'Child Mortality':3,
                'Life Expectancy':3,
                'Maternal Mortality':3,
                'Median Age':3,
                'Polio Vaccine':3,
                'Healthcare Expenditure':3,
                'Deaths':3,
                'Diseases':3,
                'Suicide':3,
                'Cancer':3,
                'Alcohol use disorders':3,
                'Mental and substance disorders':3,
                'Rwanda':1,
                'Japan':1, 
                'China':1, 
                'United States':1, 
                'India':1,
                'United Kingdom':1, 
                'Czech Repuclic':1,
                'Mexico':1,
                'Honduras':1, 
                'Ghana':1, 
                'Russia':1,
                'Serbia':1, 
                'Comoros':1, 
                'Kazakhstan':1, 
                'Liberia':1, 
                'Hungary':1, 
                'Gabon':1, 
                'Guatemala':1, 
                'Portugal':1, 
                'Myanmar':1, 
                'Laos':1, 
                'Suriname':1, 
                'Paraguay':1, 
                'Armenia':1,
                'Poland':1,
                'Marshall Islands':1,
                'Tajikistan':1,
                'Belarus':1,
                'Norway':1,
                'Kiribati':1,
                'Sierra Leone':1,
                'Kenya':1,
                'Oman':1,
                'Saint Lucia':1,
                'American Samoa':1,
                'Thailand':1,
                'Spain':1,
                'Germany':1,
                'Northern Mariana Islands':1  
              }
  var svg_location = "#chart";
  var width = 960;
  var height = 300;

  // var fill = d3.scale.category20();


  var word_entries = d3.entries(word_count);

  var xScale = d3.scale.linear()
     .domain([0, d3.max(word_entries, function(d) {
        return d.value;
      })
     ])
     .range([11,38]);

  d3.layout.cloud().size([width, height])
    .timeInterval(20)
    .words(word_entries)
    .fontSize(function(d) { return xScale(+d.value); })
    .text(function(d) { return d.key; })
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .on("end", draw)
    .start();

  function draw(words) {
    d3.select(svg_location).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return xScale(d.value) + "px"; })
        .style("font-family", "Helvetica Neue, Arial")
        .style("fill", function(d, i) { return filling(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.key; });
  }

  function filling(i){
     // let val = d;
     let val = i%3;
     let range = ["#d5a928","#939597"]
     // let range = ["#d5a928", "#939597"]
     // if(val.value == 3){
     //    return range[0] 
     // }
     // else{
     //    return range[1] 
     // }
     return range[val]
  }
  d3.layout.cloud().stop();
}