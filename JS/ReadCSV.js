
function Readfile(){
    all_events = [];
    cities = [];
    var file = new FileReader();
    var rows = 20;



    file.onload = function (e) {

        rows = e.target.result.split("\n");

        for (var row = 1; row < rows.length; row++) {


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

            var markerObject = {
                'start_date_object' : start_date_object,
                'country' : country,
                'region' : region,
                'ort' : ort,
                'german_region' : german_region,
                'category' : category,
                'link' : link,
                'title' : title


            };
            //
            // markerObject.start_date_object = start_date_object;
            // markerObject.country = country;
            // markerObject.region = region;
            // markerObject.ort = ort;
            // markerObject.german_region = german_region;
            // markerObject.category = category;
            // markerObject.link = link;
            // markerObject.title = title;

            if (markerObject.country != undefined && markerObject.ort != undefined){
                 var ort_name = {
                    "country" : cells[5],
                    "name" : cells[6],
                };
                cities.push(ort_name);
            }

            all_events.push(markerObject);

        }


    };

    file.readAsText($("#inputfile")[0].files[0]);



}

