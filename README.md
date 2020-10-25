# SportEventMap
Prerequisites

Have a CSV file in the correct structure with columns in the following order:

Start-Datum -> if this date is passed, the marker will turn to a darker color, if the event is in the future marker will be with a brighter color
End-Datum 
Name -> this is used for the marker title 
Turnierart  
Ordnungsnummer  
Land  
Ort 
Region	-> This is used for the geocoding as well as the Ort and Land column  
Offener-Turniername	  
Veranstalter	  
Kategorie	->  A to E Level and intertaional have diffrent colors  
Meldeschluss	  
Turnier-Link	-> visible if you click on the pop up 
Ausschreibung-Link	  

If your file has this structure, then you can upload it to the application and the results will show up on the map!

Built with PHPstorm

Development of a visual search engine for sports events.
Goal : 

You can upload a CSV file with adresses of sport events into the webapplication and then the webapplicatin will show you the locations on the map with colors of the markers changing based on category and if they are in the past or future. also you can click on them to display more info and a link if available. You can also filter them by category using checkboxes.
