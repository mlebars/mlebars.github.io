var tab1 = document.getElementById('Tab1');
var tab2 = document.getElementById('Tab2');
var tab3 = document.getElementById('Tab3');
var page1 = document.getElementById('Page1');
var page2 = document.getElementById('Page2');
var page3 = document.getElementById('Page3');
var TabJS = document.getElementById('TabJS');
var TabPy = document.getElementById('TabPy');
var DivJS = document.getElementById('javascript');
var DivPy = document.getElementById('python');

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
	document.getElementById('Page1').innerHTML = text;
}

function getSurveyID(surveyID,access_token) {
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
	document.getElementById('Page2').innerHTML = responseText;
	page1.classList.add('invisible');
	page2.classList.remove('invisible');
	page3.classList.add('invisible');
}

tab1.onclick = function(){
	page1.classList.remove('invisible');
	page2.classList.add('invisible');
	page3.classList.add('invisible');
}
tab2.onclick = function(){
	page1.classList.add('invisible');
	page2.classList.remove('invisible');
	page3.classList.add('invisible');
}
tab3.onclick = function(){
	page1.classList.add('invisible');
	page2.classList.add('invisible');
	page3.classList.remove('invisible');
}
TabJS.onclick = function(){
	DivJS.classList.remove('invisible');
	DivPy.classList.add('invisible');
}
TabPy.onclick = function(){
	DivJS.classList.add('invisible');
	DivPy.classList.remove('invisible');
}
