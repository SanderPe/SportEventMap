/** @function this function reads the CSV file, uses the geographical information
 * to find an address using a geocoding service and then puts it all into an object
 * 'markerObject' which is pushed into the 'all_events' list*/
function Readfile(){

    let abbrivation_list = [];
    let abbrivation;
    let discipline_list = ["AK_U9","AK_U11","AK_U13","AK_U15","AK_U17","AK_U19","AK_U22","AK_O19","AK_O35"];
    all_events = [];
    cities = [];
    var file = new FileReader();
    var rows = 20;
    var region_full = "";
    var lat = 0;
    var lng = 0;
    let dis;
    file.onload = function (e) {

        rows = e.target.result.split("\n");

        for (var row = 1; row < rows.length - 1; row++) {


            var columns = rows[row].split(",");
            var cells = columns[0].split(";");

            let start_date = cells[0];
            let end_date = cells[1];
            let registration_deadline = cells[11];

            let start_date_object = new Date(start_date[6] + start_date[7] + start_date[8] + start_date[9] + '-' + start_date[3] + start_date[4] + '-' + start_date[0] + start_date[1])

            let country = cells[5];
            let region = cells[9];
            let ort = cells[6];
            let german_region = cells[7];
            let category = cells[10];
            let link = cells[12];
            let title = cells[2];
            let register = cells[14];
            let discipline_list_structured = [];
            let counter = 14;

            if (register === "nein"){
                register = "-";
            }
            /** Constructing data for pop-up info*/
            discipline_list.forEach((discipline, discipline_number) =>{
                abbrivation_list = [];
                counter++;
                var d = cells[counter];
                if (d !== undefined){
                    let substrings = d.split("/")
                    if (substrings.length > 0){
                        substrings.forEach((element, index) =>{
                            index++;
                            if (index  === substrings.length){
                                abbrivation = element[0];
                            }
                            else{
                                abbrivation = element[0] + "/"
                            }
                            abbrivation_list.push(abbrivation)

                        })

                        dis = discipline + ": " + abbrivation_list + '<br>';

                        console.log(dis.length);
                        if (dis.length > 8 ){
                            if (dis.includes("E", 7) || dis.includes("D" ,7) || dis.includes("M", 7)){
                                discipline_list_structured.push(dis);
                            }
                        }

                        // console.log(discipline_list_structured);

                    }


                }
            })


            /** assigning full region name for geocoding purposes */
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
           //console.log(location);
            /** here it access the geocoding service */
            axios.get('https://api.opencagedata.com/geocode/v1/json', {
                params: {
                    q: location,
                    key: '5ae703a49d7a4a2e97f38cdbda0f7ec8'
                }
            }).then(function (response) {

                lat = response.data.results[0].geometry.lat;
                lng = response.data.results[0].geometry.lng;

                var markerObject = {
                    'start_date_object' : start_date_object,
                    'end_date' : end_date,
                    'start_date' : start_date,
                    'country' : country,
                    'region' : region,
                    'ort' : ort,
                    'german_region' : german_region,
                    'category' : category,
                    'link' : link,
                    'title' : title,
                    'region_full' : region_full,
                    'lat' : lat,
                    'lng' : lng,
                    'register' : register,
                    'registration_deadline' : registration_deadline,
                    'discipline' : discipline_list_structured

                };


                all_events.push(markerObject);


                })
                    .catch(function (error) {
                        console.log(error)
                    });
        }
    };

    file.readAsText($("#inputfile")[0].files[0]);
    /** timeout is needed because with big files it takes more than
     * 2 sec and max 3 sec to get
     * all the geocode responses back */
    setTimeout(function (){
        webapp(searched_ort);
    },3000)


}

