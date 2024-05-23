var surveyListPage = document.getElementById('surveyList');
var sampleResponsePage = document.getElementById('sampleResponse');
var demoScriptPage = document.getElementById('demoScript');
var JSPage = document.getElementById('JSPage');
var PythonPage = document.getElementById('PythonPage');

let mySurveys = null;

function getSurveys(access_token){
	var requestOptions = getRequestOptions(access_token);
	fetch("https://api.surveymonkey.com/v3/surveys?include=response_count&sort_by=num_responses&sort_order=DESC", requestOptions)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			mySurveys = data;
			printSurveys(mySurveys,access_token);
		});
}

function getRequestOptions(access_token) {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", "bearer "+access_token);
	
	const requestOptions = {
		method: "GET",
	  	headers: myHeaders,
	  	redirect: "follow"
	};
	return requestOptions;
}

function printSurveys(mySurveys,access_token){
	var mySurveysData = mySurveys['data'];
	var text = "<table><tr><th>Survey Title</th><th>Response(s)</th></tr>";
	for (let i = 0; i < mySurveysData.length; i++) {
	  	text += '<tr><td class="surveyTitle" onclick=getSurveyID("'+mySurveysData[i]['id']+'","'+access_token+'");>'+mySurveysData[i]['title']+'</td><td class="surveyResponses">'+mySurveysData[i]['response_count']+'</td></tr>';
	}
	text += '</table>';
	document.getElementById('surveyList').innerHTML = text;
}

function getSurveyID(surveyID,access_token) {
	surveyListPage.classList.add('invisible');
	sampleResponsePage.classList.remove('invisible');
	demoScriptPage.classList.add('invisible');
	var requestOptions = getRequestOptions(access_token);
	fetch("https://api.surveymonkey.com/v3/surveys/"+surveyID+"/responses/bulk?simple=true", requestOptions)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			printResponses(data)
		});
}


function printResponses(result) {
	responseText = "<table><thead><tr><th>ID</th><th>Status</th><th>Date Created</th><th>Question</th><th>Answer</th></tr></thead><tbody>";
	let i = 1;
	for (let r = 0; r < result['data'].length; r++) {
		var response_id = result['data'][r]['id'];
		var response_status = result['data'][r]['response_status'];
		var date_created = result['data'][r]['date_created'].slice(0,10);
		var num_pages = result['data'][r]['pages'].length;
	
		for (let p = 0; p < num_pages; p++) {
		  	var questions = result['data'][r]['pages'][p]['questions'];
			for (let q = 0; q < questions.length; q++) {
				var question = questions[q];
				var questionTitle = question['heading'];
				var answers = question['answers'];
				for (let a = 0; a < answers.length; a++) {
					var answer = answers[a];
					var answerText = answer['simple_text'];
					if (i <= 20) {
						responseText += '<tr><td>'+response_id+'</td><td>'+response_status+'</td><td>'+date_created+'</td><td>'+questionTitle+'</td><td>'+answerText+'</td></tr>';
						i += 1;
					}
				}
			}
		}
	}

	responseText += '</tbody></table>';
	document.getElementById('sampleResponse').innerHTML = responseText;
}
surveyListPage.onclick = function(){
	surveyListPage.classList.remove('invisible');
	sampleResponsePage.classList.add('invisible');
	demoScriptPage.classList.add('invisible');
}
sampleResponsePage.onclick = function(){
	surveyListPage.classList.add('invisible');
	sampleResponsePage.classList.remove('invisible');
	demoScriptPage.classList.add('invisible');
}
demoScriptPage.onclick = function(){
	surveyListPage.classList.add('invisible');
	sampleResponsePage.classList.add('invisible');
	demoScriptPage.classList.remove('invisible');
}
