//function update_chart(){
//    console.log("|updatingchart")
//	width = 300;
//	height = 300;
//    keys = []
//    for (var [key, value] of pram_values_map.entries()){
//        keys.push(key)
//    }
//    console.log(keys)
//
//    g.append("g")
//      .attr("id", "x_axis")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x))
//      .selectAll("text")
//        .attr("transform", "translate(-10,0)rotate(-45)")
//        .style("text-anchor", "end");
//
//    var x = d3.scaleBand()
//      .range([ 0, width ])
//      .domain(keys)
//
//    var x_axis = d3.select("#x_axis")
//    x_axis.call(d3.axisBottom(x))
//}

function draw_chart(){
	var svg = d3.select("#bar_chart");
	var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

	width = 300;
	height = 300;

    //clear svg children
    svg.selectAll("*").remove();

    g = svg.append("g")
        .attr("id", "axes")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    keys = []
    for (var [key, value] of pram_values_map.entries()){
        keys.push(key)
    }
//    console.log(keys)
    var x = d3.scaleBand()
      .range([ 0, width ])
//      .domain(pram_values_map.map(function(d) { return d.Break_Out; }))
      .domain(keys)
//      .domain(["one","two", "three"])
//      .padding(0.2);
    g.append("g")
      .attr("id", "x_axis")
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

function add_chart_dropdowns(){
	var controls_div = d3.select("#bar_chart_controls").append("div")
//	controls_div.selectAll("*").remove();

	var question_dropdown = controls_div.insert("select", "svg")
	                        .attr("id", "chart_question_dropdown")
	                        .on("change", update_chart_selections)

	var breakout_dropdown = controls_div.insert("select", "svg")
		                    .attr("id", "chart_breakout_dropdown")
		                    .on("change", update_chart_selections)

    add_options_to_dropdown(question_dropdown, pram_question_options, "QuestionId", "Question", "QUO37");
    add_options_to_dropdown(breakout_dropdown, pram_breakout_options, "BreakOutCategoryid", "Break_Out_Category", "BOC4")

	update_pram_data("QUO37", "BOC4")
}

function update_chart_selections() {
    console.log("updating")
	var question_dropdown = d3.select("#chart_question_dropdown")
    var breakout_dropdown = d3.select("#chart_breakout_dropdown")

	var question_selection = question_dropdown.property('value')
    var breakout_selection = breakout_dropdown.property('value')

    update_pram_data(question_selection, breakout_selection)

    draw_chart()
}