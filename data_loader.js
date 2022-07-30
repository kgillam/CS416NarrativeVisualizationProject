cars_url = "https://flunky.github.io/cars2017.csv"
pram_stat_2011_base_url = "https://chronicdata.cdc.gov/resource/ese6-rqpq.json"
breastfeeding_survey_base_url = "https://chronicdata.cdc.gov/resource/8hxn-cvik.json"

function get_data(url, callback) {
  console.log(`getting data from ${url}`);
  promise = d3.json(url, callback);
  console.log(`request sent to ${url}`)
}

function format_url(year, question) {
    if (year && question) {
	    return `${breastfeeding_survey_base_url}?yearstart=${year}&questionid=${question}`
    } else {
        return null
    }
}


values_map = new Map([]);

function update_data(year_selection, question_selection){
	formatted_url = format_url(year_selection, question_selection)
	console.log("formatted url: " + formatted_url)

	if (formatted_url) {
        get_data(formatted_url, function(data){
            console.log(data);

            data.forEach(d => {
                values_map.set(d.locationid, d.data_value)
            });
        });
	}
}

//get_data(formatted_url, function(data){
//	console.log(data);
//})[;



//https://chronicdata.cdc.gov/resource/8hxn-cvik.json?yearstart=2011&questionid=Q004&$where=LocationDesc%20!=%20National
//https://chronicdata.cdc.gov/resource/8hxn-cvik.json$query='SELECT%20*%20WHERE%20year%20=%202011'