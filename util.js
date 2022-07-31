function next(){
    show(current_page + 1)
    current_page = current_page + 1;
    d3.select("#prev")
//        .style("display", "block")
        .style("visibility", "visible")
    if (current_page == total_pages){
        d3.select("#next")
//            .style("display", "none")
            .style("visibility", "collapse")
    }
}
function prev(){
    show(current_page - 1)
    current_page = current_page - 1;
    d3.select("#next")
//        .style("display", "block")
        .style("visibility", "visible")
    if (current_page == 1){
        d3.selectAll("#prev")
//            .style("display", "none")
            .style("visibility", "collapse")
    }
}
function show(shown) {
    console.log("current page: " + current_page)
    console.log("switching to page: " + shown)
    d3.selectAll(".page")
        .style("display", "none")
    d3.select("#Page" + shown)
        .style("display", "block")
}


function distance(start, end){
    if (!start || !end || start.length != 2 || end.length !=2){
        console.log("cannot calculate distance")
        return null
    }

    var a = start[0] - end[0] //x1 - x2;
    var b = start[1] - end[1] //y1 - y2;

    var c = Math.sqrt( a*a + b*b );
    return c
}

function draw_tooltip(){
    var chart = d3.select("#bar_chart");
	var first_map = d3.select("#us_map");
	var second_map = d3.select("#second_map");

	var tooltip = d3.select("body")
		.append("div")
		.attr("id", "mytooltip")
		.attr("class", "tooltip")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("background", tooltip_color)
		.text("a simple tooltip")

    first_map.on("click", function() {
        console.log(d3.mouse(this))
    })
	first_map.on("mousemove", my_mousemove)
	chart.on("mousemove", my_mousemove)
	second_map.on("mousemove", my_mousemove)
}

function my_mousemove() {
	var tooltip = d3.select("#mytooltip")
    return tooltip.style("top", (d3.event.pageY-10)+"px")
                .style("left",(d3.event.pageX+10)+"px");
};

function add_options_to_dropdown(dropdown, options, value_key, text_key, first_selection) {
    dropdown.selectAll("option")
    			.data(options)
    			.enter().append("option")
    			.attr("value", function (d) {
    			    return d[value_key];
    			})
    			.text(function (d) {
    				return d[text_key];
    		});

    dropdown.property("selected", function(){ return first_selection; })
}

function setup_gradient(map_id){
	var defs = d3.select("#"+map_id).append("defs");

	var gradient1 = defs.append("linearGradient")
		.attr("id", map_id+"svgGradient1")
        .attr("x1", "100%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");

    var gradient2 = defs.append("linearGradient")
        .attr("id", map_id+"svgGradient2")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%");

	gradient1.append("stop")
	    .datum({max: max})
        .attr("class", "start")
        .attr("offset", "0%")
        .attr("stop-color", function(d) { return color_scale(d.max) })
        .attr("stop-opacity", 1);

	gradient1.append("stop")
	    .datum({mid: mid})
        .attr("class", "end")
        .attr("offset", "100%")
        .attr("stop-color", function(d) { return color_scale(d.mid) })
        .attr("stop-opacity", 1);

	gradient2.append("stop")
	    .datum({mid: mid})
        .attr("class", "start")
        .attr("offset", "0%")
        .attr("stop-color", function(d) { return color_scale(d.mid) })
        .attr("stop-opacity", 1);

	gradient2.append("stop")
	    .datum({min: min})
        .attr("class", "end")
        .attr("offset", "100%")
        .attr("stop-color", function(d) { return color_scale(d.min) })
        .attr("stop-opacity", 1);
}
