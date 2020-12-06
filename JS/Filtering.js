function filtering(marker, category, german_region, searched_data) {

    //past events
    if (document.getElementById("pastevents").checked == false){
        pastevents = false;
    }
    //upcoming events
    if (document.getElementById("upcomingevents").checked == false){
        upcomingevents = false;
    }

    let region = marker.region;
    let start_date_object = marker.start_date_object;
    let country = marker.country;
    let ort = marker.ort;
    let link = marker.link;
    let title = marker.title;
    var ort_name = {};
    var category_color = '';
    let currentdate = new Date();

    if (document.getElementById("pastevents").checked == false){
        pastevents = false;
    }
    else {
        pastevents = true;
    }
    if (document.getElementById("upcomingevents").checked == false){
        upcomingevents = false;
    }
    else {
        upcomingevents = true;
    }




    if (chosen_categorylist.includes(category) && chosen_regionList.includes(region)) {


        if (chosen_german_regionList.includes(german_region) || chosen_german_regionList.includes("all")) {



            if (searched_data == ort || searched_data == "all") {


                if (upcomingevents == true && pastevents == true) {
                    geocode();

                } else if (upcomingevents == true && pastevents == false) {

                    if (currentdate > start_date_object) {


                    } else {
                        geocode();



                    }
                }

                function geocode() {


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
                            if (currentdate - start_date_object > 0) {
                                category_color = "#0001FE";
                            } else {
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
                            } else {
                                category_color = "#FF8072";
                            }
                            break;
                        case "E-Level":
                            if (currentdate - start_date_object > 0) {
                                category_color = "#FDFD04";
                            } else {
                                category_color = "#EFE8A7";
                            }
                            break;
                        default:
                            if (currentdate - start_date_object > 0) {
                                category_color = "#7C017F";
                            } else {
                                category_color = "#E982F0";
                            }
                    }


                    //Geojson construction
                    var address = {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [marker.lng, marker.lat]
                        },
                        'properties': {
                            "description": title,
                            "link": link,
                            "country": country,
                            // "marker-symbol": "marker-15",
                            // "marker-size": "small",
                            "marker-color": category_color

                        }
                    };


                    sports_events.push(address);


                    if (country !== undefined && ort !== undefined){
                        if (cities.includes(ort_name) === false){
                            ort_name = {
                                "country" : country,
                                "name" : ort,
                            };
                            cities.push(ort_name);

                        }
                    }
                    console.log(cities);










                }


            }

        }

    }
}

