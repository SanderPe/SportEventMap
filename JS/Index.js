let cities = [];
var zoomlevel = 10;
var searched_ort = "";
var upcomingevents = true;
var pastevents = false;
let sports_events = [];
var ort_name = [];
var chosen_regionList = [];
var chosen_categorylist = [];
var chosen_german_regionList = [];

let all_events = [];

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
            searched_ort = document.getElementById("searchstring").value;
            webapp(searched_ort);
        }
    })

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

$('#inputfile').change(function processData (){

     Readfile();
  // console.log(allevents);
});

$('#filtering').click(function () {
    webapp(searched_ort);
});
$('#region').click(function () {
    webapp(searched_ort);
});
$('#searchstring_button').click(function () {
    let searched_ort = document.getElementById("searchstring").value;
    webapp(searched_ort);
});


function webapp(searchdata){

    cities = [];
    sports_events = [];
    chosen_regionList = [];
    chosen_categorylist = [];
    chosen_german_regionList = [];

    //map construction
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuZGVyNzg5IiwiYSI6ImNrZzFhZzl3cTBmZ3gyenBpZ3Jqb2dseXAifQ.XoRNw5LemXXJwFvbV7Dubg';

    //region checkbox list
    var cbarray2 = document.getElementsByName("reg");
    var cbarray4 = document.getElementsByName("reg2");
    for (var i =0; i < cbarray4.length; i++){
        if (cbarray4[i].checked){
            chosen_regionList.push(cbarray4[i].value);
        }
    }
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

    var searched_ort = searchdata;
    //console.log(searchdata);
    if (searched_ort == undefined || searched_ort == ""){
        searched_ort = "all";
    }
    console.log(searched_ort);

    //checkboxes german region
    var cbarray3 = document.getElementsByName("germany_reg");
    for (var i=0;i< cbarray3.length; i++){
        if (cbarray3[i].checked){
            chosen_german_regionList.push(cbarray3[i].value);
        }
    }
    if (chosen_german_regionList.length > 3){
        chosen_german_regionList.push("all");
    }
   // console.log(chosen_german_regionList);
    //checkboxes category
    var cbarray = document.getElementsByName("cat");
    for (var i =0; i < cbarray.length; i++){
        if (cbarray[i].checked){
            chosen_categorylist.push(cbarray[i].value);
        }

    }

     all_events.forEach((marker, index) =>{

       //  console.log(marker.lat + " " + marker.lng);

         let german_region = marker.german_region;
         let category = marker.category;


         //formatting german region direction
         if (german_region == undefined){
             german_region = "no info";
         }

         else if (german_region.includes("Nord")){
             german_region = "Nord";
         }
         else if (german_region.includes("Süd") || german_region.includes("Ost")){
             german_region = "Südost";
         }
         else if (german_region.includes("West")){
             german_region = "West";
         }
         else if (german_region.includes("Mitte")){
             german_region= "Mitte";
         }
         else {
             german_region = "no clear info";
         }

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


         if (marker.country !== undefined && marker.ort !== undefined){
             //if (cities.includes(ort_name) === false){
                 ort_name = {
                     "country" : marker.country,
                     "name" : marker.ort,
                 };
                 cities.push(ort_name);

            // }
         }

         filtering(marker, category, german_region, searched_ort);

     });

    console.log(sports_events.length);
    createMap(zoomlevel, sports_events);
    searchSuggest(cities, searched_ort);

}



