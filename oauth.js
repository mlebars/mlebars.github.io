var client_secret = "149296464087082804902322893091775271179"
var redirect_uri = "https://smeapimarieapp.w3spaces.com/authenticated.html"
var client_id = "80KuYkrISYermF12t4MCUg"

var SM_API_BASE = "https://api.surveymonkey.com";
var AUTH_CODE_ENDPOINT = "/oauth/authorize";

function handle_redirect(redirect_uri) {
	// Parse authorization code out of url
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

	access_token_uri = SM_API_BASE + ACCESS_TOKEN_ENDPOINT;
	var access_token_response = await fetch(access_token_uri, {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"Authorization": "Bearer {access-token}"
		},
		"body": JSON.stringify(data)
	});
	var access_json = access_token_response.json();

	return access_json["access_token"];
}
