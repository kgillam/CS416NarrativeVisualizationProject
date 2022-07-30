us_data = null;

function update_map(){
	var svg = d3.select("#us_map");
	var path = d3.geoPath();
	
	//clear svg children
	svg.selectAll("*").remove();

	//TODO
	d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
		if (error) throw error;
		svg.append("g")
			.attr("class", "states")
			.selectAll("path")
			.data(topojson.feature(us, us.objects.states).features)
			.enter().append("path")
			.attr("d", path)
			.style("fill", function(d){
				return color_scale(values_map.get(d.id))
				//if(d.id==states.get('CA')){return "blue"} 
			})
			.on("mouseover", function(d){
				//show tooltip on hover
				d3.select("#mytooltip")
					.style("visibility", "visible")//set style to it
					.text(state_names.get(state_keys(d.id)[0]) + ": " + values_map.get(d.id) + "%")//set text to it
			})
			.on("mouseout", function(){
				d3.select("#mytooltip")
					.style("visibility", "hidden")//set style to it
					.text("")//set text to it
			})
			.on("click", function(d,i){
//				console.log(d.id + " " + i);
//				console.log(d3.mouse(this));
//				draw_annotation(d.id, d3.mouse(this), "click_label");
			});

		svg.append("path")
			  .attr("class", "state-borders")
			  .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

	    low_state = get_state_lowest_rate()
	    highest_state = get_state_highest_rate()
        draw_annotation(lowest_state, state_positions.get(lowest_state) , "lowest")
        draw_annotation(highest_state, state_positions.get(highest_state) , "highest")
        draw_legend()
	});
}

function get_state_lowest_rate(){
    lowest_state = null
    lowest_value = 101
    for (var [key, value] of values_map.entries()){
        if (value < lowest_value){
            lowest_state = key
            lowest_value = value
        }
    }

    return lowest_state
}

function get_state_highest_rate(){
    highest_state = null
    highest_value = -1
    for (var [key, value] of values_map.entries()){
        if (value > highest_value){
            highest_state = key
            highest_value = value
        }
    }

    return highest_state
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

function get_nearest_annotation_spot(start){
    end_point = annotation_positions[0]
    min_distance = 10000;
    for (var i=0; i < annotation_positions.length; i++){
        point = annotation_positions[i]
        new_dist = distance(start, point)
        if (new_dist && new_dist < min_distance) {
            min_distance = new_dist
            end_point = point
        }
    }
    return end_point
}

function draw_annotation(state_id, start, id, color="black"){
    const line = d3.line().context(null);
    clear_annotation(id)

    var end = get_nearest_annotation_spot(start)
    var state = state_keys(state_id)[0]
    var data = [start,end]
    var svg = d3.select("#us_map")

    svg.append("path")
        .attr("id", id)
        .attr("d", line(data))
        .attr("stroke", color)

    g = svg.append("g")
        .attr("id", id + "_label")

    g.append("rect")
        .attr("x", end[0]-150)
        .attr("y", end[1]-5)
        .attr("height", 20)
        .attr("width", 300)
        .attr("fill", tooltip_color)
//        .attr("opacity", 0.5)

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("x", end[0])
        .attr("y", end[1])
        .attr("dy", ".65em")
        .text(state_names.get(state) + " has the " + id + " rate, " + values_map.get(state_id) + "%")
}

function clear_annotation(id){
    var annotation = d3.select("#"+id);
    annotation.remove();
    var annotation_label = d3.select("#"+id+"_label");
    annotation_label.remove();
}

function draw_map(){	
//	var svg = d3.select("#us_map");
//	var path = d3.geoPath();
//	d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
//	  if (error) throw error;
//
//	color_scale = d3.scaleLinear()
//		.domain([0,100])
//		.range(["white", "red"])
//
//	draw_legend(color_scale);
//	draw_tooltip();
//
//	  svg.append("g")
//		  .attr("class", "states")
//		.selectAll("path")
//		.data(topojson.feature(us, us.objects.states).features)
//		.enter().append("path")
//		  .attr("d", path)
//		  .style("fill", function(d){
//
//			//return color_scale(values_map.get(d.id))
//			//if(d.id==states.get('CA')){return "blue"}
//		  })
//		  .on("click", function(d,i){
//			  console.log(d.id + " " + i);
//		  });
//
//	  svg.append("path")
//		  .attr("class", "state-borders")
//		  .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
//	});
};

function update_selections(d) {
	var question_dropdown = d3.select("#question_dropdown")
    var year_dropdown = d3.select("#year_dropdown")

	var question_selection = question_dropdown.property('value')
    var year_selection = year_dropdown.property('value')

    update_data(year_selection, question_selection)
    update_map()
}

function add_options_to_dropdown(dropdown, options, value_key, text_key, first_selection) {
    dropdown.selectAll("option")
    			.data(options)
    			.enter().append("option")
    			.attr("value", function (d) { return d[value_key]; })
    			.text(function (d) {
    				return d[text_key];
    		});

    dropdown.property("selected", function(){ return first_selection; })
}

function draw_legend(){
	var svg = d3.select("#us_map");
	setup_gradient()

    x = 1000;
    y = 50;
    width = 10;
    height = 200;
	svg.append("rect")
		.attr("x",x)
		.attr("y",y)
		.attr("height",height)
		.attr("width",width)
//		.attr("fill", "blue");
		.attr("fill", "url(#svgGradient1)");
    svg.append("rect")
        .attr("x",x)
        .attr("y",y + height)
        .attr("height",height)
        .attr("width",width)
        .attr("fill", "url(#svgGradient2)");
    svg.append("text")
        .text("100%")
		.attr("x",x-10)
		.attr("y",y-5)
    svg.append("text")
        .text("0%")
		.attr("x",x)
		.attr("y",y + height*2 + 5)
}

function add_dropdowns(){
	var controls_div = d3.select("#controls").append("div")

	var question_dropdown = controls_div.insert("select", "svg")
	                        .attr("id", "question_dropdown")
	                        .on("change", update_selections)

	var year_dropdown = controls_div.insert("select", "svg")
		                    .attr("id", "year_dropdown")
		                    .on("change", update_selections)

    add_options_to_dropdown(question_dropdown, breastfed_question_options, "QuestionID", "Question", "Q006")
    add_options_to_dropdown(year_dropdown, breastfed_year_options, "year", "year", "2000")

	update_data("2000", "Q006")
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


function draw_tooltip(){
	var svg = d3.select("#us_map");

	var tooltip = d3.select("body")
		.append("div")
		.attr("id", "mytooltip")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("background", tooltip_color)
		.text("a simple tooltip")
//        .attr("fill", "orange")
//        .style("opacity", 0.5)

	svg.on("mousemove", function() { 
			return tooltip.style("top", (d3.event.pageY-10)+"px") 
			.style("left",(d3.event.pageX+10)+"px"); 
		});
}



