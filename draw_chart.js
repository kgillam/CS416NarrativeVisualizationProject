function update_chart(){
	var svg = d3.select("#bar_chart");
	var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

	width = 300;
	height = 300;

    //clear svg children
    svg.selectAll("*").remove();
    g = svg.append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
      .range([ 0, width ])
//      .domain(pram_values_map.map(function(d) { return d.Break_Out; }))
//      .domain(d3.map(pram_values_map, d => d.Breakout))
      .domain(["one","two", "three"])
//      .padding(0.2);
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 100])
      .range([ height, 0]);
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))


}