async function draw_chart(){
    await new Promise(r => setTimeout(r, 400));//TODO
    console.log("drawing chart")
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
    for (var [key, value] of pram_national_values_map.entries()){
        keys.push(key)
    }
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(keys)
      .padding(0.2);
    g.append("g")
      .attr("id", "x_axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    var y = d3.scaleLinear()
      .domain([0, 100])
      .range([ height, 0]);
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))

    g.selectAll("rect")
        .data(pram_national_values_test)
        .enter()
        .append("rect")
            .attr("x",  function(d){ return x(d.break_out) })
            .attr("y", function(d){
                return y(d.data_value) })
            .attr("height", function(d) {
                return height - y(d.data_value);
            })
            .attr("width", x.bandwidth())
//            .attr("fill", "purple")
            .attr("fill", function(d){
                return color_scale(d.data_value) })
            .on("mouseover", function(d){
                //show tooltip on hover
                d3.select("#mytooltip")
                    .style("visibility", "visible")//set style to it
                    .text( Number(d.data_value) + "%")//set text to it
            })
            .on("mouseout", function(d){
                d3.select("#mytooltip")
                    .style("visibility", "hidden")//set style to it
                    .text("")//set text to it
            })
}

function add_chart_dropdowns(){
	var controls_div = d3.select("#bar_chart_controls")
//	controls_div.selectAll("*").remove();
    var div1 = controls_div.insert("div")
                            .attr("class", "control")
    var div2 = controls_div.insert("div")
                            .attr("class", "control")
    div1.insert("span")
         .text("Select Survey Question: ")

	var question_dropdown = div1.insert("select", "svg")
	                        .attr("id", "chart_question_dropdown")
	                        .on("change", update_chart_selections)

    div2.insert("span")
        .text("Select Breakdown Category: ")
	var breakout_dropdown = div2.insert("select", "svg")
		                    .attr("id", "chart_breakout_dropdown")
		                    .on("change", update_chart_selections)

    add_options_to_dropdown(question_dropdown, pram_question_options, "QuestionId", "Question", "QUO37");
    add_options_to_dropdown(breakout_dropdown, pram_breakout_options, "BreakOutCategoryid", "Break_Out_Category", "BOC4")

	update_pram_national_data("QUO37", "BOC4")
}

async function update_chart_selections() {
    console.log("updating")
	var question_dropdown = d3.select("#chart_question_dropdown")
    var breakout_dropdown = d3.select("#chart_breakout_dropdown")

	var question_selection = question_dropdown.property('value')
    var breakout_selection = breakout_dropdown.property('value')

    update_pram_national_data(question_selection, breakout_selection)
    draw_chart()
}