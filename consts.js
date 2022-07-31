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

var pram_question_options = [
	{"QuestionId":"QUO37", "Question":"During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about breastfeeding your baby?"},
	{"QuestionId":"QUO5", "Question":"Did you ever breastfeed or pump breast milk to feed your new baby after delivery?"},
	{"QuestionId":"QUO297", "Question":"Did you get prenatal care as early in your pregnancy as you wanted? (years 2009-2011)"},
	{"QuestionId":"QUO4", "Question":"Indicator of whether mother was still breastfeeding 4 weeks after delivery."},
	{"QuestionId":"QUO44", "Question":"Indicator of whether mother was still breastfeeding 8 weeks after delivery."}
]

var pram_breakout_options = [
	{"BreakOutCategoryid":"BOC4", "Break_Out_Category":"Maternal Age"},
	{"BreakOutCategoryid":"BOC14", "Break_Out_Category":"Income (years 2004 and beyond)"},
	{"BreakOutCategoryid":"BOC10", "Break_Out_Category":"On WIC during Pregnancy"},
    {"BreakOutCategoryid":"BOC6", "Break_Out_Category":"Maternal Race/Ethnicity"},
    {"BreakOutCategoryid":"BOC5", "Break_Out_Category":"Maternal Education"},
    {"BreakOutCategoryid":"BOC18", "Break_Out_Category":"Adequacy of Prenatal care"}
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

var pram_all_question_codes = [
    "QUO37",
    "QUO20",
    "QUO130",
    "QUO65",
    "QUO30",
    "QUO264",
    "QUO271",
    "QUO8",
    "QUO254",
    "QUO229",
    "QUO249",
    "QUO242",
    "QUO241",
    "QUO2",
    "QUO252",
    "QUO175",
    "QUO176",
    "QUO223",
    "QUO222",
    "QUO265",
    "QUO219",
    "QUO226",
    "QUO260",
    "QUO244",
    "QUO15",
    "QUO14",
    "QUO185",
    "QUO187",
    "QUO91",
    "QUO97",
    "QUO5",
    "QUO297",
    "QUO237",
    "QUO154",
    "QUO157",
    "QUO156",
    "QUO149",
    "QUO238",
    "QUO155",
    "QUO151",
    "QUO158",
    "QUO67",
    "QUO39",
    "QUO38",
    "QUO217",
    "QUO40",
    "QUO215",
    "QUO216",
    "QUO35",
    "QUO334",
    "QUO36",
    "QUO333",
    "QUO66",
    "QUO312",
    "QUO313",
    "QUO132",
    "QUO232",
    "QUO129",
    "QUO133",
    "QUO134",
    "QUO131",
    "QUO135",
    "QUO94",
    "QUO315",
    "QUO314",
    "QUO95",
    "QUO75",
    "QUO93",
    "QUO21",
    "QUO126",
    "QUO330",
    "QUO188",
    "QUO204",
    "QUO199",
    "QUO200",
    "QUO197",
    "QUO201",
    "QUO198",
    "QUO213",
    "QUO209",
    "QUO207",
    "QUO206",
    "QUO205",
    "QUO208",
    "QUO33",
    "QUO32",
    "QUO69",
    "QUO31",
    "QUO202",
    "QUO203",
    "QUO210",
    "QUO212",
    "QUO1",
    "QUO168",
    "QUO89",
    "QUO3",
    "QUO100",
    "QUO92",
    "QUO10",
    "QUO143",
    "QUO144",
    "QUO24",
    "QUO169",
    "QUO171",
    "QUO11",
    "QUO180",
    "QUO177",
    "QUO178",
    "QUO179",
    "QUO181",
    "QUO183",
    "QUO141",
    "QUO142",
    "QUO28",
    "QUO29",
    "QUO73",
    "QUO9",
    "QUO170",
    "QUO41",
    "QUO4",
    "QUO44",
    "QUO34",
    "QUO186",
    "QUO101",
    "QUO150",
    "QUO257"
]

var pram_all_questions = [
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about breastfeeding your baby?",
    "(*PCH) During the 12 months before you got pregnant  did your husband or partner push  hit  slap, kick, choke, or physically hurt you in any other way?",
    "(*PCH) During the 3 months before you got pregnant with your new baby  did you have high blood pressure (hypertension)?",
    "(*PCH) During the month before you got pregnant with your new baby  did you take a daily multivitamin?",
    "(*PCH) Indicator for whether mother smoked during the three months before getting pregnant",
    "(*PCH) Indicator of adequate social support postpartum",
    "(*PCH) Indicator of binge drinking (4+ drinks) during 3 months before pregnancy",
    "(*PCH) Indicator of drinking alcohol during the three months before pregnancy",
    "(*PCH) Indicator of having received preconception counseling (years 2009-2011)",
    "(*PCH) Indicator of health insurance coverage in the month before pregnancy (years 2009 - 2011)",
    "(*PCH) Indicator of mother having her teeth cleaned in 12 months prior to pregnancy (years 2009 - 2011)",
    "(*PCH) Indicator of no birth control use at conception",
    "(*PCH) Indicator of no birth control use at conception for those not trying to get pregnant",
    "(*PCH) Indicator of postpartum contraception use",
    "(*PCH) Indicator of pre-pregnancy depression check",
    "(*PCH) Indicator of previous fetal death  stillbirth  or miscarriage",
    "(*PCH) Indicator of previous preterm birth",
    "(*PCH) Indicator of receiving any fertility drugs or treatment",
    "(*PCH) Indicator of receiving any fertility drugs or treatment (for those trying to get pregnant only)",
    "(*PCH) Indicator of unwanted pregnancy",
    "(*PCH) Indicator of whether mother reported frequent postpartum depressive symptoms (years 2009 - 2011)",
    "(*PCH) Indicator of whether mother reported having diabetes that began before recent pregnancy (years 2009 - 2011)",
    "(*PCH) Indicator of whether smoking is allowed in home now",
    "(*PCH) Since your new baby was born  have you had a postpartum checkup for yourself?",
    "After your baby was born  was he or she put in an intensive care unit?",
    "At any time during your most recent pregnancy or delivery  did you have a test for HIV?",
    "Baby always or almost always rides in an infant car seat",
    "Baby was brought home from the hospital in an infant car seat",
    "Before you got pregnant  did a doctor  nurse  or other health care worker talk to you about how to prepare for a healthy pregnancy and baby?",
    "Did a doctor  nurse  or other health care worker talk with you about baby blues or postpartum depression during pregnancy or after your delivery?",
    "Did you ever breastfeed or pump breast milk to feed your new baby after delivery?",
    "Did you get prenatal care as early in your pregnancy as you wanted? (years 2009-2011)",
    "Did you have a blood transfusion during your pregnancy?",
    "Did you have a kidney or bladder (urinary tract) infection during your pregnancy?",
    "Did you have any placenta problems (such as abruptio placental  placenta previa) during your pregnancy?",
    "Did you have any severe nausea  vomiting  or dehydration during your pregnancy?",
    "Did you have any vaginal bleeding during your pregnancy?",
    "Did you have high blood pressure during your pregnancy?",
    "Did you have preterm or early labor during your pregnancy?",
    "Did your cervix have have to be sewn shut (incompetent cervix  cerclage) during your pregnancy?",
    "Did your water break more than 3 weeks before your due date (premature rupture of membranes  PROM) during your pregnancy?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about doing tests to screen for birth defects or diseases that run in your family?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about getting your blood tested for HIV?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about how drinking alcohol during pregnancy could affect your baby?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about how much weight you should gain during your pregnancy?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about how smoking during pregnancy could affect your baby?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about how using illegal drugs could affect your baby?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about medicines that are safe to take during your pregnancy?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about physical abuse to women by their husbands or partners?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about the signs and symptoms of preterm labor ?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about using a seat belt during your pregnancy ?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about what to do if you feel depressed during pregnancy or after your baby is born?",
    "During any of your prenatal care visits  did a doctor  nurse  or other health care worker talk with you about what to do if your labor starts early?",
    "During the 12 months before you got pregnant  did anyone else physically hurt you in any way?",
    "During the 12 months before you got pregnant  did your ex-husband or ex-partner push  hit  slap, kick, choke, or physically hurt you in any other way?",
    "During the 3 months before you got pregnant with your new baby  did you have anemia (poor blood  low iron)?",
    "During the 3 months before you got pregnant with your new baby  did you have anxiety?",
    "During the 3 months before you got pregnant with your new baby  did you have asthma?",
    "During the 3 months before you got pregnant with your new baby  did you have depression?",
    "During the 3 months before you got pregnant with your new baby  did you have epilepsy (seizures)?",
    "During the 3 months before you got pregnant with your new baby  did you have heart problems?",
    "During the 3 months before you got pregnant with your new baby  did you have thyroid problems?",
    "During your most recent pregnancy  did a dentist or dental worker talk to you about how to care for your teeth and gums?",
    "During your most recent pregnancy  did an ex-husband or ex-partner push  hit  slap, kick, choke, or physically hurt you in any other way?",
    "During your most recent pregnancy  did anyone else physically hurt you in any way?",
    "During your most recent pregnancy  did you go to a dentist or dental clinic?",
    "During your most recent pregnancy  did you have your teeth cleaned?",
    "During your most recent pregnancy  did you need to see a dentist for a problem?",
    "During your most recent pregnancy  did your husband or partner physically hurt you in any way?",
    "Have you ever heard or read that taking the vitamin folic acid can help prevent some birth defects?",
    "Have you smoked any cigarettes in the past 2 years? (years 2009-2011)",
    "Home has a working smoke alarm",
    "In the 12 months before your baby was born  a close family member was very sick and had to go into the hospital",
    "In the 12 months before your baby was born  someone very close to you died",
    "In the 12 months before your baby was born  someone very close to you had a bad problem with drinking or drugs",
    "In the 12 months before your baby was born  you argued with your husband or partner more than usual",
    "In the 12 months before your baby was born  you got separated or divorced from your husband or partner",
    "In the 12 months before your baby was born  you had a lot of bills you could not pay",
    "In the 12 months before your baby was born  you lost your job even though you wanted to go on working",
    "In the 12 months before your baby was born  you moved to a new address",
    "In the 12 months before your baby was born  you or your husband or partner went to jail",
    "In the 12 months before your baby was born  you were homeless",
    "In the 12 months before your baby was born  you were in a physical fight",
    "In the 12 months before your baby was born  your husband or partner lost his job",
    "In the 12 months before your baby was born  your husband or partner said he did not want you to be pregnant.",
    "Indicator for whether mother currently smokes",
    "Indicator for whether mother quit smoking during pregnancy (for smokers only)",
    "Indicator for whether mother smoked during the last three months of pregnancy",
    "Indicator of any emotional-related stressors reported",
    "Indicator of any financial-related stressors reported",
    "Indicator of any partner-related stressors reported",
    "Indicator of any trauma-related stressors reported",
    "Indicator of baby being discharged from hospital within 48 hours of birth. (for vaginal deliveries only)",
    "Indicator of baby born in a hospital",
    "Indicator of contraception use at the time of pregnancy (for those not trying to get pregnant)",
    "Indicator of contraceptive use at time of pregnancy among women with an unintended pregnancy",
    "Indicator of drinking any alcohol during the past two years",
    "Indicator of ever having teeth cleaned",
    "Indicator of infant checkup within 1 week of hospital discharge for infants discharged within 48 hours",
    "Indicator of infant currently alive",
    "Indicator of infant currently living with the mother",
    "Indicator of Late (After First Trimester) or No Entry Into Prenatal Care",
    "Indicator of mother delivering in a hospital",
    "Indicator of no prenatal care",
    "Indicator of Not Getting PNC as Soon as Desired Among Women Who Began PNC Late or Not at All",
    "Indicator of pre-pregnancy blood pressure check",
    "Indicator of pre-pregnancy diabetes check",
    "Indicator of pre-pregnancy dieting to lose weight",
    "Indicator of pre-pregnancy exercise 3 or more days a  week",
    "Indicator of pre-pregnancy family medical history discussion",
    "Indicator of pre-pregnancy taking prescription medication other than birth control",
    "Indicator of whether an HIV test was offered among women not receiving the test",
    "Indicator of whether an HIV test was refused among women offered the test",
    "Indicator of whether baby is most often laid on his or her back to sleep",
    "Indicator of whether baby is most often laid on his or her stomach to sleep",
    "Indicator of whether infant usually sleeps in a shared bed.",
    "Indicator of whether mother reported having any alcoholic drinks during the last 3 months of pregnancy",
    "Indicator of whether mother reported having gestational diabetes (years 2009 - 2011)",
    "Indicator of whether mother took vitamins more than 4 times a week during the month prior to pregnancy",
    "Indicator of whether mother was still breastfeeding 4 weeks after delivery.",
    "Indicator of whether mother was still breastfeeding 8 weeks after delivery.",
    "Pregnancy Confirmation after the First Trimester",
    "There are loaded guns  rifles  or other firearms in the home",
    "Was your baby seen by a doctor  nurse or other health care provider in the first week after he or she left the hospital?",
    "Were you injured in a car accident during your pregnancy?",
    "When you got pregnant with your new baby were you trying to become pregnant?"
]

var pram_state_question_options = []
for (i=0; i < pram_all_question_codes.length; i++){
    pram_state_question_options.push({"QuestionId":pram_all_question_codes[i], "Question":pram_all_questions[i]})
}
