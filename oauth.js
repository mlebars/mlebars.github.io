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
	// Parse authorization code out of url
	var urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('code');
}

if (handle_redirect(redirect_uri)) {
	var preAuth = document.getElementById('preAuth');
	preAuth.style.visibility = "hidden";
	preAuth.style.height = "0";
	preAuth.style.width = "0";
	var auth_code = handle_redirect(redirect_uri);
	exchange_code_for_token(auth_code, client_secret, client_id, redirect_uri);
} else {
	var postAuth = document.getElementById('postAuth');
	postAuth.style.visibility = "hidden";
	postAuth.style.height = "0";
	postAuth.style.width = "0";
}

async function exchange_code_for_token(auth_code, client_secret, client_id, redirect_uri) {
	var data = {
		"client_secret": client_secret,
		"code": auth_code,
		"redirect_uri": redirect_uri,
		"client_id": client_id,
		"grant_type": "authorization_code"
	}
	access_token_uri = SM_API_BASE + ACCESS_TOKEN_ENDPOINT;
	var access_token_response = await fetch(access_token_uri, {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"Authorization": myAccessToken
		},
		"body": JSON.stringify(data)
	});
	var access_json = access_token_response.json();
	return access_json["access_token"];
}

