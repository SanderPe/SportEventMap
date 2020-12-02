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

    var category_color = '';
    let currentdate = new Date();


    if (chosen_categorylist.includes(category) && chosen_regionList.includes(region)) {

        if (chosen_german_regionList.includes(german_region) || chosen_german_regionList.includes("all")) {


            if (searched_data == ort || searched_data == "all") {


                if (upcomingevents == true && pastevents == true) {

                    geocode();

                } else if (upcomingevents == true && pastevents == false) {

                    if (currentdate > start_date_object) {

                    } else {
                        geocode();
                        //console.log("hoertje")

                    }
                }

                function geocode() {

                    //formatting Veranstalter
                    switch (region) {
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
                            region = "";

                    }



                    var location = country + " " + ort + " " + region + " ";
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
                                'coordinates': [lng, lat]
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
                        console.log(address);
                    })
                        .catch(function (error) {
                            console.log(error)
                        });
                }


            }

        }

    }
}

