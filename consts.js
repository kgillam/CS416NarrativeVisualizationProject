white = "#ffffff"
dark_blue = "#0066ff"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setup_defs() {
	var svg = d3.select("#us_map_legend");
	var defs = svg.append("defs");
	
	var gradient = defs.append("linearGradient")
	.attr("id", "svgGradient")
	.attr("x1", "0%")
	.attr("x2", "100%")
	.attr("y1", "0%")
	.attr("y2", "0%");

	gradient.append("stop")
	.attr("class", "start")
	.attr("offset", "0%")
	.attr("stop-color", "white")
	.attr("stop-opacity", 1);

	gradient.append("stop")
	.attr("class", "end")
	.attr("offset", "100%")
	.attr("stop-color", dark_blue)
	.attr("stop-opacity", 1);
}


function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}
 
const states = new Map([
	["AL",	"01"],
	["AK",	"02"],
	["AZ",	"04"],
	["AR",	"05"],
	["CA",	"06"],
	["CO",	"08"],
	["CT",	"09"],
	["DE",	"10"],
	["FL",	"12"],
	["GA",	"13"],
	["HI",	"15"],
	["ID",	"16"],
	["IL",	"17"],
	["IN",	"18"],
	["IA",	"19"],
	["KS",	"20"],
	["KY",	"21"],
	["LA",	"22"],
	["ME",	"23"],
	["MD",	"24"],
	["MA",	"25"],
	["MI",	"26"],
	["MN",	"27"],
	["MS",	"28"],
	["MO",	"29"],
	["MT",	"30"],
	["NE",	"31"],
	["NV",	"32"],
	["NH",	"33"],
	["NJ",	"34"],
	["NM",	"35"],
	["NY",	"36"],
	["NC",	"37"],
	["ND",	"38"],
	["OH",	"39"],
	["OK",	"40"],
	["OR",	"41"],
	["PA",	"42"],
	["RI",	"44"],
	["SC",	"45"],
	["SD",	"46"],
	["TN",	"47"],
	["TX",	"48"],
	["UT",	"49"],
	["VT",	"50"],
	["VA",	"51"],
	["WA",	"53"],
	["WV",	"54"],
	["WI",	"55"],
	["WY",	"56"]
]);


function state_keys(value) {
	return [...states.entries()]
        .filter(({ 1: v }) => v === value)
        .map(([k]) => k);
}


//var options = new Map[
//	["Q004", "question 1"],
//	["Q005", "question 2"],
//	["Q006", "question 3"],
//	["Q007", "question 4"]
//]}

var options = [
	{"QuestionID":"Q001", "Question":"Percent of breastfed infants who were supplemented with infant formula before 3 months"},
	{"QuestionID":"Q002", "Question":"Percent of breastfed infants who were supplemented with infant formula before 6 months"},
	{"QuestionID":"Q003", "Question":"Percent of breastfed infants who were supplemented with infant formula within 2 days of life"},
	{"QuestionID":"Q004", "Question":"Percent of infants who were breastfed at 12 months"},
	{"QuestionID":"Q005", "Question":"Percent of infants who were breastfed at 6 months"},
	{"QuestionID":"Q006", "Question":"Percent of infants who were ever breastfed"},
	{"QuestionID":"Q007", "Question":"Percent of infants who were exclusively breastfed through 3 months"},
	{"QuestionID":"Q008", "Question":"Percent of infants who were exclusively breastfed through 6 months"}
]
