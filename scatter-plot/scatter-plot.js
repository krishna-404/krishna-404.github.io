const projectName = 'scatter-plot';
//coded by @galdiatorocks


var color = d3.scaleOrdinal(d3.schemeCategory10);

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(res => res.json())
    .then(res => {
        //console.log(res);
        charting(res);
    });

function charting(dataset){
    
    dataset.forEach(function(d){
        let parsedTime = d.Time.split(":");
        d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    });

//console.log(dataset);
  
    const height = 450;
    const width = 750;
    const padding = 40;

    const minX = d3.min(dataset, (d) => d.Year);
    const maxX = d3.max(dataset, (d) => d.Year);
    const minY= new Date(d3.min(dataset, (d) => d.Time));
    const maxY = new Date(d3.max(dataset, (d) => d.Time));
//console.log(minY, maxY)

    const svg = d3.select('#Graph').append("svg")
                  .attr("width", width)
                  .attr("height", height);

    const xScale = d3.scaleLinear()
                     .domain([minX-1, maxX+1])
                     .range([padding, width-padding]);

    const yScale = d3.scaleTime()
                     .domain([minY, maxY])
                     .range([padding, height-padding]);
  const timeFormat = d3.timeFormat("%M:%S")
  
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

    svg.append("g")
       .attr('transform', `translate(0, ${height-padding})`)
       .call(xAxis)
       .attr("id", "x-axis")

    svg.append("g")
       .attr('transform', `translate(${padding},0)`)
       .call(yAxis)
       .attr("id", "y-axis")

  var div = d3.select("#Graph").append("div")
                .attr("id", "tooltip")
                .style("opacity", 0);
  
  
    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("class", "dot")
       .attr("data-xvalue", (d) => d.Year)
       .attr("data-yvalue",(d) => d.Time)
       .attr("cx", (d) => xScale(d.Year))
       .attr("cy", (d) => yScale(new Date(d.Time)))
       .attr("r", 6)
       .style("fill", (d) => color(d.Doping === ""))
       .on('mouseover', function(d) {
//console.log(d.Year);
          div.style("opacity",0.9)
             .style('display', "flex")
             .attr("data-year", d.Year)
             //.style("left", (xScale(d.Year)+7) +"px") 
            .style("left", (d3.event.pageX+7) +"px")
             //.style("top", (yScale(new Date(d.Time))+100)+"px") 
            .style("top", (d3.event.pageY+10) +"px")
             .html(`
            ${d.Name} : ${d.Nationality} <br/>
            Year : ${d.Year}  Time: ${timeFormat(d.Time)}
            ${d.Doping ? ("<br/>" + d.Doping) : ""}
            ${d.Doping ? ("<br/>" + d.URL) : ""}`)
      
//console.log(div.html);
           })
      .on('mouseout', () => {
      div.style('display', 'none');
    })
  
  var legendContainer = svg.append("g")
                 .attr("id", "legend");
  
var legend=  legendContainer.selectAll('#legend')
                            .data(color.domain())
                            .enter()
                            .append("g")
   .attr('transform', function(d,i) {return "translate(0," + (height/3 - i*20)+")";
                                    });    

legend.append("rect")
      .attr("x",width -24)
      .attr("width", 18)
      .attr("height",18)
      .style("fill", color)
      .style("opacity", 0.7);
  
  legend.append("text")
        .attr("x", width-28)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .style("text-anchor", "end")
        .text(function (d){
                if(d) return "No doping allegations";
                else {
                  return "Riders with doping allegations";
                }
  })
}