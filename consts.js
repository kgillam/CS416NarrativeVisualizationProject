white = "#ffffff"
dark_blue = "#0066ff"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setup_defs() {
	var svg = d3.select("#us_map_legend");
	var defs = svg.append("defs");
}

min = 0
mid = 50
max = 100
const color_scale = d3.scaleLinear()
    .domain([min, mid, max])
    .range(["white", "#33ccff", "purple"])


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

var breastfed_question_options = [
	{"QuestionID":"Q001", "Question":"Percent of breastfed infants who were supplemented with infant formula before 3 months"},
	{"QuestionID":"Q002", "Question":"Percent of breastfed infants who were supplemented with infant formula before 6 months"},
	{"QuestionID":"Q003", "Question":"Percent of breastfed infants who were supplemented with infant formula within 2 days of life"},
	{"QuestionID":"Q004", "Question":"Percent of infants who were breastfed at 12 months"},
	{"QuestionID":"Q005", "Question":"Percent of infants who were breastfed at 6 months"},
	{"QuestionID":"Q006", "Question":"Percent of infants who were ever breastfed"},
	{"QuestionID":"Q007", "Question":"Percent of infants who were exclusively breastfed through 3 months"},
	{"QuestionID":"Q008", "Question":"Percent of infants who were exclusively breastfed through 6 months"}
]

var breastfed_year_options = [
    {"year":"2000"},
    {"year":"2001"},
    {"year":"2002"},
    {"year":"2003"},
    {"year":"2004"},
    {"year":"2005"},
    {"year":"2006"},
    {"year":"2007"},
    {"year":"2008"},
    {"year":"2009"},
    {"year":"2010"},
    {"year":"2011"},
    {"year":"2012"},
    {"year":"2013"},
    {"year":"2014"},
    {"year":"2016"},
    {"year":"2017"},
    {"year":"2018"}
]

var annotation_positions = [
    [20, 0],    //north west
    [30, 430],  //south west
    [400, 10],  //north
    [700, 50],  //north east
    [600, 550], //south
    [850, 450]  //east
]



