/**
* Define global variables.
*/
var api_key                 = false;    // Smart Citizen API Key
var debug					= true;		// Display debugging information to console?

$(document).on("ready", function() {

	$("#api_key").val(localStorage.api_key);

	if (localStorage.api_key != '') {
		if (debug) { console.log("Got API Key. Getting data."); }
		getSensorDataXHR();
	} 
	else {
		$.mobile.changePage( "#settings-view");
	}

	$('#refresh').click(function(){
		if (localStorage.api_key != '') {
			getSensorDataXHR();
		}
	});

});

function getSensorDataXHR() {

	$("#refreshing").show();
	$("#refresh").hide();

	var xhr = new XMLHttpRequest({mozSystem: true, responseType: 'json'});

	xhr.addEventListener("load", transferComplete, false);
	xhr.addEventListener("error", transferFailed, false);
	xhr.addEventListener("abort", transferCanceled, false);

	xhr.open('GET', "http://api.smartcitizen.me/v0.0.1/" + localStorage.api_key + "/lastpost.json", true);

	function transferComplete() {
		if (xhr.status === 200 && xhr.readyState === 4) {
			var data = JSON.parse(xhr.response);
			$("#timestamp").html(data.devices[0].posts.timestamp + " UTC");
			$("#temp").html(data.devices[0].posts.temp + " ºC");
			$("#hum").html(data.devices[0].posts.hum + " %");
			$("#co").html(data.devices[0].posts.co + " kΩ");
			$("#no2").html(data.devices[0].posts.no2 + " kΩ");
			$("#light").html(data.devices[0].posts.light + " LUX");
			$("#noise").html(data.devices[0].posts.noise + " DB");
			$("#bat").html(data.devices[0].posts.bat + " %");
			$("#nets").html(data.devices[0].posts.nets);

			$("#refreshing").hide();
			$("#refresh").show();
		}
	}

	function transferFailed() {
		console.log("An error occurred transferring the data.");
	}

	function transferCanceled() {
		console.log("The transfer has been cancelled by the user.");
	}

	xhr.onerror = function (e) {
		console.log(e);
	};

	xhr.send();
}

/**
* Handler for the tap on the "Done" button on the settings screen.
*/
$('#save-settings-btn').bind('click', function () {
	// Store the OpenCellID.org API key in local storage.
	window.localStorage.setItem("api_key", $("#api_key").val());
	if (debug) { console.log("Storing api_key="+$("#api_key").val()); }
	if (debug) { console.log("Retrieved api_key="+localStorage.api_key); }
	$.mobile.changePage( "#list-view");
	getSensorDataXHR();
});