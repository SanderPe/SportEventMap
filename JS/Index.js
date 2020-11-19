


$(document).ready(function () {

    document.getElementById("cat_a").checked = true;
    document.getElementById("cat_b").checked = true;
    document.getElementById("upcomingevents").checked = true;
    document.getElementById("buttonregionfilter").innerHTML = "Show region filter options";

    document.getElementById("DBV").checked = true;
    document.getElementById("Sudost").checked = true;
    document.getElementById("Mitte").checked = true;
    document.getElementById("Nord").checked = true;
    document.getElementById("West").checked = true;

    var entersearch = document.getElementById("searchstring");
    entersearch.addEventListener("keyup", function (event){
        if (event.keyCode ===13){
            let searched_ort = document.getElementById("searchstring").value;
            webapp(searched_ort);
        }
    })


    // autoselect region checkboxes
    // var autoselect_regioncheck = document.getElementsByName("reg");
    // for (var i =0; i < autoselect_regioncheck.length; i++){
    //     autoselect_regioncheck[i].checked = true;
    // }

    //searchbox suggestions


    //document.getElementById('searchstring').addEventListener('input', (e) =>{

        const suggestionPanel = document.querySelector('#searchsuggestions');
        const searchInput = document.querySelector('#searchstring')

        searchInput.addEventListener('input', function (){
            const input = searchInput.value;
            if (input.length > 0){
                suggestionPanel.innerHTML = "";
                const suggestions = cities.filter(city => city.name.includes(input) || city.name.toLowerCase().includes(input));
                // const suggestions = cities.filter(function (city){
                //     return city.name.toLowerCase().startsWith(input);
                // });

                let i = 0;

                suggestions.forEach(function (suggested){
                    if (i < 5){
                        i ++;
                        const a = document.createElement('a');
                        a.innerHTML = suggested.name + ", " + suggested.country + "<br>";
                        a.setAttribute('href', '#')
                        a.setAttribute('value', suggested.name)
                        a.onclick = function(){ setsuggestion(suggested.name);};
                        suggestionPanel.appendChild(a);

                    }
                });
            }


        })

        //var suggestion_table = "<table><tr>";

       // if (e.target.value){




            // city_suggestions = cities.filter(city => city.name.toLowerCase().StartsWith.includes(e.target.value));
            // console.log(city_suggestions);
            // for (var i = 0; city_suggestions.length; i++){
            //
            //     let city = city_suggestions[i].name;
            //     let country = city_suggestions[i].country;
            //
            //
            //     if (city !== undefined){
            //
            //         suggestion_table += '<td><a href="#" name="countrysug" onclick="setsuggestion(this)">'+ city+", "+ country+'</a></td>' ;
            //          var link = document.createElement("countrysug")
            //          link.setAttribute("value", city);
            //
            //     }
            //
            //     // if ()
            //     //
            //     // for(var j = 0; j<5;j++){
            //
            //
            // }








            $('#suggested_city').click(function () {

                console.log("lol");
            });


       // }


     //   document.getElementById("searchsuggestions").innerHTML = suggestion_table;





    //});


    //display date last modified
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const fileInput = document.querySelector('#inputfile');
    fileInput.addEventListener('change', (event) => {

        const files = event.target.files;




        for (let file of files) {
            const day = new Date(file.lastModified).getDay();
            const month = new Date(file.lastModified).getMonth();
            const year = new Date(file.lastModified).getFullYear();
            const hour = new Date(file.lastModified).getHours();
            const minutes = new Date(file.lastModified).getMinutes();
            //console.log(`${file.name} has a last modified date of ${date}`);
            document.getElementById("modifieddate").innerHTML ="Events Data from " + day + "-" + monthNames[month] + "-" + year + " at " + hour + ':' + minutes;
        }
    });

    });

function showCheckbox(){
    var regfilterbutton = document.getElementById("buttonregionfilter");
    if (regfilterbutton.innerHTML == "Show region filter options" ){
        regfilterbutton.innerHTML = "Hide region filter options";
    }
    else {
        regfilterbutton.innerHTML = "Show region filter options";
    }

    var showfilter = document.getElementById("region_div");
    if (showfilter.style.display === "none") {
        showfilter.style.display = "block";
    } else {
        showfilter.style.display = "none";
    }


}

function setsuggestion(cityname){
    const inputfield = document.getElementById('searchstring')
    inputfield.setAttribute('value', cityname);
    webapp(cityname);

}

$('#inputfile').change(function (){
    webapp();
});

$('#filtering').click(function () {
    webapp();
});
$('#region').click(function () {
    webapp();
});
$('#searchstring_button').click(function () {
    let searched_ort = document.getElementById("searchstring").value;
    webapp(searched_ort);
});


function webapp(searchdata){

    var zoomlevel = 10;
    var upcomingevents = true;
    var pastevents = true;
    var chosen_regionList = [];
    var chosen_categorylist = [];
    var sports_events = [];
    var file = new FileReader();

    file.onload = function (e) {

        var rows = e.target.result.split("\n");

        //map construction
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGVyNzg5IiwiYSI6ImNrZzFhZzl3cTBmZ3gyenBpZ3Jqb2dseXAifQ.XoRNw5LemXXJwFvbV7Dubg';

        //region checkbox list
        var cbarray2 = document.getElementsByName("reg");

        for (var i =0; i < cbarray2.length; i++){
            if (cbarray2[i].checked){
                chosen_regionList.push(cbarray2[i].value);
            }
        }
        //zoom based on selected regions
        if (chosen_regionList.includes("BWF")){
            zoomlevel = 0;
        }
        else if (chosen_regionList.includes("BEC")){
            zoomlevel = 3;
        }
        else {
            zoomlevel = 5;
        }


        console.log(chosen_regionList);


        //search text box based on ort

        var searched_ort = searchdata;
        console.log(searchdata);
        if (searched_ort == undefined || searched_ort == ""){
            searched_ort = "all";
        }



        //checkboxes category
        var cbarray = document.getElementsByName("cat");
        for (var i =0; i < cbarray.length; i++){
            if (cbarray[i].checked){
                chosen_categorylist.push(cbarray[i].value);
            }

        }


        //past events
        if (document.getElementById("pastevents").checked == false){
            pastevents = false;
        }
        //upcoming events
        if (document.getElementById("upcomingevents").checked == false){
            upcomingevents = false;
        }

        console.log(chosen_categorylist);

        for (var row = 0; row < rows.length; row++) {

            var columns = rows[row].split(",");
            var cells = columns[0].split(";");

            let start_date = cells[0];

            let start_date_object = new Date(start_date[6]+start_date[7]+start_date[8]+start_date[9]+'-'+start_date[3]+start_date[4]+'-'+start_date[0]+ start_date[1])


            var end_date = cells[1];
            var country = cells[5];
            let region = cells[9];
            var ort = cells[6];
            let category = cells[10];


            let link = cells[12];
            let title = cells[2];


            //formatting category
            switch (category) {


                case "A-Level":
                    category = "A-Level";
                    break;

                case "B1-Level" || "B-Level" :
                    category = "B-Level";
                    break;

                case "C1-Level" || "C2-Level":
                    category = "C-Level";
                    break;

                case "D1-Level" || "D2-Level":
                    category = "D-Level";
                    break;

                case "E-Level":
                    category = "E-Level";
                    break;

                default:
                    category = "International";
            }

            // letcat = chosen_category;
            var category_color = '';
            let currentdate = new Date();


            //function filtering(){
            if (chosen_categorylist.includes(category) && chosen_regionList.includes(region)) {
                if (searched_ort == ort || searched_ort == "all"){
                    if (upcomingevents == true && pastevents == true){

                        definemarkers();
                    }
                    else if (upcomingevents == true && pastevents == false){

                        if (currentdate > start_date_object){

                        }
                        else{
                            definemarkers();
                        }
                    }
                }
            }

            function definemarkers(){


                //formatting Veranstalter
                switch (region){
                    case "BAW" || "GRSO":
                        region = "Baden-Württemberg";
                        break;
                    case "BAY" || "GRSO":
                        region = "Bayern";
                        break;
                    case "BBB" || "GRN":
                        region = "Brandenburg Berlin";
                        break;
                    case "BRE" || "GRN":
                        region = "Bremen";
                        break;
                    case "HAM" || "GRN":
                        region = "Hamburg";
                        break;
                    case "HES" || "GRM":
                        region = "Hessen";
                        break;
                    case "MVP" || "GRN":
                        region = "Mecklenburg-Vorpommern";
                        break;
                    case "NIS" || "GRN":
                        region = "Niedersachsen";
                        break;
                    case "NRW" || "GRW":
                        region = "Nordrhein-Westfalen";
                        break;
                    case "RHL" || "RHP" || "GRM":
                        region = "Rheinland-Pfalz";
                        break;
                    case "SAA" || "GRM":
                        region = "Saarland";
                        break;
                    case "SAC" || "GRSO":
                        region = "Sachsen";
                        break;
                    case "SAH" || "GRN":
                        region = "Sachsen-Anhalt";
                        break;
                    case "SLH" || "GRN":
                        region = "Schleswig-Holstein";
                        break;
                    case "THÃœ" || "GRM":
                        region = "Thüringen";
                        break;
                    case "DBV":
                        region = "Germany";
                        break;
                    case "BEC":
                        region = "Europe";
                        break;
                    default:
                        region ="";

                }

                geocode();

                // geocode function

                function geocode() {
                    var location = country + " " + ort + " " + region + " "  ;
                    console.log(location);



                    axios.get('https://api.opencagedata.com/geocode/v1/json', {
                        params: {
                            q: location,
                            key: '5ae703a49d7a4a2e97f38cdbda0f7ec8'
                        }
                    }).then(function (response) {

                        //formatted address
                        var lat = response.data.results[0].geometry.lat;
                        var lng = response.data.results[0].geometry.lng;

                        

                        //markercolordefining
                        switch (category) {


                            case "A-Level":
                                if (currentdate - start_date_object > 0) {
                                    category_color = "#FF0E95";
                                } else {
                                    category_color = "#F9BBC8";
                                }

                                break;
                            case "B-Level":
                                if (currentdate - start_date_object >0) {
                                    category_color = "#0001FE";
                                } else{
                                    category_color = "#A7D9E8";
                                }
                                break;
                            case "C-Level":
                                if (currentdate - start_date_object > 0) {
                                    category_color = "#018101";
                                } else {
                                    category_color = "#8BF093";
                                }


                                break;
                            case "D-Level":
                                if (currentdate - start_date_object > 0) {
                                    category_color = "#F80300";
                                } else  {
                                    category_color = "#FF8072";
                                }
                                break;
                            case "E-Level":
                                if (currentdate - start_date_object > 0) {
                                    category_color = "#FDFD04";
                                } else  {
                                    category_color = "#EFE8A7";
                                }
                                break;
                            default:
                                if (currentdate - start_date_object > 0) {
                                    category_color = "#7C017F";
                                } else   {
                                    category_color = "#E982F0";
                                }

                        }

                        //Geojson construction
                        var address = {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [lng, lat]
                            },
                            'properties': {


                                "description": title,
                                "link": link,
                                "country":country,
                                // "marker-symbol": "marker-15",
                                // "marker-size": "small",
                                "marker-color": category_color


                            }
                        };


                        sports_events.push(address);


                    })
                        .catch(function (error) {
                            console.log(error)
                        });


                }

            }


            //console.log(country,ort,region);
        }

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.451526, 51.165691], // starting position [lng, lat]
            zoom: zoomlevel


        });

        //add constructed geojson2 list to map

        map.on('load', function () {


            map.loadImage(
                '../Resources/POI/sdf.png',

                function (error, image) {
                    if (error) throw error;
                    map.addImage('custom-marker', image, {'sdf': true});
                    map.addSource('points', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': sports_events
                        }


                    });
                    map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        // 'type' : 'circle',
                        'source': 'points',
                        // 'paint' : {
                        //     'circle-radius' : 20,
                        //     'circle-color' : ['get', 'marker-color'],
                        //
                        // },
                        'layout': {
                            'icon-allow-overlap':true,
                            'icon-image': 'custom-marker',
                            'icon-size': 1,
                            'text-field': ['get', 'title'],
                            'text-font': [
                                'Open Sans Semibold',
                                'Arial Unicode MS Bold'
                            ],
                            'text-offset': [0, 1.25],
                            'text-anchor': 'top'


                        },
                        'paint': {
                            'icon-color': ['get', 'marker-color']
                        }


                    });
                    map.on('click', 'points', function (e) {
                        var coordinates = e.features[0].geometry.coordinates.slice();
                        var description = e.features[0].properties.description;
                        var info = e.features[0].properties.country;
                        var link = e.features[0].properties.link;


                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }
                        if (link.length != 0) {

                            new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML('<p> <b>' + description + '</b> <br><a href="' + link +  '" target="_blank"  title="Opens in a new window" >Link</a><br>' +
                                   info +'</p>')
                                .addTo(map);

                        } else {
                            new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML('<b>' + description + '</b>')
                                .addTo(map);

                        }
                        map.on('mouseenter', 'points', function () {
                            map.getCanvas().style.cursor = 'pointer';
                        });

                        map.on('mouseleave', 'points', function () {
                            map.getCanvas().style.cursor = '';
                        });


                    });

                })
        })

    };



    file.readAsText($("#inputfile")[0].files[0]);
}





