function update_map(){
	var svg = d3.select("svg");
	
	color_scale = d3.scaleLinear()
		.domain([0,100])
		.range(["white", "blue"])
	//TODO
	
}

function draw_map(){	
	var svg = d3.select("svg");
	var path = d3.geoPath();
	d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
	  if (error) throw error;

	  console.log(promise);
	  console.log(us);

	color_scale = d3.scaleLinear()
		.domain([0,100])
		.range(["white", "blue"])
			
	  
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
		  .on("click", function(d,i){
			  console.log(d.id + " " + i);
		  });

	  svg.append("path")
		  .attr("class", "state-borders")
		  .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
	});
};
