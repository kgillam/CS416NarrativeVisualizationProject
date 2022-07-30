us_data = null;

function update_map(){
	var svg = d3.select("#us_map");
	var path = d3.geoPath();
	
	//clear svg children
	svg.selectAll("*").remove(); 
	
	color_scale = d3.scaleLinear()
		.domain([0,100])
		.range(["white", "blue"])
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
					.text(state_keys(d.id) + ": " + values_map.get(d.id) + "%")//set text to it
			})
			.on("mouseout", function(){
				d3.select("#mytooltip")
					.style("visibility", "hidden")//set style to it
					.text("")//set text to it
			})
			.on("click", function(d,i){
				console.log(d.id + " " + i);
			});

		svg.append("path")
			  .attr("class", "state-borders")
			  .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
		
	});
}

function draw_map(){	
	var svg = d3.select("#us_map");
	var path = d3.geoPath();
	d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
	  if (error) throw error;

	color_scale = d3.scaleLinear()
		.domain([0,100])
		.range(["white", "red"])
	
	draw_legend(color_scale);
	draw_tooltip();
	  
	  svg.append("g")
		  .attr("class", "states")
		.selectAll("path")
		.data(topojson.feature(us, us.objects.states).features)
		.enter().append("path")
		  .attr("d", path)
		  .style("fill", function(d){ 

			//return color_scale(values_map.get(d.id))
			//if(d.id==states.get('CA')){return "blue"} 
		  })
		  .on("click", function(d,i){
			  console.log(d.id + " " + i);
		  });

	  svg.append("path")
		  .attr("class", "state-borders")
		  .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
	});
};

function draw_legend(color_scale){
	var svg = d3.select("#us_map_legend");
	
	svg.append("rect")
		.attr("x",50)
		.attr("y",50)
		.attr("height",10)
		.attr("width",300)
		.attr("fill", "url(#svgGradient)");
		
	d3.select("body").append("div")
	    .attr("id", "vis-container")
		.insert("select", "svg")
		.on("change", function() {
			var new_selection = d3.select(this).property('value')
			update_data(new_selection)
			update_map()
		})
		.selectAll("option")
			.data(options)
			.enter().append("option")
			.attr("value", function (d) { return d["QuestionID"]; })
			.text(function (d) {
				return d["Question"];
		});
}

function draw_tooltip(){
	var svg = d3.select("#us_map");

	var tooltip = d3.select("body")
		.append("div")
		.attr("id", "mytooltip")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("background", "#FFF")
		.text("a simple tooltip")
		
	svg.on("mousemove", function() { 
			return tooltip.style("top", (d3.event.pageY-10)+"px") 
			.style("left",(d3.event.pageX+10)+"px"); 
		});
}



