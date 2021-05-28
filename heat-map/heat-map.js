const projectName = "heat-map"
//project by @galdiatorocks

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then(res => res.json())
  .then(res => {
  
  const {monthlyVariance} = res;
//console.log(monthlyVariance);
  charting(monthlyVariance);
});

function charting(variance) {

  variance.forEach(d => d.month -= 1);
  
//console.log(variance);
  

  
  const height = 500;
  const width = 950;
  const padding = {
    top: 30,
    bottom: 100,
    left: 100,
    right: 30
  }
  
const  minTemp = d3.min(variance, d => (d.variance + 8.66));
const  maxTemp = d3.max(variance, d => (d.variance + 8.66));
const  diff = (maxTemp-minTemp) / 11;
  var gradientt = ['#000000','#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'];
  gradientt = gradientt.reverse();
  
 var color = d3.scaleThreshold()
                 .domain(d3.range(minTemp, maxTemp, diff))
                 .range(gradientt)
//console.log((maxTemp-minTemp)/diff);
 
//console.log(minTemp, color(minTemp), maxTemp, color(maxTemp), color(3), color(4), color(5)) 
  
  const barHeight = (height - padding.top - padding.bottom) / 12;
  const barWidth = (width-padding.left-padding.right) / (variance.length / 12)
  
  const minX = d3.min(variance, d => d.year);
  const maxX = d3.max(variance, d => d.year);
  const minY = 1;
  const maxY = 12;
  
//console.log(minX, minY);
  const tip = d3.tip()
              .attr("class", "d3-tip")
              .attr("id", "tooltip")
              .html(function(d){
//console.log(d);
                return d})
              .direction("n")
              .offset([-10,0]);
  
  
  const svg = d3.select("#heatmap").append("svg")
              .attr("width", width)
              .attr("height", height);
              
  svg.call(tip);
  
  const xScale = d3.scaleLinear()
                   .domain([minX - 1, maxX + 1])
                   .range([padding.left, width-padding.right])
  
  const yScale = d3.scaleBand()
                   .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
                   .rangeRound([padding.top, height-padding.bottom])
                   .padding(0);
    
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))
                  .tickSize(10,1);
  const yAxis = d3.axisLeft(yScale).tickValues(yScale.domain())                  .tickFormat(function(month){
                     var date = new Date(0);
                     date.setUTCMonth(month);
                     var mon = d3.timeFormat("%B");
                      return mon(date); })
                .tickSize(10,1);

                   
  
  svg.append("g")
     .attr('transform',`translate(0, ${height - padding.bottom})`)
     .call(xAxis)
     .attr("id", "x-axis")
  .append("text")
      .text("Years")
      .style("text-anchor", "middle")
      .attr("transform", `translate(${xScale(width/2)}, 30)`);
  
  svg.append("g")
     .attr('transform',`translate(${padding.left},0)`)
     .call(yAxis)
     .attr("id","y-axis")
      .append("text")
      .text("Months")
      .style("text-anchor", "middle")
  //    .attr("transform", `translate(-30, ${yScale(height/2)}) rotate(90)`);
;

//console.log(gradientt[Math.ceil((2+8.66-minTemp)/diff)-1]);
  
  svg.selectAll("rect")
     .data(variance)
     .enter()
     .append("rect")
     .attr("class", "cell")
     .attr("data-year",d => d.year)
     .attr("data-month",d => d.month)
     .attr("data-temp",d => d.variance+8.66)
     .attr("x", (d) => xScale(d.year))
     .attr("y", (d) => yScale(d.month))
     .attr("width", barWidth)
     .attr("height", barHeight)
     .style("fill", d => color(d.variance+8.66))
     //.style("fill", (d) => gradientt[Math.ceil((d.variance+8.66-minTemp)/diff)-1])
     .on("mouseover", function(d) {
    var date = new Date(d.year, d.month);
    var str = `
        <span class = 'Date'> ${d3.timeFormat("%Y - %B")(date)}</span><br/>
        <span class= 'temperature'>${d3.format('+.1f')(d.variance + 8.66)}&#8451; </span><br/>
        <span class='variance'>${d3.format('+.1f')(d.variance)}&#8451; </span>`;
    tip.attr("data-year", d.year);
    tip.show(str, this); })
     .on("mouseout", tip.hide);

  //legend
    
  var array = [];
  for (var i=0; i<11; i++){
    array.push(minTemp + diff*i);
    };
   
  var legend = svg.append("g")
                           .attr("class", "legend")
                           .attr("id", "legend")
                           .attr('transform', `translate(${padding.left}, ${height-padding.bottom+30})`) 
  
//console.log(array, gradientt);
  
   const legendScale = d3.scaleLinear()
                      .domain([minTemp, maxTemp])
                      .range([50,400]);
  
                       
   const legendrect = legend.selectAll("rect")
          .data(color.range().map(d => {
             d = color.invertExtent(d);
            
             if(d[0] == null) d[0] = legendScale.domain()[0];
             if(d[1] == null) d[1] = legendScale.domain()[1];
            return d;
          }))
          .enter()
          .append("rect")
          .attr("width",d => {
            return (legendScale(d[1]) - legendScale(d[0]))
          })
          .attr("height",20)
          .attr("x",(d) => legendScale(d[0]))
          .attr("y", 0)
          .style("fill", (d) => color(d[0]))
  
   legend.call(d3.axisBottom(legendScale)
         .tickSize(25)
         .tickFormat(d3.format(".1f"))
         .tickValues(color.domain()))
         .select(".domain")
         .remove();
   
}