cars_url = "https://flunky.github.io/cars2017.csv"
pram_stat_2011_base_url = "https://chronicdata.cdc.gov/resource/ese6-rqpq.json"
breastfeeding_survey_base_url = "https://chronicdata.cdc.gov/resource/8hxn-cvik.json"

function get_data(url, callback) {
  console.log(`getting data from ${url}`);
  promise = d3.json(url, callback);
  console.log(`request sent to ${url}`)
}

function format_breastfeeding_url(year, question) {
    if (year && question) {
	    return `${breastfeeding_survey_base_url}?yearstart=${year}&questionid=${question}`
    } else {
        return null
    }
}

function format_pram_url(question_id, breakout_id) {
    if (question_id && breakout_id) {
	    return `${pram_stat_2011_base_url}?questionid=${question_id}&locationabbr=PRAMS%20Total&breakoutcategoryid=${breakout_id}&response=YES`
    } else {
        return null
    }
}

breastfeeding_values_map = new Map([]);

function update_breastfeeding_data(year_selection, question_selection){
	formatted_url = format_breastfeeding_url(year_selection, question_selection)

	if (formatted_url) {
        get_data(formatted_url, function(data){
            data.forEach(d => {
                breastfeeding_values_map.set(d.locationid, d.data_value)
            });
        });
	}
}

pram_values_map = new Map();
var pram_values_test = [];

function update_pram_data(question_id, breakout_id){
	formatted_url = format_pram_url(question_id, breakout_id)

    pram_values_map.clear();
    pram_values_test = [];

	if (formatted_url) {
        get_data(formatted_url, function(data){
            console.log("data received")
            console.log(data)
            data.forEach(d => {
                pram_values_map.set(d.break_out, d.data_value)
                pram_values_test.push({"break_out":d.break_out, "data_value":d.data_value})
            });
//            console.log(pram_values_map)
        });
	} else{
	    console.log("could not format url")
	}
}

//get_data(formatted_url, function(data){
//	console.log(data);
//})[;



//https://chronicdata.cdc.gov/resource/8hxn-cvik.json?yearstart=2011&questionid=Q004&$where=LocationDesc%20!=%20National
//https://chronicdata.cdc.gov/resource/8hxn-cvik.json$query='SELECT%20*%20WHERE%20year%20=%202011'