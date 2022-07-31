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

function format_pram_national_url(question_id, breakout_id) {
    if (question_id && breakout_id) {
	    return `${pram_stat_2011_base_url}?questionid=${question_id}&locationabbr=PRAMS%20Total&breakoutcategoryid=${breakout_id}&response=YES`
    } else {
        return null
    }
}

function format_pram_state_url(question_id) {
    if (question_id) {
//	    return `${pram_stat_2011_base_url}?questionid=${question_id}&Break_Out_Category=None&response=YES`
	    return `${pram_stat_2011_base_url}?questionid=${question_id}&breakoutcategoryid=BOC6&response=YES`
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

pram_national_values_map = new Map();
var pram_national_values_test = [];

function update_pram_national_data(question_id, breakout_id){
	formatted_url = format_pram_national_url(question_id, breakout_id)

    pram_national_values_map.clear();
    pram_national_values_test = [];

	if (formatted_url) {
        get_data(formatted_url, function(data){
            console.log("data received")
            data.forEach(d => {
                pram_national_values_map.set(d.break_out, d.data_value)
                pram_national_values_test.push({"break_out":d.break_out, "data_value":d.data_value})
            });
        });
	} else{
	    console.log("could not format url")
	}
}


pram_state_values_map_black = new Map();
pram_state_values_map_hispanic = new Map();
pram_state_values_map_other = new Map();
pram_state_values_map_white = new Map();
pram_state_values_map = new Map();
//var pram_state_values_test = [];

function update_pram_state_data(question_id){
	formatted_url = format_pram_state_url(question_id)

    pram_state_values_map_black.clear();
    pram_state_values_map_hispanic.clear();
    pram_state_values_map_other.clear();
    pram_state_values_map_white.clear();
    pram_state_values_map.clear();
    //    pram_state_values_test = [];

	if (formatted_url) {
        get_data(formatted_url, function(data){
            console.log("data received")
            data.forEach(d => {
                if(d.breakoutid == "ETH1"){
                    pram_state_values_map_black.set(d.locationid, d.data_value)
                }else if(d.breakoutid == "ETH2"){
                    pram_state_values_map_hispanic.set(d.locationid, d.data_value)
                }else if(d.breakoutid == "ETH3"){
                    pram_state_values_map_other.set(d.locationid, d.data_value)
                }else if(d.breakoutid == "ETH4"){
                    pram_state_values_map_white.set(d.locationid, d.data_value)
                }
//                pram_state_values_test.push({"LocationId":d.locationid, "Data_Value":d.data_value})
            });
            for (var [key, value] of pram_state_values_map_black.entries()){
                black = value
                hispanic = pram_state_values_map_hispanic.get(key)
                other = pram_state_values_map_other.get(key)
                white = pram_state_values_map_white.get(key)

                pram_state_values_map.set(key, compute_difference_value(black, hispanic, other, white))
            }
        });
	} else{
	    console.log("could not format url")
	}
}

function compute_difference_value(v1, v2, v3, v4){
    value_min = Math.min(v1, v2, v3, v4)
    value_max = Math.max(v1, v2, v3, v4)
    return value_max - value_min
}


//https://chronicdata.cdc.gov/resource/8hxn-cvik.json?yearstart=2011&questionid=Q004&$where=LocationDesc%20!=%20National
//https://chronicdata.cdc.gov/resource/8hxn-cvik.json$query='SELECT%20*%20WHERE%20year%20=%202011'