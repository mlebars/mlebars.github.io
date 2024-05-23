let mySurveys = null;
getSurveys();

function getSurveys(access_token){
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", "bearer "+access_token);
	
	const requestOptions = {
		method: "GET",
	  	headers: myHeaders,
	  	redirect: "follow"
	};
	fetch("https://api.surveymonkey.com/v3/surveys?include=response_count&sort_by=num_responses&sort_order=DESC", requestOptions)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			mySurveys = data;
			printSurveys(mySurveys);
		});
}

function printSurveys(mySurveys){
	var mySurveysData = mySurveys['data'];
	var text = "<table><tr><th>Survey Title</th><th>Response(s)</th></tr>";
	for (let i = 0; i < mySurveysData.length; i++) {
	  	text += '<tr><td class="surveyTitle" onclick=getSurveyID("'+mySurveysData[i]['id']+'");>'+mySurveysData[i]['title']+'</td><td class="surveyResponses">'+mySurveysData[i]['response_count']+'</td></tr>';
	}
	text += '</table>';
	document.getElementById('postAuth').innerHTML = text;
}
