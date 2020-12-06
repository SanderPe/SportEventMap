
function Readfile(){

    all_events = [];
    cities = [];
    var file = new FileReader();
    var rows = 20;
    var region_full = "";
    var lat = 0;
    var lng = 0;
    var geocodecounter = 0;
    var latlnglist = [];



    file.onload = function (e) {

        rows = e.target.result.split("\n");

        for (var row = 1; row < rows.length - 1; row++) {


            var columns = rows[row].split(",");
            var cells = columns[0].split(";");

            let start_date = cells[0];

            let start_date_object = new Date(start_date[6] + start_date[7] + start_date[8] + start_date[9] + '-' + start_date[3] + start_date[4] + '-' + start_date[0] + start_date[1])

            var country = cells[5];
            let region = cells[9];
            var ort = cells[6];
            let german_region = cells[7];
            let category = cells[10];
            let link = cells[12];
            let title = cells[2];
            //var markerObject = new Object();



            //formatting Veranstalter
            switch (region) {
                case "BAW" || "GRSO":
                    region_full = "Baden-Württemberg";
                    break;
                case "BAY" || "GRSO":
                    region_full = "Bayern";
                    break;
                case "BBB" || "GRN":
                    region_full = "Brandenburg Berlin";
                    break;
                case "BRE" || "GRN":
                    region_full = "Bremen";
                    break;
                case "HAM" || "GRN":
                    region_full = "Hamburg";
                    break;
                case "HES" || "GRM":
                    region_full = "Hessen";
                    break;
                case "MVP" || "GRN":
                    region_full = "Mecklenburg-Vorpommern";
                    break;
                case "NIS" || "GRN":
                    region_full = "Niedersachsen";
                    break;
                case "NRW" || "GRW":
                    region_full = "Nordrhein-Westfalen";
                    break;
                case "RHL" || "RHP" || "GRM":
                    region_full = "Rheinland-Pfalz";
                    break;
                case "SAA" || "GRM":
                    region_full = "Saarland";
                    break;
                case "SAC" || "GRSO":
                    region_full = "Sachsen";
                    break;
                case "SAH" || "GRN":
                    region_full = "Sachsen-Anhalt";
                    break;
                case "SLH" || "GRN":
                    region_full = "Schleswig-Holstein";
                    break;
                case "THÃœ" || "GRM":
                    region_full = "Thüringen";
                    break;
                case "DBV":
                    region_full = "Germany";
                    break;
                case "BEC":
                    region_full = "Europe";
                    break;
                default:
                    region_full = "";

            }

            var location = country + " " + ort + " " + region_full;
           // console.log(location + " " + region)

            axios.get('https://api.opencagedata.com/geocode/v1/json', {
                params: {
                    q: location,
                    key: '5ae703a49d7a4a2e97f38cdbda0f7ec8'
                }
            }).then(function (response) {


                lat = response.data.results[0].geometry.lat;
                lng = response.data.results[0].geometry.lng;
                // markerObject["lat"] = lat;
                // markerObject["lng"] = lng;

                var markerObject = {
                    'start_date_object' : start_date_object,
                    'country' : country,
                    'region' : region,
                    'ort' : ort,
                    'german_region' : german_region,
                    'category' : category,
                    'link' : link,
                    'title' : title,
                    'region_full' : region_full,
                    'lat' : lat,
                    'lng' : lng



                };

                all_events.push(markerObject);


                })
                    .catch(function (error) {
                        console.log(error)
                    });


        }



    };

    file.readAsText($("#inputfile")[0].files[0]);
    webapp(searched_ort);


}

