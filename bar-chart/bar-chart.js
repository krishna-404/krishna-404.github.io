const projectName = 'bar-chart';
//coded by @gladiatorocks

const tooltip = document.getElementById('tooltip');
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(res => {
      const {data} = res;
      // console.log(data);
      charting(data);
    });

function charting(dataset){
  const width = 950;
  const height = 550;
  const padding = 40;
  const barWidth =  (width-padding*2)/dataset.length;
  
  const minX = new Date(d3.min(dataset, (d) => d[0]));
  const maxX = new Date(d3.max(dataset, (d) => d[0]));
  const minY = d3.min(dataset, (d) => d[1]);
  const maxY = d3.max(dataset, (d) => d[1]);
  
 const xScale = d3.scaleTime()
                  .domain([minX,maxX])
                  .range([padding, width-padding]);
  
  const yScale = d3.scaleLinear()
                   .domain([0, maxY])
                   .range([height-padding, padding]);
  
    const svg = d3.select('#Graph').append("svg")
                .attr("width", width)
                .attr("height", height);
                
        svg.selectAll("rect")
           .data(dataset)
           .enter()
           .append("rect")
           .attr("class", "bar")
           .attr("data-date", (d) => d[0])
           .attr("data-gdp", (d) => d[1])
           .attr("x", (d, i) => xScale(new Date(d[0])))
           .attr("y",(d) => yScale(d[1]))
           .attr("width",barWidth)
           .attr("height",(d) => height-padding-yScale(d[1]))
           .on('mouseover', (d, i) => {
            tooltip.classList.add('show');  
            tooltip.style.left = i * barWidth + padding*2 + 'px';
            tooltip.setAttribute('data-date', d[0]);
            tooltip.innerHTML = `
                    ${d[0]}<br/>
                    $ ${d[1]} Billion`;
        }).on('mouseout', () => {
          tooltip.classList.remove('show');
        });
   
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
  
        svg.append("g")
           .attr('transform',`translate(0, ${height-padding})`)
           .call(xAxis)
           .attr("id","x-axis");
  
        svg.append("g")
           .attr("transform",`translate(${padding}, 0)`)
           .call(yAxis)
           .attr("id","y-axis");
  
}

