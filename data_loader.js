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

function format_pram_url(question_id) {
    if (year && question) {
	    return `${pram_stat_2011_base_url}?QuestionId=${question_id}`
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

pram_values_map = new Map([]);

function update_pram_data(question_id){
	formatted_url = format_pram_url(question_id)

    pram_values_map.clear();

	if (formatted_url) {
        get_data(formatted_url, function(data){
            data.forEach(d => {
                pram_values_map.set(d.Break_Out, d.Data_Value)
            });
        });
	}
}

//get_data(formatted_url, function(data){
//	console.log(data);
//})[;



//https://chronicdata.cdc.gov/resource/8hxn-cvik.json?yearstart=2011&questionid=Q004&$where=LocationDesc%20!=%20National
//https://chronicdata.cdc.gov/resource/8hxn-cvik.json$query='SELECT%20*%20WHERE%20year%20=%202011'