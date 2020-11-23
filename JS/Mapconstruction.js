function createMap (zoomlevel1, sports_events1){



    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [10.451526, 51.165691], // starting position [lng, lat]
        zoom: zoomlevel1


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
                        'features': sports_events1
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
}
