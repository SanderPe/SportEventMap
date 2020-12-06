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

}