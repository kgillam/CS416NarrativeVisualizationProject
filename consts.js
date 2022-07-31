white = "#ffffff"
dark_blue = "#0066ff"
tooltip_color = "#f58c69"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setup_defs() {
	var svg = d3.select("#us_map");
	var defs = svg.append("defs");
}

const min = 0
const mid = 50
const max = 100
const min_color = "white"
const mid_color = "#33ccff"
const max_color = "purple"
const color_scale = d3.scaleLinear()
    .domain([min, mid, max])
    .range([min_color, mid_color, max_color])


function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}

const state_names = new Map([
	["AL",	"Alabama"],
	["AK",	"Alaska"],
	["AZ",	"Arkansas"],
	["AR",	"Arizona"],
	["CA",	"California"],
	["CO",	"Colorado"],
	["CT",	"Connecticut"],
	["DE",	"Delaware"],
	["FL",	"Florida"],
	["GA",	"Georgia"],
	["HI",	"Hawaii"],
	["ID",	"Idaho"],
	["IL",	"Illinois"],
	["IN",	"Indiana"],
	["IA",	"Iowa"],
	["KS",	"Kansas"],
	["KY",	"Kentucky"],
	["LA",	"Louisiana"],
	["ME",	"Maine"],
	["MD",	"Maryland"],
	["MA",	"Massachusetts"],
	["MI",	"Michigan"],
	["MN",	"Minnesota"],
	["MS",	"Mississippi"],
	["MO",	"Missouri"],
	["MT",	"Montana	"],
	["NE",	"Nebraska"],
	["NV",	"Nevada"],
	["NH",	"New Hampshire"],
	["NJ",	"New Jersey"],
	["NM",	"New Mexico"],
	["NY",	"New York"],
	["NC",	"North Carolina"],
	["ND",	"North Dakota"],
	["OH",	"Ohio"],
	["OK",	"Oklahoma"],
	["OR",	"Oregon"],
	["PA",	"Pennsylvania"],
	["RI",	"Rhode Island"],
	["SC",	"South Carolina"],
	["SD",	"South Dakota"],
	["TN",	"Tennessee"],
	["TX",	"Texas"],
	["UT",	"Utah"],
	["VT",	"Vermont"],
	["VA",	"Virginia"],
	["WA",	"Washington"],
	["WV",	"West Virginia"],
	["WI",	"Wisconsin"],
	["WY",	"Wyoming"]
])


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

var breastfed_question_options = [
	{"QuestionId":"QUO37", "Question":"During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about breastfeeding your baby?"},
	{"QuestionId":"QUO5", "Question":"Did you ever breastfeed or pump breast milk to feed your new baby after delivery?"},
	{"QuestionId":"QUO297", "Question":"Did you get prenatal care as early in your pregnancy as you wanted? (years 2009-2011)"},
	{"QuestionId":"QUO4", "Question":"Indicator of whether mother was still breastfeeding 4 weeks after delivery."},
	{"QuestionId":"QUO44", "Question":"Indicator of whether mother was still breastfeeding 8 weeks after delivery."}
]

var annotation_positions = [
    [150,  5],
    [290, 35],
    [200,480],
//    [230,560],
    [140,430],
    [400, 30],
    [531,581],
    [550, 15],
    [680, 60],
    [700, 50],
    [740,100],
    [700,530],
    [600,550],
//    [880, 250],
    [841, 51],
    [850,450],
    [900,250],
    [910,300]
]


const state_positions = new Map([
	["01", [652, 434]],
	["02", [101, 504]],
	["04", [208, 381]],
	["05", [554, 387]],
	["06", [61,  326]],
	["08", [331, 284]],
	["09", [873, 185]],
	["10", [842, 259]],
	["12", [775, 508]],
	["13", [732, 422]],
	["15", [317, 575]],
	["16", [181, 120]],
	["17", [606, 266]],
	["18", [658, 253]],
	["19", [532, 221]],
	["20", [449, 307]],
	["21", [688, 312]],
	["22", [557, 474]],
	["23", [896, 101]],
	["24", [815, 253]],
	["25", [876, 169]],
	["26", [675, 177]],
	["27", [515, 127]],
	["28", [610, 429]],
	["29", [545, 304]],
	["30", [330, 85]],
	["31", [431, 244]],
	["32", [148, 243]],
	["33", [876, 137]],
	["34", [849, 237]],
	["35", [309, 389]],
	["36", [819, 165]],
	["37", [805, 345]],
	["38", [416, 99]],
	["39", [714, 248]],
	["40", [468, 377]],
	["41", [76,  116]],
	["42", [794, 221]],
	["44", [890, 180]],
	["45", [770, 389]],
	["46", [428, 172]],
	["47", [664, 357]],
	["48", [434, 461]],
	["49", [222, 266]],
	["50", [857, 124]],
	["51", [798, 293]],
	["53", [109, 56]],
	["54", [746, 283]],
	["55", [584, 159]],
	["56", [311, 193]]
]);