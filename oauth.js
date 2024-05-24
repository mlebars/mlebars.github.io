var client_id = "80KuYkrISYermF12t4MCUg";
var client_secret = "149296464087082804902322893091775271179";
var myAccessToken = "bearer cOmUpOXfevWx560egh1njqp2a6d0YkozFUQA3bgoi4m1t6AiPGBq1BNpPS-qkLy8EnAzYZdjRS6t-4SUUsV3YLvA2N0sB3PJHMw9VEZ3jILEZRtXkrOoiv3FQpXxYw5c";
var redirect_uri = "https://mlebars.github.io/";

var SM_API_BASE = "https://api.surveymonkey.com";
var AUTH_CODE_ENDPOINT = "/oauth/authorize";
var ACCESS_TOKEN_ENDPOINT = "/oauth/token";

var auth_dialog_uri = SM_API_BASE + AUTH_CODE_ENDPOINT + "?redirect_uri=" + redirect_uri + "&client_id=" + client_id + "&response_type=code";
window.onload = function() {
    var link = document.getElementById("oauthStart");
    link.setAttribute("href", auth_dialog_uri);
    return false;
}

function handle_redirect(redirect_uri) {
	var urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('code');
}

async function exchange_code_for_token(auth_code, client_secret, client_id, redirect_uri) {
	var data = {
		"client_secret": client_secret,
		"code": auth_code,
		"redirect_uri": redirect_uri,
		"client_id": client_id,
		"grant_type": "authorization_code"
	}
	var formBody = [];
		for (var property in data) {
  			var encodedKey = encodeURIComponent(property);
  			var encodedValue = encodeURIComponent(data[property]);
  			formBody.push(encodedKey + "=" + encodedValue);
		}
	formBody = formBody.join("&");
	access_token_uri = SM_API_BASE + ACCESS_TOKEN_ENDPOINT;
	const access_token_response = await fetch(access_token_uri, {
		"method": "POST",
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			"Accept": "application/json",
			//"mode": "no-cors",
			//"Access-Control-Allow-Origin": "*",
			//"Access-Control-Allow-Methods": "GET; POST; PATCH; PUT; DELETE; OPTIONS",
			//"Access-Control-Allow-Headers": "Origin; Content-Type; X-Auth-Token",
			"Authorization": myAccessToken
		},
		"body": formBody
	});
	const response_data = await access_token_response.json();
	const access_token = response_data["access_token"];
	getSurveys(access_token);
	return access_token;
}

if (handle_redirect(redirect_uri)) {
	var preAuth = document.getElementById('preAuth');
	preAuth.classList.add('invisible');
	var auth_code = handle_redirect(redirect_uri);
	var userToken = exchange_code_for_token(auth_code, client_secret, client_id, redirect_uri);
} else {
	var postAuth = document.getElementById('postAuth');
	postAuth.classList.add('invisible');
}
