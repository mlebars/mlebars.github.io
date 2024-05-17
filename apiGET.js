const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "bearer cOmUpOXfevWx560egh1njqp2a6d0YkozFUQA3bgoi4m1t6AiPGBq1BNpPS-qkLy8EnAzYZdjRS6t-4SUUsV3YLvA2N0sB3PJHMw9VEZ3jILEZRtXkrOoiv3FQpXxYw5c");
myHeaders.append("Cookie", "attr_multitouch=\"d68ZnthUwK5yHWYjwJDSLN7kLe4=\"; cdp_seg=\"RTvTqnsaYEnEQS5xUFs7jaagUus=\"; ep201=\"ruWnNqv2Rcg/S09mhNQzlQ0gl/s=\"; ep202=\"Ho8rOLNNhXN+6PaSHbzBaQ8wVew=\"; ep203=\"4UdjPNj2cIMU/P81GKM+STrI2S8=\"");

const requestOptions = {
	method: "GET",
  	headers: myHeaders,
  	redirect: "follow"
};

let mySurveys = null;
getSurveys();
var text = "<table><tr><th>Survey Title</th><th>Response(s)</th></tr>";
function getSurveys(){
	fetch("https://api.surveymonkey.com/v3/surveys?include=response_count", requestOptions)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			mySurveys = data;
			//console.log(mySurveys);
		});
}
var mySurveysData = mySurveys['data'];
printSurveys()
function printSurveys(){
	for (let i = 0; i < mySurveysData.length; i++) {
	  	//text += cars[i] + "<br>";
		console.log(mySurveysData[i]['title']);
		i += 1;
	}
}
