

function update_map(state_paths){
	d3.selectAll("path")
	  .style("fill", function(d){ 
	  if(d && d.id==state_paths.id){return "blue"} });
}

function draw_map(){	
	var svg = d3.select("svg");

	var path = d3.geoPath();

	d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
	  if (error) throw error;

	  svg.append("g")
		  .attr("class", "states")
		.selectAll("path")
		.data(topojson.feature(us, us.objects.states).features)
		.enter().append("path")
		  .attr("d", path)
		  .style("fill", function(d){ if(d.id==states.get('CA')){return "blue"} })
		  .on("click", function(d,i){
			  console.log(d.id + " " + i);
			  update_map(d);
		  });

	  svg.append("path")
		  .attr("class", "state-borders")
		  .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
	});
};
