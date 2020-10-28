



var geojson2 = [];


$(document).ready(function () {


    // function filter(item){
    //
    //
    // }
    // $("#filtering").on('submit', function(e) {
    //
    //     // var checkboxdata = Array.from(document.querySelectorAll('#filtering input')).reduce((acc, input) => ({...acc,
    //     //     [input.id]: input.value}),{});
    //     // console.log(checkboxdata);
    //     //
    //




    });

    $('#filtering').click(function () {




        var file = new FileReader();
        file.onload = function (e) {




            var rows = e.target.result.split("\n");

            //map construction
            mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGVyNzg5IiwiYSI6ImNrZzFhZzl3cTBmZ3gyenBpZ3Jqb2dseXAifQ.XoRNw5LemXXJwFvbV7Dubg';






            //filtering
            if (document.getElementById("cat_a").checked == true){
                var geojson2 = [];
                var chosen_category = document.getElementById("cat_a").value;

            }
            else if (document.getElementById("cat_b").checked == true){
                var geojson2 = [];
                var chosen_category = document.getElementById("cat_b").value;

            }
            else if (document.getElementById("cat_c").checked == true){
                var geojson2 = [];
                var chosen_category = document.getElementById("cat_c").value;

            }
            else if (document.getElementById("cat_d").checked == true){
                var geojson2 = [];
                var chosen_category = document.getElementById("cat_d").value;

            }
            else if (document.getElementById("cat_e").checked == true){
                var geojson2 = [];
               var chosen_category = document.getElementById("cat_e").value;

            }
            else if (document.getElementById("cat_international").checked == true){
                var geojson2 = [];
                var chosen_category = document.getElementById("cat_international").value;

            }
            else if (document.getElementById("displayall").checked == true) {
                var geojson2 = [];
                chosen_category = "All";




            }






            for (var row = 0; row < rows.length; row++){

                var columns = rows[row].split(",");

                var cells = columns[0].split(";");

                let start_date = (cells[0]).valueOf();
                var end_date = cells[1];

                var country = cells[5];
                var region = cells[9];
                var ort = cells[6];
                let category = cells[10];

                switch (category){



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
                console.log(category);


                let letcat = chosen_category;


                let link = cells[12];
                let title = cells[2];




                var category_color = '';
                // var category = "B1-Level"

                let currentday = new Date();
                let currentdate = (currentday.getDay() +"." + currentday.getMonth()+ "." + currentday.getFullYear()).valueOf() ;


                //function filtering(){
                    if (category == letcat || letcat == "All"){
                        geocode();
                        // geocode function

                        function geocode(){
                            var location = ort + " " + region + " " + country;


                            axios.get('https://api.opencagedata.com/geocode/v1/json', {params:{
                                    q:location,
                                    key: '5ae703a49d7a4a2e97f38cdbda0f7ec8'
                                }}).then(function (response) {

                                //formatted address
                                var lat = response.data.results[0].geometry.lat;
                                var lng = response.data.results[0].geometry.lng;





                                // //console.log(lat + " "+ lng)
                                // switch (category) {
                                //     case "A-Level":
                                //         category_color = '../Resources/POI/Blue.png';
                                //         break;
                                //     case "B-Level":
                                //         category_color = '../Resources/POI/Brown.png';
                                //         break;
                                //     case "C1-Level" || "C2-Level":
                                //         category_color = '../Resources/POI/Green.png';
                                //         break;
                                //     case "D1-Level" || "D2-Level":
                                //         category_color = '../Resources/POI/Grey.png';
                                //         break;
                                //     case "E-Level":
                                //         category_color = '../Resources/POI/Red.png';
                                //         break;
                                //     default:
                                //         category_color = '../Resources/POI/Yellow.png';
                                //
                                // }
                                //
                                // category_colorlist.push(category_color);

                                //markercolordefining
                                switch (category) {


                                    case "A-Level":
                                        if (currentdate < start_date){
                                            category_color = "#FF0E95";
                                        }
                                        else{
                                            category_color = "#F9BBC8";
                                        }

                                        break;
                                    case "B-Level":
                                        if (currentdate < start_date){
                                            category_color = "#0001FE";
                                        }
                                        else{
                                            category_color = "#A7D9E8";
                                        }
                                        break;
                                    case "C-Level":
                                        if (currentdate < start_date){
                                            category_color = "#018101";
                                        }
                                        else{
                                            category_color = "#8BF093";
                                        }


                                        break;
                                    case "D-Level":
                                        if (currentdate < start_date){
                                            category_color = "#F80300";
                                        }
                                        else{
                                            category_color = "#FF8072";
                                        }
                                        break;
                                    case "E-Level":
                                        if (currentdate < start_date){
                                            category_color = "#FDFD04";
                                        }
                                        else{
                                            category_color = "#EFE8A7";
                                        }
                                        break;
                                    default:
                                        if (currentdate < start_date){
                                            category_color = "#7C017F";
                                        }
                                        else{
                                            category_color = "#E982F0";
                                        }

                                }

                                //Geojson contruction
                                var address = {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [lng, lat]
                                    },
                                    'properties': {

                                        "title" : title,
                                        "description" : link,
                                        // "marker-symbol": "marker-15",
                                        // "marker-size": "small",
                                        "marker-color": category_color



                                    }
                                };




                                geojson2.push(address);



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
                center: [10.451526 ,51.165691], // starting position [lng, lat]
                zoom: 6



            });

            //add constructed geojson2 list to map

            map.on('load', function () {


                map.loadImage(
                    '../Resources/POI/sdf.png',

                    function (error, image) {
                        if (error) throw error;
                        map.addImage('custom-marker', image,{'sdf': true});
                        map.addSource('points', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features':  geojson2
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
                                'icon-image': 'custom-marker',
                                'icon-size' : 1,
                                'text-field': ['get', 'title'],
                                'text-font': [
                                    'Open Sans Semibold',
                                    'Arial Unicode MS Bold'
                                ],
                                'text-offset': [0, 1.25],
                                'text-anchor': 'top'


                            },
                            'paint' : {
                                'icon-color' : ['get', 'marker-color']
                            }


                        });
                        map.on('click', 'points', function (e){
                            var coordinates = e.features[0].geometry.coordinates.slice();
                            var description = e.features[0].properties.description;
                            var title = e.features[0].properties.title;


                            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }
                            if (description.length != 0){
                                new mapboxgl.Popup()
                                    .setLngLat(coordinates)
                                    .setHTML('<h3><a href="' + description  + '" target="_blank" title="Opens in a new window">Link to the website</a></h3>')
                                    .addTo(map);

                            }

                            else{
                                new mapboxgl.Popup()
                                    .setLngLat(coordinates)
                                    .setHTML("No link available.")
                                    .addTo(map);

                            }
                            map.on('mouseenter', 'points', function () {
                                map.getCanvas().style.cursor = 'pointer';
                            });

                            map.on('mouseleave', 'points', function () {
                                map.getCanvas().style.cursor = '';
                            });


                        });

// Change the cursor to a pointer when the mouse is over the places layer.


// Change it back to a pointer when it leaves.




                    })})









            //console.log(geojson2)



        };
        file.readAsText($("#inputfile")[0].files[0]);
    })

