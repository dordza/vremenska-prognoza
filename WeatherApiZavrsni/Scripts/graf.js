//GOOGLE CHARTS PLUGIN
google.charts.load("visualization", { 'packages': ["line", "corechart"] });

//LOGIN & REGISTRACIJA TOGGLE
$(".message a").click(function () { // PREBACIVANJE IZ PRIJAVE U REGISTRACIJU
    $(".toggle").animate({ height: "toggle", opacity: "toggle" }, "slow");
    $(this).closest('form').find("input[type=text], input[type=password]").val("");
    requiredResolver();
});

// PROVJERA REQUIRED POLJA
// AKO SU INPUT POLJA ZA REGISTRACIJU I PRIJAVU required i ako su hidden(display:none) prijava ne radi dobro 
// U  OVOJ FUNKCIJU RJEŠAVAMO TAJ PROBLEM ONIM POLJIMA KOJA SU hidden uklanjamo atribut required

function requiredResolver() {
    var register = $(".register-form");
    var registerInputs = $("#registracija :input");
    var login = $(".login-form");
    var loginInputs = $("#prijava :input");

    if (register.css("display") == "none") {
        registerInputs.removeAttr("required");
        loginInputs.attr("required", "true");
    } else {
        loginInputs.removeAttr("required");
        registerInputs.attr("required", "true");
    }
}

setInterval(function () {
    novaSekunda(); //sat se pomiče svake sekunde
}, 1000);

function novaSekunda() {
    $("#currentTime").html(formatiranoVrijeme());
}

function formatiranoVrijeme() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var vrijemeString = day + "." + month + "." + year + ".  " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return vrijemeString;
}

$(function () {
    //GLOBALNE VARIJABLE
    var apiKey = "48310106dfcc6c48";
    var apiUrl = "http://api.wunderground.com/api/";
    var response;
    var locationInput = $("#location-input");
    var locationText;
    var location;

    //locationText = "Split, Hrvatska";
    //location = "/q/HR/Split";

    $.ajax({
        type: "POST",
       
        url: "Default.aspx/OmiljeniGrad",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            locationText = data.d.Tekst !== "" ? data.d.Tekst : "Split, Hrvatska";
            location = data.d.Lokacija !== "" ? data.d.Lokacija : "/q/HR/Split";
        },
        error: function(data) {
            alert("Error"+data);
        }
    });

    // PRETRAŽIVANJE LOKACIJE

    $("body").on("click", ".location-list li", function () {
        location = $(this).data("location");
        locationText = $(this).text();
        $("#location-results").empty();
        $("svg").empty();
        locationInput.val(null);
        dohvatiPrognozu(location);
    });



    locationInput.keyup(function () {
        var query = locationInput.val();
        var cityRequest = "http://autocomplete.wunderground.com/aq?query=" + query;
        if (query.length < 2) {
            $("#location-results").empty();
        } else {

            //jQuery ajax request for the location data.
            $.ajax({
                url: cityRequest,
                jsonp: "cb",
                dataType: "jsonp",
                success: function (data) {
                    var locations = data.RESULTS;
                    showCities(locations);
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }
    });

    function showCities(locations) {
        var items = [];
        $("#location-results").empty();
        $.each(locations, function (index, location) {
            items.push('<li data-location="' + location.l + '">' + location.name + "</li>");
        });

        $("<ul/>", {
            'class': "location-list",
            html: items.join("")
        }).appendTo("#location-results");
    };
    ///////////////////////////

    /// DOHVAĆANJE PROGNOZE SA WUNDERGROUND API
    function dohvatiPrognozu(location) {
        var weatherRequest = apiUrl + apiKey + "/hourly/forecast/almanac/lang:CR" + location + ".json";
        //jQuery ajax 
        $.ajax({
            url: weatherRequest,
            dataType: "jsonp",
            success: function (data) {
                response = data;
                google.charts.setOnLoadCallback(drawChart(response));
            },

            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }


    function drawChart(response) {
        var grafDiv = document.getElementById("graf_div");
        var data = new google.visualization.DataTable(); // VRIJEME I TEMPERATURA
        data.addColumn("date", "Vrijeme");
        data.addColumn("number", "Temperatura");

        $("#locationName").html("Prognoza za " + locationText);
        var podaciPoSatu = response.hourly_forecast;

        podaciPoSatu.forEach(function (item) {
            var timeBase = item.FCTTIME;

            var hour = timeBase.hour_padded;
            var day = timeBase.mday_padded;
            var month = timeBase.mon_padded;
            var year = timeBase.year;

            var date = year + "-" + month + "-" + day + " " + hour + ":00"; // VRIJEME
     
            item.temperature = parseInt(item.temp.metric, 10); // TEMPERATURA U C

            data.addRows([
                [new Date(date), item.temperature],
            ]);
        });

        // POSTAVKE GRAFA
        var materialOptions = {
            chart: {
                title: "Trodnevna prognoza",
                style: {
                    text: {
                        fontSize: 17
                    },
                    background: {
                        fillColor: "#18bc9c"
                    },
                    title: {
                        fillColor: "#000"
                    }
                }
            },
            legend: {
                style: {
                    text: {
                        fillColor: "#000"
                    }
                }
            },
            series: {
                // Gives each series an axis name that matches the Y-axis below.
                0: {
                    axis: "Temperatura",
                    color: "#ffd200"
                }
            },
            height: 500,
            axes: {
                // Adds labels to each axis; they don't have to match the axis names.
                y: {
                    Temperatura: { label: "Temperatura °C" },
                    all: {
                        style: {
                            text: {
                                fillColor: "#000",
                                fontSize: 17
                            }
                        },
                        format: {
                            pattern: "# °C"
                        }
                    }
                },

                x: {
                    all: {
                        style: {
                            text: {
                                fillColor: "#000",
                                fontSize: 17
                            }
                        },
                        format: {
                            pattern: "dd.MM HH:mm"
                        }
                    }
                }
            }
        };

        function drawMaterialChart() {
            var materialChart = new google.charts.Line(grafDiv);
            materialChart.draw(data, materialOptions);
        }
        drawMaterialChart();
    }
    novaSekunda();
    dohvatiPrognozu(location);
    var currentUrl = window.location.href;
    if (currentUrl.indexOf("Login")) {
        requiredResolver();
    }
});