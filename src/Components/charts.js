import React from 'react';
import * as d3 from 'd3';

export default class RowChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
            {skill: "CSS", value: 60},
            {skill: "HTML", value: 70},
            {skill: "JS", value: 75},
            {skill: "REACT", value: 85},
            {skill: "D3", value: 70},
            { skill: "JAVA", value: 65}],
            yAxisAttribute: "skill",
            xAxisAttribute: "value",
            width: 600,
            height: 300,
        }
        this.chartRef  = React.createRef();
        this.drawChart = this.drawChart.bind(this);
    }
    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        let margin = {top: 20, right: 30, bottom: 40, left: 90},
            width = this.state.width - margin.left - margin.right,
            height = this.state.height - margin.top - margin.bottom;

        let svg = d3.select(".rowChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
         
        // Add X axis
        let x = d3.scaleLinear()
                  .domain([0, 100])
                  .range([ 0, width]);
               
                  svg.append("g")
                     .attr("transform", "translate(0," + height + ")")
                     .attr('class','axis x')
                     .call(d3.axisBottom(x))
                     .selectAll("text")
                     .attr("transform", "translate(-10,0)rotate(-45)")
                     .style("text-anchor", "end");    
            
        // Add Y axis
        let y = d3.scaleBand()
                  .range([ 0, height ])
                  .domain(this.state.data.map((d) =>  d[this.state.yAxisAttribute]))
                  .padding(.1);
               svg.append("g")
                  .attr('class','axis y')
                  .call(d3.axisLeft(y))
                  .selectAll("text")
                  .attr("dy", null)
                  
       // Add Bars
               svg.selectAll("myRect")
                  .data(this.state.data)
                  .enter()
                  .append("rect")
                  .on('mouseover',
                  function(){
                d3.select(this).style('opacity', 0.5)
        })
                  .on('mouseout', function(){
                d3.select(this).style('opacity', 1)
        })
                  .attr("x", x(0) )
                  .attr("y", (d) => y(d[this.state.yAxisAttribute]))
                  .attr("width", 0)
                  .attr("height", y.bandwidth() -10 )
                  .attr("fill", "#DF337D")
                  .transition(d3.transition().duration(1000))
                  .attr("width", (d) => x(d[this.state.xAxisAttribute]))           

    }
    render(){            
    return(
        <div className="rowChart">
             <svg></svg>
        </div>
    )
}
}