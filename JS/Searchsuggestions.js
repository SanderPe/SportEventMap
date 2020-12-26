/** @function this function's core functionality is the searchsuggestions.
 * it takes the input from the searchfield and compares it to the list "cities1".
 * if it is in the list, the name of the city and country are displayed under the searchbox.
 * In a link format and when clicked, it filters on the name from the clicked city*/

/** @param it accepts 2 parameters: cities1 is a list of all individual cities in the CSV file, and
 * searched_ort contains the searchbar input */
function searchSuggest(cities1, searched_ort){

    const suggestionPanel = document.querySelector('#searchsuggestions');
    const searchInput = document.querySelector('#searchstring');

    searchInput.addEventListener('input', function (){
        const input = searchInput.value;
         console.log(input.length);

        if (input.length > 0){
            suggestionPanel.innerHTML = "";
            const filtered_suggestions = cities1.filter(city => city.name.includes(searched_ort)|| city.name.toLowerCase().includes(searched_ort));

            let i = 0;

            filtered_suggestions.forEach(function (suggested){
                if (i < 5){
                    //console.log(suggested);
                    i ++;
                    let a = document.createElement('a');
                    if (input.length > 0){
                        a.innerHTML = suggested.name + ", " + suggested.country + "<br>";
                        a.setAttribute('href', '#')
                        a.setAttribute('value', suggested.name)
                        a.onclick = function(){ setsuggestion(suggested.name);};
                        suggestionPanel.appendChild(a);
                    }


                }
            });

        }


    })

}