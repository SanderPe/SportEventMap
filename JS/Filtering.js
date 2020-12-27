/** @function the most important parts of this function is the filtering
 * and assignment of the marker colors based on categories. In the end
 * it creates an object 'address' and pushes it into the 'sports_events' list
 *
 * @param it accepts 4 parameters: marker, category, german_region and searched_data*/
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
    let end_date = marker.end_date;
    let start_date = marker.start_date;
    let country = marker.country;
    let ort = marker.ort;

    let link = marker.link;
    let title = marker.title;
    //var ort_name = {};
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
    /** the following if statements take care of the actual filtering based on category,
     * region, german_region, searched_data and date variables */
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
                                category_color = "#F9BBC8";
                            } else {
                                category_color = "#FF0E95";
                            }

                            break;
                        case "B-Level":
                            if (currentdate - start_date_object > 0) {
                                category_color = "#A7D9E8";
                            } else {
                                category_color = "#0001FE";
                            }
                            break;
                        case "C-Level":
                            if (currentdate - start_date_object > 0) {
                                category_color = "#8BF093";
                            } else {
                                category_color = "#018101";
                            }

                            break;
                        case "D-Level":
                            if (currentdate - start_date_object > 0) {
                                category_color = "#FF8072";
                            } else {
                                category_color = "#F80300";
                            }
                            break;
                        case "E-Level":
                            if (currentdate - start_date_object > 0) {
                                category_color = "#EFE8A7";
                            } else {
                                category_color = "#FDFD04";
                            }
                            break;
                        default:
                            if (currentdate - start_date_object > 0) {
                                category_color = "#E982F0";
                            } else {
                                category_color = "#7C017F";
                            }
                    }
                    let link_html;
                    let datum;
                    if (link.length == 0){
                         link_html = "";
                    }
                    else {
                         link_html = '<a href="' + link +  '" target="_blank"  title="Opens in a new window" >Link</a>';
                    }
                    if (start_date == end_date){
                        datum = "Date: " + start_date;
                    }
                    else {
                        datum = "Date: " + start_date + " until " + end_date;
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

                            "data": '<b>' + title + '</b>' + '<br>' + datum + '<br>' + "Country and City: " + country + ", " + ort + '<br>' + "Region info: " + region + " " + german_region
                            + '<br>' + "Category: " + category + '<br>' + link_html,

                            // "marker-symbol": "marker-15",
                            // "marker-size": "small",
                            "marker-color": category_color

                        }
                    };

                    sports_events.push(address);


                }


            }

        }

    }
}

