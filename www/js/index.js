var api_key = atob('YzJjNThiYmE2M2RjM2MwYWZlMTY4ZDVhZTZhZGVkODM0NmJlNGEzMA==');

getSensorDataXHR();

$('#refresh').click(function(){
  getSensorDataXHR();
});

function getSensorDataXHR() {

	$("#refreshing").show();
    $("#refresh").hide();

    var xhr = new XMLHttpRequest({mozSystem: true, responseType: 'json'});

    xhr.addEventListener("load", transferComplete, false);
    xhr.addEventListener("error", transferFailed, false);
    xhr.addEventListener("abort", transferCanceled, false);

    xhr.open('GET', "http://api.smartcitizen.me/v0.0.1/" + api_key + "/lastpost.json", true);

    function transferComplete() {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.response);
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
