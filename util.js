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
	var svg = d3.select("#us_map");

	var tooltip = d3.select("body")
		.append("div")
		.attr("id", "mytooltip")
		.attr("class", "tooltip")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("background", tooltip_color)
		.text("a simple tooltip")
//        .attr("fill", "orange")
//        .style("opacity", 0.5)

    svg.on("click", function() {
        console.log(d3.mouse(this))
    })

	svg.on("mousemove", function() {
			return tooltip.style("top", (d3.event.pageY-10)+"px")
			.style("left",(d3.event.pageX+10)+"px");
		});
}

function add_options_to_dropdown(dropdown, options, value_key, text_key, first_selection) {
    dropdown.selectAll("option")
    			.data(options)
    			.enter().append("option")
    			.attr("value", function (d) {
//    			    console.log(d)
//    			    console.log(d[value_key])
    			    return d[value_key];
    			})
    			.text(function (d) {
    				return d[text_key];
    		});

    dropdown.property("selected", function(){ return first_selection; })
}

function setup_gradient(){
	var defs = d3.select("#us_map").append("defs");

	var gradient1 = defs.append("linearGradient")
		.attr("id", "svgGradient1")
        .attr("x1", "100%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");

    var gradient2 = defs.append("linearGradient")
        .attr("id", "svgGradient2")
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
